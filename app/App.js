import React, { Component } from "react";
import { store, persistor } from "./store";
import { StatusBar } from "react-native";
import { BaseColor } from "@config";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./navigation";
import * as RNLocalize from "react-native-localize";
import * as Utils from "@utils";

console.disableYellowBox = true;
export default class index extends Component {
  constructor(props) {
    super(props);
    Utils.setI18nConfig();
    this.state = {
      app_background:false,
    };
    persistor.forceRefresh = this.forceRefresh.bind(this);
  }
  componentDidMount() {
    StatusBar.setBackgroundColor(BaseColor.primaryColor, true);
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }
  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }
  handleLocalizationChange = () => {
    Utils.setI18nConfig();
    this.forceUpdate();
  };
  forceRefresh(){
    this.forceUpdate();
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App /> 
        </PersistGate>
      </Provider>
    );
  }
}
