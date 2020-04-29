import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import phrasesList from '../../assets/phrases.json';
import Classique from '../tirages/tirageClassique'
import Solo from '../tirages/tirageSolo'
import Multi from '../tirages/tirageMulti'
import Pause from '../tirages/tiragePause'
import AddPot from '../tirages/tirageAddPot'
import DrinkPot from '../tirages/tirageDrinkPot'

const TirageScreen = (props) => {
  // console.log('TIRAGE props', props);
  
  // todo : s'assurer que le pot soit vide avant la fin de partie
  // todo : finir de gérer le moment où le timer tombe à 0
  // todo : gérer le cas de la pause dans le tableau des tirages

  let tirage

  // let tirage = {
  //   type: null, 
  //   phrase: null, 
  //   gorgees: null, 
  //   alcool: null
  // }

  // addTirage = (player, gorgees, alcool, type, phrase, isPot)


  const [timeUp, setTimeUp] = useState(false)
  // let timeUp = false

  const handleDrinkSolo = (player) => {
    addGorgees(selectedPlayerIndex, tirage.gorgees)
    let drinkPlayers = []
    drinkPlayers.push(player)
    props.addTirage(drinkPlayers, tirage.gorgees, tirage.alcool, tirage.type, tirage.phrase)
  }

  const handleDrinkMulti = (players) => {
    props.activePlayers.forEach((item, i) => {
      for (let j=0; j<players.length;j++) {
        if (item.id === players[j].id) {
          addGorgees(i, tirage.gorgees)
        }
      }
    })
    props.addTirage(players, tirage.gorgees, tirage.alcool, tirage.type, tirage.phrase)
  }

  const handleTimeUp = () => {
    setTimeUp(true)
    // timeUp = true
    // props.addCurrentRound()
  }

  const handleSkip = () => {
    props.addCurrentRound()
  }

  // Add total gorgées to player
  const addGorgees = (playerIndex, gorgees) => {
    let playersTmp = props.activePlayers
    playersTmp[playerIndex].drinks += gorgees
    props.setPlayers(playersTmp)
  }

  // Players list with bonus ratio
  let ratioPlayers = []  
  props.activePlayers.forEach(item => {
    let playerRatio = item.bonus*2
    for (let i = 0; i < playerRatio; i++) {
      ratioPlayers.push(item)
    }
  })

  // Select random player
  let selectedPlayer, selectedPlayerIndex
  if (!timeUp) {
    let rdmPlayerNumber = Math.floor(Math.random() * ratioPlayers.length);
    selectedPlayer = ratioPlayers[rdmPlayerNumber]
    selectedPlayerIndex = props.activePlayers.indexOf(selectedPlayer)
  } else {
    selectedPlayer = tirage.selectedPlayer
    selectedPlayerIndex = tirage.selectedPlayerIndex
    console.log('else timeup ! selectedPlayer >>', selectedPlayer);
    
  }
  
  // Select random alcool
  if (props.alcoolOption) {
    let rdmAlcoolNumber = Math.floor(Math.random() * props.activeAlcools.length);
    tirage.alcool = props.activeAlcools[rdmAlcoolNumber]
  }

  // Select random gorgees
  const gorgeesList = [1,2,3,4]
  if (!timeUp) {
    let rdmGorgeesNumber = Math.floor(Math.random() * 4);
    tirage.gorgees = gorgeesList[rdmGorgeesNumber]
  } else {
    tirage.gorgees = 4
  }

  // Select tirage type
  if (timeUp) {
    tirage.type = 'time-up'
  } else {
    let rdmTirageNbr = Math.floor(Math.random() * 67);
    if (rdmTirageNbr <= 29) tirage.type = 'classique'
    else if (rdmTirageNbr >= 30 && rdmTirageNbr <= 44 && props.activePlayers.length <= 2) tirage.type = 'classique'
    else if (rdmTirageNbr >= 30 && rdmTirageNbr <= 44 && props.activePlayers.length > 2) tirage.type = 'jeu-solo'
    else if (rdmTirageNbr >= 45 && rdmTirageNbr <= 59) tirage.type = 'jeu-multi'
    else if (rdmTirageNbr >= 60 && rdmTirageNbr <= 64) tirage.type = 'pot-add'
    else if (props.pot === 0 && rdmTirageNbr === 65) tirage.type = 'pot-add'
    else if (props.pot !== 0 && rdmTirageNbr === 65) {
      tirage.type = 'pot-drink'
      tirage.alcool = {name: 'pot', value: 0}
    }
    else if (rdmTirageNbr >= 66) tirage.type = 'pause'
    else console.log('error, no type set >> rdmTirageNbr + props.activePlayers', rdmTirageNbr, props.activePlayers.length)
  }

  // Select phrase from tirage type
  let phrasesType = []
  phrasesList.forEach(item => {
    if (item.type === tirage.type) {
      phrasesType.push(item)
    }
  })
  let rdmPhraseNbr = Math.floor(Math.random() * phrasesType.length);
  tirage.phrase = phrasesType[rdmPhraseNbr]
  
  // Define component based on tirage type
  let component
  if (tirage.type === 'classique' || tirage.type === 'time-up' ) component = <Classique selectedPlayer={selectedPlayer} selectedPlayerIndex={selectedPlayerIndex} alcool={tirage.alcool} gorgees={tirage.gorgees} phrase={tirage.phrase} handleDrinkSolo={handleDrinkSolo} handleTimeUp={handleTimeUp} />
  else if (tirage.type === 'jeu-solo') component = <Solo activePlayers={props.activePlayers} selectedPlayer={selectedPlayer} selectedPlayerIndex={selectedPlayerIndex} alcool={tirage.alcool} gorgees={tirage.gorgees} phrase={tirage.phrase} handleDrinkSolo={handleDrinkSolo} />
  else if (tirage.type === 'jeu-multi') component = <Multi activePlayers={props.activePlayers} alcool={tirage.alcool} gorgees={tirage.gorgees} phrase={tirage.phrase} handleDrinkMulti={handleDrinkMulti} />
  else if (tirage.type === 'pot-add') component = <AddPot selectedPlayer={selectedPlayer} alcool={tirage.alcool} gorgees={tirage.gorgees} phrase={tirage.phrase} pot={props.pot} setPot={props.setPot} handleDrinkMulti={handleDrinkMulti} />
  else if (tirage.type === 'pot-drink') component = <DrinkPot selectedPlayer={selectedPlayer} selectedPlayerIndex={selectedPlayerIndex} phrase={tirage.phrase} pot={props.pot} setPot={props.setPot} handleDrinkSolo={handleDrinkSolo} handleTimeUp={handleTimeUp} />
  else if (tirage.type === 'pause') component = <Pause phrase={tirage.phrase} phrase={tirage.phrase} handleSkip={handleSkip} handleTimeUp={handleTimeUp} />

  // const [tirage, setTirage] = useState(tirage)
  console.log("TIRAGE tirage", tirage);

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
      {component}
      <View style={styles.stats}>
        <Text style={styles.statsText}>Tirage {props.currentRound}/{props.rounds}</Text>
        <Text style={styles.statsText}>Taille du pot : {props.pot}</Text>
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
    justifyContent: 'center'
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
    width: 50, 
    height: 50,
  },
  menuTitle: {
    fontSize: 18
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20
  },
  statsText: {
    fontSize: 18
  }
});
