import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SetupScreen from './components/screens/setup';
import TirageScreen from './components/screens/tirage';
import FinishScreen from './components/screens/finish';
import GameState from './context/gameState'
import TirageState from './context/tirageState'
import PotState from './context/potState'

const Stack = createStackNavigator();

export default function App() {

  const handleAddTirage = (drinkPlayers, gorgees, alcool, type, phrase) => {
    let tiragesTmp = [...tirages]
    activePlayers.forEach(item => delete item.selected)
    tiragesTmp.push({round: currentRound, activePlayers, drinkPlayers, gorgees, alcool, type, phrase})
    setTirages(tiragesTmp)
    setCurrentRound(currentRound + 1)
  }

  // const handleAddPenalty = (drinkPlayers, gorgees, alcool) => {
  //   let tiragesTmp = [...tirages]
  //   // activePlayers.forEach(item => delete item.selected)
  //   tiragesTmp.push({round: currentRound, activePlayers, drinkPlayers, gorgees, alcool, type, phrase})
  //   setTirages(tiragesTmp)
  //   setCurrentRound(currentRound + 1)
  // }

  // console.log('APP tirages', tirages);

  return (
    <NavigationContainer>
      <GameState>
        <PotState>
          <TirageState>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Setup">
                {props => <SetupScreen 
                {...props} 
              />}
              </Stack.Screen>
              <Stack.Screen name="Tirage">
                {props => <TirageScreen 
                {...props}
                addTirage={handleAddTirage}
              />}
              </Stack.Screen>
              <Stack.Screen name="Finish">
                {props => <FinishScreen 
                {...props}
              />}
              </Stack.Screen>
            </Stack.Navigator>
          </TirageState>
        </PotState>
      </GameState>
    </NavigationContainer>
  );
}
