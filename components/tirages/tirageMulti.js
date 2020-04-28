import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const TirageMulti = (props) => {
  // console.log('MULTI props', props);

  const [players, setPlayers] = useState([...props.activePlayers])
  const [selectedPlayers, setSelectedPlayers] = useState([])

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let playersTmp = [...players]
     playersTmp.forEach(item => item.selected = false)
    setPlayers(playersTmp)
  }, [])

  useEffect(() => {
    let playersTmp = players.filter(item => item.selected === true)
    setSelectedPlayers(playersTmp)
  }, [players])

  const handleSelectPlayer = (index, selected) => {
    let playersTmp = [...players]
    playersTmp[index].selected = !selected
    setPlayers(playersTmp)
  }

  const handleSubmit = () => {
    if (selectedPlayers.length < 1) {
      setErrorMsg('Veuillez sélectionner au moins un joueur')
    } else {
      setSelectedPlayers([])
      props.handleDrinkMulti(selectedPlayers, props.gorgees)
    }
  }

  return (
    <View style={styles.centralTirage}>
      <Text style={styles.tirageText}>{props.phrase.text1} {props.gorgees} {props.gorgees > 1 ? "gorgées" : 'gorgée'} {props.alcool ? "de " + props.alcool.name : "de son verre"}</Text>
      <View style={styles.multiTirage}>
          {players.map((item, i) => <Button icon={item.selected ? <Icon name="check" size={15} color="white" /> : null}containerStyle={styles.smallButton} titleStyle={styles.buttonSmallTitle} buttonStyle={{backgroundColor: 'green'}} key={i} title={item.name} type="outline" onPress={() => handleSelectPlayer(i, item.selected)} />)}
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
