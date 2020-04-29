import React from 'react';
import {StyleSheet, View, Text} from 'react-native'
  

export default class Countdown extends React.Component {
    state = {
        minutes: 0,
        seconds: 0,
    }

    componentDidMount() {        
        switch (this.props.gorgees) {
            case 1: this.setState({minutes: 0, seconds: 10})
            break;
            case 2: this.setState({minutes: 0, seconds: 20})
            break;
            case 3: this.setState({minutes: 0, seconds: 30})
            break;
            case 4: this.setState({minutes: 0, seconds: 40})
            break;
            case 'pot': this.setState({minutes: 4, seconds: 0})
            break;
        }

        this.myInterval = setInterval(() => {

            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    console.log('time up batar !');
                    this.props.handleTimeUp()
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    componentDidUpdate(prevProps) {
        if(this.props.gorgees !== prevProps.gorgees){
            switch (this.props.gorgees) {
                case 1: this.setState({minutes: 1, seconds: 0})
                break;
                case 2: this.setState({minutes: 1, seconds: 30})
                break;
                case 3: this.setState({minutes: 2, seconds: 0})
                break;
                case 4: this.setState({minutes: 3, seconds: 0})
                break;
                case 'pot': this.setState({minutes: 4, seconds: 0})
                break;
            }
        }
      }

    render() {        
        const { minutes, seconds } = this.state        
        return (
            <View>
                <Text style={styles.tirageTimer}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
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
