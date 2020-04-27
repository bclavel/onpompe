import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

const TirageSolo = (props) => {
  // console.log('SOLO props', props);

  let possiblePlayers = props.activePlayers.filter(item => item.name !== props.selectedPlayer.name)

  const drinkSolo = (player) => {
    props.activePlayers.forEach((item, i) => {
      if (player.name === item.name) props.handleDrinkSolo(i, props.gorgees)
    })
  }

  return (
    <View style={styles.centralTirage}>
      <Text style={styles.tirageText}>{props.selectedPlayer.name} {props.phrase.text1} {props.gorgees} {props.gorgees > 1 ? "gorgées" : 'gorgée'} de {props.alcool.name}</Text>
      <View style={styles.multiTirage}>
          {possiblePlayers.map((item, i) => <Button containerStyle={styles.button} titleStyle={styles.buttonSmallTitle} buttonStyle={{backgroundColor: 'green'}} key={i} title={item.name} type="outline" onPress={(item) => drinkSolo(item)} />)}
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
    fontSize: 30,
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
