import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Switch, Slider, Picker} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default class SetupScreen extends React.Component {

  // state = {
  //     players: [{
  //       name: null,
  //       placeholder: 'Nom du joueur',
  //       bonus: 1,
  //       drinks: 0
  //     },{
  //       name: null,
  //       placeholder: 'Nom du joueur',
  //       bonus: 1,
  //       drinks: 0
  //     },{
  //       name: null,
  //       placeholder: 'Nom du joueur',
  //       bonus: 1,
  //       drinks: 0
  //     },{
  //       name: null,
  //       placeholder: 'Nom du joueur',
  //       bonus: 1,
  //       drinks: 0
  //     }],
  //   isAlcool: true,
  //   alcools: [{
  //       name: 'Alcool 1',
  //       value: 0
  //   },{
  //       name: 'Alcool 2',
  //       value: 0
  //   },{
  //       name: 'Alcool 3',
  //       value: 0
  //   }],
  //   isBonus: true,
  //   rounds: 100,
  //   isPot: false
  // }

  // handleAddPlayer = () => {
  //   let playersTmp = [...this.state.players]
  //   playersTmp.push({
  //       name: null,
  //       placeholder: 'Nom du joueur',
  //       bonus: 1,
  //       drinks: 0
  //   })
  //   this.setState({players: playersTmp})
  // }

  // handleChangePlayerName = (text, index) => {    
  //   let playersTmp = [...this.state.players]
  //   playersTmp[index].name = text
  //   this.setState({players: playersTmp})
  // }

  // handleRemovePlayer = (i) => {
  //   let playersTmp = [...this.state.players]
  //   playersTmp.splice(i, 1)
  //   this.setState({players: playersTmp})
  // }

  // handleAlcoolSelect = () => {
  //   this.setState({isAlcool: !this.state.isAlcool})
  // }

  // handleAddAlcool = () => {
  //   let alcoolsTmp = [...this.state.alcools]
  //   alcoolsTmp.push({
  //       name: 'Alcool ' + (alcoolsTmp.length + 1),
  //       value: 0,
  //   })
  //   this.setState({alcools: alcoolsTmp})
  // }

  // handleChangeAlcoolName = (text, index) => {
  //   let alcoolsTmp = [...this.state.alcools]
  //   alcoolsTmp[index].name = text
  //   this.setState({alcools: alcoolsTmp})
  // }

  // handleRemoveAlcool = (i) => {
  //   let alcoolsTmp = [...this.state.alcools]
  //   alcoolsTmp.splice(i, 1)
  //   this.setState({alcools: alcoolsTmp})
  // }

  // handleBonusSelect = () => {
  //   this.setState({isBonus: !this.state.isBonus})
  // }

  // handleBonusSlide = (value, index) => {
  //   let playersTmp = [...this.state.players]
  //   playersTmp[index].bonus = value
  //   this.setState({players: playersTmp})
  // }

  // handlePotSelect = () => {
  //   this.setState({isPot: !this.state.isPot})
  // }

  // Todo : ne lancer le tirage que si au moins 2 joueurs sont sélectionnés

  render() {
    // console.log('SETUP states', this.state);
   
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollview} centerContent='true'>
          <Text style={styles.pageTitle}>On pompe !</Text>
          <Text style={styles.sectionTitle}>Joueurs</Text>
          {this.props.players.map((item,i)  => (
              <Input key={i} placeholder={item.placeholder} value={item.name} containerStyle={{width: '90%'}} onChangeText={text => this.props.changePlayerName(text, i)} rightIcon={<Icon name="remove" size={15} color="grey" onPress={() => this.props.removePlayer(i)} />} />
          ))}
          <Button icon={<Icon name="plus" size={15} color="grey" />} type='clear' title="Ajouter un joueur" onPress={this.props.addPlayer} />

          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Choix des alcools</Text>
              <Switch value={this.props.alcoolOption} onChange={this.props.alcoolSelect}/>
          </View>
          <View style={{display: this.props.alcoolOption ? 'flex' : 'none', flex: 1, width: '100%', alignItems: 'flex-start'}}>
              {this.props.alcools.map((item,i)  => (
                <>
                  <Input placeholder={'Alcool ' + (i+1)} containerStyle={{width: '90%'}} onChangeText={text => this.props.changeAlcoolName(text, i)} />
                  <Icon key={i} name="remove" size={15} color="grey" onPress={() => this.props.removeAlcool(i)} />
                </>
              ))}
              <Button icon={<Icon name="plus" size={15} color="grey" />} type='clear' title="Ajouter un alcool" onPress={this.props.addAlcool} />
          </View>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bonus/Malus aux joueurs</Text>
              <Switch value={this.props.bonusOption} onChange={this.props.bonusSelect}/>
          </View>
          <View style={{display: this.props.bonusOption ? 'flex' : 'none', flex: 1, width: '100%', alignItems: 'flex-start'}}>
              {this.props.players.map((item,i)  => (
                <>
                  <Text style={styles.text}>{item.name || item.placeholder} : {item.bonus * 100}%</Text>
                  <Slider key={i} style={{width: '100%'}} minimumValue={0.25} maximumValue={3} step={0.25} value={item.bonus} onValueChange={value => this.props.bonusSlide(value, i)} />
                </>
              ))}
          </View>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Durée de la partie</Text>
              <Picker
                selectedValue={this.props.rounds}
                style={{height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) =>
                  this.props.roundPick(itemValue)
                }>
                <Picker.Item label="100 tours" value={100} />
                <Picker.Item label="200 tours" value={200} />
                <Picker.Item label="300 tours" value={300} />
              </Picker>
          </View>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Jouer avec le pot</Text>
              <Switch value={this.props.potOption} onChange={this.props.potSelect}/>
          </View>
          <Button title="Commencer la partie !" onPress={() => this.props.navigation.navigate('Tirage')} />
        </ScrollView>
      </SafeAreaView>
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
  scrollview: {
    // width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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