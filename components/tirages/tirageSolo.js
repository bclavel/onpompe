import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import TirageContext from '../../context/tirageContext'
import GameContext from '../../context/gameContext'


const TirageSolo = props => {
  // console.log('SOLO props', props);

  const tirageContext = useContext(TirageContext)
  const { selectedPlayer, gorgees, alcool, phrase } = tirageContext

  const gameContext = useContext(GameContext)
  const { activePlayers } = gameContext

  let possiblePlayers = activePlayers.filter(item => item.id !== selectedPlayer.id)

  const drinkSolo = (player) => {
    activePlayers.forEach((item, i) => {
      if (player.id === item.id) props.handleDrinkSolo(player)
    })
  }

  return (
    <View style={styles.centralTirage}>
      <Text style={styles.tirageText}>{selectedPlayer.name} {phrase.text1} {gorgees} {gorgees > 1 ? "gorgées" : 'gorgée'} {alcool ? "de " + alcool.name : "de ton verre"}</Text>
      <View style={styles.multiTirage}>
          {possiblePlayers.map(item => <Button containerStyle={styles.button} titleStyle={styles.buttonSmallTitle} buttonStyle={{backgroundColor: 'green'}} key={item.id} title={item.name} type="outline" onPress={() => drinkSolo(item)} />)}
      </View>
    </View>
  );
}

export default TirageSolo

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
  multiTirage: {
    flexWrap: "wrap",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  button: {
    marginRight: 10,
    marginBottom: 10
  },
  buttonSmallTitle: {
    fontSize: 16, 
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10
  }
});
