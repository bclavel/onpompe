import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

const TirageAddPot = (props) => {
  // console.log('ADDPOT props', props);

  const addPot = () => {
      let newPot = props.pot
      newPot += props.gorgees
      props.setPot(newPot)
  }

  return (
    <View style={styles.centralTirage}>
      <Text style={styles.tirageText}>{props.selectedPlayer.name} {props.phrase.text1} {props.gorgees} {props.gorgees > 1 ? "gorgées" : 'gorgée'} de {props.alcool.name} {props.phrase.text2}</Text>
      <Button title="C'est fait !" containerStyle={styles.bigButton} titleStyle={styles.buttonBigTitle} onPress={() => addPot()} />
    </View>
  );
}

export default TirageAddPot

const styles = StyleSheet.create({
  centralTirage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tirageText: {
    width: '80%',
    fontSize: 30,
    textAlign: 'center'
  },
  buttonBigTitle: {
    fontSize: 20, 
    paddingLeft: 10,
    paddingRight: 10
  },
  bigButton: {
    marginTop: 20
  },
});
