import React from "react";
import { Platform, TouchableOpacity } from "react-native";
let TouchableOpacityTV = TouchableOpacity;

if (Platform.OS === "android" && Platform.isTV) {
  const TouchableOpacityAndroidTV = (props, ref) => {
    /** Make sure presses on AndroidTV are sent only once */
    const onPressFilter = (e) => {
      const { onPress } = props;
      const { eventKeyAction } = e;
      if (onPress && eventKeyAction === 1 /*up trigger*/) {
        onPress(e);
      }
    };
    return (
      <TouchableOpacity
        {...props}
        ref={ref}
        onPress={onPressFilter}
        clickable={false}
      />
    );
  };
  TouchableOpacityTV = TouchableOpacityAndroidTV;
}

export default React.forwardRef(TouchableOpacityTV);
