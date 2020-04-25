import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import phrases from '../../assets/phrases.json';
import Countdown from '../countdown'

const TirageScreen = (props) => {

  const handleDrink = (playerIndex, gorgees) => {
    addGorgees(playerIndex, gorgees)
    props.addCurrentRound()
  }

  const addGorgees = (playerIndex, gorgees) => {
    let playersTmp = props.players
    playersTmp[playerIndex].drinks += gorgees
    props.setPlayers(playersTmp)
  }

  // console.log('TIRAGE props', props);
  let activePlayers = props.players.filter(item => item.name)
  let rdmPlayerNumber = Math.floor(Math.random() * activePlayers.length);
  let selectedPlayer = activePlayers[rdmPlayerNumber]

  let rdmPhraseNumber = Math.floor(Math.random() * phrases.length);
  let selectedPhrase = phrases[rdmPhraseNumber]

  const gorgees = [0.5,1,1.5,2,2.5,3]
  let rdmGorgeesNumber = Math.floor(Math.random() * 6);
  let selectedGorgees = gorgees[rdmGorgeesNumber]

  // coeff : 
  // classique : xx%
  // jeu-solo: xx%
  // jeu-multi: xx%
  // pot-add: xx%
  // pot-drink: xx%

  switch (selectedPhrase.type) {
    case 'classique': null //
    break;
    case 'jeu-solo': null //
    break;
    case 'jeu-multi': null //
    break;
    case 'pot-add': props.setPot(selectedGorgees) //
    break;
    case 'pot-drink': props.setPot(0) //
    break;
}

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftMenu} clickable={true} onPress={() => props.navigation.navigate('Setup')}>
        <Image style={styles.menuIcons} source={require('../../assets/setup.jpg')} />
        <Text style={styles.menuTitle}>Joueurs/Alcools</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightMenu} onPress={() => props.navigation.navigate('Finish')}>
        <Image style={styles.menuIcons} source={require('../../assets/finish.jpg')} />
        <Text style={styles.menuTitle}>Terminer la partie</Text>
      </TouchableOpacity>
      <View style={styles.centralTirage}>
        <Text style={styles.tirageText}>{selectedPhrase.type === "classique" || selectedPhrase.type === "pot" || selectedPhrase.type === "jeu-solo" ?  selectedPlayer.name : null} {selectedPhrase.text1} {selectedGorgees} {selectedGorgees > 1 ? "gorgées" : 'gorgée'} de {props.alcools[0].name}</Text>
        {selectedPhrase.type === "classique" || selectedPhrase.type === "pot" ?
        <>
            <Countdown selectedGorgees={selectedGorgees} />
            <Button title="C'est bu !" titleStyle={styles.buttonBigTitle} onPress={() => handleDrink(rdmPlayerNumber, selectedGorgees)} />
        </>
        :
        <View style={styles.multiTirage}>
            {activePlayers.map((item, i) => <Button containerStyle={styles.button} titleStyle={styles.buttonSmallTitle} buttonStyle={{backgroundColor: 'green'}} key={i} title={item.name} type="outline" onPress={() => handleDrink(i, selectedGorgees)} />)}
        </View>
        }
      </View>
      <View style={styles.stats}>
        <Text style={styles.roundText}>Tirage {props.currentRound}/{props.rounds}</Text>
        <Text style={styles.roundText}>Pot {props.pot}</Text>
      </View>
    </View>
  );
}

export default TirageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  scrollview: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  leftMenu: {
    position: 'absolute',
    left: 10,
    top: 40,
    flex: 1,
    alignItems: 'center',
  },
  rightMenu: {
    position: 'absolute',
    right: 10,
    top: 40,
    flex: 1,
    alignItems: 'center',
  },
  menuIcons: {
    width: 80, 
    height: 50
  },
  menuTitle: {
    fontSize: 20,
  },
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
  },
  buttonBigTitle: {
    fontSize: 20, 
    paddingLeft: 10,
    paddingRight: 10
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  roundText: {
    fontSize: 20,
  }
});
