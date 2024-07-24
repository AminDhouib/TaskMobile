# Task Manager App (Frontend)

This is the frontend for the Task Manager built with React Native.

## Prerequisites

Make sure you have the following installed on your system:

-   [Node.js](https://nodejs.org/)
-   npm
-   [Expo CLI](https://docs.expo.dev/get-started/installation/)
-   [Xcode](https://developer.apple.com/xcode/) (for iOS emulator)
-   [Android Studio](https://developer.android.com/studio) (for Android emulator)

## Installation

2. Navigate to the frontend project directory:

    ```bash
    cd frontend
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Add the configuration file:

    Modify the `config.json` file by replacing `https://your-api-url.com` with the URL of your hosted API or the local URL where your backend is running.

    ```json
    {
        "API_URL": "https://your-api-url.com"
    }
    ```

## Running the App

### Using Expo Go (Recommended)

1. Start the Metro Bundler:

    ```bash
    npm start
    ```

2. Install the Expo Go app on your mobile device from the [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779) or [Google Play Store (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent).

3. Scan the QR code displayed in the terminal or Metro Bundler web page using the Expo Go app to load the project on your device.

### For iOS

1. Start the Metro Bundler:

    ```bash
    npm start
    ```

2. Open a new terminal window and run the following command to start the iOS app:

    ```bash
    npm run ios
    ```

    Ensure that XCode us installed with a simulator available.

### For Android

1. Start the Metro Bundler:

    ```bash
    npm start
    ```

2. Open a new terminal window and run the following command to start the Android app:

    ```bash
    npm run android
    ```

    Ensure that Android Studio is installed and an Android Virtual Device (AVD) is configured. The command will build and run your project in the Android emulator.
