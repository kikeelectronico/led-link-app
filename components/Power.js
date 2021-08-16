import React from 'react';
import { View, Image, StyleSheet, Button, PermissionsAndroid } from 'react-native';

import StepItem from './StepItem'

const Power = (props) => {

  const requestCameraPermission = async (props) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permisos de ubicación",
          message:
            "LED link necesita permisos de ubicación " +
            "para poder acceder al Bluetooth.",
          buttonPositive: "Vale"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        props.setStep("power")
      } else {
        props.setStep("welcome")
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View>
      <StepItem
        title="Paso uno"
        text="Conecta y enciende tu LED link. Debes esperar cinco segundos a que esté preparado."
      />
      <View
        style={{
          borderBottomColor: "#ddd",
          borderBottomWidth: 1,
          margin: 80,
          marginTop: 30,
          marginBottom: 30,
        }}
      />
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          source={require("../assets/bulb.png")}
        />
      </View>

      <View style={styles.button}>
        <Button
          onPress={() => {requestCameraPermission(props);}}
          title="Continuar"
          color="#333"
          accessibilityLabel="Conectar a LED link"
        />
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  title_container: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    backgroundColor: "#eee"
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 50,
    color: "grey",
  },
  image_container: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  button: {
    width: "70%",
    marginLeft: "15%",
    marginTop: 25
  },
});

export default Power;