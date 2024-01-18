import { View, Text, Button, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount } from "wagmi";

const Home = () => {
  const insets = useSafeAreaInsets();
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  return (
    <View style={{ paddingTop: insets.top }}>
      <Pressable onPress={() => open()}>
        <Text>{address ? address : "Connect Wallet"}</Text>
      </Pressable>
    </View>
  );
};

export default Home;
