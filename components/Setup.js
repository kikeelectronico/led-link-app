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
              <Text style={styles.text}>WiFi</Text>
            </Pressable>

            <Pressable onPress={() => {props.setStep("setupColor")}} style={styles.image_button}>
              <Image
                style={styles.image}
                source={require("../assets/color_wheel.png")}
              />
              <Text style={styles.text}>Color</Text>
            </Pressable>

            <Pressable onPress={() => {props.setStep("setupServers")}} style={styles.image_button}>
              <Image
                style={styles.image}
                source={require("../assets/cloud.png")}
              />
              <Text style={styles.text}>Servidores</Text>
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
    width: "70%",
    marginLeft: "15%",
    marginTop: 20,
    flexDirection: "row",
    alignItems: 'center',
  },
  image: {
    width: 69,
    height: 42,
  },
  text: {
    marginLeft: 20,
    fontSize: 20,
  },
});

export default Setup;