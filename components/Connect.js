import React from 'react';
import { View, Image, StyleSheet, Button, PermissionsAndroid } from 'react-native';

import StepItem from './StepItem'
import Device from './Device'

const Connect = (props) => {

  return (
    <View>
      <StepItem
        title="Paso dos"
        text="Encuentra el LED link y conéctate a él."
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

      {props.devices_list.length === 0 ?
        <View style={styles.image_container}>
          <Image
            style={styles.image}
            source={require("../assets/flashlight.png")}
          />
        </View>
      :
        <>
          {props.devices_list.map((device) => {
            return <Device device={device} connect={props.connectAndRead} key={device.name}/>
          })}
        </>
      }
        
        
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

export default Connect;