import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';


const Loading = (props) => {

  return (
    <View style={styles.screen}>
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          source={require("../assets/gears.png")}
        />
      </View>
      {
        props.show_connect_button ?
        <View style={styles.button_container}>
          <View style={styles.button}>
            <Button
              onPress={() => {props.connectFromMemory()}}
              title="Conectar a tu LED link"
              color="#333"
              accessibilityLabel="Conectar al LED link conocido"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => {props.setStep("welcome")}}
              title="Buscar uno nuevo"
              color="#333"
              accessibilityLabel="Buscar un nuevo LED link"
            />
          </View>
        </View>
        :
        <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_container: {
    flex: 2,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  button_container: {
    flex: 1,
    width: "100%",
  },
  button: {
    width: "70%",
    marginLeft: "15%",
    marginTop: 25
  },
});

export default Loading;