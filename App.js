import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = async () => {
  return await Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }
  
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = 
    <GameScreen 
      userChoice={userNumber}
      onGameOver={gameOverHandler}
    />
  } else if (guessRounds > 0) {
    content = 
    <GameOverScreen 
      userNumber={userNumber}
      roundNumbers={guessRounds}
      onRestart={configureNewGameHandler}
    />
  }

  return (
    <SafeAreaView style={styles.screen}>
      {/* <StatusBar style="auto" /> */}
      <Header title="Guess a Number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
