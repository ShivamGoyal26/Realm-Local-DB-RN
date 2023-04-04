import React, {useEffect, useState} from 'react';
import {
    Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import realm from '../../schemas/realm';
import RNFS from 'react-native-fs';

const Edit = (props: any) => {
  const data = props.route.params.data;

  const [search, setSearch] = useState(data.title);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);

  const convertImageToBinaryData = async () => {
    const result: any = await launchImageLibrary({mediaType: 'photo'});
    const url = result.assets[0].uri;
    const type = result.assets[0].type;
    setType(type);
    setImage(url);
  };

  useEffect(() => {
    let timer = setInterval(() => {
         // setCounter(counter => counter + 1);
         console.log("runing")
       }, 1000);

       return () => clearInterval(timer)
 })

  const editManager = async () => {
    if(!search) {
        return Alert.alert("Please enter title")
    }
    let imageData : any = null
    if (image) {
      const result = await RNFS.readFile(image, 'base64');
      imageData = result;
    }
    realm.write(() => {
      data.title = search;
      data.data = imageData ? imageData : data.data
    });
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.screen, {padding: 15}]}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>

        <View style={{height: 30}} />

        <TouchableOpacity onPress={convertImageToBinaryData}>
          <Text>update Image</Text>
        </TouchableOpacity>
        <View style={{height: 10}} />
        {image ? (
          <Image source={{uri: image}} style={{height: 200, width: 200}} />
        ) : (
          <Image
            source={{uri: `data:${data.mime};base64,${data.data}`}}
            style={{height: 200, width: 200}}
          />
        )}
        <View style={{height: 10}} />
        <TextInput
          placeholder="Type your note..."
          placeholderTextColor={'black'}
          onChangeText={setSearch}
          value={search}
        />
        <View style={{height: 30}} />
        <TouchableOpacity onPress={editManager} style={{alignSelf: 'center'}}>
          <Text>SAVE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Edit;
