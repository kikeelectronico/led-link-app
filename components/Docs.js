import React, { useState, useEffect } from 'react';
import { ScrollView, View, Linking, StyleSheet, Button } from 'react-native';

import Menu from './Menu'
import StepItem from './StepItem'

const Docs = (props) => {

  return (
      <>
        
        <View style={styles.main_container}>
          <StepItem
            title="Documentación"
            text="Manual, repositorios y atribuciones."
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
          <ScrollView>
            <StepItem
              title="Sobre LED link"
              text="LED link es un dispositivo conectado que permite, gracias a su conexión a internet via WiFi, sincronizarse con el resto de LED link que comparten topic y servidor MQTT."
            />
            <StepItem
              title="Conexión a Internet"
              text="Para su correcto funcionamiento, LED link necesita una conexión WiFi con acceso a Internet. Las credenciales de la red WiFi pueden ser configuradas desde la sección configuración de esta app. "
            />
            <StepItem
              title="¿Cómo funciona?"
              text="Cada LED link tiene asociado un color. Este puede ser cambiado desde la sección de configuració de la app. Cuando varios LED link entran en contanto, encienden sus LEDs de forma simultanea y siguiendo una secuancia de colores. La secuencia se compone de los colores de cada uno de los LED link enlazados."
            />
            <StepItem
              title="Envio de datos"
              text="LED link solo envia su código de color. En ningún caso se comparte información del usuario o del propio LED link."
            />
            <StepItem
              title="Repositorio de código y hardware"
              text="El repositorio del código y del hardware se encuentra en: https://github.com/kikeelectronico/led-link"
            />
            <StepItem
              title="Atribuciones"
              text="Las atribuciones se encuentran en: https://github.com/kikeelectronico/led-link/attributions.txt"
            />
          
          </ScrollView>
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
  subtitle_container: {
    width: "100%",
    height: "15%",
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

export default Docs;