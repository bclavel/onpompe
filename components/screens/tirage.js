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

  let initialTirage = {
    type: null, 
    phrase: null, 
    gorgees: null, 
    alcool: null
  }

  const [timeUp, setTimeUp] = useState(false)

  const handleDrinkSolo = (playerIndex, gorgees) => {
    addGorgees(playerIndex, gorgees)
    props.addCurrentRound()
  }

  const handleDrinkMulti = (players, gorgees) => {
    props.activePlayers.forEach((item, i) => {
      for (let j=0; j<players.length;j++) {
        if (item.id === players[j].id) {
          addGorgees(i, gorgees)
        }
      }
    })
    props.addCurrentRound()
  }

  const handleTimeUp = () => {
    setTimeUp(true)
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
  let rdmPlayerNumber = Math.floor(Math.random() * ratioPlayers.length);
  let selectedPlayer = ratioPlayers[rdmPlayerNumber]
  let selectedPlayerIndex = props.activePlayers.indexOf(selectedPlayer)
  
  // Select random alcool
  let rdmAlcoolNumber = Math.floor(Math.random() * props.activeAlcools.length);
  initialTirage.alcool = props.activeAlcools[rdmAlcoolNumber]

  // Select random gorgees
  const gorgeesList = [0.5,1,1.5,2,2.5,3]
  let rdmGorgeesNumber = Math.floor(Math.random() * 6);
  initialTirage.gorgees = gorgeesList[rdmGorgeesNumber]

  // Select tirage type
  if (timeUp) {
    console.log('TIRAGE times up fdp !');
    initialTirage.type = 'time-up'
    initialTirage.gorgees = 3
    setTimeUp(false)
  } else {
    let rdmTirageNbr = Math.floor(Math.random() * 68);
    if (rdmTirageNbr <= 29) initialTirage.type = 'classique'
    else if (rdmTirageNbr >= 30 && rdmTirageNbr <= 44 && props.activePlayers.length <= 2) initialTirage.type = 'classique'
    else if (rdmTirageNbr >= 30 && rdmTirageNbr <= 44 && props.activePlayers.length > 2) initialTirage.type = 'jeu-solo'
    else if (rdmTirageNbr >= 45 && rdmTirageNbr <= 59) initialTirage.type = 'jeu-multi'
    else if (rdmTirageNbr >= 60 && rdmTirageNbr <= 64) initialTirage.type = 'pot-add'
    else if (props.pot === 0 && rdmTirageNbr === 65) initialTirage.type = 'pot-add'
    else if (props.pot != 0 && rdmTirageNbr === 65) initialTirage.type = 'pot-drink'
    else if (rdmTirageNbr >= 66) initialTirage.type = 'pause'
    else console.log('error, no type set >> rdmTirageNbr + props.activePlayers', rdmTirageNbr, props.activePlayers.length)
  }

  // Select phrase from tirage type
  let phrasesType = []
  phrasesList.forEach(item => {
    if (item.type === initialTirage.type) {
      phrasesType.push(item)
    }
  })
  let rdmPhraseNbr = Math.floor(Math.random() * phrasesType.length);
  initialTirage.phrase = phrasesType[rdmPhraseNbr]
  
  // Define component based on tirage type
  let component
  if (initialTirage.type === 'classique') component = <Classique selectedPlayer={selectedPlayer} selectedPlayerIndex={selectedPlayerIndex} alcool={initialTirage.alcool} gorgees={initialTirage.gorgees} phrase={initialTirage.phrase} handleDrinkSolo={handleDrinkSolo} handleTimeUp={handleTimeUp} />
  else if (initialTirage.type === 'jeu-solo') component = <Solo activePlayers={props.activePlayers} selectedPlayer={selectedPlayer} selectedPlayerIndex={selectedPlayerIndex} alcool={initialTirage.alcool} gorgees={initialTirage.gorgees} phrase={initialTirage.phrase} handleDrinkSolo={handleDrinkSolo} />
  else if (initialTirage.type === 'jeu-multi') component = <Multi activePlayers={props.activePlayers} alcool={initialTirage.alcool} gorgees={initialTirage.gorgees} phrase={initialTirage.phrase} handleDrinkMulti={handleDrinkMulti} />
  else if (initialTirage.type === 'pot-add') component = <AddPot selectedPlayer={selectedPlayer} alcool={initialTirage.alcool} gorgees={initialTirage.gorgees} phrase={initialTirage.phrase} pot={props.pot} setPot={props.setPot} handleDrinkMulti={handleDrinkMulti} />
  else if (initialTirage.type === 'pot-drink') component = <DrinkPot selectedPlayer={selectedPlayer} phrase={initialTirage.phrase} pot={props.pot} setPot={props.setPot} handleDrinkMulti={handleDrinkMulti} />
  else if (initialTirage.type === 'pause') component = <Pause phrase={initialTirage.phrase} phrase={initialTirage.phrase} handleSkip={handleSkip} />

  const [tirage, setTirage] = useState(initialTirage)

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
    alignItems: 'center'
  },
  rightMenu: {
    position: 'absolute',
    right: 10,
    top: 40,
    flex: 1,
    alignItems: 'center'
  },
  menuIcons: {
    width: 80, 
    height: 50
  },
  menuTitle: {
    fontSize: 20
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
