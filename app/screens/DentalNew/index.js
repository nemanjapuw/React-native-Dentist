import React, { Component } from "react";
import { View, Dimensions, ScrollView, FlatList, ImageBackground, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { BaseStyle, BaseColor, Images, Icons } from "@config";
import { Header, Button, Text } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { connect } from "react-redux";
import { AuthActions, apiActions, typeActions } from "@actions";
import { bindActionCreators } from "redux";
import Toast from 'react-native-easy-toast';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector'
import { store } from "../../store";
import Modal, { ModalTitle, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import DropDownPicker from 'react-native-dropdown-picker';
import DentalNewService from "../DentalNewService";

class DentalNew extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      insert_ids: [],
      full_name: '',
      total_payment: 0,
      gender: '',
      bio: '',
      cpf_number: '',
      street_name: '',
      street_number: '',
      cep_code: '',
      city: '',
      state: '',
      mail: '',
      phone: '',
      service_list: [],
      pricetables: [],
      buttonTxt: '',
      buttonColor: '',
      tooth_list: [],
      isSelected: true,
      loading: false,
      country: 'uk',
      patient_list: [],
      patient: {},
      patient_id: 0,
      patient_mail: '',
      success: {
        full_name: true,
        gender: true,
        bio: true,
        service_list: true,
      }
    };
  }

  //getPriceTables
  getPriceTables() {
    const _this = this;
    return new Promise(function (resolve, reject) {
      _this.setState({ pricetables: [], loading: true }, () => {
        _this.props.actions.apiActions.getPriceTables(response => {
          if (response.success) {
            _this.setState({
              pricetables: response.pricetables,
            }, () => {
              resolve();
            });
          } else {
            reject();
          }
          _this.setState({ loading: false });
        });
      });
    })
  }

  getPatients() {
    this.setState({ patient_list: [], loading: true }, () => {
      this.props.actions.apiActions.getPatients(response => {
        if (response.success)
          this.setState({ patient_list: response.list });
        this.setState({ loading: false });
      });
    });
  }

  componentDidMount() {
    this._isMounted = true;
    this._onFocusListener = this.props.navigation.addListener('didFocus', async (payload) => {
      let service_list = {};
      this.getPatients();
      this.props.actions.dispatch(typeActions.onOrigin({})); //init
      if (!Utils.isEmpty(store.getState().plan.service.service_list)) {
        service_list = store.getState().plan.service.service_list;
        await this.getPriceTables();
        this.getToothList();
        this.getData(service_list);
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this._onFocusListener.remove();
  }



  async getData(service_list) {
    let total_payment = 0;
    let list = [];
    let index = 0;
    for (const [key, item] of Object.entries(service_list)) {
      item.id = index;
      item.kind = item.service_kind;
      item.pay_mount = this.getPrice(item);
      total_payment += parseInt(this.getPrice(item));
      if (isNaN(total_payment)) total_payment = 0;
      list.push(item);
      index++;
    }
    if (this._isMounted) {
      this.setState({ service_list: list });
      this.setState({ total_payment: total_payment });
    }
  }

  newService() {
    let item = {};
    this.props.actions.dispatch(typeActions.onOrigin(item));
    if (parseInt(this.state.patient_id) > 0) {
      this.props.navigation.navigate('DentalNewService', { patient: this.state.patient });
    }else {
      this.refs.toast.show('Por favor,registre seu paciente antes de prosseguir');
    }
  }

  async onPayment() {
    if (this.state.patient_id < 1) {
      this.refs.toast.show(Utils.translate("messages.select_patient"));
    }
    if (parseInt(this.state.total_payment) > 0) {
      //saved database
      let service_list = this.state.service_list;
      if (service_list.length > 0 && this.state.patient_id > 0) {
        let ids = [];
        this.setState({ loading: true });
        for (let i = 0; i < service_list.length; i++) {
          let obj = service_list[i];
          obj.patient_id = this.state.patient_id;
          obj.patient_mail = this.state.patient_mail;
          obj.dentist_id = store.getState().auth.login.data.user;
          let ser = await this.props.actions.apiActions.create_service(obj);
          ids.push(ser.id);
        }
        this.setState({ loading: false });
        if (ids.length > 0) {
          this.props.navigation.navigate('Paypal', { payment: this.state.total_payment, ids: ids });
        }
      }
    }
  }
  //
  getPrice(item) {
    let pay_mount = 0;
    let tooth_all = item.saved_tooth_all;
    let tooth_list = this.state.tooth_list;
    let service_type_option = item.service_type_option;
    let service_kind = item.service_kind;
    let shipping_option = item.shipping_option;
    let shipping_option_option = item.shipping_option_option;
    let pricetables = this.state.pricetables;
    let content = pricetables.find(element => element.service_type_option == service_type_option);
    if (Utils.isEmpty(content)) {
      pay_mount = 0;
      return;
    }
    if (Utils.isEmpty(content.upper_arcade_price)) content.upper_arcade_price = 0;
    if (Utils.isEmpty(content.lower_arcade_price)) content.lower_arcade_price = 0;

    if (service_kind == 'plan') {
      if (item.service_type_option == 'asses') {
        pay_mount = tooth_all.length * parseInt(content.tooth_price);
      }
      if (item.service_type_option == 'plan2d') {
        if (item.saved_tooth_left.length > 0) pay_mount += parseInt(content.upper_arcade_price);
        if (item.saved_tooth_right.length > 0) pay_mount += parseInt(content.lower_arcade_price);
      }
      if (item.service_type_option == 'plan3d') {
        pay_mount = 0;
        //content = pricetables.find(element => element.shipping_option == shipping_option_option);        
        // if (Utils.isEmpty(content.upper_arcade_price)) content.upper_arcade_price = 0;
        // if (Utils.isEmpty(content.lower_arcade_price)) content.lower_arcade_price = 0;
        // if (item.saved_tooth_left.length > 0) pay_mount = parseInt(content.upper_arcade_price); //upper and lower arcade together
        // if (item.saved_tooth_right.length > 0) pay_mount = parseInt(content.lower_arcade_price); //upper and lower arcade together
      }
      if (item.service_type_option == 'guide') {
        if (item.saved_tooth_left.length > 0) pay_mount += parseInt(content.upper_arcade_price);
        if (item.saved_tooth_right.length > 0) pay_mount += parseInt(content.lower_arcade_price);
      }

      if (item.service_type_option == 'model') {
        if (item.saved_tooth_left.length > 0) pay_mount += parseInt(content.upper_arcade_price);
        if (item.saved_tooth_right.length > 0) pay_mount += parseInt(content.lower_arcade_price);
      }
    }

    if (service_kind == 'lab') {
      if (item.service_type_option == "contact") {
        for (var i = 0; i < pricetables.length; i++) {
          var ele = pricetables[i];
          if (ele.sub_option == item.material_sub_option && ele.service_type_option == item.service_type_option) {
            pay_mount = tooth_all.length * parseInt(ele.tooth_price);
            break;
          }
        }
      }

      if (item.service_type_option == "overlay") {
        for (var i = 0; i < pricetables.length; i++) {
          var ele = pricetables[i];
          if (ele.sub_option == item.material_sub_option && ele.service_type_option == item.service_type_option) {
            pay_mount = tooth_all.length * parseInt(ele.tooth_price);
            break;
          }
        }
      }
      if (item.service_type_option == "crown") {
        let crown_type_option = item.crown_type_option;
        let crown_option_option = item.crown_option_option;
        let imconnection_option = item.imconnection_option;
        let imcrown_option = item.imcrown_option;
        let material_sub_option = item.material_sub_option;
        let material_option = item.material_option;
        //console.log(":::" + material_sub_option);

        let sub_option = '';
        if (crown_type_option == 'tooth' && crown_option_option == 'single')
          sub_option = 'tooth_single';

        for (var i = 0; i < pricetables.length; i++) {
          var ele = pricetables[i];
          if (ele.sub_option == material_sub_option && ele.service_type_option == item.service_type_option) {
            pay_mount = tooth_all.length * parseInt(ele.tooth_price);
            break;
          }
        }
      }
    }
    if (isNaN(pay_mount)) pay_mount = 0;
    return pay_mount;
  }

  //get tooth list
  getToothList() {
    this.setState({ tooth_list: [], loading: true }, () => {
      this.props.actions.apiActions.getToothList(response => {
        if (response.success)
          if (this._isMounted) {
            this.setState({
              tooth_list: response.tooth_list,
            });
            this.setState({ loading: false });
          }
      });
    });
  }

  //delete service
  deleteService(item, index) {
    let savedServiceList = this.state.service_list;
    savedServiceList.splice(index, 1);
    this.setState({ service_List: savedServiceList });

    let service = store.getState().plan.service;
    let service_list = store.getState().plan.service.service_list;
    delete service_list[item.service_type_option];
    service.service_list = service_list;
    this.props.actions.dispatch(typeActions.onService(service));
  }

  //edit service
  editService(item, index) {
    let service_list = store.getState().plan.service.service_list;
    item = service_list[item.service_type_option];
    this.props.actions.dispatch(typeActions.onOrigin(item));
    // let service_list = store.getState().plan.service.service_list;
    //let store_status = store.getState();   
    //console.log(store.getState()); 
    this.props.navigation.navigate('DentalNewService');
  }

  changePatient(patient) {
    this.setState({ patient: patient });
    this.setState({ patient_id: patient.id });
    this.setState({ patient_mail: patient.mail });
  }

  render() {
    const { navigation } = this.props;
    let { full_name, gender, bio, cpf_number, street_name, street_number, cep_code, city, state, mail, phone, buttonTxt, service_list, isSelected, success, loading } = this.state;
    const renderItem = ({ item, index }) => (
      <View style={[styles.item, { width: 130 }]}>
        <TouchableOpacity onPress={() => { this.editService(item, index) }}  >
          <Image source={Icons.icon_new} style={{ width: 40, height: 40, textAlign: "center" }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: "absolute", top: 7, left: 71 }} onPress={() => { this.deleteService(item, index) }} >
          <Image source={Icons.icon_delete} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ position: "absolute", top: 30, left: 23 }} onPress={() => { this.editService(item, index) }} >
          <Image source={Icons.icon_edit} style={{ width: 20, height: 20 }} />
        </TouchableOpacity> */}
        <Text style={styles.service_title}>
          {Utils.cutString(item.service_type)}
        </Text>
      </View>
    );

    if (Utils.isEmpty(this.state.service_list)) {
      this.state.buttonTxt = Utils.translate('dentalnew.no_service');
      this.state.buttonColor = '#b1b1b1';
    } else {
      this.state.buttonTxt = Utils.translate('dentalnew.make_payment') + "R$ " + this.state.total_payment;
      this.state.buttonColor = BaseColor.greenColor;
    }

    const renderNoItem = ({ item }) => (
      <View style={{
        alignItems: "center", flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center', width: "100%"
      }}>
        <Text style={{ color: "#9e9d9d", paddingLeft: 100 }}>{Utils.translate('dentalnew.no_service')}</Text>
      </View>
    );

    const genders = Utils.genders();

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
            <View style={styles.topview}>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalPlan'); }}>
                <Image source={Icons.icon_left_arrow} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
              <Text style={styles.main_text}>
                {Utils.translate("dentalnew.label")}
              </Text>
            </View>
            <View style={styles.main_contain}>
              <Text style={styles.title}>
                {Utils.translate("dentalnew.title")}
              </Text>
              <Text style={styles.second_title}>
                {Utils.translate("dentalnew.desc")}
              </Text>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center', marginTop: 20
              }}>
                <View style={[{ width: "80%" }]}>
                  <DropDownPicker
                    items={this.state.patient_list}
                    // defaultValue={this.state.patient_full_name}
                    containerStyle={{ height: 43, width: '100%' }}
                    style={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, }}
                    itemStyle={{
                      justifyContent: 'flex-start',
                      borderRadius: 20
                    }}
                    placeholder={Utils.translate('dentalnew.search_patient')}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => this.changePatient(item)}
                    searchable={true}
                    searchablePlaceholder={Utils.translate('dentalnew.search_patient')}
                    searchablePlaceholderTextColor="gray"
                    seachableStyle={{}}
                    searchableError={() => <Text>NÃO LOCALIZADO</Text>}
                  />
                </View>
                <View style={{ width: "20%", paddingLeft: 15 }}>
                  <View style={BaseStyle.viewInput}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('PatientReg'); }}  >
                      <Image
                        source={Icons.icon_full_name_add}
                        style={{
                          height: 30,
                          width: 30,
                          alignItems: 'center'
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ zIndex: 2 }}>
                <Text style={[styles.title, { marginTop: 50 }]}>
                  {Utils.translate("dentalnew.service")}
                </Text>
                <Text style={styles.second_title}>
                  {Utils.translate("dentalnew.add_service")}
                </Text>
              </View>
              <View style={{ backgroundColor: 'white', borderRadius: 15, height: 140, width: "100%", marginTop: 5 }}>
                <FlatList
                  horizontal={true}
                  data={this.state.service_list}
                  ListEmptyComponent={renderNoItem}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                />
                <View
                  style={{
                    borderBottomColor: '#cdcbcb',
                    borderBottomWidth: 1,
                    paddingTop: 5
                  }}
                />
                <View style={{ paddingRight: 5, alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => { this.newService(); }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                      {/* <Image
                        source={Icons.icon_save}
                        style={{ width: 35, height: 35, marginRight: 5 }}
                      /> */
                      }
                      <View style={{ backgroundColor: BaseColor.primaryColor, borderRadius: 20, padding: 11, flexDirection: 'row' }} >
                        <Text style={{ color: BaseColor.whiteColor, fontWeight: '600' }}>{Utils.translate("dentalnew.create_service")}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <View style={{ width: "100%", marginTop: 50 }}>
                <Button
                  full
                  loading={loading}
                  onPress={() => { this.onPayment(); }}
                  style={{ backgroundColor: this.state.buttonColor }}
                >
                  {this.state.buttonTxt}
                </Button>
              </View>
              <View style={{ flexDirection: "row", textAlign: 'center', marginTop: 10 }}>
                <CheckBox
                  value={isSelected}
                  disabled={false}
                  //value={toggleCheckBox}
                  //onValueChange={setSelection}
                  onValueChange={(value) => this.setState({ isSelected: value })}
                  style={styles.checkbox}
                />

                <Text style={[styles.signup_labelSecond]}>
                  {Utils.translate("dentalnew.terms_msg")}
                </Text>

              </View>
              <View>

              </View>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Terms'); }}>
                <Text style={[styles.title, { fontSize: 17, marginTop: 2 }]}>
                  {Utils.translate("dentalnew.terms")}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView >
    );
  }
}
const mapDispatchToProps = dispatch => {
  // return {
  //   actions: bindActionCreators(AuthActions, dispatch),
  //   dispatch
  // };
  return {
    actions: {
      AuthActions: bindActionCreators(AuthActions, dispatch),
      apiActions: bindActionCreators(apiActions, dispatch),
      dispatch
    }
  };
};


export default connect(null, mapDispatchToProps)(DentalNew);
