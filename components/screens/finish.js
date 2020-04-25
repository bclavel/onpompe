import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import { Button } from 'react-native-elements';

const FinishScreen = (props) => {

  const handleFinishGame = () => {
    props.setCurrentRound(1)
    props.resetDrintCount()
    props.navigation.navigate('Setup')
  }

  // console.log('FINISH props', props);
  let finalPlayers = props.players.filter(item => item.name).sort((a,b) => a.drinks < b.drinks)

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Classement final!</Text>
        {finalPlayers.map((item,i) => (
          <Text key={i} style={styles.finalText}>{i+1}. {item.name} - {item.drinks} gorgées</Text>
        ))}
      <Button title="Nouvelle partie !" containerStyle={styles.button} titleStyle={styles.buttonTitle} onPress={() => handleFinishGame()} />
    </View>
  );
}

export default FinishScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  finalText: {
    width: '80%',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10
  },
  button: {
    marginTop: 40, 
    marginBottom: 20
  },
  buttonTitle: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10
  }
});
