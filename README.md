# Realm Local Database React Native

This project is a mobile application for both iOS and Android platforms that serves as a todo list application. It utilizes Realm local database for storing todo items and provides functionality to save images in the app's local state. The project also handles permissions for accessing the camera and gallery, as well as manages the image picker for selecting images from the camera or gallery.

## Getting Started
Prerequisites
To build and run this project, you will need:

1. Xcode (for iOS) or Android Studio (for Android)
2. CocoaPods (for iOS)
Node.js and npm (for Android)

## Installation

Clone the repository.
For iOS, navigate to the project directory and run pod install to install the required dependencies.
For Android, navigate to the project directory and run npm install to install the required dependencies.

## Usage
Open the project in Xcode or Android Studio and build/run the project on a simulator or a physical device.

## Features
1. Realm local database
2. This project utilizes Realm local database for storing todo items. 
3. Realm is a fast and efficient local database solution that provides real-time synchronization and data encryption. 
4. The implementation of Realm in this project allows for seamless and reliable storage and retrieval of todo items with images.

## Local image storage
The project also provides functionality to save images in the app's local state. This allows for easy retrieval and display of images associated with each todo item.

## Permissions handling
The project handles permissions for accessing the camera and gallery. It prompts the user for permission to access the camera or gallery when necessary, and gracefully handles scenarios where the user denies permission.

## Image picker management
The project also manages the image picker for selecting images from the camera or gallery. It provides a streamlined and intuitive user interface for selecting images, and ensures that the selected image is properly associated with the corresponding todo item.

##License
This project is licensed under the MIT License - see the LICENSE file for details.
