import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native';

import StepItem from './StepItem'

const SetupServers = (props) => {

  return (
    <View>
      <StepItem
        title="Servidores"
        text="Configura los servidores de LED link."
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

      <View style={styles.form}>
        <Text>Servidor OTA</Text>
        <TextInput
          style={styles.input}
          value={props.ota}
          onChangeText={props.setOta}
        />
        <Text>Servidor MQTT</Text>
        <TextInput
          style={styles.input}
          value={props.broker}
          onChangeText={props.setBroker}
        />
        <Text>Topic MQTT</Text>
        <TextInput
          style={styles.input}
          value={props.topic}
          onChangeText={props.setTopic}
        />
      </View>

      <View style={styles.button}>
        <Button
          onPress={() => {props.sendServer()}}
          title="Guardar"
          color="#333"
          accessibilityLabel="Guardar cambios"
        />
      </View>
      <View style={styles.button}>
        <Button
          onPress={() => {props.setStep("setup")}}
          title="Atras"
          color="#333"
          accessibilityLabel="No guardar cambios"
        />
      </View> 

    </View>
    
  );
}

const styles = StyleSheet.create({
  form: {
    width: "70%",
    marginLeft: "15%",
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomColor: "#ddd",
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: "70%",
    marginLeft: "15%",
    marginTop: 25
  },
});

export default SetupServers;