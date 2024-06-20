import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
//import { Image } from 'expo-image';
import { Audio } from 'expo-av';
import { Accelerometer } from 'expo-sensors';

import dice1 from './assets/dice_1.png';
import dice2 from './assets/dice_2.png';
import dice3 from './assets/dice_3.png';
import dice4 from './assets/dice_4.png';
import dice5 from './assets/dice_5.png';
import dice6 from './assets/dice_6.png';



export default function App() {
  const [dice, setDice] = useState(1);
  const [sound, setSound] = useState(null);
  const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0


  useEffect(() => {
    loadSound();
  }, []);



  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(require('./assets/level-up-2-199574.mp3'));
    setSound(sound);
  }

  async function playSound() {
    await sound.replayAsync();
  }

  // function throwDice() {
  //   const newDiceValue = Math.floor(Math.random() * 6) + 1;
  //   playSound();
  //   setDice(newDiceValue);
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // }

  function throwDice() {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      const newDiceValue = Math.floor(Math.random() * 6) + 1;
      playSound();
      setDice(newDiceValue);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Roll the Dice!</Text>
      <Text>Hit the button to roll the dice!</Text>
      <Animated.Image source={diceImages[dice - 1]} style={{ ...styles.image, opacity: fadeAnim }} />
      <Button title="Roll Dice" onPress={throwDice} />
      <Text>{dice}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',

  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});
