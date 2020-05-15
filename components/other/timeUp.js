import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Countdown from '../other/countdown'
import TirageContext from '../../context/tirageContext';


const TimeUp = props => {
  // console.log('TIMEUP props', props);

  const tirageContext = useContext(TirageContext)
  const { selectedPlayer, gorgees, alcool } = tirageContext

  const handleDrinkTimeUp = () => {
    props.handleTimeUp(false)
    props.handleDrinkTimeUp(selectedPlayer)
  }

  return (
    <View style={styles.centralTimeUp}>
      <Text style={styles.tirageText}>{selectedPlayer.name} Trop tard !! tu dois boire {gorgees} {gorgees > 1 ? "gorgées" : 'gorgée'} {alcool ? "de " + alcool.name : "de ton verre"} </Text>
      <Button title="C'est bu !" titleStyle={styles.buttonBigTitle} onPress={() => handleDrinkTimeUp()} />
    </View>
  );
}

export default TimeUp

const styles = StyleSheet.create({
    centralTimeUp: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightpink',
    zIndex: 2,
    width: '80%'
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
