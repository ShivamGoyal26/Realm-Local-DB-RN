import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNFS from 'react-native-fs';
import {useFocusEffect} from '@react-navigation/native';

// Files
import realm from '../../schemas/realm';
import {
  chooseImageFromCamera,
  chooseImageFromGallery,
} from '../../services/ImageManager';
import {generateUniqueId} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../../redux/theme';

const TodoList = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [mainData, setMainData] = useState([]);
  const [search, setSearch] = useState('');
  const [imageData, setImageData]: any = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getTodoData = async () => {
    const data: any = await realm.objects('Todo');
    setMainData(data);
  };

  const saveImage = async (uri: any) => {
    setLoading(true);
    try {
      const fileName = Date.now() + uri.split('/').pop();
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.copyFile(uri, destPath);
      realm.write(() => {
        realm.create('Todo', {
          id: generateUniqueId(),
          title: search,
          data: destPath,
          date: new Date(),
          mime: imageData.type,
        });
        setSearch('');
        setImageData(null);
      });
    } catch (error) {
      console.log('Error saving image: ', error);
    } finally {
      setLoading(false);
    }
  };

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

  useFocusEffect(
    React.useCallback(() => {
      getTodoData();
    }, []),
  );

  const createTodo = async () => {
    if (!imageData) {
      return Alert.alert('Please select image');
    }
    if (!search) {
      return Alert.alert('Please enter title');
    }
    saveImage(imageData.uri);
  };

  const deleteTodo = async (deleteObj: any) => {
    try {
      await RNFS.unlink(deleteObj.data);
      console.log('Image deleted successfully!');
      realm.write(() => {
        realm.delete(deleteObj);
        getTodoData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.screen, {padding: 20}]}>
        <Text style={{fontSize: 18, ...styles.text}}>ToDo List</Text>
        {/* <CountdownTimer /> */}
        <FlatList
          data={mainData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}: any) => {
            return (
              <View style={{padding: 10}}>
                <Text style={styles.text}>{item?.title}</Text>
                <View style={{height: 20}} />
                <Image
                  source={{
                    uri:
                      Platform.OS === 'android'
                        ? `file:${item.data}`
                        : `${item.data}`,
                  }}
                  style={{height: 200, width: 200}}
                />
                <View style={{height: 20}} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity onPress={() => deleteTodo(item)}>
                    <Text style={{color: 'red'}}>Delete</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('Edit', {data: item})
                    }>
                    <Text style={{color: 'green'}}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={() => <Text>No Data Found!</Text>}
        />
        <TextInput
          placeholder="Type your note..."
          placeholderTextColor={theme.textColor}
          style={{color: theme.textColor}}
          onChangeText={setSearch}
          value={search}
        />
        {imageData ? (
          <Image
            style={{height: 200, width: 200}}
            source={{uri: imageData.uri}}
          />
        ) : null}
        <TouchableOpacity onPress={imageManager}>
          <Text style={styles.text}>Pick Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={createTodo}>
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dispatch(setTheme())}>
          <Text style={styles.text}>Change Theme</Text>
        </TouchableOpacity>
      </View>
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

export default TodoList;
