import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import phrases from '../../assets/phrases.json';
import Classique from '../tirageClassique'
import Solo from '../tirageSolo'
import Multi from '../tirageMulti'

const TirageScreen = (props) => {
  // console.log('TIRAGE props', props);
  
  // todo : s'assurer que le pot soit vide avant la fin de partie
  // todo : mettre toutes les phrases du tirage dans le composant sattelite
  // todo : cleaner les styles (supprimer ceux partis dans les composants satellites)
  // todo : créer les composants pot-add, pot-drink & pause

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

  const addGorgees = (playerIndex, gorgees) => {
    let playersTmp = props.activePlayers
    playersTmp[playerIndex].drinks += gorgees
    props.setPlayers(playersTmp)
  }

  let ratioPlayers = []  
  props.activePlayers.forEach(item => {
    let playerRatio = item.bonus*2
    for (let i = 0; i < playerRatio; i++) {
      ratioPlayers.push(item)
    }
  })

  let rdmPlayerNumber = Math.floor(Math.random() * ratioPlayers.length);
  let selectedPlayer = ratioPlayers[rdmPlayerNumber]
  let selectedPlayerIndex = props.activePlayers.indexOf(selectedPlayer)

  let rdmAlcoolNumber = Math.floor(Math.random() * props.activeAlcools.length);
  let selectedAlcool = props.activeAlcools[rdmAlcoolNumber]

  const gorgees = [0.5,1,1.5,2,2.5,3]
  let rdmGorgeesNumber = Math.floor(Math.random() * 6);
  let selectedGorgees = gorgees[rdmGorgeesNumber]

  let tirage = {type: null, phrase: null}
  let rdmTirageNbr = Math.floor(Math.random() * 68);
  if (rdmTirageNbr <= 29) tirage.type = 'classique'
  else if (rdmTirageNbr >= 30 && rdmTirageNbr <= 44) tirage.type = 'jeu-solo'
  else if (rdmTirageNbr >= 45 && rdmTirageNbr <= 59) tirage.type = 'jeu-multi'
  else if (rdmTirageNbr >= 60 && rdmTirageNbr <= 64) tirage.type = 'pot-add'
  else if (props.pot === 0 && rdmTirageNbr === 65) tirage.type = 'pot-add'
  else if (props.pot != 0 && rdmTirageNbr === 65) tirage.type = 'pot-drink'
  else if (rdmTirageNbr >= 66) tirage.type = 'pause'
  else tirage.type = 'error !'

  let phrasesType = []
  phrases.forEach(item => {
    if (item.type === tirage.type) {
      phrasesType.push(item)
    }
  })

  let rdmPhraseNbr = Math.floor(Math.random() * phrasesType.length);
  tirage.phrase = phrasesType[rdmPhraseNbr]

  let component

  switch (tirage.type) {
    case 'classique': 
    component = <Classique selectedGorgees={selectedGorgees} handleDrinkSolo={handleDrinkSolo} selectedPlayerIndex={selectedPlayerIndex} />
    break;
    case 'jeu-solo': 
    component = <Solo activePlayers={props.activePlayers} selectedGorgees={selectedGorgees} handleDrinkSolo={handleDrinkSolo} selectedPlayerIndex={selectedPlayerIndex} />
    break;
    case 'jeu-multi': 
    component = <Multi activePlayers={props.activePlayers} selectedGorgees={selectedGorgees} handleDrinkMulti={handleDrinkMulti} selectedPlayerIndex={selectedPlayerIndex} />
    break;
    case 'pot-add': 
    props.setPot(selectedGorgees)
    break;
    case 'pot-drink': 
    props.setPot(0)
    break;
    case 'pause': 
    null
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
        <Text style={styles.tirageText}>{tirage.type === "classique" || tirage.type === "pot" || tirage.type === "jeu-solo" ?  selectedPlayer.name : null} {tirage.phrase.text1} {selectedGorgees} {selectedGorgees > 1 ? "gorgées" : 'gorgée'} de {selectedAlcool.name}</Text>
        {component}
      </View>
      <View style={styles.stats}>
        <Text style={styles.roundText}>Tirage {props.currentRound}/{props.rounds}</Text>
        <Text style={styles.roundText}>Taille du pot : {props.pot}</Text>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20
  },
  roundText: {
    fontSize: 18,
  }
});
