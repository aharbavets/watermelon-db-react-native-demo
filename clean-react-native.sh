#!/bin/bash

echo "🧹 Starting React Native cleanup..."

run_command() {
    echo "$1"
    if $2; then
        echo "✅ Success: $1"
    else
        echo "❌ Failed: $1"
        exit 1
    fi
}

if command -v watchman &> /dev/null; then
    run_command "Clearing Watchman cache" "watchman watch-del-all"
fi

run_command "Clearing Gradle cache" "rm -rf ios/Pods"
run_command "Clearing Gradle cache" "rm -rf android/.gradle"
run_command "Clearing Android build files" "rm -rf android/app/build"
run_command "Clearing NPM packages" "rm -rf node_modules package-lock.json yarn.lock pnpm.yaml"
run_command "Clearing React Native cache" "rm -rf $TMPDIR/react-*"
run_command "Clearing Metro bundler cache" "rm -rf $TMPDIR/metro-*"
run_command "Clearing NPM cache" "npm cache clean --force"
run_command "Installing NPM packages" "npm install"
run_command "Installing Cocoa Pods packages" "npx pod-install"

echo "🎉 Cleanup complete!"
