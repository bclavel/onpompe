import React from 'react';
import {StyleSheet, View, Text, Switch, Slider, SafeAreaView} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default class LogoScreen extends React.Component {

  state = {
      players: [{
          name: 'Joueur 1',
          bonus: 0,
          drinks: 0
      },{
        name: 'Joueur 2',
        bonus: 0,
        drinks: 0
    },{
        name: 'Joueur 3',
        bonus: 0,
        drinks: 0
    },{
        name: 'Joueur 4',
        bonus: 0,
        drinks: 0
    }],
    alcoolSelect: true,
    alcools: [{
        name: 'Alcool 1',
        value: 0
    },{
        name: 'Alcool 2',
        value: 0
    },{
        name: 'Alcool 3',
        value: 0
    }]
  }
  
  handleAlcoolSelect = () => {
    this.setState({alcoolSelect: !this.state.alcoolSelect})
  }

  handleAddPlayer = () => {
    let playersTmp = [...this.state.players]
    playersTmp.push({
        name: 'Joueur ' + (playersTmp.length + 1),
        bonus: 0,
        drinks: 0
    })
    this.setState({players: playersTmp})
  }

  handleRemovePlayer = (i) => {
    let playersTmp = [...this.state.players]
    playersTmp.splice(i, 1)
    this.setState({players: playersTmp})
  }

  handleAddAlcool = () => {
    let alcoolsTmp = [...this.state.alcools]
    alcoolsTmp.push({
        name: 'Alcool ' + (alcoolsTmp.length + 1),
        value: 0,
    })
    this.setState({alcools: alcoolsTmp})
  }

  handleRemoveAlcool = (i) => {
    let alcoolsTmp = [...this.state.alcools]
    alcoolsTmp.splice(i, 1)
    this.setState({alcools: alcoolsTmp})
  }

  render() {
    console.log('SETUP states', this.state);  
   
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>On pompe !</Text>
        <Text style={styles.sectionTitle}>Joueurs</Text>
        {this.state.players.map((item,i)  => (
            <Input key={i} placeholder={item.name} rightIcon={<Icon name="remove" size={15} color="grey" onPress={() => this.handleRemovePlayer(i)} />} />
        ))}
        <Button icon={<Icon name="plus" size={15} color="grey" />} type='clear' title="Ajouter un joueur" onPress={this.handleAddPlayer} />

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choix des alcools</Text>
            <Switch value={this.state.alcoolSelect} onChange={this.handleAlcoolSelect}/>
        </View>
        <View style={{display: this.state.alcoolSelect ? 'flex' : 'none', flex: 1, width: '100%', alignItems: 'flex-start'}}>
            {this.state.alcools.map((item,i)  => (
                <Input key={i} placeholder={item.name} rightIcon={<Icon name="remove" size={15} color="grey" onPress={() => this.handleRemoveAlcool(i)} />} />
            ))}
            <Button icon={<Icon name="plus" size={15} color="grey" />} type='clear' title="Ajouter un alcool" onPress={this.handleAddAlcool} />
        </View>
        {/* <Slider /> */}
        <Button title="Tirage" onPress={() => this.props.navigation.navigate('Tirage')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
  },
  pageTitle: {
      fontSize: 40,
      fontWeight: 'bold' 
  },
  sectionTitle: {
    fontSize: 20,
  },
  alcoolSection: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
});