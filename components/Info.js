import React, { useState, useEffect } from 'react';
import { ScrollView, View, Linking, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';

import Menu from './Menu'
import StepItem from './StepItem'

const Info = (props) => {

  const [available_app_version, setAvailableAppVersion] = useState("1");
  const [available_firmware_version, setAvailableFirmwareVersion] = useState("1");
  
  var config = {
    databaseURL: "https://led-link-app-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "led-link-app",
  };
  //firebase.initializeApp(config);
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  
  useEffect(() => {
    firebase.database().ref('/').on('value', function (snapshot) {
      setAvailableAppVersion(snapshot.val().available_app_version.code.toString())
      setAvailableFirmwareVersion(snapshot.val().available_firmware_version.code.toString())
    });
  }, []);

  return (
      <>
        
        <View style={styles.main_container}>
          <StepItem
            title="Información"
            text="Información sobre el dispositivo y la app"
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
              title="Nombre"
              text={props.device.name}
            />
            <StepItem 
              title="MAC" 
              text={props.device.id}
            />
            <StepItem 
              title="Color" 
              text={props.color}
            />
            <StepItem 
              title="Versión de firmware" 
              text={ 
                props.firmware_version !== available_firmware_version
                ?
                props.firmware_version + " (disponible versión " + available_firmware_version + ")"
                :
                props.firmware_version
              }
            />
            {
              props.firmware_version !== available_firmware_version ?
                <>
                  <View style={styles.button}>
                    <Button
                      onPress={() => {props.updateFirmware()}}
                      title="Actualizar"
                      color="#333"
                      accessibilityLabel="Actualizar el firmware de LED link"
                    />
                  </View>
                  <View
                    style={{
                      borderBottomColor: "#ddd",
                      borderBottomWidth: 1,
                      marginLeft: 80,
                      marginRight: 80,
                      marginTop: 30,
                    }}
                  />
                </>
              :
                <></>
            }
            
            <StepItem 
              title="Versión de App" 
              text={ 
                props.app_version !== available_app_version
                ?
                props.app_version + " (disponible versión " + available_app_version + ")"
                :
                props.app_version
              }
            />

            {
              props.app_version !== available_app_version ?
                <>
                  <View style={styles.button}>
                    <Button
                      onPress={() => {Linking.openURL(props.ota + "/app/ledlink.apk")}}
                      title="Actualizar"
                      color="#333"
                      accessibilityLabel="Actualizar la app"
                    />
                  </View>
                  <View
                    style={{
                      borderBottomColor: "#ddd",
                      borderBottomWidth: 1,
                      marginLeft: 80,
                      marginRight: 80,
                      marginTop: 30,
                    }}
                  />
                </>
              :
                <></>
            }
            <StepItem 
              title="" 
              text=""
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

export default Info;