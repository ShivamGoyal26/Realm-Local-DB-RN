import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <Text>{seconds}</Text>;
};

export default CountdownTimer;
