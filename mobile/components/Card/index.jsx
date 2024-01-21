import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { router } from "expo-router";

// Import Images
import Green from "../../assets/png/danger_green.png";
import Red from "../../assets/png/danger_red.png";
import Orange from "../../assets/png/danger_orange.png";

const Card = ({
  image,
  name = "Feyyaz",
  symbol = "FEYO",
  type = "borrow", // borrow, repay
  avaliable_borrow_amount = 0,
  apy,
  repay_amount = 0,
  repay_amount_gho = 0,
  liq_price,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.symbol_info_container}>
        <Image source={image} style={styles.symbol_image} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>
      </View>
      {type === "borrow" ? (
        <View style={styles.borrow_stats_container}>
          <View style={styles.borrow_stats_row}>
            <Text style={styles.stats_title}>Avaliable to borrow:</Text>
            <Text style={styles.stats_amount}>
              {avaliable_borrow_amount} GHO
            </Text>
          </View>
          <View style={styles.borrow_stats_row}>
            <Text style={styles.stats_title}>APY, variable:</Text>
            <Text style={styles.stats_amount}>{apy}%</Text>
          </View>
        </View>
      ) : (
        <View style={styles.borrow_stats_container}>
          <View style={styles.borrow_stats_row}>
            <Text style={styles.stats_title}>Amount of GHO:</Text>
            <Text style={styles.stats_amount}>{repay_amount_gho} GHO</Text>
          </View>
          <View style={styles.borrow_stats_row}>
            <Text style={styles.stats_title}>Amount of {symbol}:</Text>
            <Text style={styles.stats_amount}>
              {repay_amount} {symbol}
            </Text>
          </View>
          <View style={styles.borrow_stats_row}>
            <Text style={styles.stats_title}>Liquidate risk:</Text>
            <View style={styles.stats_amount_danger}>
              <Text style={styles.stats_amount}>{liq_price}%</Text>
              <Image source={Green} style={styles.danger_image} />
            </View>
          </View>
        </View>
      )}
      <View style={styles.button_area}>
        <Pressable
          style={[
            styles.button_container,
            type === "borrow"
              ? { backgroundColor: "#E0D5FF" }
              : { backgroundColor: "#C9DBFF" },
          ]}
          onPress={() => {
            type === "borrow" ? router.push("Borrow") : console.log("Repay");
          }}
        >
          <Text style={styles.button}>
            {type === "borrow" ? "Borrow" : "Repay"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202253",
    width: "100%",
    borderRadius: 12,
    paddingTop: 36,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  symbol_info_container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
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
  stats_amount_danger: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  button_area: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button_container: {
    backgroundColor: "#88C1F5",
    paddingVertical: 8,
    paddingHorizontal: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 20,
    fontWeight: "500",
    color: "#111627",
  },
  danger_image: {
    width: 24,
    height: 24,
  },
});

export default Card;
