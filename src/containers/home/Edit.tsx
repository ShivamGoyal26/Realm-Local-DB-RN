import React, {useMemo, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import realm from '../../schemas/realm';
import RNFS from 'react-native-fs';
import {
  chooseImageFromCamera,
  chooseImageFromGallery,
} from '../../services/ImageManager';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../../redux/theme';

const Edit = (props: any) => {
  const data = props.route.params.data;
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [search, setSearch] = useState(data.title);
  const [imageData, setImageData]: any = useState(null);
  const dispatch = useDispatch();

  const pickGalleryImage = async () => {
    const res = await chooseImageFromGallery();
    setImageData(res);
  };

  const pickCameraImage = async () => {
    const res = await chooseImageFromCamera();
    setImageData(res);
  };

  const imageManager = async () => {
    return Alert.alert('Pick images', 'Please select your options', [
      {
        text: 'Gallery',
        onPress: () => pickGalleryImage(),
      },
      {text: 'Camera', onPress: () => pickCameraImage()},
    ]);
  };

  const editManager = async () => {
    if (!search) {
      return Alert.alert('Please enter title');
    }
    let image: any = null;
    if (imageData) {
      const fileName = Date.now() + imageData.uri.split('/').pop();
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.copyFile(imageData.uri, destPath);
      image = destPath;
    }
    realm.write(() => {
      data.title = search;
      data.data = image ? image : data.data;
    });
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.screen, {padding: 15}]}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>

        <View style={{height: 30}} />

        <TouchableOpacity onPress={imageManager}>
          <Text style={styles.text}>update Image</Text>
        </TouchableOpacity>
        <View style={{height: 10}} />
        {imageData ? (
          <Image
            source={{
              uri: imageData.uri,
            }}
            style={{height: 200, width: 200}}
          />
        ) : (
          <Image
            source={{
              uri:
                Platform.OS === 'android'
                  ? `file:${data.data}`
                  : `${data.data}`,
            }}
            style={{height: 200, width: 200}}
          />
        )}
        <View style={{height: 10}} />
        <TextInput
          placeholder="Type your note..."
          placeholderTextColor={theme.textColor}
          style={{color: theme.textColor}}
          onChangeText={setSearch}
          value={search}
        />
        <View style={{height: 30}} />
        <TouchableOpacity onPress={editManager} style={{alignSelf: 'center'}}>
          <Text style={styles.text}>SAVE</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => dispatch(setTheme())}>
        <Text style={styles.text}>Change Theme</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    text: {
      color: theme.textColor,
    },
  });

export default Edit;
