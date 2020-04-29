import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Switch, Slider, Picker } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const SetupScreen = (props) => {
  // console.log('SETUP props', props);
  // todo : popin warning conso alcool

  const [errorMsg, setErrorMsg] = useState(null);

  const launchGame = () => {
    if (props.activePlayers.length >= 2 && (props.activeAlcools.length >= 1 || !props.alcoolOption)) {
      props.navigation.navigate('Tirage')
    } else if (props.activePlayers.length < 2 && (props.activeAlcools.length >= 1 || !props.alcoolOption)) {
      setErrorMsg("Veuillez définir au moins 2 jouers")
    } else if (props.activePlayers.length >= 2 && props.activeAlcools.length < 1) {
      setErrorMsg("Veuillez définir au moins 1 alcool")
    } else {
      setErrorMsg("Veuillez définir au moins 2 joueurs et 1 alcool")
    }
  }

  useEffect(() => {
    if (props.activePlayers.length >= 2 && props.activeAlcools.length >= 1) setErrorMsg(null)
  }, [props.activePlayers, props.activeAlcools])
  
  return (
    <ScrollView contentContainerStyle={styles.scrollview} centerContent='true'>
      <Text style={styles.pageTitle}>On pompe !</Text>
      <View style={styles.option}>
        <Text style={styles.sectionTitle}>Joueurs</Text>
        {props.players.map((item,i)  => (
          <View key={i} style={styles.input}>
            <Input placeholder='Nom du joueur' value={item.name} containerStyle={{width: '93%'}} onChangeText={text => props.changePlayerName(text, i)} />
            <Icon name="remove" size={15} style={{padding: 7}} color="grey" onPress={() => props.removePlayer(i)} />
          </View>
        ))}
        <Button icon={<Icon name="plus" size={15} color="grey" />} titleStyle={styles.addLink} type='clear' title="Ajouter un joueur" onPress={props.addPlayer} />
      </View>
      <View style={styles.option}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choix des alcools</Text>
          <Switch value={props.alcoolOption} onChange={() => props.alcoolSelect()}/>
        </View>
        <View style={{display: props.alcoolOption ? 'flex' : 'none', width: '100%', alignItems: 'flex-start'}}>
          {props.alcools.map((item,i)  => (
            <View key={i} style={styles.input}>
              <Input placeholder="Alcool" value={item.name} containerStyle={{width: '93%'}} onChangeText={text => props.changeAlcoolName(text, i)} />
              <Icon name="remove" size={15} style={{padding: 7}} color="grey" onPress={() => props.removeAlcool(i)} />
            </View>
          ))}
          <Button icon={<Icon name="plus" size={15} color="grey" />} titleStyle={styles.addLink} type='clear' title="Ajouter un alcool" onPress={props.addAlcool} />
        </View>
      </View>
      <View style={styles.option}>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bonus/Malus aux joueurs</Text>
            <Switch value={props.bonusOption} onChange={() => props.bonusSelect()}/>
        </View>
        <View style={{display: props.bonusOption ? 'flex' : 'none', width: '100%', alignItems: 'flex-start', marginTop: 8}}>
          {props.players.map((item,i) => (
            <React.Fragment key={i}>
              <Text style={styles.bonusText}>{item.name || "Nom du joueur"} : {item.bonus * 100}%</Text>
              {props.bonusOption && <Slider style={{width: '100%'}} minimumValue={0.5} maximumValue={2} step={0.5} value={item.bonus} onValueChange={value => props.bonusSlide(value, i)} /> }
            </React.Fragment>
          ))}
        </View>
      </View>
      <View style={styles.roundOption}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Durée de la partie</Text>
          <Picker selectedValue={props.rounds} style={styles.picker} onValueChange={itemValue => props.roundPick(itemValue)}>
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
          <Switch value={props.potOption} onChange={props.potSelect}/>
        </View>
      </View>
      <Text style={{display: errorMsg ? 'flex' : 'none', color: 'red', marginTop: 10}}>{errorMsg}</Text>
      <Button title="J'ai soif !" containerStyle={styles.button} titleStyle={styles.buttonTitle} onPress={() => launchGame()} />
    </ScrollView>
  );
}

export default SetupScreen

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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
      fontSize: 40,
      fontWeight: 'bold',
      marginTop: 30
  },
  sectionTitle: {
    fontSize: 20,
    marginRight: 8,
    marginLeft: 10
  },
  input: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addLink: {
    color: 'black',
    marginLeft: 2,
    marginBottom: 2
  },
  bonusText: {
    marginLeft: 10,
    fontSize: 14
  },
  picker: {
    height: 40, 
    width: 150,
  },
  errorMsg: {
    fontSize: 20,
    color: 'red'
  },
  button: {
    marginTop: 20, 
    marginBottom: 20
  },
  buttonTitle: {
    fontSize: 20, 
    paddingLeft: 10, 
    paddingRight: 10
  }
});
