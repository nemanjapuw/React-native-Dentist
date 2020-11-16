import React, { Component } from "react";
import { View, CheckBox, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import { BaseStyle, BaseColor, Images, Icons } from "@config";
import { Header, Icon, Button, Text } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import Toast from 'react-native-easy-toast';

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      success: {
        email: true
      }
    };
  }

  //on recover 
  onRecover() {
    const { navigation } = this.props;
    let { email, success } = this.state;
    if (email == "" || !Utils.EMAIL_VALIDATE.test(String(email).toLowerCase()) || password == "" || password != c_password || birthday == "") {
      this.setState({
        success: {
          ...success,
          email: Utils.EMAIL_VALIDATE.test(String(email).toLowerCase()),
        }
      }, () => {
        let success = this.state.success;
        if (!(success.email)) {
          this.refs.toast.show(Utils.translate("messages.input-email-error"));
        }
      });
    } else {
      this.setState(
        {
          loading: true
        },
        () => {
          // this.props.actions.registration(this.state, response => {
          // if (response.success) {
          //     navigation.navigate("Loading");
          //   } else {
          //     this.setState({
          //       loading: false
          //     });
          //     this.AlertPro.open();
          //   }
          // });
        }
      );
    }
  }
  render() {
    const { navigation } = this.props;
    let { loading, isSelected = false, setSelection, surname, name, nickname, email, password, c_password, sex, age, phonenumber, motto, success } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Toast
          ref="toast"
          position='top'
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          style={{ backgroundColor: BaseColor.kashmir }}
          textStyle={{ color: BaseColor.whiteColor, fontWeight: "bold" }}
        />
        <ScrollView>
          <View style={styles.container}>
            <ImageBackground source={Images.signin_back} style={styles.signup_back}>
              <View style={styles.signup_topview}>
                <Image source={Icons.icon_refresh_head} style={{ width: 22, height: 25, borderRadius: 2 }} />
                <Text style={styles.signup_text}>
                  {Utils.translate("forgot.label")}
                </Text>
              </View>
              <View style={styles.main_contain}>
                <Image source={Icons.icon_refresh_body} style={{ width: 40, height: 40, borderRadius: 2 }} />
                <Text style={styles.signup_labelTop}>
                  {Utils.translate("forgot.label")}
                </Text>
                <Text style={styles.signup_labelTop}>
                  {Utils.translate("forgot.forgot_pass")}
                </Text>
                <Text style={styles.signup_labelSecond}>
                  {Utils.translate("forgot.after_msg")}
                </Text>
                <View style={[BaseStyle.viewInput, { marginTop: 20 }]}>
                  <Image
                    source={Icons.icon_email}
                    style={BaseStyle.imgInput}
                  />
                  <TextInput
                    style={[BaseStyle.textInput0]}
                    placeholder={Utils.translate("signup.login_email")}
                    value={email}
                  />
                </View>
                <View style={{
                  width: "100%",
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginBottom: 36,
                  alignItems: "center"
                }}>
                  <View style={{ width: "100%" }}>
                    <Button
                      full
                      loading={loading}
                      onPress={() => this.onRecover()}
                      style={{ backgroundColor: BaseColor.greenColor }}
                    >
                      {Utils.translate("forgot.recover")}
                    </Button>
                  </View>
                  <View style={{ flexDirection: "row", textAlign: "center", alignItems: "center", marginTop: 10 }}>
                    <Text style={styles.signup_labelSecond}>
                      {Utils.translate("forgot.not_account")}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                      <Text style={[styles.signup_link, { paddingLeft: 10 }]}>
                        {Utils.translate("forgot.register")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Forgot);
