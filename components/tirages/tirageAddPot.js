import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PotContext from '../../context/potContext';
import TirageContext from '../../context/tirageContext';

const TirageAddPot = props => {
  // console.log('ADDPOT props', props);

  const tirageContext = useContext(TirageContext)
  const { selectedPlayer, phrase, alcool, gorgees } = tirageContext

  const potContext = useContext(PotContext)
  const { pot, setPot } = potContext

  const addPot = () => {
      let newPot = pot
      newPot += gorgees
      setPot(newPot)
  }

  return (
    <View style={styles.centralTirage}>
      <Text style={styles.tirageText}>{selectedPlayer.name} {phrase.text1} {gorgees} {gorgees > 1 ? "gorgées" : 'gorgée'} {alcool ? "de " + alcool.name : "de ton verre"} {phrase.text2}</Text>
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
    fontSize: 36,
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
