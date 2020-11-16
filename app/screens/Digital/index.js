import React, { Component } from "react";
import { View, CheckBox, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import { BaseStyle, BaseColor, Images, Icons } from "@config";
import { Header, Icon, Button, Text } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { connect } from "react-redux";
import { AuthActions, apiActions } from "@actions";
import { bindActionCreators } from "redux";
import Toast from 'react-native-easy-toast';

const increase_number = 1;
class Digital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan_count: 0,
      lab_count: 0,
      total_pay: 0,
      patient_count: 0,
      total_score: 0,
      lab: 0,
      loading: false
    };
  }
  // visit
  onVisit(item) {
    if (item === 'dental_plan') this.props.navigation.navigate('DentalPlan', { cond: 'plan' });
    if (item === 'dental_lab') this.props.navigation.navigate('DentalPlan', { cond: 'lab' });
  }

  getDash() {
    this.setState({ loading: true }, () => {
      this.props.actions.apiActions.getDash(response => {
        if (response.success) {
          let item = response.item;
          this.setState({
            plan_count: item.plan_count,
            lab_count: item.lab_count,
            total_pay: item.total_pay,
            patient_count: item.patient_count,
            total_price: item.total_price,
            total_score: item.total_score,
            lab: item.lab
          });

        }
        this.setState({ loading: false });
      });
    });
  }

  componentDidMount() {
    this.getDash();
  }


  componentDidUpdate(prevProps) {

    if (this.props != prevProps) {
      this.getDash();
    }

  }

  onInstruction() {
     this.props.navigation.navigate('Instruction');
  }
  render() {
    const { navigation } = this.props;
    let { loading, plan_count, lab_count, total_pay, patient_count, total_score, lab } = this.state;
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

        <View style={styles.container}>
          <ImageBackground source={Images.signin_back} style={styles.signup_back}>
            <View style={[styles.topview, { marginTop: 20 }]}>
              <TouchableOpacity onPress={() => { this.props.navigation.toggleDrawer(); }}>
                <Image source={Icons.icon_digital} style={{ width: 22, height: 25, borderRadius: 2 }} />
              </TouchableOpacity>
              <Text style={styles.main_text}>
                {Utils.translate("digital.label")}
              </Text>
            </View>
            <View style={styles.main_contain}>
              <Text style={styles.labelTop}>
                {Utils.translate("digital.title")}
              </Text>
              <View style={{ width: "100%", marginTop: 10 }}>
                <Button
                  full
                  loading={loading}
                  onPress={() => { this.onVisit('dental_plan') }}
                  style={{ backgroundColor: BaseColor.primaryColor }}
                >
                  <Text style={styles.main_text}>
                    {Utils.translate("digital.dental_plan")}
                  </Text>
                </Button>
              </View>
              <View style={{ width: "100%", marginTop: 5 }}>
                <Button
                  full
                  loading={loading}
                  onPress={() => this.onVisit('dental_lab')}
                  style={{ backgroundColor: BaseColor.purpleColor }}
                >
                  <Text style={styles.main_text}>
                    {Utils.translate("digital.lab_services")}
                  </Text>
                </Button>
              </View>
              <View style={{ width: "100%", marginTop: 5 }}>
                <Button
                  full
                  loading={loading}
                  onPress={() => this.onInstruction()}
                  style={{ backgroundColor: BaseColor.greenColor }}
                >
                  <Text style={styles.main_text}>
                    {Utils.translate("digital.instruction")}
                  </Text>
                </Button>
              </View>
              <View style={styles.sub_main_contain}>
                <Text style={[styles.labelTop, { marginTop: 25, marginBottom:15 }]}>
                  {Utils.translate("digital.resume")}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <Text style={styles.sub_text_number}>
                      {plan_count}
                    </Text>
                    <Text style={styles.sub_text}>
                      {Utils.translate("digital.planning")}
                    </Text>
                    <View style={{ alignItems: "center" }}>
                      <Image source={Icons.icon_tooth} style={{ width: 30, height: 30 }} />
                    </View>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={styles.sub_text_number}>
                      {lab_count}
                    </Text>
                    <Text style={styles.sub_text}>
                      {Utils.translate("digital.order_service")}
                    </Text>
                    <View style={{ alignItems: "center" }}>
                      <Image source={Icons.icon_filter} style={{ width: 30, height: 30 }} />
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20, marginBottom:20 }}>
                  <View style={{ width: "50%" }}>
                    <Text style={styles.sub_text_number}>
                      R$ {total_pay}
                    </Text>
                    <Text style={styles.sub_text}>
                      {Utils.translate("digital.month_expenses")}
                    </Text>
                    <View style={{ alignItems: "center" }}>
                      <Image source={Icons.icon_dollar} style={{ width: 30, height: 30 }} />
                    </View>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={styles.sub_text_number}>
                      {patient_count}
                    </Text>
                    <Text style={styles.sub_text}>
                      {Utils.translate("digital.patients")}
                    </Text>
                    <View style={{ alignItems: "center" }}>
                      <Image source={Icons.icon_couple_user} style={{ width: 35, height: 35 }} />
                    </View>
                  </View>
                </View>
                {/* <View style={{ flexDirection: "row", marginTop: 20, marginBottom:20 }}>
                  <View style={{ width: "50%" }}>
                    <Text style={styles.sub_text_number}>
                      {total_score}
                    </Text>
                    <Text style={styles.sub_text}>
                      {Utils.translate("digital.score")}
                    </Text>
                    <View style={{ alignItems: "center" }}>
                      <Image source={Icons.icon_star} style={{ width: 30, height: 30 }} />
                    </View>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={styles.sub_text_number}>
                      {lab}
                    </Text>
                    <Text style={styles.sub_text}>
                      {Utils.translate("digital.laboratory")}
                    </Text>
                    <View style={{ alignItems: "center" }}>
                      <Image source={Icons.icon_flat} style={{ width: 35, height: 35 }} />
                    </View>
                  </View>
                </View> */}
              </View>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: {
      AuthActions: bindActionCreators(AuthActions, dispatch),
      apiActions: bindActionCreators(apiActions, dispatch),
      dispatch
    }
  };
};

export default connect(null, mapDispatchToProps)(Digital);
