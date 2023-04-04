import {launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {
  checkCameraPermission,
  checkGalleryPermissions,
} from './PermissionHandler';

export const chooseImageFromGallery = async () => {
  try {
    await checkGalleryPermissions();
    return;
    const options: any = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
    };

    const response: any = await launchImageLibrary(options);
    if (response.didCancel) {
      throw new Error('User cancelled image picker');
    } else if (response.error) {
      throw new Error(response.error);
    } else if (response.customButton) {
      throw new Error('User tapped custom button');
    } else {
      let typeArray = response.assets[0].type.split('/');
      if (
        typeArray[typeArray.length - 1] === 'jpeg' ||
        typeArray[typeArray.length - 1] === 'png' ||
        typeArray[typeArray.length - 1] === 'jpg'
      ) {
        return response.assets[0];
      } else {
        return Alert.alert('Please select a valid Image');
      }
    }
  } catch (error) {
    console.log(error);
  }
};
