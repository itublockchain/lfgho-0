import { useState } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { View, Pressable, StyleSheet, Image } from "react-native";

import Ethereum from "../../assets/png/ethereum.png";
import Arbitrum from "../../assets/png/arbitrum.png";
import Polygon from "../../assets/png/polygon.png";
import Optimism from "../../assets/png/Optimism.png";

const images = [
  {
    name: "ethereum",
    image: Ethereum,
  },
  {
    name: "arbitrum",
    image: Arbitrum,
  },
  {
    name: "polygon",
    image: Polygon,
  },
  {
    name: "optimism",
    image: Optimism,
  },
];

function Feyyazcigim({
  chain = "ethereum",
  onSwitch = () => {},
  disabled = false,
}) {
  const [direction, setDirection] = useState(0); // ["left", "right"
  const left = useSharedValue(0); // 0-45
  const rotation = useSharedValue(0);

  const config = {
    duration: 1200,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      left: withTiming(left.value, config),
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={() => {
        setDirection((prevDirection) => (prevDirection === 0 ? 1 : 0));
        onSwitch();
        if (direction === 0) {
          rotation.value = withTiming(180, config, () => {
            rotation.value = 180; // Animasyon tamamlandığında değeri sıfırla
          });
          return;
        }
        if (direction === 1) {
          rotation.value = withTiming(360, config, () => {
            rotation.value = 0; // Animasyon tamamlandığında değeri sıfırla
          });
          return;
        }
      }}
      disabled={disabled}
    >
      <View style={[styles.switch, direction === 1 && styles.switched]}>
        <Animated.View style={style}>
          <Image
            source={images.find((el) => el.name === chain).image}
            style={styles.toggle}
          />
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  switch: {
    width: 85,
    backgroundColor: "#111627",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  switched: {
    backgroundColor: "#635993",
  },
  toggle: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
});

export default Feyyazcigim;
