#include "daisy_seed.h"
#include "daisysp.h"

#include <cmath>
#include <cstring>
#include <cstdint>

using namespace daisy;
using namespace daisysp;
using namespace daisy::seed;

namespace
{
constexpr size_t kNumKnobs        = 6;
constexpr size_t kNumSwitches     = 3;
constexpr float  kControlLoopHz   = 1000.0f;
constexpr float  kPi              = 3.14159265358979323846f;
constexpr size_t kMaxDelaySamples = 50000;

enum KnobIndex : size_t
{
    KNOB_DRIVE = 0,
    KNOB_TONE,
    KNOB_MOD,
    KNOB_TIME,
    KNOB_MIX,
    KNOB_LEVEL,
};

enum SwitchIndex : size_t
{
    SW_BYPASS = 0,
    SW_MOD_MODE,
    SW_PRESET,
};

enum class ModMode : uint8_t
{
    Chorus = 0,
    Phaser,
    Tremolo,
    Count,
};

enum class PresetId : uint8_t
{
    StudioClean = 0,
    CrunchRhythm,
    LeadEcho,
    AmbientWash,
    Count,
};

static const Pin kKnobPins[kNumKnobs]     = {A0, A1, A2, A3, A4, A5};
static const Pin kSwitchPins[kNumSwitches] = {D0, D1, D2};

const char *kModModeNames[] = {"Chorus", "Phaser", "Tremolo"};
const char *kPresetNames[]  = {"Studio Clean", "Crunch Rhythm", "Lead Echo", "Ambient Wash"};

template <typename T>
inline T Clamp(T value, T min_value, T max_value)
{
    return value < min_value ? min_value
                             : (value > max_value ? max_value : value);
}

inline float MapRange(float input,
                      float in_min,
                      float in_max,
                      float out_min,
                      float out_max)
{
    const float norm = Clamp((input - in_min) / (in_max - in_min), 0.0f, 1.0f);
    return out_min + (out_max - out_min) * norm;
}

inline size_t ToIndex(ModMode mode)
{
    return static_cast<size_t>(mode);
}

inline size_t ToIndex(PresetId preset)
{
    return static_cast<size_t>(preset);
}

inline ModMode NextModMode(ModMode mode)
{
    return static_cast<ModMode>((ToIndex(mode) + 1) % ToIndex(ModMode::Count));
}

inline PresetId NextPreset(PresetId preset)
{
    return static_cast<PresetId>((ToIndex(preset) + 1) % ToIndex(PresetId::Count));
}

inline float SoftClip(float x)
{
    return std::tanh(x);
}

class OnePoleLowpass
{
  public:
    void Init(float sample_rate)
    {
        sample_rate_ = sample_rate;
        state_       = 0.0f;
        SetCutoff(2000.0f);
    }

    void SetCutoff(float cutoff_hz)
    {
        const float hz = Clamp(cutoff_hz, 10.0f, sample_rate_ * 0.45f);
        alpha_         = 1.0f - std::exp((-2.0f * kPi * hz) / sample_rate_);
    }

    float Process(float in)
    {
        state_ += alpha_ * (in - state_);
        return state_;
    }

  private:
    float sample_rate_ = 48000.0f;
    float alpha_       = 0.1f;
    float state_       = 0.0f;
};

class SimpleGate
{
  public:
    void Init(float sample_rate)
    {
        sample_rate_ = sample_rate;
        envelope_    = 0.0f;
        gain_        = 1.0f;
    }

    float Process(float in, float threshold, float decay_time_s)
    {
        const float detector = std::fabs(in);
        const float coeff
            = std::exp(-1.0f / Clamp(decay_time_s * sample_rate_, 1.0f, 500000.0f));

        envelope_ = detector > envelope_ ? detector : detector + coeff * (envelope_ - detector);

        const float target_gain = envelope_ > threshold ? 1.0f : 0.06f;
        gain_ += 0.003f * (target_gain - gain_);
        return in * gain_;
    }

  private:
    float sample_rate_ = 48000.0f;
    float envelope_    = 0.0f;
    float gain_        = 1.0f;
};

class SimpleCompressor
{
  public:
    void Init(float sample_rate)
    {
        sample_rate_ = sample_rate;
        envelope_    = 0.0f;
    }

    float Process(float in, float threshold_db, float ratio, float makeup_db)
    {
        const float detector     = std::fabs(in) + 1.0e-6f;
        const float attack_coeff = std::exp(-1.0f / (0.005f * sample_rate_));
        const float release_coeff
            = std::exp(-1.0f / (0.080f * sample_rate_));

        if(detector > envelope_)
            envelope_ = detector + attack_coeff * (envelope_ - detector);
        else
            envelope_ = detector + release_coeff * (envelope_ - detector);

        const float env_db  = 20.0f * std::log10(envelope_);
        const float over_db = env_db - threshold_db;
        float       gain_db = 0.0f;

        if(over_db > 0.0f)
            gain_db = -over_db * (1.0f - (1.0f / Clamp(ratio, 1.0f, 20.0f)));

        const float makeup = std::pow(10.0f, makeup_db / 20.0f);
        const float gain   = std::pow(10.0f, gain_db / 20.0f) * makeup;
        return in * gain;
    }

  private:
    float sample_rate_ = 48000.0f;
    float envelope_    = 0.0f;
};

class PingPongDelay
{
  public:
    void Init(float sample_rate, float *left_buffer, float *right_buffer, size_t buffer_size)
    {
        sample_rate_ = sample_rate;
        left_buffer_ = left_buffer;
        right_buffer_ = right_buffer;
        buffer_size_ = buffer_size;
        write_index_ = 0;

        for(size_t i = 0; i < buffer_size_; ++i)
        {
            left_buffer_[i]  = 0.0f;
            right_buffer_[i] = 0.0f;
        }

        fb_l_.Init(sample_rate);
        fb_r_.Init(sample_rate);
        SetTimeMs(380.0f);
        SetFeedback(0.35f);
        SetCrossFeedback(0.25f);
        SetTone(3500.0f);
    }

    void SetTimeMs(float time_ms)
    {
        const float delay = Clamp((time_ms * sample_rate_) * 0.001f,
                                  120.0f,
                                  static_cast<float>(buffer_size_ - 8));
        delay_samples_ = static_cast<size_t>(delay);
    }

    void SetFeedback(float feedback)
    {
        feedback_ = Clamp(feedback, 0.0f, 0.92f);
    }

    void SetCrossFeedback(float cross_feedback)
    {
        cross_feedback_ = Clamp(cross_feedback, 0.0f, 0.8f);
    }

    void SetTone(float cutoff_hz)
    {
        fb_l_.SetCutoff(cutoff_hz);
        fb_r_.SetCutoff(cutoff_hz);
    }

    void Process(float in_l, float in_r, float &wet_l, float &wet_r)
    {
        const size_t right_delay
            = static_cast<size_t>(Clamp(static_cast<float>(delay_samples_) * 1.12f,
                                        120.0f,
                                        static_cast<float>(buffer_size_ - 8)));

        const size_t read_idx_l = (write_index_ + buffer_size_ - delay_samples_) % buffer_size_;
        const size_t read_idx_r = (write_index_ + buffer_size_ - right_delay) % buffer_size_;

        const float delayed_l = left_buffer_[read_idx_l];
        const float delayed_r = right_buffer_[read_idx_r];

        const float fb_left
            = fb_l_.Process((delayed_l * feedback_) + (delayed_r * cross_feedback_));
        const float fb_right
            = fb_r_.Process((delayed_r * feedback_) + (delayed_l * cross_feedback_));

        left_buffer_[write_index_]  = in_l + fb_left;
        right_buffer_[write_index_] = in_r + fb_right;
        write_index_                = (write_index_ + 1) % buffer_size_;

        wet_l = delayed_l;
        wet_r = delayed_r;
    }

  private:
    float sample_rate_    = 48000.0f;
    size_t delay_samples_ = 18000;
    size_t buffer_size_   = 1;
    size_t write_index_   = 0;
    float feedback_       = 0.35f;
    float cross_feedback_ = 0.25f;

    float *left_buffer_  = nullptr;
    float *right_buffer_ = nullptr;

    OnePoleLowpass fb_l_;
    OnePoleLowpass fb_r_;
};

template <size_t C1, size_t C2, size_t C3, size_t C4, size_t A1, size_t A2>
class SchroederReverb
{
  public:
    void Init()
    {
        comb_1_.Init();
        comb_2_.Init();
        comb_3_.Init();
        comb_4_.Init();
        ap_1_.Init();
        ap_2_.Init();
        room_ = 0.72f;
        damp_ = 0.25f;
    }

    void SetRoom(float room)
    {
        room_ = Clamp(room, 0.25f, 0.92f);
    }

    void SetDamp(float damp)
    {
        damp_ = Clamp(damp, 0.02f, 0.85f);
    }

    float Process(float in)
    {
        const float input = in * 0.20f;
        float       acc   = 0.0f;

        acc += ProcessComb<C1>(comb_1_, filter_1_, input);
        acc += ProcessComb<C2>(comb_2_, filter_2_, input);
        acc += ProcessComb<C3>(comb_3_, filter_3_, input);
        acc += ProcessComb<C4>(comb_4_, filter_4_, input);

        acc *= 0.25f;
        acc = ap_1_.Allpass(acc, A1, 0.5f);
        acc = ap_2_.Allpass(acc, A2, 0.5f);
        return acc;
    }

  private:
    template <size_t DelayLength, size_t StorageSize>
    float ProcessComb(DelayLine<float, StorageSize> &line, float &filter_store, float in)
    {
        const float delayed = line.Read(static_cast<float>(DelayLength));
        filter_store += damp_ * (delayed - filter_store);
        line.Write(in + (filter_store * room_));
        return delayed;
    }

    float room_ = 0.72f;
    float damp_ = 0.25f;

    float filter_1_ = 0.0f;
    float filter_2_ = 0.0f;
    float filter_3_ = 0.0f;
    float filter_4_ = 0.0f;

    DelayLine<float, C1 + 1> comb_1_;
    DelayLine<float, C2 + 1> comb_2_;
    DelayLine<float, C3 + 1> comb_3_;
    DelayLine<float, C4 + 1> comb_4_;
    DelayLine<float, A1 + 1> ap_1_;
    DelayLine<float, A2 + 1> ap_2_;
};

struct PresetVoicing
{
    ModMode mod_mode;
    float   input_trim;
    float   gate_threshold;
    float   drive_boost;
    float   comp_threshold_db;
    float   comp_ratio;
    float   makeup_db;
    float   delay_feedback;
    float   delay_cross;
    float   reverb_room;
    float   reverb_damp;
};

constexpr PresetVoicing kPresetVoicings[] = {
    {ModMode::Chorus, 0.92f, 0.010f, 0.10f, -22.0f, 1.8f, 1.0f, 0.26f, 0.18f, 0.56f, 0.22f},
    {ModMode::Phaser, 0.98f, 0.014f, 0.34f, -28.0f, 3.0f, 2.0f, 0.35f, 0.22f, 0.50f, 0.18f},
    {ModMode::Phaser, 1.00f, 0.016f, 0.48f, -30.0f, 4.2f, 3.5f, 0.42f, 0.28f, 0.58f, 0.20f},
    {ModMode::Chorus, 0.90f, 0.009f, 0.18f, -24.0f, 2.2f, 1.5f, 0.46f, 0.34f, 0.82f, 0.34f},
};

struct SharedState
{
    volatile float   drive          = 0.30f;
    volatile float   tone           = 0.55f;
    volatile float   mod            = 0.35f;
    volatile float   time           = 0.45f;
    volatile float   mix            = 0.30f;
    volatile float   level          = 0.75f;
    volatile bool    bypass         = false;
    volatile uint8_t mod_mode_index = static_cast<uint8_t>(ModMode::Chorus);
    volatile uint8_t preset_index   = static_cast<uint8_t>(PresetId::StudioClean);
};

DaisySeed      hw;
AdcChannelConfig adc_cfg[kNumKnobs];
AnalogControl    knobs[kNumKnobs];
Switch           switches[kNumSwitches];

SharedState shared_state;

SimpleGate        gate_fx;
SimpleCompressor  compressor_fx;
Overdrive         drive_fx;
Svf               tone_filter;
DcBlock           dc_block_in;
DcBlock           dc_block_post;
Chorus            chorus_fx;
Phaser            phaser_fx;
Tremolo           tremolo_fx;
PingPongDelay     delay_fx;
SchroederReverb<1116, 1188, 1277, 1356, 225, 556> reverb_l;
SchroederReverb<1139, 1211, 1300, 1379, 248, 579> reverb_r;

float DSY_SDRAM_BSS delay_left_buffer[kMaxDelaySamples];
float DSY_SDRAM_BSS delay_right_buffer[kMaxDelaySamples];

void ApplyPreset(PresetId preset)
{
    const auto &voicing           = kPresetVoicings[ToIndex(preset)];
    shared_state.mod_mode_index   = static_cast<uint8_t>(voicing.mod_mode);
    shared_state.preset_index     = static_cast<uint8_t>(preset);
}

void InitControls()
{
    for(size_t i = 0; i < kNumKnobs; ++i)
    {
        adc_cfg[i].InitSingle(kKnobPins[i]);
    }

    hw.adc.Init(adc_cfg, kNumKnobs);
    hw.adc.Start();

    for(size_t i = 0; i < kNumKnobs; ++i)
    {
        knobs[i].Init(hw.adc.GetPtr(i), kControlLoopHz);
    }

    for(size_t i = 0; i < kNumSwitches; ++i)
    {
        switches[i].Init(kSwitchPins[i],
                         kControlLoopHz,
                         Switch::TYPE_MOMENTARY,
                         Switch::POLARITY_INVERTED,
                         GPIO::Pull::PULLUP);
    }
}

void InitDsp()
{
    const float sample_rate = hw.AudioSampleRate();

    gate_fx.Init(sample_rate);
    compressor_fx.Init(sample_rate);
    drive_fx.Init();
    tone_filter.Init(sample_rate);
    tone_filter.SetRes(0.25f);
    tone_filter.SetDrive(0.15f);

    dc_block_in.Init(sample_rate);
    dc_block_post.Init(sample_rate);

    chorus_fx.Init(sample_rate);
    phaser_fx.Init(sample_rate);
    phaser_fx.SetPoles(4);

    tremolo_fx.Init(sample_rate);
    tremolo_fx.SetWaveform(Oscillator::WAVE_SIN);

    delay_fx.Init(sample_rate, delay_left_buffer, delay_right_buffer, kMaxDelaySamples);
    reverb_l.Init();
    reverb_r.Init();
}

void UpdateControls()
{
    for(size_t i = 0; i < kNumKnobs; ++i)
    {
        knobs[i].Process();
    }

    for(size_t i = 0; i < kNumSwitches; ++i)
    {
        switches[i].Debounce();
    }

    shared_state.drive = knobs[KNOB_DRIVE].Value();
    shared_state.tone  = knobs[KNOB_TONE].Value();
    shared_state.mod   = knobs[KNOB_MOD].Value();
    shared_state.time  = knobs[KNOB_TIME].Value();
    shared_state.mix   = knobs[KNOB_MIX].Value();
    shared_state.level = knobs[KNOB_LEVEL].Value();

    if(switches[SW_BYPASS].RisingEdge())
    {
        shared_state.bypass = !shared_state.bypass;
        hw.SetLed(!shared_state.bypass);
        hw.PrintLine("Bypass: %s", shared_state.bypass ? "ON" : "OFF");
    }

    if(switches[SW_MOD_MODE].RisingEdge())
    {
        const ModMode current = static_cast<ModMode>(shared_state.mod_mode_index);
        const ModMode next    = NextModMode(current);
        shared_state.mod_mode_index = static_cast<uint8_t>(next);
        hw.PrintLine("Modulation: %s", kModModeNames[ToIndex(next)]);
    }

    if(switches[SW_PRESET].RisingEdge())
    {
        const PresetId current = static_cast<PresetId>(shared_state.preset_index);
        const PresetId next    = NextPreset(current);
        ApplyPreset(next);
        hw.PrintLine("Preset: %s", kPresetNames[ToIndex(next)]);
    }
}

void AudioCallback(AudioHandle::InputBuffer in, AudioHandle::OutputBuffer out, size_t size)
{
    const PresetId preset_id
        = static_cast<PresetId>(shared_state.preset_index);
    const ModMode mod_mode
        = static_cast<ModMode>(shared_state.mod_mode_index);
    const PresetVoicing &preset = kPresetVoicings[ToIndex(preset_id)];

    const float drive_amount
        = Clamp((shared_state.drive * 0.85f) + preset.drive_boost, 0.02f, 0.98f);
    const float tone_cutoff = MapRange(shared_state.tone, 0.0f, 1.0f, 700.0f, 7200.0f);
    const float mod_rate    = MapRange(shared_state.mod, 0.0f, 1.0f, 0.15f, 6.0f);
    const float mod_depth   = Clamp(0.10f + (shared_state.mod * 0.82f), 0.0f, 0.98f);
    const float delay_time_ms
        = MapRange(shared_state.time, 0.0f, 1.0f, 140.0f, 780.0f);
    const float mix         = Clamp(shared_state.mix, 0.0f, 1.0f);
    const float output_gain = MapRange(shared_state.level, 0.0f, 1.0f, 0.15f, 1.1f);

    drive_fx.SetDrive(drive_amount);
    tone_filter.SetFreq(tone_cutoff);

    chorus_fx.SetLfoFreq(mod_rate);
    chorus_fx.SetLfoDepth(mod_depth);
    chorus_fx.SetDelayMs(10.0f + (mod_depth * 12.0f));
    chorus_fx.SetFeedback(0.08f + (mod_depth * 0.18f));

    phaser_fx.SetLfoFreq(mod_rate * 0.75f);
    phaser_fx.SetLfoDepth(0.30f + (mod_depth * 0.65f));
    phaser_fx.SetFreq(MapRange(shared_state.tone, 0.0f, 1.0f, 250.0f, 1400.0f));
    phaser_fx.SetFeedback(0.35f);

    tremolo_fx.SetFreq(MapRange(shared_state.mod, 0.0f, 1.0f, 1.2f, 10.5f));
    tremolo_fx.SetDepth(0.15f + (mod_depth * 0.80f));

    delay_fx.SetTimeMs(delay_time_ms);
    delay_fx.SetFeedback(preset.delay_feedback + (shared_state.mix * 0.12f));
    delay_fx.SetCrossFeedback(preset.delay_cross);
    delay_fx.SetTone(MapRange(shared_state.tone, 0.0f, 1.0f, 1800.0f, 6000.0f));

    reverb_l.SetRoom(preset.reverb_room);
    reverb_r.SetRoom(Clamp(preset.reverb_room + 0.03f, 0.25f, 0.92f));
    reverb_l.SetDamp(preset.reverb_damp);
    reverb_r.SetDamp(Clamp(preset.reverb_damp + 0.02f, 0.02f, 0.85f));

    for(size_t i = 0; i < size; ++i)
    {
        const float in_l = in[0][i];
        const float in_r = in[1][i];

        const float dry_mono = 0.5f * (in_l + in_r);

        if(shared_state.bypass)
        {
            out[0][i] = in_l;
            out[1][i] = in_r;
            continue;
        }

        float signal = dry_mono * preset.input_trim;
        signal       = dc_block_in.Process(signal);
        signal       = gate_fx.Process(signal, preset.gate_threshold, 0.080f);
        signal = compressor_fx.Process(signal,
                                       preset.comp_threshold_db,
                                       preset.comp_ratio,
                                       preset.makeup_db);

        float driven = drive_fx.Process(signal);
        driven       = (signal * 0.20f) + (driven * 0.80f);

        tone_filter.Process(driven);
        float toned = (tone_filter.Low() * 0.72f) + (driven * 0.28f);
        toned       = dc_block_post.Process(toned);

        float mod_l = toned;
        float mod_r = toned;

        switch(mod_mode)
        {
            case ModMode::Chorus:
                chorus_fx.Process(toned);
                mod_l = chorus_fx.GetLeft();
                mod_r = chorus_fx.GetRight();
                break;

            case ModMode::Phaser:
            {
                const float phased = phaser_fx.Process(toned);
                mod_l              = phased;
                mod_r              = phased;
                break;
            }

            case ModMode::Tremolo:
            {
                const float trem = tremolo_fx.Process(toned);
                mod_l            = trem;
                mod_r            = trem;
                break;
            }

            default: break;
        }

        float delay_l = 0.0f;
        float delay_r = 0.0f;
        delay_fx.Process(mod_l, mod_r, delay_l, delay_r);

        const float reverb_in_l = mod_l + (delay_l * 0.60f);
        const float reverb_in_r = mod_r + (delay_r * 0.60f);
        const float verb_l      = reverb_l.Process(reverb_in_l);
        const float verb_r      = reverb_r.Process(reverb_in_r);

        const float mod_mix    = 0.30f * mix;
        const float delay_mix  = 0.75f * mix;
        const float reverb_mix = 0.55f * mix;
        const float dry_mix    = 1.0f - (0.55f * mix);

        float out_l = (in_l * dry_mix) + (mod_l * mod_mix) + (delay_l * delay_mix)
                      + (verb_l * reverb_mix);
        float out_r = (in_r * dry_mix) + (mod_r * mod_mix) + (delay_r * delay_mix)
                      + (verb_r * reverb_mix);

        out_l = SoftClip(out_l * output_gain) * 0.92f;
        out_r = SoftClip(out_r * output_gain) * 0.92f;

        out[0][i] = out_l;
        out[1][i] = out_r;
    }
}
} // namespace

int main(void)
{
    hw.Init();
    hw.SetAudioBlockSize(48);
    hw.SetAudioSampleRate(SaiHandle::Config::SampleRate::SAI_48KHZ);
    hw.StartLog();

    InitControls();
    InitDsp();
    ApplyPreset(PresetId::StudioClean);
    hw.SetLed(true);

    hw.PrintLine("Daisy Guitar Multi-Effect");
    hw.PrintLine("Preset: %s", kPresetNames[ToIndex(PresetId::StudioClean)]);
    hw.PrintLine("Modulation: %s", kModModeNames[ToIndex(ModMode::Chorus)]);

    hw.StartAudio(AudioCallback);

    while(1)
    {
        UpdateControls();
        System::Delay(1);
    }
}
