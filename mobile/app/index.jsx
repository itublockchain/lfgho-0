import { useEffect } from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount } from "wagmi";

// Import Custom Functions
import { getWidth, getHeight } from "../utils/measure";

// Import SVG's
import Ghosts from "../assets/png/ghosts.png";

const Home = () => {
  const insets = useSafeAreaInsets();
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      router.replace("SelectChain");
    }
  }, [address]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Image source={Ghosts} style={styles.image} />
      <Pressable
        style={styles.button}
        onPress={() => open()}
        disabled={!!address}
      >
        <Text style={styles.button_text}>
          {address ? "Redirecting" : "Connect Wallet"}
        </Text>
      </Pressable>
      <Pressable onPress={() => router.replace("SelectChain")}>
        <Text>Geç</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111127",
  },
  image: {
    width: getWidth(385),
    height: getHeight(337),
    marginTop: getHeight(201),
    marginLeft: getWidth(4),
  },
  button: {
    padding: 12,
    backgroundColor: "#E0D5FF",
    width: getWidth(153),
    marginTop: getHeight(132),
    marginLeft: getWidth(120),
    borderRadius: getWidth(153),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button_text: {
    color: "#111127",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default Home;
