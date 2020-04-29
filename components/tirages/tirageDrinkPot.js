import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Countdown from '../other/countdown'

const TirageDrinkPot = (props) => {
  // console.log('DRINK POT props', props);

  const handleDrinkPot = () => {
    props.handleDrinkSolo(props.selectedPlayer)
    props.setPot(0)
  }

  return (
    <View style={styles.centralTirage}>
      <Text style={styles.tirageText}>{props.selectedPlayer.name} {props.phrase.text1} {props.pot} {props.phrase.text2}</Text>
      <Countdown gorgees={'pot'} handleTimeUp={props.handleTimeUp}/>
      <Button title="C'est bu !" titleStyle={styles.buttonBigTitle} onPress={() => handleDrinkPot()} />
    </View>
  );
}

export default TirageDrinkPot

const styles = StyleSheet.create({
  centralTirage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tirageText: {
    width: '80%',
    fontSize: 36,
    textAlign: 'center'
  },
  buttonBigTitle: {
    fontSize: 20, 
    paddingLeft: 10,
    paddingRight: 10
  },
});
