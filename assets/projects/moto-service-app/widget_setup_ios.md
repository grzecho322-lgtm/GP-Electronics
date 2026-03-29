# iOS widget setup (required once in Xcode)

The Flutter side and widget source files are already in the repository.
To enable the real iOS home-screen widget, add the widget extension target in Xcode:

1. Open `ios/Runner.xcworkspace` in Xcode.
2. File -> New -> Target -> Widget Extension.
3. Name the target `NextServiceWidget`.
4. Replace generated files with files from `ios/NextServiceWidget/`.
5. In Signing & Capabilities for **Runner** and **NextServiceWidget**, add **App Groups**:
   - `group.com.example.moto_service_app_recovered`
6. Ensure widget extension `Info.plist` points to `ios/NextServiceWidget/Info.plist`.
7. Build and run on iOS device/simulator.

After that, long-press home screen -> Widgets -> choose "Next service".
