import React, { useContext } from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import { Button } from 'react-native-elements';
import GameContext from '../../context/gameContext'

const FinishScreen = (props) => {
  // console.log('FINISH props', props);

  const gameContext = useContext(GameContext)
  const { activePlayers, setNewGame } = gameContext

  // todo : ajouter des stats sur les rounds, le total d'alcools bus
  // todo : mettre un mot pour celui qui a bu le pot

  const handleFinishGame = () => {
    setNewGame()
    props.navigation.navigate('Setup')
  }

  const finalPlayers = activePlayers.sort((a,b) => a.drinks < b.drinks)

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
