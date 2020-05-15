import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import TirageContext from '../../context/tirageContext';
import GameContext from '../../context/gameContext';

const TirageMulti = props => {
  // console.log('MULTI props', props);

  const tirageContext = useContext(TirageContext)
  const { gorgees, alcool, phrase } = tirageContext

  const gameContext = useContext(GameContext)
  const { activePlayers } = gameContext

  let initialPlayers = [...activePlayers]

  const [playerz, setPlayerz] = useState(initialPlayers)
  const [selectedPlayers, setSelectedPlayers] = useState([])

  const [errorMsg, setErrorMsg] = useState(null);

  // On component render, resets all players selected property
  useEffect(() => {
    let playersTmp = [...playerz]
     playersTmp.forEach(item => item.selected = false)
     setPlayerz(playersTmp)
  }, [])

  // When a player is selected, updates the selected players list
  useEffect(() => {
    let playersTmp = playerz.filter(item => item.selected === true)
    setSelectedPlayers(playersTmp)
  }, [playerz])

  // On click of player button, updates the selected property in players list
  const handleSelectPlayer = (index, selected) => {
    let playersTmp = [...playerz]
    playersTmp[index].selected = !selected
    setPlayerz(playersTmp)
  }

  // On submit, sends to Tirage the list of selected players to drink
  const handleSubmit = () => {
    if (selectedPlayers.length < 1) {
      setErrorMsg('Veuillez sélectionner au moins un joueur')
    } else {
      setSelectedPlayers([])
      // delete selectedPlayers.selected
      props.handleDrinkMulti(selectedPlayers)
    }
  }

  // console.log('MULTI players', players);

  return (
    <View style={styles.centralTirage}>
      <Text style={styles.tirageText}>{phrase.text1} {gorgees} {gorgees > 1 ? "gorgées" : 'gorgée'} {alcool ? "de " + alcool.name : "de son verre"}</Text>
      <View style={styles.multiTirage}>
          {playerz.map((item, i) => <Button icon={item.selected ? <Icon name="check" size={15} color="white" /> : null} containerStyle={styles.smallButton} titleStyle={styles.buttonSmallTitle} buttonStyle={{backgroundColor: 'green'}} key={i} title={item.name} type="outline" onPress={() => handleSelectPlayer(i, item.selected)} />)}
      </View>
      <Text style={{display: errorMsg ? 'flex' : 'none', color: 'red', marginTop: 10}}>{errorMsg}</Text>
      <Button title="Valider" containerStyle={styles.bigButton} titleStyle={styles.buttonBigTitle} onPress={() => handleSubmit()} />
    </View>
  );
}

export default TirageMulti

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
  smallButton: {
    marginRight: 10,
    marginBottom: 10
  },
  bigButton: {
    marginTop: 20
  },
  buttonSmallTitle: {
    fontSize: 16, 
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonBigTitle: {
    fontSize: 20, 
    paddingLeft: 10,
    paddingRight: 10
  }
});
