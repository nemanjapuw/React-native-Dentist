import React, { Component } from "react";
import { View, Dimensions, ImageBackground, ScrollView, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
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


class LabDentalNewService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            services: [],
            colors: [],
            materials: [],
            tooth_list: [],
            service_type: '',
            color_type: '',
            color_type_option: '',
            service_kind: '',
            material_type: '',
            material_option: '',
            material_sub_option: '',
            material_price: 0,
            leftModal: false,
            rightModal: false,
            selected_tooth: [],
            selected_tooth_left: [],
            selected_tooth_right: [],
            selected_tooth_all: [],
            saved_tooth_left: [],
            saved_tooth_right: [],
            saved_tooth_all: [],
            service_type_option: '',
            select_item: {},
            file: {},
            item: {},
            crown_type: '',
            crown_type_option: '',
            crown_option: '',
            crown_option_option: '',
            imconnection_type: '',
            imconnection_option: '',
            imcrown_type: '',
            imcrown_option: '',
            observation_text: '',
            back_comp: '',
            read_write: "write",
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

    //get colors
    getColors() {
        this.setState({ colors: [], loading: true }, () => {
            this.props.actions.apiActions.getColors(response => {
                if (response.success)
                    this.setState({
                        colors: response.colors,
                    });
                this.setState({ loading: false });
            });
        });
    }

    //get material contact 
    getMaterialContacts() {
        this.setState({ materials: [], loading: true }, () => {
            this.props.actions.apiActions.getMaterialContact(response => {
                if (response.success)
                    this.setState({
                        materials: response.materials,
                    });
                this.setState({ loading: false });
            });
        });
    }

    //get material overlay 
    getMaterialOverlays() {
        this.setState({ materials: [], loading: true }, () => {
            this.props.actions.apiActions.getMaterialOverlay(response => {
                if (response.success)
                    this.setState({
                        materials: response.materials,
                    });
                this.setState({ loading: false });
            });
        });
    }

    //get material single 
    getMaterialSingles() {
        this.setState({ materials: [], loading: true }, () => {
            this.props.actions.apiActions.getMaterialSingle(response => {
                if (response.success)
                    this.setState({
                        materials: response.materials,
                    });
                this.setState({ loading: false });
                // console.log(":::::::::::::" + JSON.stringify(response.materials));
            });
        });
    }

    //get material aprtail 
    getMaterialPartials() {
        this.setState({ materials: [], loading: true }, () => {
            this.props.actions.apiActions.getMaterialPartial(response => {
                if (response.success)
                    this.setState({
                        materials: response.materials,
                    });
                this.setState({ loading: false });
            });
        });
    }
    //get material implant    
    getMaterialImplants() {
        this.setState({ materials: [], loading: true }, () => {
            this.props.actions.apiActions.getMaterialImplant(response => {
                if (response.success)
                    this.setState({
                        materials: response.materials,
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

    //
    async componentDidMount() {
        this.getColors();
        this.getServices();
        this.getToothList();
        let service_type_option = '';
        let service_kind = '';
        let service_type = '';

        let service_t = store.getState().option.service_type;
        service_type_option = service_t.service_type_option;
        service_kind = service_t.service_kind;
        service_type = service_t.service_type;
        this.setState({
            service_type_option: service_type_option,
            service_kind: service_kind,
            service_type: service_type
        });

        ///process edit
        debugger;
        let origin = {};
        if (!Utils.isEmpty(store.getState().origin.origin)) {
            origin = store.getState().origin.origin;
            if (!Utils.isEmpty(origin)) {
                service_type_option = origin.service_type_option;
                service_kind = origin.service_kind;
                service_type = origin.service_type;

                this.setState({
                    service_type_option: service_type_option,
                    service_kind: service_kind,
                    service_type: service_type
                });

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
                if (!Utils.isEmpty(origin.saved_tooth_all))
                    this.setState({ selected_tooth_all: origin.saved_tooth_all });
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
                await this.promisedSetState({ read_write: origin.read_write });

            }
        }
        /////////////////
        if (service_type_option == 'contact') {
            this.getMaterialContacts();
        }
        if (service_type_option == 'overlay') {
            this.getMaterialOverlays();
        }
        if (service_type_option == 'crown') {
            let crown_type_option = this.state.crown_type_option;
            let crown_option_option = this.state.crown_option_option;

            if (crown_type_option == 'tooth' && crown_option_option == 'single')
                this.getMaterialSingles();
            if (crown_type_option == 'tooth' && crown_option_option == 'prosthesis')
                this.getMaterialPartials();
            if (crown_type_option == 'implante')
                this.getMaterialImplants();
        }
        //console.log(store.getState().plan.service.service_list);
    }

    promisedSetState = (newState) => {
        return new Promise((resolve) => {
            this.setState(newState, () => {
                resolve()
            });
        });
    }

    //componentWillReceiveProps 
    componentWillMount() {
        let props = this.props;
        //lentes de contato for file
        if (!Utils.isEmpty(props.navigation.state.params.file1)) {
            let file1 = props.navigation.state.params.file1;
            if (this.state.file != file1) {
                this.setState({ back_comp: 'LabDentalNewService1' });
                let file = {};
                file.file_text = '';
                file.file_list1 = file1.file_list1;
                file.file_list2 = file1.file_list2;
                file.file_list3 = file1.file_list3;
                file.file_list4 = file1.file_list4;
                this.setState({ file: file });
            }
        }

        if (!Utils.isEmpty(props.navigation.state.params.file2)) {
            let file2 = props.navigation.state.params.file2;
            if (this.state.file != file2) {
                this.setState({ back_comp: 'LabDentalNewService2' });
                let file = {};
                file.file_text = '';
                file.file_list1 = file2.file_list1;
                file.file_list2 = file2.file_list2;
                this.setState({ file: file });
            }
        }

        if (!Utils.isEmpty(props.navigation.state.params.file3)) {
            let file3 = props.navigation.state.params.file3;
            if (this.state.file !== file3) {
                if (this.state.file != file3) {
                    this.setState({ back_comp: 'LabDentalNewService3' });
                    let file = {};
                    file.file_text = '';
                    file.file_list1 = file3.file_list1;
                    file.file_list2 = file3.file_list2;
                    this.setState({ file: file });
                }
            }
        }
        if (!Utils.isEmpty(props.navigation.state.params.item3)) {
            let item = props.navigation.state.params.item3;
            if (this.state.item !== item) {
                if (this.state.item != item) {
                    this.setState({ back_comp: 'LabDentalNewService3' });
                    this.setState({ item: item });
                    this.setState({ crown_type: item.crown_type });
                    this.setState({ crown_type_option: item.crown_type_option });
                    this.setState({ imconnection_type: item.imconnection_type });
                    this.setState({ imconnection_option: item.imconnection_option });
                    this.setState({ imcrown_type: item.imcrown_type });
                    this.setState({ imcrown_option: item.imcrown_option });
                    this.setState({ crown_option: item.crown_option });
                    this.setState({ crown_option_option: item.crown_option_option });
                }
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


    changeTooth(type) {
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

    goDentalNew() {
        let item = {};
        item.service_type = this.state.service_type;
        item.service_kind = this.state.service_kind;
        item.service_type_option = this.state.service_type_option;
        item.saved_tooth_left = this.state.saved_tooth_left;
        item.saved_tooth_right = this.state.saved_tooth_right;
        item.saved_tooth_all = this.state.saved_tooth_all;
        item.observation_text = this.state.observation_text;
        item.file = this.state.file;
        item.material_sub_option = this.state.material_sub_option;
        item.material_option = this.state.material_option;
        item.color_type = this.state.color_type;
        item.color_type_option = this.state.color_type_option;
        item.crown_type = this.state.crown_type;
        item.crown_type_option = this.state.crown_type_option;
        item.imconnection_type = this.state.imconnection_type;
        item.imconnection_option = this.state.imconnection_option;
        item.imcrown_type = this.state.imcrown_type;
        item.imcrown_option = this.state.imcrown_option;
        item.imcrown_option = this.state.imcrown_option;
        item.crown_option = this.state.crown_option;
        item.crown_option_option = this.state.crown_option_option;

        //console.log(JSON.stringify(item));
        let data = store.getState().plan;
        let service = data.service;
        switch (item.service_type_option) {
            case "contact":
                service.service_list.contact = item;
                break;
            case "overlay":
                service.service_list.overlay = item;
                break;
            case "crown":
                service.service_list.crown = item;
                break;
        }
        // console.log(':::::::::::');
        // console.log(JSON.stringify(service));
        this.props.actions.dispatch(typeActions.onService(service));
        this.props.navigation.navigate('DentalNew');
    }

    render() {
        const { navigation } = this.props;
        let { service_type, loading, services, materials, colors, tooth_list, success, service_kind,
            leftModal, rightModal, material_type, color_type, color_type_option, observation_text,
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
            selected_tooth_left, selected_tooth_right, service_type_option,
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
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate(this.state.back_comp); }}>
                                <Image source={Icons.icon_folder} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                            <Text style={styles.main_text}>
                                {Utils.translate("labdentalnew_s.label")}
                            </Text>
                        </View>

                        <View style={styles.main_contain}>
                            <ScrollView>
                                {/* first part */}
                                <Text style={styles.title}>
                                    {Utils.translate("labdentalnew_s.title")}
                                </Text>
                                <Text style={styles.second_title}>
                                    {Utils.translate("labdentalnew_s.desc")}
                                </Text>
                                <View>
                                    <ModalSelector
                                        data={materials}
                                        initValue="Select something states in Brazil!"
                                        supportedOrientations={['landscape']}
                                        accessible={true}
                                        scrollViewAccessibilityLabel={'Scrollable options'}
                                        cancelButtonAccessibilityLabel={'Cancel Button'}
                                        cancelText={'CANCELAR'}
                                        onChange={(option) => {
                                            this.setState({
                                                material_type: option.label,
                                                material_type_option: option.option,
                                                material_sub_option: option.sub_option
                                            });
                                        }}>
                                        <View style={[BaseStyle.viewInput, { width: Dimensions.get('window').width - 50, marginTop: 10 }]}>
                                            <Image
                                                source={Icons.icon_service}
                                                style={BaseStyle.imgInput}
                                            />
                                            {/* <TextInput
                                                style={[BaseStyle.textInput0, { color: '#636465' }]}
                                                editable={false}
                                                placeholder={Utils.translate("dentalnew_s.select_service")}
                                                onChangeText={text => { this.setState({ service_type: text }); }}
                                                autoCorrect={false}
                                                value={material_type} /> */}
                                            <TextInput
                                                style={[BaseStyle.textInput0, { color: '#636465' }]}
                                                editable={false}
                                                placeholder={'Tipos de materiais'}
                                                onChangeText={text => { this.setState({ material_type: text }); }}
                                                autoCorrect={false}
                                                value={material_type} />    
                                        </View>
                                    </ModalSelector>
                                </View>

                                {/* second color part  */}
                                <Text style={[styles.title, { marginTop: 20 }]}>
                                    {/* {Utils.translate("labdentalnew_s.title1")} */}
                                    Cor da Cerâmica 
                                </Text>
                                <Text style={styles.second_title}>
                                    {Utils.translate("labdentalnew_s.desc1")}
                                </Text>
                                <View>
                                    <ModalSelector
                                        data={colors}
                                        initValue="Select something states in Brazil!"
                                        supportedOrientations={['landscape']}
                                        accessible={true}
                                        scrollViewAccessibilityLabel={'Scrollable options'}
                                        cancelButtonAccessibilityLabel={'Cancel Button'}
                                        cancelText={'CANCELAR'}
                                        onChange={(option) => { this.setState({ color_type: option.label }); this.setState({ color_type_option: option.option }); }}>
                                        <View style={[BaseStyle.viewInput, { width: Dimensions.get('window').width - 50, marginTop: 10 }]}>
                                            <Image
                                                source={Icons.icon_service}
                                                style={BaseStyle.imgInput}
                                            />
                                            <TextInput
                                                style={[BaseStyle.textInput0, { color: '#636465' }]}
                                                editable={false}
                                                placeholder={Utils.translate("dentalnew_s.select_service")}
                                                onChangeText={text => { this.setState({ color_type: text }); }}
                                                autoCorrect={false}
                                                value={color_type} />
                                        </View>
                                    </ModalSelector>
                                </View>

                                {/* tooth part */}
                                <Text style={[styles.title, { paddingTop: 10, paddingBottom: 10 }]}>
                                    {Utils.translate("dentalnew_s.select_dental")}
                                </Text>
                                <View style={{ backgroundColor: 'white', borderRadius: 15, height: 150, width: "100%", marginTop: 5 }}>
                                    <View style={{
                                        flex: 1, alignItems: 'center',
                                        justifyContent: 'center', flexDirection: 'row',
                                        paddingBottom: 10, paddingTop: 10
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
                                            {Utils.translate('labdentalnew_s.selected_teeth')}
                                        </Text>
                                        {(selected_tooth.length <= 0) ? (
                                            <Text style={[styles.second_title, { color: '#bab7b7', paddingTop: 0, fontSize: 12 }]}>
                                                {Utils.translate('labdentalnew_s.no_selected_teeth')}
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
                                {/* observation aprt */}
                                <Text style={[styles.title, { paddingTop: 10 }]}>
                                    {Utils.translate("labdentalnew_s.observation")}
                                </Text>
                                <Text style={styles.second_title}>
                                    {Utils.translate("labdentalnew_s.observ_title")}
                                </Text>
                                <View style={{ backgroundColor: 'white', borderRadius: 15, height: 110, width: "100%", marginTop: 5 }}>
                                    <View style={{ flexDirection: 'row', padding: 20, paddingBottom: 5 }}>
                                        <TextInput
                                            style={[BaseStyle.textInput0, { color: '#636465' }]}
                                            editable={true}
                                            onChangeText={text => { this.setState({ observation_text: text }); }}
                                            autoCorrect={false}
                                            placeholder={Utils.translate("labdentalnew_s.palce_txt")}
                                            value={observation_text} />
                                    </View>
                                    <View
                                        style={{
                                            borderBottomColor: '#cdcbcb',
                                            borderBottomWidth: 1,
                                            paddingTop: 5
                                        }}
                                    />
                                </View>


                                {/* bottom button part */}
                                <View style={{
                                    width: "100%",
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    marginBottom: 26,
                                    marginTop: 20,
                                    alignItems: "center"
                                }}>
                                    {(this.state.read_write == 'write') ? (
                                        <View style={{ width: "100%" }}>
                                            <Button
                                                full
                                                loading={loading}
                                                onPress={() => { this.goDentalNew(); }}
                                                style={{ backgroundColor: BaseColor.greenColor }}
                                            >
                                                <Text style={{ fontSize: 14, color: 'white' }}> {Utils.translate("labdentalnew_s.add_service")}</Text>
                                            </Button>
                                        </View>
                                    ) : (
                                            <View style={{ width: "100%" }}>
                                                <Button
                                                    full
                                                    loading={loading}                                                   
                                                    style={{ backgroundColor: "#aba8a8" }}
                                                >
                                                    <Text style={{ fontSize: 14, color: 'white' }}> {Utils.translate("labdentalnew_s.add_service")}</Text>
                                                </Button>
                                            </View>

                                        )}

                                    <View style={{ flexDirection: "row", textAlign: "center", alignItems: "center", marginTop: 10 }}>
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('LabDentalNewService1'); }}>
                                            <Image source={Icons.icon_left_arrow} style={{ tintColor: BaseColor.primaryColor, width: 30, height: 30 }} />
                                        </TouchableOpacity>
                                        <Text style={styles.signup_labelSecond}>
                                            {Utils.translate("labdentalnew_s.page3")}
                                        </Text>
                                    </View>
                                </View>
                                {/* left modal */}
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
                                        title={Utils.translate('labdentalnew_s.upper_arch')} />}
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
                                            marginTop: 20,
                                            marginBottom: 20
                                        }}>
                                            <Button
                                                full
                                                loading={loading}
                                                onPress={() => this.saveTooth()}
                                                style={{ flex: 1, height: 30, marginLeft: 25, marginRight: 25, backgroundColor: BaseColor.greenColor }}
                                            >
                                                <Text style={[{ textAlign: "center", color: '#fff', fontSize: 12 }]}>
                                                    {Utils.translate("labdentalnew_s.btn_select")}
                                                </Text>
                                            </Button>
                                            <Button
                                                full
                                                loading={loading}
                                                onPress={() => { this.setState({ leftModal: false }) }}
                                                style={{ flex: 1, height: 30, marginLeft: 25, marginRight: 25, backgroundColor: '#c13717' }}
                                            >
                                                <Text style={[{ textAlign: "center", color: '#fff', fontSize: 12 }]}>
                                                    {Utils.translate("labdentalnew_s.btn_cancel")}
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
                                        title={Utils.translate('labdentalnew_s.lower_arch')} />}
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
                                                {Utils.translate("labdentalnew_s.text_modal")}
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
                                            marginTop: 20,
                                            marginBottom: 20
                                        }}>
                                            <Button
                                                full
                                                loading={loading}
                                                onPress={() => this.saveTooth()}
                                                style={{ flex: 1, height: 30, marginLeft: 25, marginRight: 25, backgroundColor: BaseColor.greenColor }}
                                            >
                                                <Text style={[{ textAlign: "center", color: '#fff', fontSize: 12 }]}>
                                                    {Utils.translate("labdentalnew_s.btn_select")}
                                                </Text>
                                            </Button>
                                            <Button
                                                full
                                                loading={loading}
                                                onPress={() => { this.setState({ rightModal: false }) }}
                                                style={{ flex: 1, height: 30, marginLeft: 25, marginRight: 25, backgroundColor: '#c13717' }}
                                            >
                                                <Text style={[{ textAlign: "center", color: '#fff', fontSize: 12 }]}>
                                                    {Utils.translate("dentalnew_s.btn_cancel")}
                                                </Text>
                                            </Button>
                                        </View>
                                    </ModalContent>
                                </Modal>
                                {/* end right modal */}
                            </ScrollView>
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


export default connect(null, mapDispatchToProps)(LabDentalNewService);
