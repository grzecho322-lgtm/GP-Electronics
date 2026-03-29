# Truck Service Niezbednik (Monorepo)

Flutter monorepo dla aplikacji serwisowej ciezarowek, z rozdzialem na:
- `Ciagnik`
- `Naczepa`
- `Wszystkie`

## Struktura

- `apps/truck_app` - aplikacja Flutter (UI + lokalna baza Drift)
- `packages/core` - modele domenowe, starter content, similarity + query tools
- `scripts/build_release.sh` - skrypt build release (Android + iOS no-codesign)
- `scripts/build_ios_release.sh` - dedykowany iOS release build z auto-naprawa xattr
- `launcher/macos/*.command` - szybkie uruchamianie appki i build release

## Zrealizowane funkcje

1. Lokalna baza danych (`Drift`) + zapis `Nowa naprawa` do historii.
2. CRUD (edycja/usuwanie/dodawanie) dla `Repair`, `Tip`, `Checklist`.
3. Flota i relacje `Ciagnik <-> Naczepa` (`FleetUnit`, `FleetPair`) + wyszukiwanie VIN/rej.
4. Filtry i sortowanie historii (system, query, data, pojazd).
5. `Podobne przypadki` (dopasowanie tagow + objawow).
6. `Zapisz jako Tip` bezposrednio z wpisu historii.
7. Checklisty z zapisem postepu i notatkami na poziomie kroku (`ChecklistRun`).
8. Zalaczniki do napraw: `zdjecie`, `pdf`, `notatka`.
9. Backup import/export (`JSON` + `CSV`).
10. Generator zapytan `Szukaj podobnych w necie` + otwieranie linkow.
11. Testy domenowe i widgetowe + CI workflow.
12. Przygotowanie release: branding nazwy i ikon, build Android release.
13. Cloud sync + auth (`Supabase`) i backup miedzy urzadzeniami.
14. Modul `Zlecenia serwisowe` (status, mechanik, termin) + CRUD.
15. Koszty napraw (`roboczogodziny`, `czesci`, `koszty zewnetrzne`) i raport rentownosci.
16. Podpowiedzi techniczne bez danych klienta: `marka + kod bledu/objaw + co sprawdzic + jak naprawic`.
17. Dedykowane filtry podpowiedzi: `marka`, `kod bledu`, `system`, `tylko zweryfikowane`.
18. Ranking trafnosci podpowiedzi z wagami (`kod > objaw > tag`) i procentem dopasowania.
19. Sekcja `Najpierw sprawdz` (3 szybkie kroki) generowana z podpowiedzi.
20. Historia skutecznosci dla podpowiedzi (`pomoglo` / `nie pomoglo`) z podsumowaniem.
21. Slownik kodow bledow: opis kodu, typowe przyczyny i standardowe checki + CRUD.
22. Tryb diagnozy (szybki): wpis `marka + kod + objaw (+ system)` i od razu `Top 3` podpowiedzi z procentem dopasowania i szybkimi krokami.
23. Start diagnozy z historii naprawy (1 klik: prefill `marka + kod + objaw + system`).
24. Eksport wyniku diagnozy do PDF (`Top 3`, procent dopasowania, szybkie kroki, przyczyny i checki).

## Uruchomienie

```bash
cd apps/truck_app
flutter pub get
dart run build_runner build --delete-conflicting-outputs
flutter run
```

## Testy i analiza

```bash
cd packages/core
flutter analyze
flutter test

cd ../../apps/truck_app
flutter analyze
flutter test
```

## CI

Workflow:
- `.github/workflows/flutter-ci.yml`

Uruchamia:
- `flutter pub get`
- `dart run build_runner build --delete-conflicting-outputs` (app)
- `flutter analyze`
- `flutter test`

## Release

### Szybko przez skrypt

```bash
./scripts/build_release.sh
```

### Recznie

```bash
cd apps/truck_app
flutter pub get
dart run build_runner build --delete-conflicting-outputs
dart run flutter_launcher_icons
flutter analyze
flutter test
flutter build apk --release
COPYFILE_DISABLE=1 flutter build ios --release --no-codesign
```

## Launcher (macOS)

```bash
./launcher/macos/launch.command
./launcher/macos/build_release.command
./launcher/macos/build_ios_release.command
```

Domyslnie `launch.command` uruchamia appke na `macos`.
Mozesz wymusic inny target:

```bash
LAUNCH_DEVICE=chrome ./launcher/macos/launch.command
LAUNCH_DEVICE=00008110-001168212286201E ./launcher/macos/launch.command
```

## iOS xattr fix

Jesli iOS build zatrzymuje sie na:
- `resource fork, Finder information, or similar detritus not allowed`

uzyj:

```bash
./scripts/build_ios_release.sh
```

Skrypt:
- czyta log builda,
- wykrywa pliki z bledem xattr,
- czyści extended attributes (`xattr -cr`) i retry builda (`IOS_BUILD_ATTEMPTS`, domyslnie `3`).

## Cloud Sync (Supabase)

Aplikacja wspiera:
- logowanie/rejestracje (email + haslo),
- wysylke backupu do chmury,
- pobranie i odtworzenie backupu na innym urzadzeniu.

Uruchomienie z konfiguracja:

```bash
cd apps/truck_app
flutter run \
  --dart-define=SUPABASE_URL=https://YOUR_PROJECT.supabase.co \
  --dart-define=SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Opcjonalnie:
- `SUPABASE_BACKUP_TABLE` (domyslnie: `truck_backups`)

Przykladowa tabela i polityki RLS:

```sql
create table if not exists public.truck_backups (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null,
  device_name text,
  platform text,
  updated_at timestamptz not null default now()
);

alter table public.truck_backups enable row level security;

create policy "select_own_backup"
on public.truck_backups
for select
using (auth.uid() = user_id);

create policy "insert_own_backup"
on public.truck_backups
for insert
with check (auth.uid() = user_id);

create policy "update_own_backup"
on public.truck_backups
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

## Status buildow

- Android `apk --release`: OK
- iOS `--no-codesign`: OK przez `./scripts/build_ios_release.sh` (auto naprawa xattr + retry)
