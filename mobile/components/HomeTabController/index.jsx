import { View, StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

// Import Custom Functions
import { getWidth } from "../../utils/measure";

const HomeTabController = ({ setType }) => {
  const left = useSharedValue(0);
  const left_opacity = useSharedValue(1);
  const right_opacity = useSharedValue(0.5);

  const config = {
    duration: 600,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const _left = useAnimatedStyle(() => {
    return {
      left: withTiming(left.value, config),
    };
  });

  const _left_opacity = useAnimatedStyle(() => {
    return {
      opacity: withTiming(left_opacity.value, config),
    };
  });

  const _right_opacity = useAnimatedStyle(() => {
    return {
      opacity: withTiming(right_opacity.value, config),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.switch_container}>
        <Pressable
          style={styles.button}
          onPress={() => {
            left.value = 0;
            left_opacity.value = 1;
            right_opacity.value = 0.5;
            setType("borrow");
          }}
        >
          <Animated.Text style={[styles.button_text, _left_opacity]}>
            Borrow
          </Animated.Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            left.value = (getWidth() - 36) / 2;
            left_opacity.value = 0.5;
            right_opacity.value = 1;
            setType("repay");
          }}
        >
          <Animated.Text style={[styles.button_text, _right_opacity]}>
            Repay
          </Animated.Text>
        </Pressable>
        <Animated.View style={[styles.fill, _left]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#343670",
    padding: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  switch_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
    marginHorizontal: 10,
  },
  button: {
    width: (getWidth() - 36) / 2,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  button_text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#88C1F5",
    opacity: 0.5,
  },
  button_text_active: {
    opacity: 1,
  },
  fill: {
    position: "absolute",
    width: (getWidth() - 36) / 2,
    height: 46,
    backgroundColor: "#202253",
    borderRadius: 8,
    zIndex: -1,
  },
});

export default HomeTabController;
