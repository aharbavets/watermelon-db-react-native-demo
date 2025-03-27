#!/bin/bash

echo "🧹 Starting focused cleanup..."

# Kill existing processes
echo "Killing Metro bundler and Gradle daemon..."
pkill -f metro || true
cd android && ./gradlew --stop && cd ..

# Clear specific caches
echo "Clearing React Native caches..."
rm -rf $TMPDIR/react-native-packager-cache-*
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-map-react-native-packager-*

# Clear gradle caches
echo "Clearing Gradle caches..."
rm -rf android/.gradle
rm -rf android/app/build
rm -rf android/app/.cxx

# Clear node modules and reinstall
echo "Reinstalling node modules..."
rm -rf node_modules
rm -rf yarn.lock
npm cache clean --force
npm install

# Clear watchman watches
if command -v watchman &> /dev/null; then
    echo "Resetting Watchman..."
    watchman watch-del-all
fi

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p android/app/src/main/assets

# Bundle
echo "Creating bundle..."
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Gradle clean
echo "Running Gradle clean..."
cd android && ./gradlew clean && cd ..

echo "Cleanup complete! Try building again with: cd android && ./gradlew assembleDebug"