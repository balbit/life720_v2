#!/bin/bash

os_name=$(uname -s)
user=$(whoami)

# Check if the OS is macOS
if [[ "$os_name" == "Darwin" ]]; then
    echo "macOS detected."
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home

# Elliot's configs
elif [[ "$os_name" == "Linux" && "$user" == "bo" ]]; then
    export PATH=$PATH:$HOME/android-studio/bin
    export ANDROID_HOME=$HOME/Android/Sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
    export PATH=$PATH:$JAVA_HOME/bin
    export LOCAL_IP="10.29.219.234"

# Handle other operating systems
else
    echo "Unsupported operating system: $os_name"
fi
