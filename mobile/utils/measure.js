import { Dimensions } from "react-native";

const WIDTH = 393;
const HEIGHT = 852;

export const getWidth = (width = WIDTH) => {
  return Dimensions.get("window").width * (width / WIDTH);
};

export const getHeight = (height = HEIGHT) => {
  return Dimensions.get("window").height * (height / HEIGHT);
};
