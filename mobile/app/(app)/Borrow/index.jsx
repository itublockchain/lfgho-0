import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

// Import Images
import Back from "../../../assets/png/back.png";
import Exchange from "../../../assets/png/exchange.png";

// Import Custom Functions
import { getHeight, getWidth } from "../../../utils/measure";

// Images
import Ethereum from "../../../assets/png/ethereum.png";

const Borrow = () => {
  const insets = useSafeAreaInsets();
  const [eth, setEth] = useState("0");
  const [matic, setMatic] = useState("0");

  useEffect(() => {
    setMatic(((parseFloat(eth) * 1) / 0.00032).toString());
  }, [eth]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <StatusBar barStyle="light-content" />
          <View style={styles.header}>
            <Pressable hitSlop={16} onPress={() => router.back()}>
              <Image source={Back} style={styles.back} />
            </Pressable>
            <Text style={styles.title}>Borrow</Text>
          </View>
          <View style={styles.symbol_info_container}>
            <Image source={Ethereum} style={styles.symbol_image} />
            <View>
              <Text style={styles.name}>Ethereum</Text>
              <Text style={styles.symbol}>ETH</Text>
            </View>
          </View>
          <View style={styles.borrow_stats_container}>
            <View style={styles.borrow_stats_row}>
              <Text style={styles.stats_title}>Avaliable to borrow:</Text>
              <Text style={styles.stats_amount}>2897.51 MATIC</Text>
            </View>
            <View style={styles.borrow_stats_row}>
              <Text style={styles.stats_title}>APY, variable:</Text>
              <Text style={styles.stats_amount}>3.5%</Text>
            </View>
          </View>
          <View style={styles.exchange_container}>
            <View style={styles.from_amount_container}>
              <TextInput
                keyboardType="decimal-pad"
                style={styles.from_amount}
                value={eth}
                onChange={(e) => setEth(e.nativeEvent.text)}
              />
              <Text style={styles.from_title}>ETH</Text>
            </View>
            <Pressable>
              <Text style={styles.max_button}>MAX</Text>
            </Pressable>
            <Image source={Exchange} style={styles.exchange_image} />
            <View style={styles.to_amount_container}>
              <TextInput
                keyboardType="decimal-pad"
                style={styles.to_amount}
                value={matic}
                editable={false}
              />
              <Text style={styles.to_title}>MATIC</Text>
            </View>
          </View>
          <View style={styles.button_area}>
            <Pressable
              style={[styles.button_container, { backgroundColor: "#88C1F5" }]}
              onPress={() => router.push("Home")}
            >
              <Text style={styles.button}>Borrow</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111127",
  },
  header: {
    borderColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    marginTop: getHeight(16),
  },
  back: {
    width: 32,
    height: 32,
    marginLeft: getWidth(24),
  },
  symbol_info_container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
    marginHorizontal: getWidth(48),
    marginTop: getHeight(54),
  },
  symbol_image: {
    width: 60,
    height: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  symbol: {
    fontSize: 16,
    fontWeight: "500",
    color: "#C9DBFF",
  },
  borrow_stats_container: {
    gap: 4,
    marginHorizontal: getWidth(48),
  },
  borrow_stats_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stats_title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#C9DBFF",
  },
  stats_amount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#C9DBFF",
  },
  exchange_container: {
    marginHorizontal: getWidth(48),
    marginTop: getHeight(64),
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#C9DBFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  from_amount_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 4,
  },
  from_amount: {
    borderColor: "#C9DBFF",
    flex: 1,
    height: 60,
    fontSize: 36,
    color: "#fff",
  },
  from_title: {
    fontSize: 36,
    fontWeight: "600",
    color: "#fff",
  },
  max_button: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  exchange_image: {
    width: 36,
    height: 36,
    marginVertical: 24,
  },
  to_amount_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 4,
  },
  to_amount: {
    borderColor: "#C9DBFF",
    flex: 1,
    height: 60,
    fontSize: 36,
    color: "#fff",
  },
  to_title: {
    fontSize: 36,
    fontWeight: "600",
    color: "#fff",
  },
  button_area: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button_container: {
    width: getWidth(393 - 96),
    backgroundColor: "#88C1F5",
    paddingVertical: 8,
    paddingHorizontal: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
    height: 46,
  },
  button: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111627",
  },
});

export default Borrow;
