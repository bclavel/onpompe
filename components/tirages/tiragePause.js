import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Countdown from '../other/countdown'
import TirageContext from '../../context/tirageContext';

const TiragePause = props => {
  // console.log('PAUSE props', props);

  const tirageContext = useContext(TirageContext)
  const { phrase } = tirageContext

  return (
    <View style={styles.centralTirage}>
        <Text style={styles.tirageText}>{phrase.text1}</Text>
        <Countdown gorgees={3} handleTimeUp={props.handleTimeUp} />
        <Button title="Passer" titleStyle={styles.buttonBigTitle} onPress={() => props.handleSkip()} />
    </View>
  );
}

export default TiragePause

const styles = StyleSheet.create({
  centralTirage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBigTitle: {
    fontSize: 20, 
    paddingLeft: 10,
    paddingRight: 10
  },
  tirageText: {
    width: '80%',
    fontSize: 36,
    textAlign: 'center'
  }
});
