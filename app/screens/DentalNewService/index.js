import React, { Component } from "react";
import { View, Dimensions, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import { BaseStyle, BaseColor, Images, Icons } from "@config";
import { Header, Icon, Button, Text } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { connect } from "react-redux";
import { AuthActions, apiActions, typeActions } from "@actions";
import { bindActionCreators } from "redux";
import Toast from 'react-native-easy-toast';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector'
import Modal, { ModalTitle, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
import { store } from "../../store";


class DentalNewService extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            services: [],
            tooth_list: [],
            shipping_options: [],
            crowntypes: [],
            crownoptions: [],
            imconnections: [],
            imcrowns: [],
            service_type: '',
            service_kind: '',
            crown_type: '',
            crown_type_option: '',
            crown_option: '',
            crown_option_option: '',
            imconnection_type: '',
            imconnection_option: '',
            imcrown_type: '',
            imcrown_option: '',
            shipping_name: '',
            shipping_option: '',
            shipping_option_option: '',
            leftModal: false,
            rightModal: false,
            thirdModal: false,
            shippingPanel: false,
            selected_tooth: [],
            selected_tooth_left: [],
            selected_tooth_right: [],
            selected_tooth_all: [],
            saved_tooth_left: [],
            saved_tooth_right: [],
            saved_tooth_all: [],
            service_type_option: '',
            delivery: {},
            distance: '',
            select_item: {},
            file: {},
            flag_2d: false,
            lab_file_flag: false,
            color_01: '#6f6f6f', select_01: false,
            color_02: '#6f6f6f', select_02: false,
            color_03: '#6f6f6f', select_03: false,
            color_04: '#6f6f6f', select_04: false,
            color_05: '#6f6f6f', select_05: false,
            color_06: '#6f6f6f', select_06: false,
            color_07: '#6f6f6f', select_07: false,
            color_08: '#6f6f6f', select_08: false,
            color_09: '#6f6f6f', select_09: false,
            color_10: '#6f6f6f', select_10: false,
            color_11: '#6f6f6f', select_11: false,
            color_12: '#6f6f6f', select_12: false,
            color_13: '#6f6f6f', select_13: false,
            color_14: '#6f6f6f', select_14: false,
            color_15: '#6f6f6f', select_15: false,
            color_16: '#6f6f6f', select_16: false,
            color_17: '#6f6f6f', select_17: false,
            color_18: '#6f6f6f', select_18: false,
            color_19: '#6f6f6f', select_19: false,
            color_20: '#6f6f6f', select_20: false,
            color_21: '#6f6f6f', select_21: false,
            color_22: '#6f6f6f', select_22: false,
            color_23: '#6f6f6f', select_23: false,
            color_24: '#6f6f6f', select_24: false,
            color_25: '#6f6f6f', select_25: false,
            color_26: '#6f6f6f', select_26: false,
            color_27: '#6f6f6f', select_27: false,
            color_28: '#6f6f6f', select_28: false,
            color_29: '#6f6f6f', select_29: false,
            color_30: '#6f6f6f', select_30: false,
            color_31: '#6f6f6f', select_31: false,
            color_32: '#6f6f6f', select_32: false,
            success: {
                service_type: true,
                distance: true,
            }
        };
    }


    //get service types
    getServices() {
        this.setState({ services: [], loading: true }, () => {
            this.props.actions.apiActions.getServices(response => {
                if (response.success)
                    this.setState({
                        services: response.services,
                    });
                this.setState({ loading: false });
            });
        });
    }

    //get tooth list
    getToothList() {
        this.setState({ tooth_list: [], loading: true }, () => {
            this.props.actions.apiActions.getToothList(response => {
                if (response.success)
                    this.setState({
                        tooth_list: response.tooth_list,
                    });
                this.setState({ loading: false });
            });
        });
    }
    //get shipping options
    getShippingOptions() {
        this.setState({ shipping_options: [], loading: true }, () => {
            this.props.actions.apiActions.getShippingOptions(response => {
                if (response.success)
                    this.setState({
                        shipping_options: response.shipping_options,
                    });
                this.setState({ loading: false });
            });
        });
    }
    //crownoptions getCrownOptions
    getCrownOptions() {
        this.setState({ crownoptions: [], loading: true }, () => {
            this.props.actions.apiActions.getCrownOptions(response => {
                if (response.success)
                    this.setState({
                        crownoptions: response.crownoptions,
                    });
                this.setState({ loading: false });
            });
        });
    }

    //crowntypes getCrownTypes
    getCrownTypes() {
        this.setState({ crowntypes: [], loading: true }, () => {
            this.props.actions.apiActions.getCrownTypes(response => {
                if (response.success)
                    this.setState({
                        crowntypes: response.crowntypes,
                    });
                this.setState({ loading: false });
            });
        });
    }

    //init
    init() {
        this.setState({ service_kind: '' });
        this.setState({ flag_2d: false });
        this.setState({ delivery: {} });
        this.setState({ shipping_name: '' });
        this.setState({ shipping_option: '' });
        this.setState({ shippingPanel: false });
        this.setState({ shipping_option_option: '' });
        this.setState({ distance: '' });
        this.setState({ file: {} });
        this.setState({ saved_tooth_all: [] });
        this.setState({ saved_tooth_left: [] });
        this.setState({ saved_tooth_right: [] });
        this.setState({ selected_tooth_all: [] });
        this.setState({ selected_tooth_left: [] });
        this.setState({ selected_tooth_right: [] });
        this.setState({ service_kind: '' });
        this.setState({ service_type_option: '' });
        this.setState({ service_type: '' });
        this.setState({ thirdModal: false });
        
        this.setState({ color_type: '' });
        this.setState({ color_type_option: '' });
        this.setState({ crown_type: '' });
        this.setState({ crown_type_option: '' });
        this.setState({ crown_option: '' });
        this.setState({ crown_option_option: '' });
        this.setState({ imconnection_type: '' });
        this.setState({ imconnection_option: '' });
        this.setState({ imcrown_type: '' });
        this.setState({ imcrown_option: '' });
    }  

   async componentDidMount() {
        this._isMounted = true;
        this.init();
        this.getServices();
        this.getToothList();
        this.getShippingOptions();
        this.getCrownOptions();
        this.getCrownTypes();
        let implantConnections = Utils.implantConnections();
        this.setState({ imconnections: implantConnections })
        let implantCrowns = Utils.implantCrowns();
        this.setState({ imcrowns: implantCrowns });

        //console.log(store.getState().plan.service.service_list);
        let service_list = store.getState().plan.service.service_list;
        //console.log(Utils.isEmpty(service_list.plan2d)+"::::::::");
        // service_list.forEach(element => {
        //     if (element.service_type_option == 'plan2d') {
        //         this.setState({ flag_2d: true });
        //     }
        // });

        //process delivery addres= = patient address registered        
        let user_data = this.props.navigation.state.params.patient;       
        let delivery = {};
        delivery.address = user_data.street_name;
        delivery.code = user_data.cep_code;
        delivery.number = user_data.street_number;
        delivery.neighborhood = '';
        delivery.city = user_data.city;
        delivery.state_name = user_data.state;
        delivery.local = '';

        let deli = {};
        deli.label = '';
        deli.option = '';
        deli.price = '';
        deli.item = delivery;
        this.setState({ delivery: deli });
       
        if (!Utils.isEmpty(service_list.plan2d)) {
            this.setState({ flag_2d: true });
        }
        await this.promisedSetState({imcrowns: implantCrowns});

        let origin = {};
        if (!Utils.isEmpty(store.getState().origin.origin)) {
            origin = store.getState().origin.origin;
            if (!Utils.isEmpty(origin)) {
                if (!Utils.isEmpty(origin.delivery)) {
                    this.setState({ delivery: origin.delivery });
                    this.setState({ shipping_name: origin.delivery.label });
                    this.setState({ shipping_option: origin.delivery.option });
                    if (origin.delivery.option == 'plaster' || origin.delivery.option == 'mold') {
                        this.setState({ shippingPanel: true });
                    } else {
                        this.setState({ shippingPanel: false });
                    }
                }
                if (!Utils.isEmpty(origin.shipping_option_option))
                    this.setState({ shipping_option_option: origin.shipping_option_option });
                if (!Utils.isEmpty(origin.distance))
                    this.setState({ distance: origin.distance });
                if (!Utils.isEmpty(origin.file))
                    this.setState({ file: origin.file });
                if (!Utils.isEmpty(origin.saved_tooth_all))
                    this.setState({ saved_tooth_all: origin.saved_tooth_all });
                if (!Utils.isEmpty(origin.saved_tooth_left))
                    this.setState({ saved_tooth_left: origin.saved_tooth_left });
                if (!Utils.isEmpty(origin.saved_tooth_right))
                    this.setState({ saved_tooth_right: origin.saved_tooth_right });

                if (!Utils.isEmpty(origin.saved_tooth_all)) {
                    this.setState({ selected_tooth_all: origin.saved_tooth_all });
                    this.setState({ selected_tooth: origin.saved_tooth_all });
                }
                if (!Utils.isEmpty(origin.saved_tooth_left))
                    this.setState({ selected_tooth_left: origin.saved_tooth_left });
                if (!Utils.isEmpty(origin.saved_tooth_right))
                    this.setState({ selected_tooth_right: origin.saved_tooth_right });
                if (!Utils.isEmpty(origin.service_kind))
                    this.setState({ service_kind: origin.service_kind });
                if (!Utils.isEmpty(origin.service_type_option))
                    this.setState({ service_type_option: origin.service_type_option });
               
                if (!Utils.isEmpty(origin.service_type))
                    this.setState({ service_type: origin.service_type });

                if (origin.option == 'plan3d') {
                    if (this.state.flag_2d) {
                        this.setState({ thirdModal: false })
                    } else {
                        this.setState({ thirdModal: true })
                    }
                }
                //////laboratory
                if (!Utils.isEmpty(origin.color_type))
                    this.setState({ color_type: origin.color_type })
                if (!Utils.isEmpty(origin.color_type_option))
                    this.setState({ color_type_option: origin.color_type_option })
                if (!Utils.isEmpty(origin.crown_option))
                    this.setState({ crown_option: origin.crown_option })
                if (!Utils.isEmpty(origin.crown_option_option))
                    this.setState({ crown_option_option: origin.crown_option_option })
                if (!Utils.isEmpty(origin.crown_type))
                    this.setState({ crown_type: origin.crown_type })
                if (!Utils.isEmpty(origin.crown_type_option))
                    this.setState({ crown_type_option: origin.crown_type_option })
                if (!Utils.isEmpty(origin.imconnection_type))
                    this.setState({ imconnection_type: origin.imconnection_type })
                if (!Utils.isEmpty(origin.imconnection_option))
                    this.setState({ imconnection_option: origin.imconnection_option })
                if (!Utils.isEmpty(origin.imcrown_type))
                    this.setState({ imcrown_type: origin.imcrown_type })
                if (!Utils.isEmpty(origin.imcrown_option))
                    this.setState({ imcrown_option: origin.imcrown_option })
                await this.promisedSetState({service_type_option: origin.service_type_option});
                //this.changeTooth('01');
            }
        }
    }

    promisedSetState = (newState) => {
        return new Promise((resolve) => {
            this.setState(newState, () => {
                resolve()
            });
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    componentWillReceiveProps(props) {
        let delivery = {};
        let file1 = {};
        let shipping_name = this.state.shipping_name;
        let shipping_options = this.state.shipping_options;
        let option = '';
        let price = 0;
        shipping_options.forEach(element => {
            if (element.label == shipping_name) {
                option = element.option;
            }
        });
        if (!Utils.isEmpty(props.navigation.state.params.delivery)) {
            delivery = props.navigation.state.params.delivery;
            if (this.state.delivery != delivery) {
                let deli = {};
                deli.label = shipping_name;
                deli.option = option;
                deli.price = price;
                deli.item = delivery;
                this.setState({ delivery: deli });
            }
        }

        //lentes de contato for file
        if (!Utils.isEmpty(props.navigation.state.params.file1)) {
            file1 = props.navigation.state.params.file1;
            if (this.state.file != file1) {
                let file = {};
                file.file_text = '';
                file.file_list1 = file1.file_list1;
                file.file_list2 = file1.file_list2;
                file.file_list3 = file1.file_list3;
                file.file_list4 = file1.file_list4;
                this.setState({ file: file });
            }
        }


    }

    //
    saveTooth() {
        let select_all = [...this.state.selected_tooth_left, ...this.state.selected_tooth_right];
        this.setState({ selected_tooth: select_all });
        this.setState({ saved_tooth_left: this.state.selected_tooth_left });
        this.setState({ saved_tooth_right: this.state.selected_tooth_right });
        this.setState({ saved_tooth_all: select_all });

        this.setState({ leftModal: false, rightModal: false });
    }

    //
    changeService() {
        setTimeout(() => {
            if (this._isMounted) {

                let services = this.state.services;
                let service_name = this.state.service_type;
                const item = services.find(element => element.label == service_name);

                let current_service = {};
                current_service.service_type = service_name;
                current_service.service_type_option = item.option;
                current_service.service_kind = item.type;
                this.props.actions.dispatch(typeActions.onOption(current_service));

                this.setState({ service_type_option: item.option });
                this.setState({ service_kind: item.type });
                this.setState({ selected_tooth_left: [] });
                this.setState({ selected_tooth_right: [] });


                if (item.type == 'lab') {
                    this.setState({ lab_file_flag: false });
                    if (item.option == 'contact') {
                        this.props.navigation.navigate('LabDentalNewService1');
                    }
                    if (item.option == 'overlay') {
                        this.props.navigation.navigate('LabDentalNewService2');
                    }

                } else { //plan                  
                    if (item.option == 'plan3d') {
                        if (this.state.flag_2d) {
                            this.setState({ thirdModal: false })
                        } else {
                            this.setState({ thirdModal: true })
                        }
                    }
                }
            }
        }, 500);
    }
    //
    changeShipping() {
        setTimeout(() => {
            let shipping_options = this.state.shipping_options;
            let shipping_name = this.state.shipping_name;
            const item = shipping_options.find(element => element.label == shipping_name);
            this.setState({ shipping_option: item.option });
            this.setState({ shipping_option_option: item.shipping_option });
            if (item.option == 'plaster' || item.option == 'mold') {
                this.setState({ shippingPanel: true });
            } else {
                this.setState({ shippingPanel: false });
            }
        }, 500);
    }

    changeTooth(type) {        
        let service_type_option = this.state.service_type_option;

        let toothes = this.state.tooth_list;
        let tooth_item = Utils.searchTooth(type, toothes);
        let selected_tooth = this.state.selected_tooth;
        let selected_tooth_left = this.state.selected_tooth_left;
        let selected_tooth_right = this.state.selected_tooth_right;
        let select_flag = false;
        let left = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'];
        let right = ['17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'];
        let current_option = '';
        if (left.indexOf(type) > -1) current_option = 'left';
        if (right.indexOf(type) > -1) current_option = 'right';
        if (service_type_option != 'asses') {
            if (current_option == 'left') {
                if (this.state.select_01) {
                    this.setState({ color_01: '#6f6f6f', select_01: false });
                    this.setState({ color_02: '#6f6f6f', select_02: false });
                    this.setState({ color_03: '#6f6f6f', select_03: false });
                    this.setState({ color_04: '#6f6f6f', select_04: false });
                    this.setState({ color_05: '#6f6f6f', select_05: false });
                    this.setState({ color_06: '#6f6f6f', select_06: false });
                    this.setState({ color_07: '#6f6f6f', select_07: false });
                    this.setState({ color_08: '#6f6f6f', select_08: false });
                    this.setState({ color_09: '#6f6f6f', select_09: false });
                    this.setState({ color_10: '#6f6f6f', select_10: false });
                    this.setState({ color_11: '#6f6f6f', select_11: false });
                    this.setState({ color_12: '#6f6f6f', select_12: false });
                    this.setState({ color_13: '#6f6f6f', select_13: false });
                    this.setState({ color_14: '#6f6f6f', select_14: false });
                    this.setState({ color_15: '#6f6f6f', select_15: false });
                    this.setState({ color_16: '#6f6f6f', select_16: false });
                    select_flag = false;
                } else {
                    this.setState({ color_01: '#0bbe20', select_01: true });
                    this.setState({ color_02: '#0bbe20', select_02: true });
                    this.setState({ color_03: '#0bbe20', select_03: true });
                    this.setState({ color_04: '#0bbe20', select_04: true });
                    this.setState({ color_05: '#0bbe20', select_05: true });
                    this.setState({ color_06: '#0bbe20', select_06: true });
                    this.setState({ color_07: '#0bbe20', select_07: true });
                    this.setState({ color_08: '#0bbe20', select_08: true });
                    this.setState({ color_09: '#0bbe20', select_09: true });
                    this.setState({ color_10: '#0bbe20', select_10: true });
                    this.setState({ color_11: '#0bbe20', select_11: true });
                    this.setState({ color_12: '#0bbe20', select_12: true });
                    this.setState({ color_13: '#0bbe20', select_13: true });
                    this.setState({ color_14: '#0bbe20', select_14: true });
                    this.setState({ color_15: '#0bbe20', select_15: true });
                    this.setState({ color_16: '#0bbe20', select_16: true });
                    select_flag = true;
                }

                if (select_flag) {
                    selected_tooth_left = [];
                    var types = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
                    for (var i = 0; i < types.length; i++) {
                        let tooth_item = Utils.searchTooth(types[i], toothes);
                        let slected_item_name = tooth_item.label;
                        selected_tooth_left.push(slected_item_name);
                    }
                } else {
                    selected_tooth_left = [];
                }
                this.setState({ selected_tooth_left: selected_tooth_left })
            }

            if (current_option == 'right') {
                if (this.state.select_17) {
                    this.setState({ color_17: '#6f6f6f', select_17: false });
                    this.setState({ color_18: '#6f6f6f', select_18: false });
                    this.setState({ color_19: '#6f6f6f', select_19: false });
                    this.setState({ color_20: '#6f6f6f', select_20: false });
                    this.setState({ color_21: '#6f6f6f', select_21: false });
                    this.setState({ color_22: '#6f6f6f', select_22: false });
                    this.setState({ color_23: '#6f6f6f', select_23: false });
                    this.setState({ color_24: '#6f6f6f', select_24: false });
                    this.setState({ color_25: '#6f6f6f', select_25: false });
                    this.setState({ color_26: '#6f6f6f', select_26: false });
                    this.setState({ color_27: '#6f6f6f', select_27: false });
                    this.setState({ color_28: '#6f6f6f', select_28: false });
                    this.setState({ color_29: '#6f6f6f', select_29: false });
                    this.setState({ color_30: '#6f6f6f', select_30: false });
                    this.setState({ color_31: '#6f6f6f', select_31: false });
                    this.setState({ color_32: '#6f6f6f', select_32: false });
                    select_flag = false;
                } else {
                    this.setState({ color_17: '#0bbe20', select_17: true });
                    this.setState({ color_18: '#0bbe20', select_18: true });
                    this.setState({ color_19: '#0bbe20', select_19: true });
                    this.setState({ color_20: '#0bbe20', select_20: true });
                    this.setState({ color_21: '#0bbe20', select_21: true });
                    this.setState({ color_22: '#0bbe20', select_22: true });
                    this.setState({ color_23: '#0bbe20', select_23: true });
                    this.setState({ color_24: '#0bbe20', select_24: true });
                    this.setState({ color_25: '#0bbe20', select_25: true });
                    this.setState({ color_26: '#0bbe20', select_26: true });
                    this.setState({ color_27: '#0bbe20', select_27: true });
                    this.setState({ color_28: '#0bbe20', select_28: true });
                    this.setState({ color_29: '#0bbe20', select_29: true });
                    this.setState({ color_30: '#0bbe20', select_30: true });
                    this.setState({ color_31: '#0bbe20', select_31: true });
                    this.setState({ color_32: '#0bbe20', select_32: true });
                    select_flag = true;
                }

                if (select_flag) {
                    selected_tooth_right = [];
                    var types = ["17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"];
                    for (var i = 0; i < types.length; i++) {
                        let tooth_item = Utils.searchTooth(types[i], toothes);
                        let slected_item_name = tooth_item.label;
                        selected_tooth_right.push(slected_item_name);
                    }
                } else {
                    selected_tooth_right = [];
                }
                this.setState({ selected_tooth_right: selected_tooth_right })
            }
        } else {
            switch (type) {
                case "01":
                    if (this.state.select_01) {
                        this.setState({ color_01: '#6f6f6f', select_01: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_01: '#0bbe20', select_01: true });
                        select_flag = true;
                    }
                    break;
                case "02":
                    if (this.state.select_02) {
                        this.setState({ color_02: '#6f6f6f', select_02: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_02: '#0bbe20', select_02: true });
                        select_flag = true;
                    }
                    break;
                case "03":
                    if (this.state.select_03) {
                        this.setState({ color_03: '#6f6f6f', select_03: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_03: '#0bbe20', select_03: true });
                        select_flag = true;
                    }
                    break;
                case "04":
                    if (this.state.select_04) {
                        this.setState({ color_04: '#6f6f6f', select_04: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_04: '#0bbe20', select_04: true });
                        select_flag = true;
                    }
                    break;
                case "05":
                    if (this.state.select_05) {
                        this.setState({ color_05: '#6f6f6f', select_05: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_05: '#0bbe20', select_05: true });
                        select_flag = true;
                    }
                    break;
                case "06":
                    if (this.state.select_06) {
                        this.setState({ color_06: '#6f6f6f', select_06: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_06: '#0bbe20', select_06: true });
                        select_flag = true;
                    }
                    break;
                case "07":
                    if (this.state.select_07) {
                        this.setState({ color_07: '#6f6f6f', select_07: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_07: '#0bbe20', select_07: true });
                        select_flag = true;
                    }
                    break;
                case "08":
                    if (this.state.select_08) {
                        this.setState({ color_08: '#6f6f6f', select_08: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_08: '#0bbe20', select_08: true });
                        select_flag = true;
                    }
                    break;
                case "09":
                    if (this.state.select_09) {
                        this.setState({ color_09: '#6f6f6f', select_09: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_09: '#0bbe20', select_09: true });
                        select_flag = true;
                    }
                    break;
                case "10":
                    if (this.state.select_10) {
                        this.setState({ color_10: '#6f6f6f', select_10: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_10: '#0bbe20', select_10: true });
                        select_flag = true;
                    }
                    break;
                case "11":
                    if (this.state.select_11) {
                        this.setState({ color_11: '#6f6f6f', select_11: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_11: '#0bbe20', select_11: true });
                        select_flag = true;
                    }
                    break;
                case "12":
                    if (this.state.select_12) {
                        this.setState({ color_12: '#6f6f6f', select_12: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_12: '#0bbe20', select_12: true });
                        select_flag = true;
                    }
                    break;
                case "13":
                    if (this.state.select_13) {
                        this.setState({ color_13: '#6f6f6f', select_13: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_13: '#0bbe20', select_13: true });
                        select_flag = true;
                    }
                    break;
                case "14":
                    if (this.state.select_14) {
                        this.setState({ color_14: '#6f6f6f', select_14: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_14: '#0bbe20', select_14: true });
                        select_flag = true;
                    }
                    break;
                case "15":
                    if (this.state.select_15) {
                        this.setState({ color_15: '#6f6f6f', select_15: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_15: '#0bbe20', select_15: true });
                        select_flag = true;
                    }
                    break;
                case "16":
                    if (this.state.select_16) {
                        this.setState({ color_16: '#6f6f6f', select_16: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_16: '#0bbe20', select_16: true });
                        select_flag = true;
                    }
                    break;
                case "17":
                    if (this.state.select_17) {
                        this.setState({ color_17: '#6f6f6f', select_17: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_17: '#0bbe20', select_17: true });
                        select_flag = true;
                    }
                    break;
                case "18":
                    if (this.state.select_18) {
                        this.setState({ color_18: '#6f6f6f', select_18: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_18: '#0bbe20', select_18: true });
                        select_flag = true;
                    }
                    break;
                case "19":
                    if (this.state.select_19) {
                        this.setState({ color_19: '#6f6f6f', select_19: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_19: '#0bbe20', select_19: true });
                        select_flag = true;
                    }
                    break;
                case "20":
                    if (this.state.select_20) {
                        this.setState({ color_20: '#6f6f6f', select_20: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_20: '#0bbe20', select_20: true });
                        select_flag = true;
                    }
                    break;
                case "21":
                    if (this.state.select_21) {
                        this.setState({ color_21: '#6f6f6f', select_21: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_21: '#0bbe20', select_21: true });
                        select_flag = true;
                    }
                    break;
                case "22":
                    if (this.state.select_22) {
                        this.setState({ color_22: '#6f6f6f', select_22: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_22: '#0bbe20', select_22: true });
                        select_flag = true;
                    }
                    break;
                case "23":
                    if (this.state.select_23) {
                        this.setState({ color_23: '#6f6f6f', select_23: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_23: '#0bbe20', select_23: true });
                        select_flag = true;
                    }
                    break;
                case "24":
                    if (this.state.select_24) {
                        this.setState({ color_24: '#6f6f6f', select_24: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_24: '#0bbe20', select_24: true });
                        select_flag = true;
                    }
                    break;
                case "25":
                    if (this.state.select_25) {
                        this.setState({ color_25: '#6f6f6f', select_25: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_25: '#0bbe20', select_25: true });
                        select_flag = true;
                    }
                    break;
                case "26":
                    if (this.state.select_26) {
                        this.setState({ color_26: '#6f6f6f', select_26: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_26: '#0bbe20', select_26: true });
                        select_flag = true;
                    }
                    break;
                case "27":
                    if (this.state.select_27) {
                        this.setState({ color_27: '#6f6f6f', select_27: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_27: '#0bbe20', select_27: true });
                        select_flag = true;
                    }
                    break;
                case "28":
                    if (this.state.select_28) {
                        this.setState({ color_28: '#6f6f6f', select_28: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_28: '#0bbe20', select_28: true });
                        select_flag = true;
                    }
                    break;
                case "29":
                    if (this.state.select_29) {
                        this.setState({ color_29: '#6f6f6f', select_29: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_29: '#0bbe20', select_29: true });
                        select_flag = true;
                    }
                    break;
                case "30":
                    if (this.state.select_30) {
                        this.setState({ color_30: '#6f6f6f', select_30: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_30: '#0bbe20', select_30: true });
                        select_flag = true;
                    }
                    break;
                case "31":
                    if (this.state.select_31) {
                        this.setState({ color_31: '#6f6f6f', select_31: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_31: '#0bbe20', select_31: true });
                        select_flag = true;
                    }
                    break;
                case "32":
                    if (this.state.select_32) {
                        this.setState({ color_32: '#6f6f6f', select_32: false });
                        select_flag = false;
                    } else {
                        this.setState({ color_32: '#0bbe20', select_32: true });
                        select_flag = true;
                    }
                    break;
            }

            let slected_item_name = tooth_item.label;
            let select = false;
            if (current_option == 'left') {
                if (selected_tooth_left.length > 0) select = selected_tooth_left.indexOf(slected_item_name) != -1;

                if (select_flag) {
                    if (!select) selected_tooth_left.push(slected_item_name);
                } else {
                    if (select) {
                        if (selected_tooth_left.length > 0) {
                            let index = selected_tooth_left.indexOf(slected_item_name);
                            if (index > -1) {
                                selected_tooth_left.splice(index, 1);
                            }
                        }
                    }
                }
                this.setState({ selected_tooth_left: selected_tooth_left })
            }

            if (current_option == 'right') {
                if (selected_tooth_right.length > 0) select = selected_tooth_right.indexOf(slected_item_name) != -1;

                if (select_flag) {
                    if (!select) selected_tooth_right.push(slected_item_name);
                } else {
                    if (select) {
                        if (selected_tooth_right.length > 0) {
                            let index = selected_tooth_right.indexOf(slected_item_name);
                            if (index > -1) {
                                selected_tooth_right.splice(index, 1);
                            }
                        }
                    }
                }
                this.setState({ selected_tooth_right: selected_tooth_right })
            }
        }
    }

    btnProcess() {

        let item = {};
        item.service_type = this.state.service_type;
        item.service_kind = this.state.service_kind;
        item.service_type_option = this.state.service_type_option;
        item.saved_tooth_left = this.state.saved_tooth_left;
        item.saved_tooth_right = this.state.saved_tooth_right;
        item.saved_tooth_all = this.state.saved_tooth_all;
        item.distance = this.state.distance;
        item.shipping_option = this.state.shipping_option;
        item.shipping_option_option = this.state.shipping_option_option;
        item.shipping_name = this.state.shipping_name;
        item.delivery = this.state.delivery;
        item.file = this.state.file;
        //console.log(JSON.stringify(item));
        if (this.state.service_kind == 'lab') {
            //go to LabDentalNewService1
            this.props.navigation.navigate('LabDentalNewService1');
        } else {
            //console.log("::::::");           
            this.props.navigation.navigate('DentalNewService1', { item: item });
        }
    }

    goLabDentalNewService3() {
        let item = {};
        item.service_type = this.state.service_type;
        item.service_kind = this.state.service_kind;
        item.service_type_option = this.state.service_type_option;
        item.crown_type = this.state.crown_type;
        item.crown_type_option = this.state.crown_type_option;
        item.imconnection_type = this.state.imconnection_type;
        item.imconnection_option = this.state.imconnection_option;
        item.imcrown_type = this.state.imcrown_type;
        item.imcrown_option = this.state.imcrown_option;
        item.crown_option = this.state.crown_option; //prosthesis
        item.crown_option_option = this.state.crown_option_option;
        this.props.navigation.navigate('LabDentalNewService3', { item3: item });
    }

    render() {
        const { navigation } = this.props;
        let { service_type, loading, services, tooth_list, success, delivery, service_kind,
            crownoptions, crowntypes, leftModal, rightModal, thirdModal, shipping_options,
            shippingPanel, shipping_name, crown_type, crown_type_option, crown_option,
            crown_option_option, imconnections, imcrowns, imconnection_type, imconnection_option, imcrown_type, imcrown_option,
            color_01, select_01, color_02, select_02, color_03, select_03,
            color_04, select_04, color_05, select_05, color_06, select_06,
            color_07, select_07, color_08, select_08, color_09, select_09,
            color_10, select_10, color_11, select_11, color_12, select_12,
            color_13, select_13, color_14, select_14, color_15, select_15,
            color_16, select_16, color_17, select_17, color_18, select_18,
            color_19, select_19, color_20, select_20, color_21, select_21,
            color_22, select_22, color_23, select_23, color_24, select_24,
            color_25, select_25, color_26, select_26, color_27, select_27,
            color_28, select_28, color_29, select_29, color_30, select_30,
            color_31, select_31, color_32, select_32, selected_tooth,
            selected_tooth_left, selected_tooth_right, service_type_option, flag_2d,
            distance, select_item, saved_tooth_left, saved_tooth_right, saved_tooth_all
        } = this.state;
        //const services = Utils.genders();        
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
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalNew'); }}>
                                <Image source={Icons.icon_folder} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                            <Text style={styles.main_text}>
                                {Utils.translate("dentalnew_s.label")}
                            </Text>
                        </View>


                        <View style={styles.main_contain}>
                            <Text style={styles.title}>
                                {Utils.translate("dentalnew_s.title")}
                            </Text>
                            <Text style={styles.second_title}>
                                {Utils.translate("dentalnew_s.desc")}
                            </Text>
                            <View>
                                <ModalSelector
                                    data={services}
                                    initValue="Select something states in Brazil!"
                                    supportedOrientations={['landscape']}
                                    accessible={true}
                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                    cancelText={'CANCELAR'}
                                    onChange={(option) => { this.setState({ service_type: option.label }); this.changeService(); }}>
                                    <View style={[BaseStyle.viewInput, { width: Dimensions.get('window').width - 50, marginTop: 10 }]}>
                                        <Image
                                            source={Icons.icon_service}
                                            style={BaseStyle.imgInput}
                                        />
                                        <TextInput
                                            style={[BaseStyle.textInput0, { color: '#636465' }]}
                                            editable={false}
                                            placeholder={Utils.translate("dentalnew_s.select_service")}
                                            onChangeText={text => { this.setState({ service_type: text }); }}
                                            autoCorrect={false}
                                            placeholderTextColor={
                                                success.service_type ? BaseColor.filedGrayColor : BaseColor.errorColor
                                            }
                                            value={service_type} />
                                    </View>
                                </ModalSelector>
                            </View>

                            {(service_kind == 'plan') && (
                                <>
                                    <ScrollView style={{ width: '100%' }}>
                                        {/* tooth part */}
                                        {(service_type_option == 'asses' || service_type_option == 'plan2d' || service_type_option == 'model' || service_type_option == 'guide') && (
                                            <>
                                                <Text style={[styles.title, { paddingTop: 10, paddingBottom: 10 }]}>
                                                    {Utils.translate("dentalnew_s.select_dental")}
                                                </Text>
                                                <View style={{ backgroundColor: 'white', borderRadius: 15, height: 150, width: "100%", marginTop: 5 }}>
                                                    <View style={{
                                                        flex: 1, alignItems: 'center',
                                                        justifyContent: 'center', flexDirection: 'row',
                                                        paddingBottom: 10, paddingTop: 10, width: '100%'
                                                    }}>
                                                        <TouchableOpacity onPress={() => { this.setState({ leftModal: true }) }}>
                                                            <View style={[styles.view_contain, { flex: 1, width: 120, marginRight: 10 }]}>
                                                                <Text style={styles.view_title} >{Utils.translate('dentalnew_s.upper_arch')} </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setState({ rightModal: true }) }} >
                                                            <View style={[styles.view_contain, { flex: 1, width: 120, marginLeft: 20 }]}>
                                                                <Text style={styles.view_title}>{Utils.translate('dentalnew_s.lower_arch')}</Text>
                                                            </View>
                                                        </TouchableOpacity>

                                                    </View>
                                                    <View
                                                        style={{
                                                            borderBottomColor: '#cdcbcb',
                                                            borderBottomWidth: 1,
                                                            paddingTop: 0
                                                        }}
                                                    />
                                                    <View style={{ width: '100%', paddingRight: 5, alignItems: 'center', paddingBottom: 20 }}>
                                                        <Text style={[styles.second_title, { color: '#bab7b7', paddingBottom: 0, fontSize: 13 }]}>
                                                            {Utils.translate('dentalnew_s.selected_teeth')}
                                                        </Text>
                                                        {(selected_tooth.length <= 0) ? (
                                                            <Text style={[styles.second_title, { color: '#bab7b7', paddingTop: 0, fontSize: 12 }]}>
                                                                {Utils.translate('dentalnew_s.no_selected_teeth')}
                                                            </Text>
                                                        ) : (
                                                                <>
                                                                    <Text style={[{ color: '#6f6f6f', textAlign: 'center', fontSize: 12 }]}>
                                                                        {this.state.saved_tooth_left.toString()}
                                                                    </Text>
                                                                    <Text style={[{ color: '#6f6f6f', textAlign: 'center', fontSize: 12 }]}>
                                                                        {this.state.saved_tooth_right.toString()}
                                                                    </Text>
                                                                </>
                                                            )}

                                                    </View>
                                                </View>
                                            </>
                                        )}

                                        {/* 2d part */}
                                        {(service_type_option == 'plan2d') && (
                                            <>
                                                <Text style={[styles.title, { marginTop: 15 }]}>
                                                    {Utils.translate("dentalnew_s.inform_distance")}
                                                </Text>
                                                <Text style={[styles.second_title, { fontSize: 13 }]}>
                                                    {Utils.translate("dentalnew_s.distance_title")}
                                                </Text>
                                                <View style={[BaseStyle.viewInput, { marginTop: 0 }]}>
                                                    <Image
                                                        source={Icons.icon_full_name}
                                                        style={BaseStyle.imgInput}
                                                    />
                                                    <TextInput
                                                        style={[BaseStyle.textInput0, { fontSize: 12 }]}
                                                        placeholder={Utils.translate("dentalnew_s.distance_example")}
                                                        value={distance}
                                                        onChangeText={text => {
                                                            if ((/^\d+$/.test(text) && text.length < 4) || text == '') {
                                                                this.setState({
                                                                    distance: text
                                                                });
                                                            }
                                                        }}
                                                        autoCorrect={false}
                                                        placeholderTextColor={
                                                            success.distance ? BaseColor.filedGrayColor : BaseColor.errorColor
                                                        }
                                                        keyboardType={'numeric'}
                                                    />
                                                </View>
                                            </>
                                        )}

                                        {/* 3d part */}
                                        {((service_type_option == 'plan3d' && flag_2d) || service_type_option == 'guide') &&
                                            <>
                                                <View style={[styles.main_contain, { marginTop: 0, paddingTop: 10, paddingBottom: 0 }]}>
                                                    <Text style={styles.title}>
                                                        {Utils.translate("dentalnew_s.shipping_option")}
                                                    </Text>
                                                    <Text style={styles.second_title}>
                                                        {Utils.translate("dentalnew_s.shipping_title")}
                                                    </Text>
                                                    <View>
                                                        <ModalSelector
                                                            data={shipping_options}
                                                            initValue="Select something states in Brazil!"
                                                            supportedOrientations={['landscape']}
                                                            accessible={true}
                                                            scrollViewAccessibilityLabel={'Scrollable options'}
                                                            cancelButtonAccessibilityLabel={'Cancel Button'}
                                                            cancelText= {'CANCELAR'}
                                                            onChange={(option) => { this.setState({ shipping_name: option.label }); this.changeShipping(); }}>
                                                            <View style={[BaseStyle.viewInput, { width: Dimensions.get('window').width - 50, marginTop: 10 }]}>
                                                                <Image
                                                                    source={Icons.icon_service}
                                                                    style={BaseStyle.imgInput}
                                                                />
                                                                <TextInput
                                                                    style={[BaseStyle.textInput0, { color: '#636465' }]}
                                                                    editable={false}
                                                                    placeholder={Utils.translate("dentalnew_s.select_service")}
                                                                    onChangeText={text => { this.setState({ shipping_name: text }); }}
                                                                    autoCorrect={false}
                                                                    value={shipping_name} />
                                                            </View>
                                                        </ModalSelector>
                                                    </View>
                                                </View>
                                            </>
                                        }

                                        {/* shipping panel for 3d part */}
                                        {((shippingPanel && service_type_option == 'plan3d') || (shippingPanel && service_type_option == 'guide')) &&
                                            <>
                                                <Text style={[styles.title, { paddingTop: 0, paddingBottom: 10 }]}>
                                                    {Utils.translate("dentalnew_s.delivery_title")}
                                                </Text>
                                                <Text style={[styles.second_title, { paddingTop: 0, marginTop: 0 }]}>
                                                    {Utils.translate("dentalnew_s.delivery_confirm")}
                                                </Text>
                                                <View style={{ backgroundColor: 'white', borderRadius: 15, height: 130, width: "100%", marginTop: 0 }}>
                                                    <View style={{
                                                        flex: 1, alignItems: 'center',
                                                        justifyContent: 'center', flexDirection: 'row',
                                                        paddingBottom: 10, paddingTop: 10
                                                    }}>
                                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalDelivery'); }}>
                                                            <View style={[styles.view_contain, { flex: 1, flexDirection: 'column', paddingLeft: 50, paddingRight: 50, width: '100%', marginRight: 10 }]}>
                                                                <Text style={styles.view_title} >{this.state.delivery.item.address} </Text>
                                                                <Text style={styles.view_title} >{this.state.delivery.item.number} , {this.state.delivery.item.city}</Text>
                                                                <Text style={styles.view_title} >{this.state.delivery.item.code}, {this.state.delivery.item.state}  {this.state.delivery.item.local} </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View
                                                        style={{
                                                            borderBottomColor: '#cdcbcb',
                                                            borderBottomWidth: 1,
                                                            paddingTop: 0
                                                        }}
                                                    />
                                                    <View style={{ width: '100%', paddingRight: 5, alignItems: 'center', paddingBottom: 5 }}>
                                                        <Text style={[styles.second_title, { color: '#bab7b7', paddingBottom: 0, fontSize: 14 }]}>
                                                            {Utils.translate('dentalnew_s.shipping_desc')}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </>
                                        }

                                        {/* bottom button part */}
                                        <View style={{
                                            width: "100%",
                                            flex: 1,
                                            justifyContent: 'flex-end',
                                            marginBottom: 16,
                                            alignItems: "center",
                                            marginTop: 30
                                        }}>
                                            <View style={{ width: "100%" }}>
                                                {(service_type_option != '') ? (
                                                    <Button
                                                        full
                                                        loading={loading}
                                                        onPress={() => this.btnProcess()}
                                                        style={{ backgroundColor: BaseColor.primaryColor }}
                                                    >
                                                        <Text style={{ fontSize: 14, color: 'white' }}>{Utils.translate("dentalnew_s.continune")}</Text>
                                                    </Button>
                                                ) : (
                                                        <Button
                                                            full
                                                            loading={loading}
                                                            style={{ backgroundColor: '#b1b0b0' }}
                                                        >
                                                            <Text style={{ fontSize: 14, color: 'white' }}>{Utils.translate("dentalnew_s.continune")}</Text>
                                                        </Button>
                                                    )}
                                            </View>
                                            <View style={{ flexDirection: "row", textAlign: "center", alignItems: "center", marginTop: 10 }}>
                                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalNew'); }}>
                                                    <Image source={Icons.icon_left_arrow} style={{ tintColor: BaseColor.primaryColor, width: 30, height: 30 }} />
                                                </TouchableOpacity>
                                                <Text style={styles.signup_labelSecond}>
                                                    {Utils.translate("dentalnew_s.page1")}
                                                </Text>
                                            </View>
                                        </View>
                                        <Modal
                                            width={Dimensions.get('window').width - 50}
                                            visible={this.state.leftModal}
                                            onTouchOutside={() => {
                                                this.setState({ leftModal: false });
                                            }}
                                            onSwipeOut={(event) => {
                                                this.setState({ leftModal: false });
                                            }}
                                            modalTitle={<ModalTitle style={{ backgroundColor: BaseColor.primaryColor }}
                                                textStyle={{ color: 'white', fontSize: 14 }}
                                                title={Utils.translate('dentalnew_s.upper_arch')} />}
                                        >

                                            <ModalContent>
                                                <View style={{ backgroundColor: 'white', borderRadius: 15, height: 180, width: "100%", marginTop: 5 }}>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 150, left: 70 }} onPress={() => { this.changeTooth('01'); }}>
                                                        <Image source={Images.tooth_01} style={{ tintColor: color_01, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 124, left: 70 }} onPress={() => { this.changeTooth('02'); }}>
                                                        <Image source={Images.tooth_02} style={{ tintColor: color_02, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 100, left: 75 }} onPress={() => { this.changeTooth('03'); }}>
                                                        <Image source={Images.tooth_03} style={{ tintColor: color_03, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 79, left: 82 }} onPress={() => { this.changeTooth('04'); }}>
                                                        <Image source={Images.tooth_04} style={{ tintColor: color_04, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 60, left: 92 }} onPress={() => { this.changeTooth('05'); }}>
                                                        <Image source={Images.tooth_05} style={{ tintColor: color_05, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 46, left: 106 }} onPress={() => { this.changeTooth('06'); }}>
                                                        <Image source={Images.tooth_06} style={{ tintColor: color_06, width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 29, left: 115 }} onPress={() => { this.changeTooth('07'); }}>
                                                        <Image source={Images.tooth_07} style={{ tintColor: color_07, width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 22, left: 132 }} onPress={() => { this.changeTooth('08'); }}>
                                                        <Image source={Images.tooth_08} style={{ tintColor: color_08, width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 22, left: 152 }} onPress={() => { this.changeTooth('09'); }}>
                                                        <Image source={Images.tooth_09} style={{ tintColor: color_09, width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 29, left: 172 }} onPress={() => { this.changeTooth('10'); }}>
                                                        <Image source={Images.tooth_10} style={{ tintColor: color_10, width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 46, left: 182 }} onPress={() => { this.changeTooth('11'); }}>
                                                        <Image source={Images.tooth_11} style={{ tintColor: color_11, width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 60, left: 192 }} onPress={() => { this.changeTooth('12'); }}>
                                                        <Image source={Images.tooth_12} style={{ tintColor: color_12, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 79, left: 202 }} onPress={() => { this.changeTooth('13'); }}>
                                                        <Image source={Images.tooth_13} style={{ tintColor: color_13, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 100, left: 209 }} onPress={() => { this.changeTooth('14'); }}>
                                                        <Image source={Images.tooth_14} style={{ tintColor: color_14, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 124, left: 213 }} onPress={() => { this.changeTooth('15'); }}>
                                                        <Image source={Images.tooth_15} style={{ tintColor: color_15, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 150, left: 213 }} onPress={() => { this.changeTooth('16'); }}>
                                                        <Image source={Images.tooth_16} style={{ tintColor: color_16, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <Text style={[styles.second_title, { fontSize: 12 }]}>
                                                        {Utils.translate("dentalnew_s.text_modal")}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text style={[styles.second_title, { fontSize: 12 }]}>
                                                        {selected_tooth_left.toString()}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginTop: 30,
                                                    marginBottom: 20
                                                }}>
                                                    <Button
                                                        full
                                                        loading={loading}
                                                        onPress={() => this.saveTooth()}
                                                        style={{ flex: 1, height: 40, marginLeft: 15, marginRight: 15, backgroundColor: BaseColor.greenColor }}
                                                    >
                                                        <Text style={[{ textAlign: "center", color: '#fff', fontSize: 12 }]}>
                                                            {Utils.translate("dentalnew_s.btn_select")}
                                                        </Text>
                                                    </Button>
                                                    <Button
                                                        full
                                                        loading={loading}
                                                        onPress={() => { this.setState({ leftModal: false }) }}
                                                        style={{ flex: 1, height: 40, marginLeft: 15, marginRight: 15, backgroundColor: '#c13717' }}
                                                    >
                                                        <Text style={[{ textAlign: "center", color: '#fff', fontSize: 12 }]}>
                                                            {Utils.translate("dentalnew_s.btn_cancel")}
                                                        </Text>
                                                    </Button>
                                                </View>
                                            </ModalContent>
                                        </Modal>
                                        {/* rightModal */}
                                        <Modal
                                            width={Dimensions.get('window').width - 50}
                                            visible={this.state.rightModal}
                                            onTouchOutside={() => {
                                                this.setState({ rightModal: false });
                                            }}
                                            onSwipeOut={(event) => {
                                                this.setState({ rightModal: false });
                                            }}
                                            modalTitle={<ModalTitle style={{ backgroundColor: BaseColor.primaryColor }}
                                                textStyle={{ color: 'white', fontSize: 14 }}
                                                title={Utils.translate('dentalnew_s.lower_arch')} />}
                                        >

                                            <ModalContent>
                                                <View style={{ backgroundColor: 'white', borderRadius: 15, height: 180, width: "100%", marginTop: 5 }}>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 22, left: 213 }} onPress={() => { this.changeTooth('17'); }}>
                                                        <Image source={Images.tooth_17} style={{ tintColor: color_17, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 47, left: 213 }} onPress={() => { this.changeTooth('18'); }}>
                                                        <Image source={Images.tooth_18} style={{ tintColor: color_18, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 71, left: 210 }} onPress={() => { this.changeTooth('19'); }}>
                                                        <Image source={Images.tooth_19} style={{ tintColor: color_19, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 93, left: 205 }} onPress={() => { this.changeTooth('20'); }}>
                                                        <Image source={Images.tooth_20} style={{ tintColor: color_20, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 113, left: 195 }} onPress={() => { this.changeTooth('21'); }}>
                                                        <Image source={Images.tooth_21} style={{ tintColor: color_21, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 134, left: 188 }} onPress={() => { this.changeTooth('22'); }}>
                                                        <Image source={Images.tooth_22} style={{ tintColor: color_22, width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 149, left: 180 }} onPress={() => { this.changeTooth('23'); }}>
                                                        <Image source={Images.tooth_23} style={{ tintColor: color_23, width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 157, left: 161 }} onPress={() => { this.changeTooth('24'); }}>
                                                        <Image source={Images.tooth_24} style={{ tintColor: color_24, width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 157, left: 138 }} onPress={() => { this.changeTooth('25'); }}>
                                                        <Image source={Images.tooth_25} style={{ tintColor: color_25, width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 149, left: 119 }} onPress={() => { this.changeTooth('26'); }}>
                                                        <Image source={Images.tooth_26} style={{ tintColor: color_26, width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 134, left: 110 }} onPress={() => { this.changeTooth('27'); }}>
                                                        <Image source={Images.tooth_27} style={{ tintColor: color_27, width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 113, left: 97 }} onPress={() => { this.changeTooth('28'); }}>
                                                        <Image source={Images.tooth_28} style={{ tintColor: color_28, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 93, left: 89 }} onPress={() => { this.changeTooth('29'); }}>
                                                        <Image source={Images.tooth_29} style={{ tintColor: color_29, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 71, left: 82 }} onPress={() => { this.changeTooth('30'); }}>
                                                        <Image source={Images.tooth_30} style={{ tintColor: color_30, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 47, left: 78 }} onPress={() => { this.changeTooth('31'); }}>
                                                        <Image source={Images.tooth_31} style={{ tintColor: color_31, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 22, left: 78 }} onPress={() => { this.changeTooth('32'); }}>
                                                        <Image source={Images.tooth_32} style={{ tintColor: color_32, width: 30, height: 30 }} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <Text style={[styles.second_title, { fontSize: 12 }]}>
                                                        {Utils.translate("dentalnew_s.text_modal")}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text style={[styles.second_title, { fontSize: 12 }]}>
                                                        {selected_tooth_right.toString()}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginTop: 30,
                                                    marginBottom: 20
                                                }}>
                                                    <Button
                                                        full
                                                        loading={loading}
                                                        onPress={() => this.saveTooth()}
                                                        style={{ flex: 1, height: 40, marginLeft: 15, marginRight: 15, backgroundColor: BaseColor.greenColor }}
                                                    >
                                                        <Text style={[{ textAlign: "center", color: '#fff', fontSize: 12 }]}>
                                                            {Utils.translate("dentalnew_s.btn_select")}
                                                        </Text>
                                                    </Button>
                                                    <Button
                                                        full
                                                        loading={loading}
                                                        onPress={() => { this.setState({ rightModal: false }) }}
                                                        style={{ flex: 1, height: 40, marginLeft: 15, marginRight: 15, backgroundColor: '#c13717' }}
                                                    >
                                                        <Text style={[{ textAlign: "center", color: '#fff', fontSize: 12 }]}>
                                                            {Utils.translate("dentalnew_s.btn_cancel")}
                                                        </Text>
                                                    </Button>
                                                </View>
                                            </ModalContent>
                                        </Modal>
                                        {/* end right modal */}
                                        {/* 3d modal */}
                                        <Modal
                                            width={Dimensions.get('window').width - 50}
                                            visible={this.state.thirdModal}
                                            onTouchOutside={() => {
                                                this.setState({ thirdModal: false });
                                            }}
                                            onSwipeOut={(event) => {
                                                this.setState({ thirdModal: false });
                                            }}
                                            modalTitle={<ModalTitle style={{ backgroundColor: BaseColor.primaryColor }}
                                                textStyle={{ color: 'white', fontSize: 14 }}
                                                title={Utils.translate('dentalnew_s.thirdmodal_title')} />}
                                        >

                                            <ModalContent>
                                                <View style={{ backgroundColor: 'white', borderRadius: 15, height: 80, width: "100%", marginTop: 5 }}>
                                                    <Text style={[styles.second_title, { fontSize: 13 }]}>
                                                        {Utils.translate("dentalnew_s.thirdmodal_desc")}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginTop: 10,
                                                    marginBottom: 10
                                                }}>
                                                    <Button
                                                        full
                                                        onPress={() => { this.setState({ thirdModal: false }) }}
                                                        style={{ flex: 1, height: 30, marginLeft: 75, marginRight: 75, backgroundColor: '#1d8b07' }}
                                                    >
                                                        <Text style={[{ textAlign: "center", color: '#fff', fontSize: 12 }]}>
                                                            {Utils.translate("dentalnew_s.thirdmodal_close")}
                                                        </Text>
                                                    </Button>
                                                </View>
                                            </ModalContent>
                                        </Modal>
                                        {/* end 3d modal */}
                                    </ScrollView>
                                </>
                            )}

                            {(service_kind == "lab") && (
                                <>
                                    <ScrollView>
                                        {/* first */}
                                        <Text style={[styles.title, { paddingTop: 20 }]}>
                                            {Utils.translate("dentalnew_s.tooth_implant")}
                                        </Text>
                                        <Text style={styles.second_title}>
                                            {Utils.translate("dentalnew_s.tooth_implant_desc")}
                                        </Text>
                                        <View>
                                            <ModalSelector
                                                data={crowntypes}
                                                initValue="Select something states in Brazil!"
                                                supportedOrientations={['landscape']}
                                                accessible={true}
                                                scrollViewAccessibilityLabel={'Scrollable options'}
                                                cancelButtonAccessibilityLabel={'Cancel Button'}
                                                cancelText = {'CANCELAR'}
                                                onChange={(option) => {
                                                    this.setState({ crown_type: option.label });
                                                    this.setState({ crown_type_option: option.option });
                                                    this.setState({ 'imconnection_type': '' });
                                                    this.setState({ 'imconnection_type_option': '' });
                                                    this.setState({ 'imcrown_type': '' });
                                                    this.setState({ 'imcrown_type_option': '' });
                                                }}>
                                                <View style={[BaseStyle.viewInput, { width: Dimensions.get('window').width - 50, marginTop: 10 }]}>
                                                    <TextInput
                                                        style={[BaseStyle.textInput0, { paddingLeft: 20, color: '#636465' }]}
                                                        editable={false}
                                                        placeholder={Utils.translate("dentalnew_s.tooth_implant_desc")}
                                                        onChangeText={text => { this.setState({ crown_type: text }); }}
                                                        autoCorrect={false}
                                                        value={crown_type} />
                                                </View>
                                            </ModalSelector>
                                        </View>
                                        {/* if impalnt is true */}
                                        {(this.state.crown_type_option == 'implante') && (
                                            <>
                                                <Text style={[styles.title, { paddingTop: 20 }]}>
                                                    {Utils.translate("dentalnew_s.implant_option")}
                                                </Text>
                                                <Text style={styles.second_title}>
                                                    {Utils.translate("dentalnew_s.implant_option_desc")}
                                                </Text>
                                                <View>
                                                    <ModalSelector
                                                        data={imconnections}
                                                        initValue="Select something states in Brazil!"
                                                        supportedOrientations={['landscape']}
                                                        accessible={true}
                                                        scrollViewAccessibilityLabel={'Scrollable options'}
                                                        cancelButtonAccessibilityLabel={'Cancel Button'}
                                                        cancelText = {'CANCELAR'}
                                                        onChange={(option) => {
                                                            this.setState({ imconnection_type: option.label });
                                                            this.setState({ imconnection_option: option.option })
                                                        }}>
                                                        <View style={[BaseStyle.viewInput, { width: Dimensions.get('window').width - 50, marginTop: 10 }]}>
                                                            <TextInput
                                                                style={[BaseStyle.textInput0, { paddingLeft: 20, color: '#636465' }]}
                                                                editable={false}
                                                                placeholder={Utils.translate("dentalnew_s.select_service")}
                                                                onChangeText={text => { this.setState({ imconnection_type: text }); }}
                                                                autoCorrect={false}
                                                                value={imconnection_type} />
                                                        </View>
                                                    </ModalSelector>
                                                </View>
                                                <View>
                                                    <ModalSelector
                                                        data={imcrowns}
                                                        initValue="Select something states in Brazil!"
                                                        supportedOrientations={['landscape']}
                                                        accessible={true}
                                                        scrollViewAccessibilityLabel={'Scrollable options'}
                                                        cancelButtonAccessibilityLabel={'Cancel Button'}
                                                        cancelText = {'CANCELAR'}
                                                        onChange={(option) => {
                                                            this.setState({ imcrown_type: option.label });
                                                            this.setState({ imcrown_option: option.option })
                                                        }}>
                                                        <View style={[BaseStyle.viewInput, { width: Dimensions.get('window').width - 50, marginTop: 10 }]}>
                                                            <TextInput
                                                                style={[BaseStyle.textInput0, { paddingLeft: 20, color: '#636465' }]}
                                                                editable={false}
                                                                placeholder={Utils.translate("dentalnew_s.select_service")}
                                                                onChangeText={text => { this.setState({ imcrown_type: text }); }}
                                                                autoCorrect={false}
                                                                value={imcrown_type} />
                                                        </View>
                                                    </ModalSelector>
                                                </View>
                                            </>
                                        )}

                                        {/* second  */}
                                        <Text style={[styles.title, { paddingTop: 20 }]}>
                                            {Utils.translate("dentalnew_s.crown_option")}
                                        </Text>
                                        <Text style={styles.second_title}>
                                            {Utils.translate("dentalnew_s.crown_option_desc")}
                                        </Text>
                                        <View>
                                            <ModalSelector
                                                data={crownoptions}
                                                initValue="Select something states in Brazil!"
                                                supportedOrientations={['landscape']}
                                                accessible={true}
                                                scrollViewAccessibilityLabel={'Scrollable options'}
                                                cancelButtonAccessibilityLabel={'Cancel Button'}
                                                cancelText = {'CANCELAR'}
                                                onChange={(option) => { this.setState({ crown_option: option.label }); this.setState({ crown_option_option: option.option }); }}>
                                                <View style={[BaseStyle.viewInput, { width: Dimensions.get('window').width - 50, marginTop: 10 }]}>
                                                    <TextInput
                                                        style={[BaseStyle.textInput0, { paddingLeft: 20, color: '#636465' }]}
                                                        editable={false}
                                                        placeholder={Utils.translate("dentalnew_s.crown_option_desc")}
                                                        onChangeText={text => { this.setState({ crown_option: text }); }}
                                                        autoCorrect={false}
                                                        value={crown_option} />
                                                </View>
                                            </ModalSelector>
                                        </View>
                                        {/*  */}
                                        {/* bottom button part */}
                                        <View style={{
                                            width: "100%",
                                            flex: 1,
                                            justifyContent: 'flex-end',
                                            marginBottom: 16,
                                            marginTop: 60,
                                            alignItems: "center"
                                        }}>
                                            <View style={{ width: "100%" }}>
                                                <Button
                                                    full
                                                    loading={loading}
                                                    onPress={() => this.goLabDentalNewService3()}
                                                    style={{ backgroundColor: BaseColor.primaryColor }}
                                                >
                                                    <Text style={{ fontSize: 14, color: 'white' }}>{Utils.translate("dentalnew_s.continune")}</Text>
                                                </Button>
                                            </View>
                                            <View style={{ flexDirection: "row", textAlign: "center", alignItems: "center", marginTop: 10 }}>
                                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalNew'); }}>
                                                    <Image source={Icons.icon_left_arrow} style={{ tintColor: BaseColor.primaryColor, width: 30, height: 30 }} />
                                                </TouchableOpacity>
                                                <Text style={styles.signup_labelSecond}>
                                                    {Utils.translate("dentalnew_s.page3")}
                                                </Text>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </>
                            )}
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


export default connect(null, mapDispatchToProps)(DentalNewService);
