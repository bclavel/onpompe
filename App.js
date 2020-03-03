import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SetupScreen from './components/screens/setup';
import TirageScreen from './components/screens/tirage';
import FinishScreen from './components/screens/finish';

const Stack = createStackNavigator();

export default function App() {

  let initPlayers = [{
    name: null,
    placeholder: 'Nom du joueur',
    bonus: 1,
    drinks: 0
  },{
    name: null,
    placeholder: 'Nom du joueur',
    bonus: 1,
    drinks: 0
  },{
    name: null,
    placeholder: 'Nom du joueur',
    bonus: 1,
    drinks: 0
  },{
    name: null,
    placeholder: 'Nom du joueur',
    bonus: 1,
    drinks: 0
  }]

  let initAlcools = [{
    name: 'Alcool 1',
    value: 0
  },{
    name: 'Alcool 2',
    value: 0
  },{
    name: 'Alcool 3',
    value: 0
  }]

  const [players, setPlayers] = useState([...initPlayers]);
  // console.log('APP players', players);
  
  const [alcools, setAlcools] = useState([...initAlcools]);
  const [alcoolOption, setAlcoolOption] = useState(true);
  const [bonusOption, setBonusOption] = useState(true);
  const [potOption, setPotOption] = useState(false);
  const [rounds, setRounds] = useState(100);  

  const handleAddPlayer = () => {
    let playersTmp = [...players]
    playersTmp.push({
        name: null,
        placeholder: 'Nom du joueur',
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
        name: 'Alcool ' + (alcoolsTmp.length + 1),
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

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Setup">
          {props => <SetupScreen 
          {...props} 
          players={players}
          alcools={alcools}
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
          players={players}
          setPlayers={setPlayers}
          alcools={alcools}
          alcoolOption={alcoolOption}
          bonusOption={bonusOption}
          potOption={potOption}
          rounds={rounds} 
        />}
        </Stack.Screen>
        <Stack.Screen name="Finish">
          {props => <FinishScreen 
          {...props}
          players={players}
          alcools={alcools}
          alcoolOption={alcoolOption}
          bonusOption={bonusOption}
          potOption={potOption}
          rounds={rounds} 
        />}
        </Stack.Screen>
      </Stack.Navigator>
  </NavigationContainer>
  );
}
