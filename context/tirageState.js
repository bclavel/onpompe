import React, { useState, useContext } from "react";
import TirageContext from './tirageContext';
import phrasesList from '../assets/phrases.json';
import PotContext from './potContext'

const TirageState = props => {

    const potContext = useContext(PotContext)
    const { pot } = potContext

    const tirages = []
    const activePlayers = []
    const drinkPlayers = []

    // const [currentRound, setCurrentRound] = useState(1); // switch into tirageContext

    const initialState = {
        tirages: tirages,
        tirage: {
            round: 1,
            activePlayers: activePlayers,
            drinkPlayers: drinkPlayers,
            selectedPlayer: null,
            selectedPlayerIndex: null,
            gorgees: null,
            alcool: null,
            type: null, 
            phrase: null, 
        },
        timeUp: false,
        followUp: false
    }

    const [state, setState] = useState(initialState)

    console.log('TIRAGE STATE tirages', state.tirages);

    const setTirage = (activePlayers, alcoolOption, activeAlcools, potOption) => {
        let stateTmp = {...state}

        activePlayers.forEach(item => delete item.selected)
        stateTmp.tirage.activePlayers = activePlayers

        // Players list with bonus ratio
        let ratioPlayers = []  
        activePlayers.forEach(item => {
            let playerRatio = item.bonus*2
            for (let i = 0; i < playerRatio; i++) {
            ratioPlayers.push(item)
            }
        })

        // Select random player
        let rdmPlayerNumber = Math.floor(Math.random() * ratioPlayers.length);
        stateTmp.tirage.selectedPlayer = ratioPlayers[rdmPlayerNumber]
        stateTmp.tirage.selectedPlayerIndex = activePlayers.indexOf(stateTmp.tirage.selectedPlayer)

        // Select random alcool
        if (alcoolOption) {
            let rdmAlcoolNumber = Math.floor(Math.random() * activeAlcools.length);
            stateTmp.tirage.alcool = activeAlcools[rdmAlcoolNumber]
        }

        // Select random gorgees
        const gorgeesList = [1,2,3,4]
        let rdmGorgeesNumber = Math.floor(Math.random() * 4);
        stateTmp.tirage.gorgees = gorgeesList[rdmGorgeesNumber]


        // Select tirage type
        let rdmTirageNbr = Math.floor(Math.random() * 67);
        if (rdmTirageNbr <= 29 || (!potOption && rdmTirageNbr >= 60 && rdmTirageNbr <= 65)) stateTmp.tirage.type = 'classique'
        else if (rdmTirageNbr >= 30 && rdmTirageNbr <= 44 && activePlayers.length <= 2) stateTmp.tirage.type = 'classique'
        else if (rdmTirageNbr >= 30 && rdmTirageNbr <= 44 && activePlayers.length > 2) stateTmp.tirage.type = 'jeu-solo'
        else if (rdmTirageNbr >= 45 && rdmTirageNbr <= 59) stateTmp.tirage.type = 'jeu-multi'
        else if (potOption && rdmTirageNbr >= 60 && rdmTirageNbr <= 64) stateTmp.tirage.type = 'pot-add'
        else if (potOption && pot === 0 && rdmTirageNbr === 65) stateTmp.tirage.type = 'pot-add'
        else if (potOption && pot !== 0 && rdmTirageNbr === 65) {
            stateTmp.tirage.type = 'pot-drink'
            stateTmp.tirage.alcool = {name: 'pot', value: 0}
        }
        else if (rdmTirageNbr >= 66) stateTmp.tirage.type = 'pause'
        else console.log('error, no type set')

        // Select phrase from tirage type
        let phrasesType = []
        phrasesList.forEach(item => {
            if (item.type === stateTmp.tirage.type) {
            phrasesType.push(item)
            }
        })
        let rdmPhraseNbr = Math.floor(Math.random() * phrasesType.length);
        stateTmp.tirage.phrase = phrasesType[rdmPhraseNbr]

        console.log('TIRAGE STATE stateTmp', stateTmp);
        
        setState(stateTmp)
    }

    const addTirage = (drinkPlayers) => {
        console.log('TirageState >> addTirage');

        let stateTmp = {...state}
        stateTmp.tirage.round += 1
        stateTmp.tirage.drinkPlayers = drinkPlayers

        stateTmp.tirages.push(stateTmp.tirage)

        setState(stateTmp)
    }

    const setTimeUp = () => {
        console.log('TirageState >> setTimeUp');
        let stateTmp = {...state}
        stateTmp.tirage.gorgees = 4
        stateTmp.tirage.type = 'time-up'
        setState(stateTmp)
    }


    return (
        <TirageContext.Provider 
            value={{
                tirages: state.tirages,
                tirage: state.tirage,
                timeUp: state.timeUp,
                round: state.tirage.round,
                selectedPlayer: state.tirage.selectedPlayer,
                selectedPlayerIndex: state.tirage.selectedPlayerIndex,
                drinkPlayers: state.tirage.drinkPlayers,
                gorgees: state.tirage.gorgees,
                alcool: state.tirage.alcool,
                type: state.tirage.type,
                phrase: state.tirage.phrase,
                setTirage,
                addTirage,
                setTimeUp
            }}>
            {props.children}
        </TirageContext.Provider>
    )
}

export default TirageState;
