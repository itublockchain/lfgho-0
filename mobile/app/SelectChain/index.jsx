import { useState, useReducer, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAccount, useSignMessage } from "wagmi";

// Import Custom Functions
import Feyyazcigim from "../../lib/feyyaz";
import { getHeight, getWidth } from "../../utils/measure";
import { storeData } from "../../utils/storage";
// import { createAccounts } from "../../utils/functions/deployContracts";

const chains = [
  {
    name: "Ethereum",
    cname: "ethereum",
  },
  {
    name: "Polygon",
    cname: "polygon",
  },
  {
    name: "Arbitrum",
    cname: "arbitrum",
  },
  {
    name: "Optimism",
    cname: "optimism",
  },
];

const init = {
  ethereum: false,
  polygon: false,
  arbitrum: false,
  optimism: false,
};

function reducer(state, action) {
  if (action.type === "change") {
    return {
      ...state,
      [action.chain]: !state[action.chain],
    };
  }
}

const SelectChain = () => {
  const { address } = useAccount();
  const { signMessage } = useSignMessage();
  const insets = useSafeAreaInsets();
  const [status, setStatus] = useState("disabled"); // disabled, processing, enabled
  const [state, dispatch] = useReducer(reducer, init);

  useEffect(() => {
    if (
      !state.ethereum &&
      !state.polygon &&
      !state.arbitrum &&
      !state.optimism
    ) {
      setStatus("disabled");
    }
    if (state.ethereum || state.polygon || state.arbitrum || state.optimism) {
      setStatus("enabled");
    }
  }, [state]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>SELECT AT LEAST ONE CHAIN</Text>
      {chains.map((chain, i) => {
        return (
          <View style={styles.switch_container} key={i}>
            <Feyyazcigim
              chain={chain.cname}
              onSwitch={() =>
                dispatch({
                  type: "change",
                  chain: chain.cname,
                })
              }
              disabled={status === "processing"}
            />
            <Text style={styles.switch_title}>{chain.name}</Text>
          </View>
        );
      })}
      <Pressable
        onPress={async () => {
          setStatus("processing");
          await storeData(state);
          // await createAccounts(
          //   (address = address),
          //   (signMessage = signMessage)
          // );
          router.replace("Home");
        }}
        style={[
          styles.next,
          (status === "disabled" || status === "processing") && styles.disabled,
        ]}
        disabled={status === "disabled" || status === "processing"}
      >
        <Text style={styles.text}>
          {status === "processing" ? "WAIT" : "NEXT"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111127",
    paddingHorizontal: getWidth(38),
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginTop: getHeight(265),
    marginBottom: getHeight(14),
  },
  switch_container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: getHeight(16),
    gap: 10,
  },
  switch_title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  next: {
    backgroundColor: "#B59BFF",
    width: 120,
    padding: 12,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: getHeight(120),
    marginLeft: getWidth(200),
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default SelectChain;
