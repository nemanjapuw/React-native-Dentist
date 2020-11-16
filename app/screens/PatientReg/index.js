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

class PatientReg extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
            gender: '',
            bio: '',
            cpf_number: '',
            street_name: '',
            street_name_number: '',
            street_number: '',
            cep_code: '',
            city: '',
            state: '',
            mail: '',
            phone: '',
            loading: false,
            success: {
                full_name: true,
                gender: true,
                bio: true,
                cpf_number: true,
                street_name: true,
                street_name_number: true,
                street_number: true,
                cep_code: true,
                city: true,
                state: true,
                mail: true,
                phone: true,
            }
        };
    }


    componentDidMount() {
        this._isMounted = true;
        this._onFocusListener = this.props.navigation.addListener('didFocus', async (payload) => {

        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        this._onFocusListener.remove();
    }

    //savePatient
    savePatient() {
        let { full_name, bio, gender, cpf_number, street_name, street_name_number, street_number, cep_code, city, state, mail, phone, success } = this.state;
        if (full_name == "" || bio == "" || gender == "" || cpf_number == "" || street_name == "" || street_name_number == "" || street_number == "" || cep_code == "" || city == "" || state == "" || !Utils.EMAIL_VALIDATE.test(String(mail).toLowerCase()) || phone == "") {
            this.setState({
                success: {
                    ...success,
                    full_name: full_name != "",
                    bio: bio != "",
                    gender: gender != "",
                    cpf_number: cpf_number != "",
                    street_name: street_name != "",
                    street_name_number: street_name_number != "",
                    street_number: street_number != "",
                    cep_code: cep_code != "",
                    city: city != "",
                    state: state != "",
                    mail: Utils.EMAIL_VALIDATE.test(String(mail).toLowerCase()),
                    phone: phone != ""
                }
            }, () => {
                let success = this.state.success;
                if (!success.full_name) this.refs.toast.show('Insira o Nome Completo corrreto.');
                if (!success.bio) this.refs.toast.show('Insira o Nascimento corrreto.');
                if (!success.gender) this.refs.toast.show('Insira o sexo corrreto.');
                if (!success.cpf_number) this.refs.toast.show('Insira CPF corrreto.');
                if (!success.street_name) this.refs.toast.show('Insira o Nome da rua corrreto.');
                if (!success.street_name_number) this.refs.toast.show('Insira o Nome da rua corrreto.');
                if (!success.street_number) this.refs.toast.show('Insira o Número da rua corrreto.');
                if (!success.cep_code) this.refs.toast.show('Insira CEP corrreto.');
                if (!success.city) this.refs.toast.show('Insira o Cidade corrreto.');
                if (!success.state) this.refs.toast.show('Insira o Estado corrreto.');
                if (!success.mail) this.refs.toast.show('Insira o Enviar corrreto.');
                if (!success.phone) this.refs.toast.show('Insira o Telefone corrreto.');
            });
        } else {
            this.setState({ loading: true }, () => {
                ////start ///
                const _this = this;
                const patient = {};
                patient.full_name = this.state.full_name;
                patient.bio = this.state.bio;
                patient.gender = this.state.gender;
                patient.cpf_number = this.state.cpf_number;
                patient.street_name = this.state.street_name;
                patient.street_name_number = this.state.street_name_number;
                patient.street_number = this.state.street_number;
                patient.cep_code = this.state.cep_code;
                patient.city = this.state.sity;
                patient.state = this.state.state;
                patient.mail = this.state.mail;
                patient.phone = this.state.phone;

                _this.setState({ loading: true }, () => {
                    debugger;
                    _this.props.actions.apiActions.addPatient(patient, response => {
                        //console.log("::::"+JSON.stringify(response));
                        if (response.success) {
                            this.props.navigation.navigate("DentalNew");
                        } else {
                            this.refs.toast.show(Utils.translate("messages.error"));
                        }
                        _this.setState({ loading: false });
                    });
                });
            });
        }

    }

    render() {
        const { navigation } = this.props;
        let { full_name, gender, bio, cpf_number, street_name, street_name_number, street_number, cep_code, city, state, mail, phone, loading, success } = this.state;

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
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalNew'); }}>
                                <Image source={Icons.icon_left_arrow} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                            <Text style={styles.main_text}>
                                {Utils.translate("patientreg.label")}
                            </Text>
                        </View>
                        <View style={styles.main_contain}>
                            <ScrollView>
                                <Text style={styles.title}>
                                    {Utils.translate("patientreg.label")}
                                </Text>
                                <View style={[BaseStyle.viewInput, { marginTop: 10 }]}>
                                    <Image
                                        source={Icons.icon_full_name}
                                        style={BaseStyle.imgInput}
                                    />
                                    <TextInput
                                        style={[BaseStyle.textInput0]}
                                        placeholder={Utils.translate("dentalnew.fullname")}
                                        value={full_name}
                                        placeholderTextColor={
                                            success.full_name ? BaseColor.filedGrayColor : BaseColor.errorColor
                                        }
                                        onChangeText={text => this.setState({ full_name: text })}
                                        autoCorrect={true}
                                    />
                                </View>
                                <View style={[styles.main_topview, { marginTop: 10 }]}>
                                    <View style={[{
                                        height: 43,
                                        borderRadius: 25,
                                        borderWidth: 1,
                                        borderColor: "#b5b3b3",
                                        width: "60%"
                                    }]}>
                                        <ModalSelector
                                            data={genders}
                                            initValue="Select something states in Brazil!"
                                            supportedOrientations={['landscape']}
                                            accessible={true}
                                            scrollViewAccessibilityLabel={'Scrollable options'}                                            
                                            cancelButtonAccessibilityLabel={'Cancel Button'}
                                            cancelText ={'CANCELAR'}
                                            onChange={(option) => { this.setState({ gender: option.label }) }}>

                                            <TextInput
                                                style={[BaseStyle.textInput, { color: "#313030", paddingLeft: 20, textAlign: "left", height: 40 }]}
                                                editable={false}
                                                placeholder={Utils.translate('dentalnew.select_gender')}
                                                onChangeText={text => this.setState({ gender: text })}
                                                autoCorrect={false}
                                                placeholderTextColor={
                                                    success.gender ? BaseColor.filedGrayColor : BaseColor.errorColor
                                                }
                                                value={gender} />
                                        </ModalSelector>
                                    </View>
                                    <DatePicker
                                        style={{ width: "40%", border: 0 }}
                                        date={this.state.bio} //initial date from state
                                        mode="date" //The enum of date, datetime and time
                                        placeholder="Nascimento"
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
                                <View style={[BaseStyle.viewInput, { marginTop: 10 }]}>
                                    <TextInput
                                        style={[BaseStyle.textInput0, { paddingLeft: 15 }]}
                                        placeholder={Utils.translate("dentalnew.cpf_number")}
                                        value={cpf_number}
                                        onChangeText={text => this.setState({ cpf_number: text })}
                                        autoCorrect={false}
                                        placeholderTextColor={
                                            success.cpf_number ? BaseColor.filedGrayColor : BaseColor.errorColor
                                        }
                                    />
                                </View>
                                <View style={[styles.main_topview, { marginTop: 10 }]}>
                                    <View style={[BaseStyle.viewInput,{width:'60%'}]}>
                                        <TextInput
                                            style={[BaseStyle.textInput0, { paddingLeft: 15 }]}
                                            placeholder={Utils.translate("dentalnew.street_name")}
                                            value={street_name}                                           
                                            onChangeText={text => {
                                                if ((/^[a-zA-Z\s]*$/.test(text)) || text == '') {
                                                    this.setState({
                                                        street_name: text
                                                    });
                                                }else {
                                                     this.refs.toast.show('Pre-fullfill ENDEREÇO');
                                                }
                                            }}
                                            autoCorrect={false}
                                            placeholderTextColor={
                                                success.street_name ? BaseColor.filedGrayColor : BaseColor.errorColor
                                            }
                                        />
                                    </View>
                                    <View style={[BaseStyle.viewInput,{width:'40%'}]}>
                                        <TextInput
                                            style={[BaseStyle.textInput0, { paddingLeft: 15 }]}
                                            placeholder={Utils.translate("dentalnew.street_name_number")}
                                            value={street_name_number}                                           
                                            autoCorrect={false}
                                            onChangeText={text => {
                                                if ((/^\d+$/.test(text)) || text == '') {
                                                    this.setState({
                                                        street_name_number: text
                                                    });
                                                }else {
                                                    this.refs.toast.show('Pre-fullfill NÚMERO');
                                                }
                                            }}
                                            placeholderTextColor={
                                                success.street_name_number ? BaseColor.filedGrayColor : BaseColor.errorColor
                                            }
                                        />
                                    </View>
                                </View>

                                <View style={[BaseStyle.viewInput, { marginTop: 10 }]}>
                                    <TextInput
                                        style={[BaseStyle.textInput0, { paddingLeft: 15 }]}
                                        placeholder={Utils.translate("dentalnew.street_number")}
                                        value={street_number}
                                        onChangeText={text => this.setState({ street_number: text })}
                                        autoCorrect={false}
                                        placeholderTextColor={
                                            success.street_number ? BaseColor.filedGrayColor : BaseColor.errorColor
                                        }
                                    />
                                </View>
                                <View style={[BaseStyle.viewInput, { marginTop: 10 }]}>
                                    <TextInput
                                        style={[BaseStyle.textInput0, { paddingLeft: 15 }]}
                                        placeholder={Utils.translate("dentalnew.cep_code")}
                                        value={cep_code}
                                        onChangeText={text => this.setState({ cep_code: text })}
                                        autoCorrect={false}
                                        placeholderTextColor={
                                            success.cep_code ? BaseColor.filedGrayColor : BaseColor.errorColor
                                        }
                                    />
                                </View>
                                <View style={[BaseStyle.viewInput, { marginTop: 10 }]}>
                                    <TextInput
                                        style={[BaseStyle.textInput0, { paddingLeft: 15 }]}
                                        placeholder={Utils.translate("dentalnew.city")}
                                        value={city}
                                        onChangeText={text => this.setState({ city: text })}
                                        autoCorrect={false}
                                        placeholderTextColor={
                                            success.city ? BaseColor.filedGrayColor : BaseColor.errorColor
                                        }
                                    />
                                </View>
                                <View style={[BaseStyle.viewInput, { marginTop: 10 }]}>
                                    <TextInput
                                        style={[BaseStyle.textInput0, { paddingLeft: 15 }]}
                                        placeholder={Utils.translate("dentalnew.state")}
                                        value={state}
                                        onChangeText={text => this.setState({ state: text })}
                                        autoCorrect={false}
                                        placeholderTextColor={
                                            success.state ? BaseColor.filedGrayColor : BaseColor.errorColor
                                        }
                                    />
                                </View>
                                <View style={[BaseStyle.viewInput, { marginTop: 10 }]}>
                                    <TextInput
                                        style={[BaseStyle.textInput0, { paddingLeft: 15 }]}
                                        placeholder={Utils.translate("dentalnew.mail")}
                                        value={mail}
                                        onChangeText={text => this.setState({ mail: text })}
                                        autoCorrect={false}
                                        placeholderTextColor={
                                            success.mail ? BaseColor.filedGrayColor : BaseColor.errorColor
                                        }
                                    />
                                </View>
                                <View style={[BaseStyle.viewInput, { marginTop: 10 }]}>
                                    <TextInput
                                        style={[BaseStyle.textInput0, { paddingLeft: 15 }]}
                                        placeholder={Utils.translate("dentalnew.phone")}
                                        value={phone}
                                        onChangeText={text => this.setState({ phone: text })}
                                        autoCorrect={false}
                                        placeholderTextColor={
                                            success.phone ? BaseColor.filedGrayColor : BaseColor.errorColor
                                        }
                                    />
                                </View>
                                {/* ===== */}
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
                                        onPress={() => this.savePatient()}
                                        style={{ flex: 1, height: 40, marginLeft: 25, marginRight: 25, backgroundColor: BaseColor.greenColor }}
                                    >
                                        <Text style={[{ textAlign: "center", color: '#fff', fontSize: 12 }]}>
                                            ENVIAR
                                        </Text>
                                    </Button>
                                    <Button
                                        full
                                        onPress={() => this.props.navigation.navigate('DentalNew')}
                                        style={{ flex: 1, height: 40, marginLeft: 25, marginRight: 25, backgroundColor: '#c13717' }}
                                    >
                                        <Text style={[{ textAlign: "center", color: '#fff', fontSize: 12 }]}>
                                            {Utils.translate("dentalnew_s.btn_cancel")}
                                        </Text>
                                    </Button>
                                </View>
                            </ScrollView>
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


export default connect(null, mapDispatchToProps)(PatientReg);
