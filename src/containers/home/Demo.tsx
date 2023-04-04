import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const count = () => {
  console.log('Call');
  let sum = 0;
  for (let i = 0; i < 1000; i++) {
    sum = sum + i;
  }
  return sum;
};

const Demo = (props: any) => {
  // useCallback  // memo (it does not trigger function, triggers manually)
  // useMemo   // memo (it trigger the function)

  const [mode, setMode] = useState(false);

  // numbers and string compare via value
  let a = {name: '10'};
  // array, function and objects compare by reference
  const add = useCallback(() => {
    console.log('Add Function');
  }, []);

  // let countNumber = count()

  // useEffect(() => {
  //     console.log("a variable recreated")
  // }, [a])

  useEffect(() => {
    console.log('Function recreated');
  }, [add]);

  return (
    // console.log("MAIN METHOD RENDERING"),
    <SafeAreaView style={styles.screen}>
      <View style={[styles.screen, {padding: 40}]}>
        <TouchableOpacity
          style={{marginTop: 30}}
          onPress={() => setMode(pre => !pre)}>
          <Text>
            {mode ? 'true' : 'false'} {'Count'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 30}} onPress={add}>
          <Text> {'Call Add'}</Text>
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

export default Demo;
