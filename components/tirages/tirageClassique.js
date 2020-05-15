import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Countdown from '../other/countdown'
import TirageContext from '../../context/tirageContext'

const TirageClassique = props => {
  // console.log('CLASSIQUE props', props);

  const tirageContext = useContext(TirageContext)
  const { selectedPlayer, gorgees, alcool, phrase, timeUp } = tirageContext

  const handleDrinkClassique = () => {
    if (timeUp) {
      props.handleTimeUp(false)
    }
    props.handleDrinkSolo(selectedPlayer)
  }

  return (
    <View style={styles.centralTirage}>
      <Text style={styles.tirageText}>{selectedPlayer.name} {phrase.text1} {gorgees} {gorgees > 1 ? "gorgées" : 'gorgée'} {alcool ? "de " + alcool.name : "de ton verre"} </Text>
      <Countdown gorgees={gorgees} handleTimeUp={props.handleTimeUp}/>
      <Button title="C'est bu !" titleStyle={styles.buttonBigTitle} onPress={() => handleDrinkClassique()} />
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
