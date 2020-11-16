import React, { Component } from "react";
import { View, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { BaseStyle, BaseColor, Images, Icons } from "@config";
import { Header, Icon, Button, Text } from "@components";
import DatePicker from 'react-native-datepicker';
import styles from "./styles";
import * as Utils from "@utils";
import AlertPro from "react-native-alert-pro";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { RadioButton } from 'react-native-paper';
import PhoneInput from 'react-native-phone-input'
import Toast from 'react-native-easy-toast';
import Moment from 'moment';
import ModalSelector from 'react-native-modal-selector'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isSelected: true,
      full_name: "",
      cpf_number: "",
      bio: Moment().format("DD/MM/YYYY"),
      zip_code: "",
      state_name: "",
      email: "",
      password: "",
      c_password: "",
      success: {
        full_name: true,
        cpf_number: true,
        bio: true,
        zip_code: true,
        state_name: true,
        email: true,
        password: true,
        c_password: true,
      }
    };
  }

  //on sign up 
  onSignUp() {
    const { navigation } = this.props;
    let { full_name, cpf_number, zip_code, bio, state_name, email, password, c_password, success } = this.state;
    
    if (full_name == "" || cpf_number == "" || zip_code == "" || bio == "" || state_name == "" || !Utils.EMAIL_VALIDATE.test(String(email).toLowerCase()) || password == "" || password != c_password) {
      this.setState({
        success: {
          ...success,
          full_name: full_name != "",
          cpf_number: cpf_number != "",
          bio: bio != "",
          zip_code: zip_code != "",
          state_name: state_name != "",
          email: Utils.EMAIL_VALIDATE.test(String(email).toLowerCase()),
          password: password != "",
          c_password: c_password != "" && password == c_password
        }
      }, () => {
        let success = this.state.success;
        if (!(success.full_name && success.cpf_number && success.zip_code && success.bio && success.state_name && success.email && success.password && success.c_password)) {
          this.refs.toast.show(Utils.translate("messages.input-value-error"));
        }
      });
    } else {      
      if (!this.state.isSelected) {
        this.refs.toast.show(Utils.translate("messages.terms-policy"));
      } else {
        this.setState(
          {
            loading: true
          },
          () => {
            debugger;
            this.props.actions.registration(this.state, response => {              
              if (response.success) {
                navigation.navigate("Loading");
              } else {
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
  }

  componentDidMount(){
    let state_list = Utils.stateList();  
    let label = state_list[0].label;
    this.setState({state_name: label});
  }

  render() {
    const { navigation } = this.props;
    let { loading, isSelected, full_name, cpf_number, bio, zip_code, state_name, email, password, c_password, success } = this.state;
    const state_list = Utils.stateList();    
    this.state.bio = Moment().format("DD/MM/YYYY");
    // this.state.uf = state_list[1].label;
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
                <Image source={Images.signup_icon} style={{ width: 22, height: 25, borderRadius: 2 }} />
                <Text style={styles.signup_text}>
                  {Utils.translate("signup.label")}
                </Text>
              </View>

              <View style={styles.main_contain}>
                <Text style={styles.signup_labelTop}>
                  {Utils.translate("signup.label")}
                </Text>
                <Text style={styles.signup_labelSecond}>
                  {Utils.translate("signup.create-account")}
                </Text>
                <View style={BaseStyle.viewInput}>
                  <Image
                    source={Icons.icon_full_name}
                    style={BaseStyle.imgInput}
                  />
                  <TextInput
                    style={BaseStyle.textInput0}
                    onChangeText={text => this.setState({ full_name: text })}
                    placeholder={Utils.translate("signup.full-name")}
                    autoCorrect={false}
                    placeholderTextColor={
                      success.full_name ? BaseColor.filedGrayColor : BaseColor.errorColor
                    }
                    value={full_name}
                  />
                </View>
                <View style={styles.main_topview}>
                  <View style={[BaseStyle.viewInput, { width: "60%" }]}>
                    <Image
                      source={Icons.icon_cpf}
                      style={BaseStyle.imgInput}
                    />
                    <TextInput
                      style={[BaseStyle.textInput0]}
                      placeholder={Utils.translate("signup.cpf")}
                      onChangeText={text => this.setState({ cpf_number: text })}
                      autoCorrect={false}
                      placeholderTextColor={
                        success.cpf_number ? BaseColor.filedGrayColor : BaseColor.errorColor
                      }
                      value={cpf_number}
                    />
                  </View>
                  <DatePicker
                    style={{ width: "40%", border: 0 }}
                    date={this.state.bio} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    format="DD/MM/YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 10,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        height: 42,
                        paddingLeft: 20,
                        borderWidth: 0,
                        backgroundColor: BaseColor.fieldColor,
                        borderRadius: 20
                      }
                    }}
                    value={bio}
                    iconSource={Icons.icon_calendar}
                    onDateChange={(date) => { this.setState({ bio: date }) }}
                  />
                </View>
                <View style={styles.main_topview}>
                  <View style={[BaseStyle.viewInput, { width: "80%" }]}>
                    <Image
                      source={Icons.icon_cardnumber}
                      style={BaseStyle.imgInput}
                    />
                    <TextInput
                      style={[BaseStyle.textInput0]}
                      placeholder={Utils.translate("signup.cro_number")}
                      onChangeText={text => this.setState({ zip_code: text })}
                      autoCorrect={false}
                      placeholderTextColor={
                        success.zip_code ? BaseColor.filedGrayColor : BaseColor.errorColor
                      }
                      value={zip_code}
                    />
                  </View>
                  <View style={{ width: "20%" }}>
                    <ModalSelector
                      data={state_list}
                      initValue="Select something states in Brazil!"
                      supportedOrientations={['landscape']}
                      accessible={true}
                      scrollViewAccessibilityLabel={'Scrollable options'}
                      cancelButtonAccessibilityLabel={'Cancel Button'}
                      cancelText ={'CANCELAR'}
                      onChange={(option) => { this.setState({ state_name: option.label }) }}>

                      <TextInput
                        style={[BaseStyle.textInput, { textAlign: "center", color:"#4e4e4e" }]}
                        editable={false}                       
                        onChangeText={text => this.setState({ state_name: text })}
                        autoCorrect={false}
                        placeholderTextColor={
                          success.state_name ? BaseColor.filedGrayColor : BaseColor.errorColor
                        }
                        value={state_name} />
                    </ModalSelector>
                  </View>
                </View>
                <Text style={[styles.signup_labelTop, { marginTop: 10 }]}>
                  {Utils.translate("signup.login_data")}
                </Text>
                <View style={[BaseStyle.viewInput, { marginTop: 10 }]}>
                  <Image
                    source={Icons.icon_email}
                    style={BaseStyle.imgInput}
                  />
                  <TextInput
                    style={[BaseStyle.textInput0]}
                    placeholder={Utils.translate("signup.login_email")}
                    onChangeText={text => this.setState({ email: text })}
                    autoCorrect={false}
                    placeholderTextColor={
                      success.email ? BaseColor.filedGrayColor : BaseColor.errorColor
                    }
                    value={email}
                  />
                </View>
                <View style={[BaseStyle.viewInput, { marginTop: 10 }]}>
                  <Image
                    source={Icons.icon_password}
                    style={BaseStyle.imgInput}
                  />
                  <TextInput
                    style={[BaseStyle.textInput0]}
                    secureTextEntry={true}
                    placeholder={Utils.translate("signup.password")}
                    onChangeText={text => this.setState({ password: text })}
                    autoCorrect={false}
                    placeholderTextColor={
                      success.password ? BaseColor.filedGrayColor : BaseColor.errorColor
                    }
                    value={password}
                  />
                </View>
                <View style={[BaseStyle.viewInput, { marginTop: 10 }]}>
                  <Image
                    source={Icons.icon_password}
                    style={BaseStyle.imgInput}
                  />
                  <TextInput
                    style={[BaseStyle.textInput0]}
                    secureTextEntry={true}
                    placeholder={Utils.translate("signup.pass_confirm")}
                    onChangeText={text => this.setState({ c_password: text })}
                    autoCorrect={false}
                    placeholderTextColor={
                      success.c_password ? BaseColor.filedGrayColor : BaseColor.errorColor
                    }
                    value={c_password}
                  />
                </View>
                <View style={{ width: "100%", marginTop: 30 }}>
                  <Button
                    full
                    loading={loading}
                    onPress={() => this.onSignUp()}
                    style={{ backgroundColor: BaseColor.greenColor }}
                  >
                    {Utils.translate("signup.reg_btn")}
                  </Button>
                </View>
                <View style={{ flexDirection: "row", textAlign: 'center', marginTop: 10 }}>
                  <Text style={styles.signup_labelSecond}>
                    {Utils.translate("signup.have_account")}
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
                    <Text style={[styles.signup_link,{paddingLeft:10}]}>
                      {Utils.translate("signup.reg_in")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", textAlign: 'center', marginTop: 10 }}>
                  <CheckBox
                    value={isSelected}
                    //onValueChange={setSelection}
                    onValueChange={() => this.setState({ isSelected: !this.state.isSelected })}
                    style={styles.checkbox}
                  />
                  <Text style={[styles.signup_labelSecond]}>
                    {Utils.translate("signup.agree_txt")}
                  </Text>
                </View>
              </View>
              <AlertPro
                ref={ref => {
                  this.AlertPro = ref;
                }}
                onCancel={() => this.AlertPro.close()}
                title={Utils.translate("register-faild.title")}
                message={Utils.translate("register-faild.msg")}
                showConfirm={false}
                textCancel={Utils.translate("form.close")}
                customStyles={{
                  mask: {
                    backgroundColor: BaseColor.transparent
                  },
                  container: {
                    borderWidth: 1,
                    borderColor: "#9900cc",
                    shadowColor: "#000000",
                    shadowOpacity: 0.1,
                    shadowRadius: 10
                  },
                  buttonCancel: {
                    backgroundColor: "#4da6ff"
                  }
                }}
              />
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

export default connect(null, mapDispatchToProps)(SignUp);
