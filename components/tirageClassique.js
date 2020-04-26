import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Countdown from './countdown'

const TirageClassique = (props) => {
  // console.log('CLASSIQUE props', props);

  return (
         <>
            <Countdown selectedGorgees={props.selectedGorgees} />
            <Button title="C'est bu !" titleStyle={styles.buttonBigTitle} onPress={() => props.handleDrinkSolo(props.selectedPlayerIndex, props.selectedGorgees)} />
        </>
  );
}

export default TirageClassique

const styles = StyleSheet.create({
  buttonBigTitle: {
    fontSize: 20, 
    paddingLeft: 10,
    paddingRight: 10
  },
});
