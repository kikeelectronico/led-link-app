import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import StepItem from './StepItem'

const Updating = (props) => {

  return (
    <View>
      <StepItem
        title="Actualizando"
        text="Tu LED link se va a actualizar. Este proceso puede tardar varios minutos durante los cuales no vas a poder conectarte a él."
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
          source={require("../assets/rocket.png")}
        />
      </View>

      <View style={styles.button}>
        <Button
          onPress={() => {props.sendUpdateFirmware()}}
          title="Actualizar"
          color="#333"
          accessibilityLabel="Actualizar"
        />
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
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

export default Updating;