import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Switch, Slider, Picker} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default class SetupScreen extends React.Component {

  render() {
    // console.log('SETUP states', this.state);

    let activePlayers = this.props.players.filter(item => item.name)
   
    return (
      <ScrollView contentContainerStyle={styles.scrollview} centerContent='true'>
        <Text style={styles.pageTitle}>On pompe !</Text>

        <View style={styles.option}>
          <Text style={styles.sectionTitle}>Joueurs</Text>
          {this.props.players.map((item,i)  => (
            <View key={i} style={styles.input}>
              <Input placeholder={item.placeholder} value={item.name} containerStyle={{width: '93%'}} onChangeText={text => this.props.changePlayerName(text, i)} />
              <Icon name="remove" size={15} style={{padding: 8}} color="grey" onPress={() => this.props.removePlayer(i)} />
            </View>
          ))}
          <Button icon={<Icon name="plus" size={15} color="grey" />} type='clear' title="Ajouter un joueur" onPress={this.props.addPlayer} />
        </View>
        
        <View style={styles.option}>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Choix des alcools</Text>
              <Switch value={this.props.alcoolOption} onChange={this.props.alcoolSelect}/>
          </View>
          <View style={{display: this.props.alcoolOption ? 'flex' : 'none', width: '100%', alignItems: 'flex-start'}}>
              {this.props.alcools.map((item,i)  => (
                <View key={i} style={styles.input}>
                  <Input placeholder={'Alcool ' + (i+1)} containerStyle={{width: '93%'}} onChangeText={text => this.props.changeAlcoolName(text, i)} />
                  <Icon name="remove" size={15} style={{padding: 8}} color="grey" onPress={() => this.props.removeAlcool(i)} />
                </View>
              ))}
              <Button icon={<Icon name="plus" size={15} color="grey" />} type='clear' title="Ajouter un alcool" onPress={this.props.addAlcool} />
          </View>
        </View>

        <View style={styles.option}>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bonus/Malus aux joueurs</Text>
              <Switch value={this.props.bonusOption} onChange={this.props.bonusSelect}/>
          </View>
          <View style={{display: this.props.bonusOption ? 'flex' : 'none', width: '100%', alignItems: 'flex-start', marginTop: 8}}>
              {this.props.players.map((item,i) => (
                <React.Fragment key={i}>
                  <Text style={styles.bonusText}>{item.name || item.placeholder} : {item.bonus * 100}%</Text>
                  {this.props.bonusOption ? <Slider style={{width: '100%'}} minimumValue={0.5} maximumValue={2} step={0.5} value={item.bonus} onValueChange={value => this.props.bonusSlide(value, i)} /> : null }
                </React.Fragment>
              ))}
          </View>
        </View>
        <View style={styles.roundOption}>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Durée de la partie</Text>
              <Picker
                selectedValue={this.props.rounds}
                style={{height: 40, width: 150}}
                onValueChange={(itemValue, itemIndex) =>
                  this.props.roundPick(itemValue)
                }>
                <Picker.Item label="50 tirages" value={50} />
                <Picker.Item label="100 tirages" value={100} />
                <Picker.Item label="200 tirages" value={200} />
                <Picker.Item label="300 tirages" value={300} />
              </Picker>
          </View>
        </View>
        <View style={styles.potOption}>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Jouer avec le pot</Text>
              <Switch value={this.props.potOption} onChange={this.props.potSelect}/>
          </View>
        </View>
        <Button title="Commencer la partie !" containerStyle={{marginTop: 20, marginBottom: 20}} titleStyle={{fontSize: 20, paddingLeft: 10, paddingRight: 10}} onPress={() => this.props.navigation.navigate('Tirage')} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollview: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 'auto',
  },
  option: {
    alignItems: 'flex-start',
    width: '100%',
    height: 'auto',
    marginTop: 10,
  },
  roundOption: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  potOption: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    height: 40,
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pageTitle: {
      fontSize: 40,
      fontWeight: 'bold',
      marginTop: 30
  },
  sectionTitle: {
    fontSize: 20,
    textAlignVertical: 'center',
    marginRight: 8,
    marginLeft: 10
  },
  input: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bonusText: {
    marginLeft: 10,
    fontSize: 14
  }
});