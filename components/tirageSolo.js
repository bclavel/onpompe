import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

const TirageSolo = (props) => {
  // console.log('SOLO props', props);

  return (
    <View style={styles.multiTirage}>
        {props.activePlayers.map((item, i) => <Button containerStyle={styles.button} titleStyle={styles.buttonSmallTitle} buttonStyle={{backgroundColor: 'green'}} key={i} title={item.name} type="outline" onPress={() => props.handleDrinkSolo(i, props.selectedGorgees)} />)}
    </View>
  );
}

export default TirageSolo

const styles = StyleSheet.create({
  multiTirage: {
    flexWrap: "wrap",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  button: {
    marginRight: 10,
    marginBottom: 10
  },
  buttonSmallTitle: {
    fontSize: 16, 
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10
  }
});
