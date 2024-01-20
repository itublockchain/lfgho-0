import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Import Custom Functions
import { readData } from "../../../utils/storage";

const Home = () => {
  readData("chains").then((res) => console.log(res));

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text>HomePage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111127",
  },
});

export default Home;
