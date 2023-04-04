import {PERMISSIONS, request} from 'react-native-permissions';
import {Platform} from 'react-native';

export const checkCameraPermission = () => {
  request(
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  )
    .then(result => {
      console.log(result);
      if (
        result === 'denied' ||
        result === 'blocked' ||
        result === 'unavailable'
      ) {
        console.log('We do not have the permission');
      } else {
        // pickImage();
        console.log('we have permission');
      }
    })
    .catch(error => {
      console.log('This is the error', error);
    });
};

export const checkGalleryPermissions = () => {
  request(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.MEDIA_LIBRARY
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  )
    .then(result => {
      console.log(result);
      if (
        result === 'denied' ||
        result === 'blocked' ||
        result === 'unavailable'
      ) {
        console.log('We do not have the permission');
      } else {
        console.log('we have permission');
      }
    })
    .catch(error => {
      console.log('This is the error', error);
    });
};
