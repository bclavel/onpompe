import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import Classique from '../tirages/tirageClassique'
import Solo from '../tirages/tirageSolo'
import Multi from '../tirages/tirageMulti'
import Pause from '../tirages/tiragePause'
import AddPot from '../tirages/tirageAddPot'
import DrinkPot from '../tirages/tirageDrinkPot'
import TimeUp from '../other/timeUp'
import TirageContext from '../../context/tirageContext'
import GameContext from '../../context/gameContext'
import PotContext from '../../context/potContext'


const TirageScreen = (props) => {
  // console.log('TIRAGE props', props);
  
  // todo : s'assurer que le pot soit vide avant la fin de partie
  // todo : finir de gérer le moment où le timer tombe à 0
  // todo : gérer le cas de la pause dans le tableau des tirages
  // todo : gérer le cas de pot-add dans le tableau des tirages
  // todo / ! \ : après un tirage solo & multi, il faut un tirage pour permettre aux joueurs de boire !!!
  // todo : gérer la condition potOption dans le tirage
  // todo : fixer la pause avec le nouveau système

  const tirageContext = useContext(TirageContext)
  const { tirage, setTirage, addTirage, tirages, type, round } = tirageContext

  // console.log('TIRAGE tirage type', type);

  const gameContext = useContext(GameContext)
  const { activePlayers, alcoolOption, activeAlcools, potOption, rounds } = gameContext

  const potContext = useContext(PotContext)
  const { pot } = potContext

  const [timeUp, setTimeUp] = useState(false)

  useEffect(() => {
    setTirage(activePlayers, alcoolOption, activeAlcools, potOption)
  }, [])

  const handleDrinkSolo = (player) => {
    let drinkPlayers = []
    drinkPlayers.push(player)
    addTirage(drinkPlayers)
    setTirage(activePlayers, alcoolOption, activeAlcools, potOption)
  }

  const handleDrinkMulti = (players) => {
    addTirage(players)
    setTirage(activePlayers, alcoolOption, activeAlcools, potOption)
  }

  const handleDrinkTimeUp = (player) => {
    let tirageTmp = {...tirage}
    tirageTmp.type = 'time-up'
    tirageTmp.phrase = 'penalty'
    setTirage(tirageTmp)

    let drinkPlayers = []
    drinkPlayers.push(player)
    addTirage(drinkPlayers)
  }

  const handleTimeUp = (bool) => {
    setTimeUp(bool)
  }

  const handleSkip = () => {
    let tirageTmp = {...tirage}
    tirageTmp.gorgees = 0
    tirageTmp.alcool = null
    setTirage(tirageTmp)
    addTirage(null)
  }

  let component

  if (type === 'classique' || type === 'time-up' ) component = <Classique handleDrinkSolo={handleDrinkSolo} handleTimeUp={handleTimeUp} />
  else if (type === 'jeu-solo') component = <Solo activePlayers={props.activePlayers} handleDrinkSolo={handleDrinkSolo} />
  else if (type === 'jeu-multi') component = <Multi activePlayers={props.activePlayers} handleDrinkMulti={handleDrinkMulti} />
  else if (type === 'pot-add') component = <AddPot handleDrinkMulti={handleDrinkMulti} />
  else if (type === 'pot-drink') component = <DrinkPot handleDrinkSolo={handleDrinkSolo} handleTimeUp={handleTimeUp} />
  else if (type === 'pause') component = <Pause handleSkip={handleSkip} handleTimeUp={handleTimeUp} />


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
      {timeUp && <TimeUp handleDrinkTimeUp={handleDrinkTimeUp} handleTimeUp={handleTimeUp} />}
      <View style={styles.stats}>
        <Text style={styles.statsText}>Tirage {round}/{rounds}</Text>
        {potOption && <Text style={styles.statsText}>Taille du pot : {pot}</Text>}
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
