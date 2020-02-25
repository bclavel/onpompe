import React from 'react';

// import de mon élément de navigation StackNavigator
// import {createStackNavigator, createAppContainer} from 'react-navigation';



// Imports de mes screens components dans ma navigation








// Création de ma navigation StackNavigation
var StackNavigator = createStackNavigator({

// pages de ma navigation sans Bottom   
Setup: { 
     screen:SetupScreen, 
     navigationOptions: {
         header: null
        }
    },

Tirage: { 
    screen:TirageScreen, 
    navigationOptions: {
        header: null
        }
    },
});

export default Navigation = NavigationContainer(StackNavigator);
