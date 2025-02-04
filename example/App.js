import React, { useState } from "react";
import { Button, Platform, StyleSheet, Switch, Text, View } from "react-native";
import DateTimePickerModal from "./src";

const App = () => {
  const [show, setShow] = useState(false);
  const [pickerMode, setPickerMode] = useState(null);
  const [inline, setInline] = useState(false);

  const showDatePicker = () => {
    setPickerMode("date");
    setShow(true);
  };

  const showTimePicker = () => {
    setPickerMode("time");
    setShow(true);
  };

  const showDateTimePicker = () => {
    setPickerMode("datetime");
    setShow(true);
  };

  const hidePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date) => {
    // In order to prevent the double-shown popup bug on Android, picker has to be hidden first (https://github.com/react-native-datetimepicker/datetimepicker/issues/54#issuecomment-618776550)
    hidePicker();
    console.warn("A date has been picked: ", date);
  };

  return (
    <View style={style.root}>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <Button title="Show Time Picker" onPress={showTimePicker} />
      <Button title="Show DateTime Picker" onPress={showDateTimePicker} />
      {Platform.OS === "ios" && (
        <View style={style.inlineSwitchContainer}>
          <Text style={style.inlineSwitchText}>Display inline?</Text>
          <Switch value={inline} onValueChange={setInline} />
        </View>
      )}
      <DateTimePickerModal
        isVisible={show}
        mode={pickerMode}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        display={inline ? "inline" : undefined}
        date={new Date()}
      />
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inlineSwitchContainer: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
  },
  inlineSwitchText: {
    fontSize: 18,
    marginRight: 8,
  },
});

export default App;
