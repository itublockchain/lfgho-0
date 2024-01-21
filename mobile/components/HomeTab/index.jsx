import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import PagerView from "react-native-pager-view";

// Custom Components
import Card from "../Card";

// Import Images
import LeftArrow from "../../assets/png/left_arrow.png";
import RightArrow from "../../assets/png/right_arrow.png";

// Import Custom Functions
import { getHeight, getWidth } from "../../utils/measure";

// Images
import ETH from "../../assets/png/ethereum.png";
import MATIC from "../../assets/png/polygon.png";
import ARB from "../../assets/png/arbitrum.png";

const HomeTab = ({ type }) => {
  const [page, setPage] = useState(0);
  const pagerRef = useRef(null);

  useEffect(() => {
    setPage(0);
    pagerRef?.current.setPage(0);
  }, [type]);

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Pressable
          onPress={() => {
            pagerRef?.current.setPage(page - 1);
            if (page !== 0) {
              setPage((prev) => prev - 1);
            }
          }}
        >
          <Image source={LeftArrow} style={styles.arrow} />
        </Pressable>
        {type === "borrow" ? (
          <PagerView
            style={styles.pagerView}
            initialPage={0}
            ref={pagerRef}
            onPageScroll={(e) => {
              setPage(e.nativeEvent.position);
            }}
          >
            <View key="1" style={styles.card}>
              <Card
                type="borrow"
                image={ETH}
                name="Ethereum"
                symbol="ETH"
                avaliable_borrow_amount={918.54}
                apy={3.5}
              />
            </View>
            <View key="2" style={styles.card}>
              <Card
                type="borrow"
                image={MATIC}
                name="Polygon"
                symbol="MATIC"
                avaliable_borrow_amount={918.54}
                apy={2.8}
              />
            </View>
          </PagerView>
        ) : (
          <PagerView
            style={styles.pagerView}
            initialPage={0}
            ref={pagerRef}
            onPageScroll={(e) => {
              setPage(e.nativeEvent.position);
            }}
          >
            <View key="1" style={styles.card}>
              <Card
                type="repay"
                image={ETH}
                name="Ethereum"
                symbol="ETH"
                repay_amount={1.18}
                repay_amount_gho={918.54}
                liq_price={1.54}
              />
            </View>
            <View key="2" style={styles.card}>
              <Card
                type="repay"
                image={MATIC}
                name="Polygon"
                symbol="MATIC"
                repay_amount={725.65}
                repay_amount_gho={918.54}
                liq_price={10.9}
              />
            </View>
          </PagerView>
        )}
        <Pressable
          onPress={() => {
            pagerRef?.current.setPage(page + 1);
            if (page !== 1) {
              setPage((prev) => prev + 1);
            }
          }}
        >
          <Image source={RightArrow} style={styles.arrow} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#343670",
    paddingTop: getHeight(24),
  },
  inner_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrow: {
    width: 36,
    height: 36,
    marginTop: -getHeight(68),
    margin: 2,
  },
  pagerView: {
    width: getWidth(393 - 72) - 8,
    aspectRatio: 1,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 12,
  },
});

export default HomeTab;
