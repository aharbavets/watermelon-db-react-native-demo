#!/bin/bash

echo "🧹 Starting Android cleanup process..."

# Function to run command and check status
run_command() {
    echo "⚙️ $1"
    if $2; then
        echo "✅ Success: $1"
    else
        echo "❌ Failed: $1"
        exit 1
    fi
}

# Clear Metro bundler cache
run_command "Clearing Metro bundler cache" "cd android && ./gradlew clean"

# Clear Gradle cache
run_command "Clearing Gradle cache" "rm -rf android/.gradle"

# Clear Android build files
run_command "Clearing Android build files" "rm -rf android/app/build"

# Clear React Native cache
run_command "Clearing React Native cache" "rm -rf $TMPDIR/react-*"

# Clear Metro bundler cache
run_command "Clearing Metro bundler cache" "rm -rf $TMPDIR/metro-*"

# Clear Watchman cache
if command -v watchman &> /dev/null; then
    run_command "Clearing Watchman cache" "watchman watch-del-all"
fi

# Clear NPM cache
run_command "Clearing NPM cache" "npm cache clean --force"

echo "🎉 Cleanup complete! Now you can rebuild the project."
echo "
Suggested next steps:
1. cd android && ./gradlew assembleDebug
2. cd .. && npm start -- --reset-cache
3. In another terminal: npm run android
"