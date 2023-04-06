import {PERMISSIONS, request} from 'react-native-permissions';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';

export const checkCameraPermission = async () => {
  try {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    if (
      result === 'denied' ||
      result === 'blocked' ||
      result === 'unavailable'
    ) {
      Alert.alert('Camera Permission denied', 'Please provide access', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Open settings', onPress: () => Linking.openSettings()},
      ]);
    } else {
      // we have permission
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkGalleryPermissions = async () => {
  try {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    );
    if (
      result === 'denied' ||
      result === 'blocked' ||
      result === 'unavailable'
    ) {
      return Alert.alert('Gallery Permission Denied', 'Please provide access', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Open settings', onPress: () => Linking.openSettings()},
      ]);
    } else {
      // we have permission
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkFileWritePermissions = async () => {
  try {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    );
    if (
      result === 'denied' ||
      result === 'blocked' ||
      result === 'unavailable'
    ) {
      return Alert.alert('Write Permission Denied', 'Please provide access', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Open settings', onPress: () => Linking.openSettings()},
      ]);
    } else {
      // we have permission
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
