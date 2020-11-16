import React, { Component } from "react";
import { View, Dimensions, Picker, CheckBox, FlatList, ImageBackground, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import { BaseStyle, BaseColor, Images, Icons } from "@config";
import { Header, Icon, Button, Text } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import Toast from 'react-native-easy-toast';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector'
import { store } from "../../store";

class DentalDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            code: '',
            number: '',
            neighborhood: '',
            city: '',
            state_name: '',
            local: ''
        };
    }

    componentDidMount() {
        //  console.log('::::::::');
        //  console.log(store.getState().plan.service.service_list); 

    }

    btnProcess() {
        let delivery = {};
        delivery.address = this.state.address;
        delivery.code = this.state.code;
        delivery.number = this.state.number;
        delivery.neighborhood = this.state.neighborhood;
        delivery.city = this.state.city;
        delivery.state_name = this.state.state_name;
        delivery.local = this.state.local;
        this.props.navigation.navigate('DentalNewService', { delivery: delivery });        
    }

    render() {
        const { navigation } = this.props;
        let { address, code, number, neighborhood, city, state_name, local } = this.state;

        const locals = Utils.locals();
        const state_list = Utils.stateList();    

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
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalNewService'); }}>
                                <Image source={Icons.icon_deliver_user} style={{ width: 40, height: 40 }} />
                            </TouchableOpacity>
                            <Text style={styles.main_text}>
                                {Utils.translate("delivery.label")}
                            </Text>
                        </View>
                        <View style={styles.main_contain}>
                            <Text style={styles.title}>
                                {Utils.translate("delivery.title")}
                            </Text>
                            <Text style={styles.second_title}>
                                {Utils.translate("delivery.desc")}
                            </Text>
                            <View style={[BaseStyle.viewInput, { marginTop: 20 }]}>
                                <Image
                                    source={Icons.icon_address}
                                    style={BaseStyle.imgInput}
                                />
                                <TextInput
                                    style={[BaseStyle.textInput0]}
                                    placeholder={Utils.translate("delivery.address")}
                                    value={address}
                                    onChangeText={text => this.setState({ address: text })}
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={styles.main_topview}>
                                <View style={[BaseStyle.viewInput, { width: "60%" }]}>
                                    <Image
                                        source={Icons.icon_code}
                                        style={BaseStyle.imgInput}
                                    />
                                    <TextInput
                                        style={[BaseStyle.textInput0]}
                                        placeholder={Utils.translate("delivery.code")}
                                        value={code}
                                        onChangeText={text => this.setState({ code: text })}
                                        autoCorrect={false}
                                    />
                                </View>
                                <View style={[BaseStyle.viewInput, { width: "40%" }]}>
                                    <TextInput
                                        style={[BaseStyle.textInput0, { paddingLeft: 15 }]}
                                        placeholder={Utils.translate("delivery.number")}
                                        value={number}
                                        onChangeText={text => this.setState({ number: text })}
                                        autoCorrect={false}
                                    />
                                </View>
                            </View>
                            <View style={[BaseStyle.viewInput, { marginTop: 20 }]}>
                                <Image
                                    source={Icons.icon_address}
                                    style={BaseStyle.imgInput}
                                />
                                <TextInput
                                    style={[BaseStyle.textInput0]}
                                    placeholder={Utils.translate("delivery.neigh")}
                                    value={neighborhood}
                                    onChangeText={text => this.setState({ neighborhood: text })}
                                    autoCorrect={false}
                                />
                            </View>
                            <View style={styles.main_topview}>
                                <View style={[BaseStyle.viewInput, { width: "70%" }]}>
                                    <Image
                                        source={Icons.icon_city}
                                        style={BaseStyle.imgInput}
                                    />
                                    <TextInput
                                        style={[BaseStyle.textInput0]}
                                        placeholder={Utils.translate("delivery.city")}
                                        value={city}
                                        onChangeText={text => this.setState({ city: text })}
                                        autoCorrect={false}
                                    />
                                </View>
                                <View style={[BaseStyle.viewInput, { width: "30%" }]}>
                                    <ModalSelector
                                        data={state_list}
                                        initValue="Select something states in Brazil!"
                                        supportedOrientations={['landscape']}
                                        accessible={true}
                                        scrollViewAccessibilityLabel={'Scrollable options'}
                                        cancelButtonAccessibilityLabel={'Cancel Button'}
                                        cancelText={'CANCELAR'}
                                        onChange={(option) => { this.setState({ state_name: option.label }) }}>

                                        <TextInput
                                            style={[BaseStyle.textInput, { height:40, textAlign: "center" }]}
                                            editable={false}
                                            placeholder={Utils.translate('delivery.state_name')}
                                            onChangeText={text => this.setState({ state_name: text })}
                                            autoCorrect={false}                                           
                                            value={state_name} />
                                            
                                    </ModalSelector>
                                   
                                </View>
                            </View>

                            <View style={styles.main_topview}>
                                <ModalSelector
                                    data={locals}
                                    initValue="Select something states in Brazil!"
                                    supportedOrientations={['landscape']}
                                    accessible={true}
                                    style={{ width: '100%' }}
                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                    cancelText={'CANCELAR'}
                                    onChange={(option) => { this.setState({ local: option.label }) }}>
                                    <View style={BaseStyle.viewInput}>
                                        <Image
                                            source={Icons.icon_local}
                                            style={BaseStyle.imgInput}
                                        />
                                        <TextInput
                                            style={[BaseStyle.textInput0]}
                                            editable={false}
                                            placeholder={Utils.translate("delivery.local")}
                                            onChangeText={text => this.setState({ local: text })}
                                            autoCorrect={false}
                                            value={local} />
                                    </View>
                                </ModalSelector>
                                {/* <Image
                                    source={Icons.icon_local}
                                    style={BaseStyle.imgInput}
                                />
                                <TextInput
                                    style={[BaseStyle.textInput0]}
                                    placeholder={Utils.translate("delivery.local")}
                                    value={local}
                                    onChangeText={text => this.setState({ local: text })}
                                    autoCorrect={false}
                                /> */}
                            </View>
                            <View style={{
                                width: "100%",
                                flex: 1,
                                justifyContent: 'flex-end',
                                marginBottom: 36,
                                alignItems: "center"
                            }}>
                                <View style={{ width: "100%", marginTop: 30 }}>
                                    <Button
                                        full
                                        onPress={() => this.btnProcess()}
                                        style={{ backgroundColor: BaseColor.greenColor }}
                                    >
                                        {Utils.translate("delivery.save")}
                                    </Button>
                                </View>
                                <View style={{ flexDirection: "row", textAlign: "center", alignItems: "center", marginTop: 10 }}>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalNewService'); }}>
                                        <Image source={Icons.icon_left_arrow} style={{ tintColor: BaseColor.primaryColor, width: 30, height: 30 }} />
                                    </TouchableOpacity>
                                    <Text style={styles.signup_labelSecond}>
                                        {Utils.translate("delivery.back")}
                                    </Text>
                                </View>
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
        actions: bindActionCreators(AuthActions, dispatch),
    };
};


export default connect(null, mapDispatchToProps)(DentalDelivery);
