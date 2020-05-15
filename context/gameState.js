import React, { useState, useEffect } from "react";
import GameContext from './gameContext';

const GameState = props => {

    const initialState = {
        players: [{
            id: 1,
            name: null,
            bonus: 1,
          },{
            id: 2,
            name: null,
            bonus: 1,
          },{
            id: 3,
            name: null,
            bonus: 1,
          },{
            id: 4,
            name: null,
            bonus: 1,
        }],
        alcools: [{
            name: null,
            value: 0
          },{
            name: null,
            value: 0
          },{
            name: null,
            value: 0
        }]
    }

    const [game, setGame] = useState(initialState)
    // console.log('GAMESTATE game', game)

    const [activePlayers, setActivePlayers] = useState([])
    const [activeAlcools, setActiveAlcools] = useState([])
    const [alcoolOption, setAlcoolOption] = useState(true);
    const [bonusOption, setBonusOption] = useState(true);
    const [potOption, setPotOption] = useState(true);
    const [rounds, setRounds] = useState(100);

    useEffect(() => {
      let activePlayers = game.players.filter(item => item.name)
      setActivePlayers(activePlayers)
    }, [game])


    useEffect(() => {
      let activeAlcools = game.alcools.filter(item => item.name)
      setActiveAlcools(activeAlcools)
    }, [game])

    const addPlayer = () => {
      let gameTmp = {...game}
      gameTmp.players.push({
          id: gameTmp.players.length + 1,
          name: null,
          bonus: 1,
      })
      setGame(gameTmp)
    }
    
    const changePlayerName = (text, index) => {
      let gameTmp = {...game}
      gameTmp.players[index].name = text
      setGame(gameTmp)
    }
  
    const removePlayer = (i) => {
      let gameTmp = {...game}
      gameTmp.players.splice(i, 1)
      setGame(gameTmp)
    }
  
    const alcoolSelect = () => {
      setAlcoolOption(!alcoolOption)
    }
  
    const addAlcool = () => {
      let gameTmp = {...game}
      gameTmp.alcools.push({
        name: null,
        value: 0,
      })
      setGame(gameTmp)
    }
  
    const changeAlcoolName = (text, index) => {
      let gameTmp = {...game}
      gameTmp.alcools[index].name = text
      setGame(gameTmp)
    }
  
    const removeAlcool = (i) => {
      let gameTmp = {...game}
      gameTmp.alcools.splice(i, 1)
      setGame(gameTmp)
    }
  
    const bonusSelect = () => {
      setBonusOption(!bonusOption)
    }
  
    const bonusSlide = (value, index) => {
      let gameTmp = {...game}
      gameTmp.players[index].bonus = value
      setGame(gameTmp)
    }
  
    const potSelect = () => {
      setPotOption(!potOption)
    }
  
    const roundPick = (value) => {
      setRounds(value)
    }

    return (
        <GameContext.Provider 
            value={{
                game,
                activePlayers,
                activeAlcools,
                alcoolOption,
                bonusOption,
                potOption,
                rounds,
                setGame,
                addPlayer,
                changePlayerName,
                removePlayer,
                alcoolSelect,
                addAlcool,
                changeAlcoolName,
                removeAlcool,
                bonusSelect,
                bonusSlide,
                potSelect,
                roundPick,
            }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameState;
