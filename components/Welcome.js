import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import StepItem from './StepItem'

const Welcome = (props) => {

  return (
      <>
        <View style={styles.title_container}>
          <Text style={styles.title}>
            LED link
          </Text>
        </View>
        <View>
          <View style={styles.subtitle_container}>
            <Text style={styles.subtitle}>Comencemos con la configuración</Text>
          </View>

          <View
            style={{
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              margin: 80,
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <StepItem
            title="Paso uno"
            text="Enciende tu LED link."
          />
          <StepItem 
            title="Paso dos" 
            text="Encuéntralo y conéctate a él."
          />

          <View style={styles.button}>
            <Button
              onPress={() => {props.setStep("power");}}
              title="Comenzar"
              color="#333"
              accessibilityLabel="Comenzar configuración"
            />
          </View>
        </View>
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
    height: "25%",
    justifyContent: "center",
  },
  subtitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 30,
  },
  button: {
    width: "70%",
    marginLeft: "15%",
    marginTop: 25
  },
});

export default Welcome;