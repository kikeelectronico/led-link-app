import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Menu from './Menu'

const Home = (props) => {

  return (
      <>
        <View style={styles.title_container}>
          <Text style={styles.title}>
            LED link
          </Text>
        </View>
        <View>
          <View style={styles.subtitle_container}>
            <Text style={styles.subtitle}>{props.connected ? "Conectado" : "Fallo al conectar"}</Text>
            <View style={[styles.color_circle,{backgroundColor: props.color}]}></View>
          </View>         
        </View>
        <Menu step={props.step} setStep={props.setStep}/>
      </>
    
  );
}

const styles = StyleSheet.create({
  title_container: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    backgroundColor: "#eee"
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 50,
    color: "grey",
  },
  subtitle_container: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: 'center'
  },
  subtitle: {
    textAlign: "center",
    fontSize: 30,
  },
  color_circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 20
  },
});

export default Home;