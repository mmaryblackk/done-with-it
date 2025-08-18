import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

interface IAsyncStorageItemRaw {
  value: any;
  timestamp: number;
}

const PREFIX = "cache";
const EXPIRY_IN_MINUTES = 5;

const store = async (key: string, value: any) => {
  try {
    const item: IAsyncStorageItemRaw = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(PREFIX + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item: IAsyncStorageItemRaw) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestamp);
  return now.diff(storedTime, "minutes") > EXPIRY_IN_MINUTES;
};

const get = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(PREFIX + key);
    const item = JSON.parse(value as string) as IAsyncStorageItemRaw;

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorage.removeItem(PREFIX + key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};
