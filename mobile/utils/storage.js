import AsyncStorage from "@react-native-async-storage/async-storage";

async function storeData(data = "") {
  try {
    if (typeof data !== "string") {
      data = JSON.stringify(data);
    }

    await AsyncStorage.setItem("chains", data);
  } catch (e) {
    console.log(e);
  }
}

async function readData() {
  try {
    const data = await AsyncStorage.getItem("chains");
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
  }
}

export { storeData, readData };
