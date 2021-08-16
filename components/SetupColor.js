import React, { useState } from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker'

import StepItem from './StepItem'

const SetupColor = (props) => {

  const [old_color, setOldColor] = useState(props.color);

  return (
    <View>
      <StepItem
        title="Color"
        text="Configura el color que debe representa a tu LED link."
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

      <View style={styles.color_picker}>
				<ColorPicker
					color={props.color}
					swatchesOnly={false}
					thumbSize={15}
					sliderSize={20}
					noSnap={true}
					row={false}
					swatches={false}
					discrete={false}
          onColorChange={props.setColor}
          onColorChangeComplete={props.setColor}
				/>
			</View>   

      <View style={styles.button}>
        <Button
          onPress={() => {props.sendColor()}}
          title="Guardar"
          color="#333"
          accessibilityLabel="Guardar cambios"
        />
      </View> 
      <View style={styles.button}>
        <Button
          onPress={() => {props.setColor(old_color); props.setStep("setup")}}
          title="Atras"
          color="#333"
          accessibilityLabel="No guardar cambios"
        />
      </View> 

      
    </View>
    
  );
}

const styles = StyleSheet.create({
  color_picker: {
    width: "80%",
    height: 300,
    marginLeft: "10%",
  },
  button: {
    width: "70%",
    marginLeft: "15%",
    marginTop: 25
  },
});

export default SetupColor;