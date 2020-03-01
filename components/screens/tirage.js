import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';

export default class TirageScreen extends React.Component {
  state = {
    timer: 60
  }

  // Todo : créer le fichier json avec les phrases
  // Todo : importer le json en didMount
  // Todo : tirer au hasard une phrase du json

  timerCountDown = () => {
    // Todo : compteur pour décrémenter le timer chaque seconde
  }

  render() {
   
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
          <Text style={styles.tirageText}>[Prénom] tu n'as pas assez bu alors bois [Qté] gorgée(s) de [Alcool]</Text>
          <Text style={styles.tirageTimer}>{this.state.timer}</Text>
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