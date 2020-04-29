import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Countdown from '../other/countdown'

const TirageClassique = (props) => {
  // console.log('CLASSIQUE props', props);

  return (
    <View style={styles.centralTirage}>
      <Text style={styles.tirageText}>{props.selectedPlayer.name} {props.phrase.text1} {props.gorgees} {props.gorgees > 1 ? "gorgées" : 'gorgée'} {props.alcool ? "de " + props.alcool.name : "de ton verre"} </Text>
      <Countdown gorgees={props.gorgees} handleTimeUp={props.handleTimeUp}/>
      <Button title="C'est bu !" titleStyle={styles.buttonBigTitle} onPress={() => props.handleDrinkSolo(props.selectedPlayer)} />
    </View>
  );
}

export default TirageClassique

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
