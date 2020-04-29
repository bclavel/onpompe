import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SetupScreen from './components/screens/setup';
import TirageScreen from './components/screens/tirage';
import FinishScreen from './components/screens/finish';

const Stack = createStackNavigator();

export default function App() {

  let initPlayers = [{
    id: 1,
    name: null,
    bonus: 1,
    drinks: 0
  },{
    id: 2,
    name: null,
    bonus: 1,
    drinks: 0
  },{
    id: 3,
    name: null,
    bonus: 1,
    drinks: 0
  },{
    id: 4,
    name: null,
    bonus: 1,
    drinks: 0
  }]

  let initAlcools = [{
    name: null,
    value: 0
  },{
    name: null,
    value: 0
  },{
    name: null,
    value: 0
  }]

  const [players, setPlayers] = useState([...initPlayers]);
  let activePlayers = players.filter(item => item.name)

  const [alcools, setAlcools] = useState([...initAlcools]);
  let activeAlcools = alcools.filter(item => item.name)

  const [tirages, setTirages] = useState([]);

  const [alcoolOption, setAlcoolOption] = useState(true);
  const [bonusOption, setBonusOption] = useState(true);
  const [potOption, setPotOption] = useState(false);
  const [rounds, setRounds] = useState(100);
  const [currentRound, setCurrentRound] = useState(1);
  const [pot, setPot] = useState(0)

  const handleAddPlayer = () => {
    let playersTmp = [...players]
    playersTmp.push({
        id: players.length + 1,
        name: null,
        bonus: 1,
        drinks: 0
    })
    setPlayers(playersTmp)
  }

  const handleChangePlayerName = (text, index) => {    
    let playersTmp = [...players]
    playersTmp[index].name = text
    setPlayers(playersTmp)
  }

  const handleRemovePlayer = (i) => {
    let playersTmp = [...players]
    playersTmp.splice(i, 1)
    setPlayers(playersTmp)
  }

  const handleAlcoolSelect = () => {
    setAlcoolOption(!alcoolOption)
  }

  const handleAddAlcool = () => {
    let alcoolsTmp = [...alcools]
    alcoolsTmp.push({
      name: null,
      value: 0,
    })
    setAlcools(alcoolsTmp)
  }

  const handleChangeAlcoolName = (text, index) => {
    let alcoolsTmp = [...alcools]
    alcoolsTmp[index].name = text
    setAlcools(alcoolsTmp)
  }

  const handleRemoveAlcool = (i) => {
    let alcoolsTmp = [...alcools]
    alcoolsTmp.splice(i, 1)
    setAlcools(alcoolsTmp)
  }

  const handleBonusSelect = () => {
    setBonusOption(!bonusOption)
  }

  const handleBonusSlide = (value, index) => {
    let playersTmp = [...players]
    playersTmp[index].bonus = value
    setPlayers(playersTmp)
  }

  const handlePotSelect = () => {
    setPotOption(!potOption)
  }

  const handleRoundPick = (value) => {
    setRounds(value)
  }
  
  // const handleAddCurrentRound = () => {
  // }

  const handleResetDrinkCount = () => {
    let playersTmp = [...players]
    playersTmp.map(item => item.drinks = 0)
    setPlayers(playersTmp)
  }

  const handleAddTirage = (drinkPlayers, gorgees, alcool, type, phrase) => {
    let tiragesTmp = [...tirages]
    tiragesTmp.push({currentRound, activePlayers, drinkPlayers, gorgees, alcool, type, phrase})
    setTirages(tiragesTmp)
    setCurrentRound(currentRound + 1)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Setup">
          {props => <SetupScreen 
          {...props} 
          players={players}
          activePlayers={activePlayers}
          alcools={alcools}
          activeAlcools={activeAlcools}
          alcoolOption={alcoolOption}
          bonusOption={bonusOption}
          potOption={potOption}
          rounds={rounds}
          addPlayer={handleAddPlayer}
          changePlayerName={handleChangePlayerName}
          removePlayer={handleRemovePlayer}
          alcoolSelect={handleAlcoolSelect}
          addAlcool={handleAddAlcool}
          changeAlcoolName={handleChangeAlcoolName}
          removeAlcool={handleRemoveAlcool}
          bonusSelect={handleBonusSelect}
          bonusSlide={handleBonusSlide}
          potSelect={handlePotSelect}
          roundPick={handleRoundPick}
        />}
        </Stack.Screen>
        <Stack.Screen name="Tirage">
          {props => <TirageScreen 
          {...props}
          activePlayers={activePlayers}
          setPlayers={setPlayers}
          activeAlcools={activeAlcools}
          alcoolOption={alcoolOption}
          bonusOption={bonusOption}
          potOption={potOption}
          rounds={rounds}
          currentRound={currentRound}
          addTirage={handleAddTirage}
          pot={pot}
          setPot={setPot}
        />}
        </Stack.Screen>
        <Stack.Screen name="Finish">
          {props => <FinishScreen 
          {...props}
          activePlayers={activePlayers}
          activeAlcools={activeAlcools}
          rounds={rounds}
          setCurrentRound={setCurrentRound}
          resetDrintCount={handleResetDrinkCount}
          tirages={tirages}
        />}
        </Stack.Screen>
      </Stack.Navigator>
  </NavigationContainer>
  );
}
