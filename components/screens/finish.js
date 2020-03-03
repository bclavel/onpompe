import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import { Button } from 'react-native-elements';

export default class FinishScreen extends React.Component {

  render() {
    // console.log('FINISH props', this.props);
    let activePlayers = this.props.players.filter(item => item.name)

    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Classement final!</Text>
          {activePlayers.map((item,i) => (
            <Text key={i} style={styles.tirageText}>{item.name} - {item.drinks}</Text>
          ))}

        <Button title="Nouvelle partie !" titleStyle={{fontSize: 20,  paddingLeft: 10, paddingRight: 10}} onPress={() => this.props.navigation.navigate('Setup')} />
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
    alignItems: 'flex-start'
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tirageText: {
    width: '80%',
    fontSize: 30,
    textAlign: 'center'
  },
});