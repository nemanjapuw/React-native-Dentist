import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { ActivityIndicator, View, Image } from "react-native";
import { bindActionCreators } from "redux";
import { Images, BaseColor } from "@config";
import styles from "./styles";
import { store } from "../../store";
import * as Utils from "@utils";
class Loading extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    try {
      if(store.getState().auth.login.success){
        return this.props.navigation.navigate("Digital");
      }
    } catch (err) {
    
    }
    this.props.navigation.navigate("Main");
  }
    
  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image 
            source={Images.splash}
            style={styles.splash}
          />          
        </View>
        <ActivityIndicator
          size="large"
          color={BaseColor.textPrimaryColor}
          style={{
            position: "absolute",
            top: 260,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center"
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
