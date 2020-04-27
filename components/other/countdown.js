import React from 'react';
import {StyleSheet, View, Text} from 'react-native'
  

export default class Countdown extends React.Component {
    state = {
        seconds: 0,
    }

    componentDidMount() {        
        switch (this.props.gorgees) {
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
            case 'pot': this.setState({seconds: 120})
            break;
        }

        this.myInterval = setInterval(() => {
            const { seconds } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            } else if (seconds === 0) {
                console.log('time up batar !');
                this.props.handleTimeUp()
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    componentDidUpdate(prevProps) {
        if(this.props.gorgees !== prevProps.gorgees){
            switch (this.props.gorgees) {
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
                case 'pot': this.setState({seconds: 120})
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
