import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import Markdown from 'react-native-simple-markdown'


const StepItem = (props) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.text}>{props.text}</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  item: {
    width: "86%",
    marginLeft: "7%",
    marginTop: 20,
  },
  title: {
    fontSize: 25,
  },
  text: {
    width: "100%",
    fontSize: 17,
    marginTop: 10,
    color: "#555",
  },
});

export default StepItem;