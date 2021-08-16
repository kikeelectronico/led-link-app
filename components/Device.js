import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const Device = (props) => {
  const color = "#" + props.device.name.split("#")[1]
  return (
    <Pressable onPress={() => {props.connect(props.device)}}>
      <View style={styles.container}>
        <View style={styles.name_container}>
          <View style={[styles.color_circle,{backgroundColor: color}]}></View>
          <Text style={styles.name}>{props.device.name}</Text>
        </View>
        <View
          style={styles.separador}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "70%",
    marginLeft: "15%",
  },
  name_container: {
    flexDirection: "row",
    alignItems: 'center'
  },
  name: {
    fontSize: 20,
  },
  separador: {
    width: "100%",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 5,
  },
  color_circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: "#bbb",
    borderWidth: 1,
    marginRight: 10
  },
});

export default Device;