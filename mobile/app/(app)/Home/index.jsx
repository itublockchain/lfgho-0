import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount } from "wagmi";

// Import Custom Functions
import { readData } from "../../../utils/storage";

// Import Images
import Copy from "../../../assets/png/copy.png";
import { getHeight, getWidth } from "../../../utils/measure";

// Import Components
import HomeTabController from "../../../components/HomeTabController";
import HomeTab from "../../../components/HomeTab";

const Home = () => {
  // readData("chains").then((res) => console.log(res));
  const [type, setType] = useState("borrow"); // borrow, repay
  console.log(type);
  // const [amount, setAmount] = useState(230.59);
  const [amount, setAmount] = useState(224.33);

  const insets = useSafeAreaInsets();
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.wallet_container}>
        <Pressable
          style={styles.wallet_details_container}
          onPress={() => open()}
        >
          <Text style={styles.wallet_details_text}>
            {address &&
              `${address.slice(0, 5)}...${address.slice(
                address.length - 5,
                address.length
              )}`}
          </Text>
        </Pressable>
        <Image source={Copy} style={styles.wallet_copy_clipboard} />
      </View>
      <View style={styles.amount_container}>
        <Text style={styles.amount_text}>{amount}</Text>
        <Text style={styles.amount_text}>GHO</Text>
      </View>
      <View style={styles.tab_view}>
        <HomeTabController type={type} setType={setType} />
        <HomeTab type={type} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111127",
  },
  wallet_container: {
    marginTop: getHeight(36),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  wallet_details_container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: "#88C1F5",
    borderRadius: 6,
    width: 200,
    marginLeft: 24,
  },
  wallet_details_text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111127",
  },
  wallet_copy_clipboard: {
    width: 18,
    height: 20,
  },
  amount_container: {
    marginTop: getHeight(15),
    paddingHorizontal: getWidth(24),
    justifyContent: "center",
    alignItems: "center",
  },
  amount_text: {
    fontSize: 40,
    fontWeight: "500",
    color: "#E0D5FF",
  },
  tab_view: {
    flex: 1,
    marginTop: getHeight(120),
  },
});

export default Home;
