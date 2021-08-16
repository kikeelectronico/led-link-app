import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, Image, Pressable, Dimensions } from 'react-native';

import Menu from './Menu'
import StepItem from './StepItem'

const Setup = (props) => {

  return (

    <>
        <View style={styles.main_container}>
          <StepItem
            title="Configuración"
            text="Configura y personaliza tu LED link"
          />

          <View
            style={{
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              marginRight: 80,
              marginLeft: 80,
              marginTop: 30,
            }}
          />

          <View style={{flex: 1}}>
            <Pressable onPress={() => {props.setStep("setupWifi")}} style={styles.image_button}>
              <Image
                style={styles.image}
                source={require("../assets/signal.png")}
              />
            </Pressable>

            <Pressable onPress={() => {props.setStep("setupColor")}} style={styles.image_button}>
              <Image
                style={styles.image}
                source={require("../assets/color_wheel.png")}
              />
            </Pressable>

            <Pressable onPress={() => {props.setStep("setupServers")}} style={styles.image_button}>
              <Image
                style={styles.image}
                source={require("../assets/cloud.png")}
              />
            </Pressable>

          </View>

          

        </View>
        <Menu step={props.step} setStep={props.setStep}/>
      </>
    
  );
}

const styles = StyleSheet.create({
  main_container: {
    width: "100%",
    height: "90%",
  },
  image_button: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  image: {
    width: 230,
    height: 140,
  },
});

export default Setup;