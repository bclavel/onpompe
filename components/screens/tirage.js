import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import { Button } from 'react-native-elements';
import phrases from '../../assets/phrases.json';
import Countdown from '../countdown'

export default class TirageScreen extends React.Component {

  // Todo : tous les x tirages, tirer une pause plutôt qu'une phrase

  handleDrink = (playerIndex, gorgees) => {   
    let playersTmp = this.props.players
    playersTmp[playerIndex].drinks += gorgees
    this.props.setPlayers(playersTmp)
    this.setState({timer: 60})
  }


  render() {
    // console.log('TIRAGE props', this.props);
    let activePlayers = this.props.players.filter(item => item.name)
    let rdmPlayerNumber = Math.floor(Math.random() * activePlayers.length);
    let selectedPlayer = activePlayers[rdmPlayerNumber]

    let rdmPhraseNumber = Math.floor(Math.random() * phrases.length);
    let selectedPhrase = phrases[rdmPhraseNumber]

    const gorgees = [0.5,1,1.5,2,2.5,3]
    let rdmGorgeesNumber = Math.floor(Math.random() * 6);
    let selectedGorgees = gorgees[rdmGorgeesNumber]

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftMenu} clickable={true} onPress={() => this.props.navigation.navigate('Setup')}>
          <Image style={styles.menuIcons} source={require('../../assets/setup.jpg')} />
          <Text style={styles.menuTitle}>Joueurs/Alcools</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightMenu} onPress={() => this.props.navigation.navigate('Finish')}>
          <Image style={styles.menuIcons} source={require('../../assets/finish.jpg')} />
          <Text style={styles.menuTitle}>Terminer la partie</Text>
        </TouchableOpacity>
        <View style={styles.centralTirage}>
          <Text style={styles.tirageText}>{selectedPhrase.type === "classique" || selectedPhrase.type === "pot" || selectedPhrase.type === "jeu-solo" ?  selectedPlayer.name : null} {selectedPhrase.text1} {selectedGorgees} {selectedGorgees > 1 ? "gorgées" : 'gorgée'} de {this.props.alcools[0].name}</Text>
          {selectedPhrase.type === "classique" || selectedPhrase.type === "pot" ?
            <>
              <Countdown selectedGorgees={selectedGorgees} />
              <Button title="C'est bu !" titleStyle={{fontSize: 20,  paddingLeft: 10, paddingRight: 10}} onPress={() => this.handleDrink(rdmPlayerNumber, selectedGorgees)} />
            </>
            :
            <View style={styles.multiTirage}>
              {this.props.players.filter(item => item.name).map((item, i) => <Button containerStyle={{marginRight: 10}} titleStyle={{fontSize: 16, color: 'white',  paddingLeft: 10, paddingRight: 10}} buttonStyle={{backgroundColor: 'green'}} key={i} title={item.name} type="outline" onPress={() => this.handleDrink(i, selectedGorgees)} />)}
            </View>
          }
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  }
});