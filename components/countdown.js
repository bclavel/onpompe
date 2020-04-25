import React from 'react';
import {StyleSheet, View, Text} from 'react-native'
  

export default class Countdown extends React.Component {
    state = {
        seconds: 0,
    }

    componentDidMount() {        
        switch (this.props.selectedGorgees) {
            case 0.5: this.setState({seconds: 20})
            break;
            case 1: this.setState({seconds: 30})
            break;
            case 1.5: this.setState({seconds: 45})
            break;
            case 2: this.setState({seconds: 60})
            break;
            case 2.5: this.setState({seconds: 80})
            break;
            case 3: this.setState({seconds: 100})
            break;
        }

        this.myInterval = setInterval(() => {
            const { seconds } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    componentDidUpdate(prevProps) {
        if(this.props.selectedGorgees !== prevProps.selectedGorgees){
            switch (this.props.selectedGorgees) {
                case 0.5: this.setState({seconds: 20})
                break;
                case 1: this.setState({seconds: 30})
                break;
                case 1.5: this.setState({seconds: 45})
                break;
                case 2: this.setState({seconds: 60})
                break;
                case 2.5: this.setState({seconds: 80})
                break;
                case 3: this.setState({seconds: 100})
                break;
            }
        }
      }

    render() {        
        const { seconds } = this.state
        return (
            <View>
                <Text style={styles.tirageTimer}>{seconds}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tirageTimer: {
      fontSize: 60,
      marginTop: 20,
      marginBottom: 40
    }
  });
