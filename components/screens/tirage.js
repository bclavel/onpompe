import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import { Button } from 'react-native-elements';
import phrases from '../../assets/phrases.json';

export default class TirageScreen extends React.Component {
  state = {
    ...this.props,
    timer: 60
  }
  // Todo : tous les x tirages, tirer une pause plutôt qu'une phrase
  // débugger cette marde

  timerCountDown = () => {
    // Todo : compteur pour décrémenter le timer chaque seconde
  }

  handleDrink = (playerIndex, gorgees) => {
    console.log('drink !');
    
    playersTmp = this.state.players
    playersTmp[playerIndex].drinks += gorgees
    this.state.setPlayers(playersTmp)
    this.setState({timer: 60})
  }

  render() {
    // console.log('TIRAGE props', this.props);

    let rdmPlayerNumber = Math.floor(Math.random() * phrases.length);
    let selectedPlayer = this.state.players[rdmPlayerNumber]
    // let selectedPlayerIndex = this.props.players.indexOf(selectedPlayer)

    let rdmPhraseNumber = Math.floor(Math.random() * phrases.length);
    let selectedPhrase = phrases[rdmPhraseNumber]

    const gorgees = [0.5,1,1.5,2,2.5,3]
    let rdmGorgeesNumber = Math.floor(Math.random() * 6);
    let selectedGorgees = gorgees[rdmGorgeesNumber]

   
    return (
      <View style={styles.container}>
        <View style={styles.leftMenu}>
          <Image style={styles.menuIcons} source={require('../../assets/setup.jpg')} />
          <Text style={styles.menuTitle}>Joueurs/Alcools</Text>
        </View>
        <View style={styles.rightMenu}>
          <Image style={styles.menuIcons} source={require('../../assets/finish.jpg')} />
          <Text style={styles.menuTitle}>Terminer la partie</Text>
        </View>
        <View style={styles.centralTirage}>
          <Text style={styles.tirageText}>{selectedPhrase.type === "classique" || selectedPhrase.type === "pot" || selectedPhrase.type === "jeu-solo" ?  selectedPlayer.name : null} {selectedPhrase.text1} {selectedGorgees} {selectedGorgees > 1 ? "gorgées" : 'gorgée'} de {this.props.alcools[0].name}</Text>
          {selectedPhrase.type === "classique" || selectedPhrase.type === "pot" ? 
            <Text style={styles.tirageTimer}>{this.state.timer}</Text>
            :
            <View>
              {this.props.players.filter(item => item.name).map((item, i) => <Button title={item.name} type="outline" onPress={() => console.log('pouet')} />)}
            </View>
          }
          <Button title="C'est bu !" onPress={() => this.handleDrink(rdmPlayerNumber, selectedGorgees)} />
        </View>
      </View>
    );
  }
}

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
    left: 0,
    top: 10,
    flex: 1,
    alignItems: 'center',
  },
  rightMenu: {
    position: 'absolute',
    right: 0,
    top: 10,
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
  },
  tirageTimer: {
    fontSize: 60,
  }
});