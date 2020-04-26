import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const TirageMulti = (props) => {
  // console.log('MULTI props', props);

  // todo : gérer le cas où plusieurs multi sont tirés de suite, on doit décocher les selectedPlayers
  // todo : gérer l'obligation de sélectionner au moins 1 player pour valider

  const [players, setPlayers] = useState([...props.activePlayers])
  const [selectedPlayers, setSelectedPlayers] = useState([])

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

  return (
      <>
        <View style={styles.multiTirage}>
            {players.map((item, i) => <Button icon={item.selected ? <Icon name="check" size={15} color="white" /> : null}containerStyle={styles.smallButton} titleStyle={styles.buttonSmallTitle} buttonStyle={{backgroundColor: 'green'}} key={i} title={item.name} type="outline" onPress={() => handleSelectPlayer(i, item.selected)} />)}
        </View>
        <Button title="Valider" containerStyle={styles.bigButton} titleStyle={styles.buttonBigTitle} onPress={() => props.handleDrinkMulti(selectedPlayers, props.selectedGorgees)} />
      </>
  );
}

export default TirageMulti

const styles = StyleSheet.create({
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
