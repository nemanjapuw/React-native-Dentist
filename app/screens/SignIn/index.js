import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ImageBackground, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
import { BaseStyle, BaseColor, Images, Icons } from "@config";
import { Text, Button } from "@components";
import styles from "./styles";
import AlertPro from "react-native-alert-pro";
import { store } from "../../store";
import Dialog from "react-native-dialog";
import * as Utils from "@utils";
import Toast from 'react-native-easy-toast'
import md5 from 'md5';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errMsg: Utils.translate("login-faild.msg"),
      dialogVisible: false,
      email: "",
      password: "",      
      success: {
        email: true,
        password: true
      }
    };
  }

  //login 
  onLogin() {
    const { email, password, success } = this.state;
    const { navigation } = this.props;

    if (!Utils.EMAIL_VALIDATE.test(String(email).toLowerCase()) || password == "") {
      this.setState({
        dialogVisible: true,
        success: {
          ...success,
          email: Utils.EMAIL_VALIDATE.test(String(email).toLowerCase()),
          password: false
        }
      });
    } else {
      this.setState(
        {
          loading: true
        },
        () => {
          //this.props.navigation.navigate("Digital");                 
          this.props.actions.authentication(true, this.state, response => {
            if (response.success) {                            
              navigation.navigate("Loading");
            } else {
              if (response.data == "deActive") {
                this.setState({ errMsg: Utils.translate("login-faild.unActiveMsg") })
              }
              this.setState({
                loading: false
              });
              this.AlertPro.open();
            }
          });
        }
      );
    }
  }

  //login faied dialog lose
  loginDlgClose() {
    this.setState({ dialogVisible: false })
  }

  render() {
    const { navigation } = this.props;
    const { email, password, verification, loading, success, errMsg } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground source={Images.signin_back} style={styles.signin_back}>
          <View style={[styles.signin_topview, { marginTop: 20 }]}>
            {/* <Image source={Images.signin_usericon} style={{ width: 25, height: 25, borderRadius: 7 }} />
            <Text style={styles.signin_text}>
              {Utils.translate("signin.label")}
            </Text> */}
          </View>
          <View style={styles.contain}>
            <View style={[BaseStyle.viewInput]}>
              <Image
                source={Icons.icon_email}
                style={BaseStyle.imgInput}
              />
              <TextInput
                style={BaseStyle.textInput0}
                placeholder={Utils.translate("signin.email")}
                onChangeText={text => this.setState({ email: text })}
                autoCorrect={false}
                placeholderTextColor={
                  success.email ? BaseColor.filedGrayColor : BaseColor.errorColor
                }
                value={email}
              />
            </View>
            <View style={[BaseStyle.viewInput, { marginTop: 20 }]}>
              <Image
                source={Icons.icon_password}
                style={BaseStyle.imgInput}
              />
              <TextInput
                style={[BaseStyle.textInput0]}
                secureTextEntry={true}
                placeholder={Utils.translate("signin.pass")}
                onChangeText={text => this.setState({ password: text })}
                autoCorrect={false}
                placeholderTextColor={
                  success.password ? BaseColor.filedGrayColor : BaseColor.errorColor
                }
                value={password}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity style={{
                width: "90%",
                marginVertical: -5, flex: 1,
                flexDirection: 'row', justifyContent: 'flex-end'
              }}
                onPress={() => navigation.navigate("Forgot")}
              >
                <Text style={[styles.txtSignin, { color: BaseColor.primaryColor }]}>
                  {Utils.translate("signin.forgotpassword")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: "100%", marginTop: 60 }}>
              <Button
                full
                loading={loading}
                onPress={() => {
                  this.onLogin();
                }}
              >
                {Utils.translate("signin.sign-in")}
              </Button>
            </View>
            <View style={{ flexDirection: "row", textAlign: 'center', marginTop: 10 }}>
              <Text style={styles.txtSignin}>
                {Utils.translate("signin.new-user")}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={[styles.txtSignin, { paddingLeft: 20, color: BaseColor.primaryColor }]}>
                  {Utils.translate("signin.sign-up")}
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => navigation.navigate("DentalNewService")}>
                <Text style={[styles.txtSignin, { paddingLeft: 20, color: BaseColor.primaryColor }]}>
                  Test
                          </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Paypal")}>
                <Text style={[styles.txtSignin, { paddingLeft: 20, color: BaseColor.primaryColor }]}>
                  Test  paypal
                          </Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <Dialog.Container visible={this.state.dialogVisible}
            contentStyle={{ borderRadius: 10 }}
          >
            <Dialog.Title >{Utils.translate("login-faild.title")}</Dialog.Title>
            <Dialog.Description>
              {Utils.translate("signin.incorrect_user")}
            </Dialog.Description>
            <Dialog.Button label={Utils.translate("signin.close")} onPress={() => { this.loginDlgClose(); }} />
          </Dialog.Container>
          <AlertPro
            ref={ref => {
              this.AlertPro = ref;
            }}
            onCancel={() => this.AlertPro.close()}
            title={Utils.translate("login-faild.title")}
            message={errMsg}
            showConfirm={false}
            textCancel={Utils.translate("form.close")}
            customStyles={
              {
                mask: {
                  backgroundColor: BaseColor.transparent
                },
                container: {
                  borderWidth: 1,
                  borderColor: BaseColor.primaryColor,
                  shadowColor: BaseColor.blackColor,
                  shadowOpacity: 0.1,
                  shadowRadius: 10
                },
                buttonConfirm: {
                  backgroundColor: BaseColor.primaryColor
                }
              }
            }
          />
        </ImageBackground>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
