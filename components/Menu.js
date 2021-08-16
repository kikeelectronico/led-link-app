import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Image } from 'react-native';

const Menu = (props) => {
  return (
      <View style={styles.container}>
        <Pressable onPress={() => {props.setStep("home")}} style={styles.option}>
          <Image
            style={styles.image}
            source={props.step === "home" ? require("../assets/home_light.png") : require("../assets/home.png")}
          />
        </Pressable>
        <Pressable onPress={() => {props.setStep("info")}} style={styles.option}>
          <Image
            style={styles.image}
            source={props.step === "info" ? require("../assets/info_light.png") : require("../assets/info.png")}
          />
        </Pressable>
        <Pressable onPress={() => {props.setStep("setup")}} style={styles.option}>
          <Image
            style={styles.image}
            source={props.step === "setup" ? require("../assets/tools_light.png") : require("../assets/tools.png")}
          />
        </Pressable>
        <Pressable onPress={() => {props.setStep("docs")}} style={styles.option}>
          <Image
            style={styles.image}
            source={props.step === "docs" ? require("../assets/docs_light.png") : require("../assets/docs.png")}
          />
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    bottom: 0,
    flexDirection: "row",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  option: {
    height: Dimensions.get('window').height*0.1,
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    //borderColor: "#ddd",
    //borderWidth: 1,
  },
  option_text: {
    fontSize: 15,
    fontWeight: "bold",
  }, 
  separador: {
    width: "100%",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 5,
  },
  image: {
    height: 40,
    width: 42,
  },
});

export default Menu;