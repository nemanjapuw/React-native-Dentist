import * as Utils from "@utils";
import { store } from "../store"
const _TOKEN = () => {
  try {
    return store.getState().auth.login.data.token;
  } catch (error) {
    return null
  };
}


