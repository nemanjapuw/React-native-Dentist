import React, { Component } from "react";
import { View, FlatList, ImageBackground, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
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
import { store } from "../../store";
import { WebView } from 'react-native-webview';

class Paypal extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            payment : 0,
            ids: [],
            full_name: '',
            total_payment: 0,
            gender: '',
            bio: '',
            service_list: [],
            pricetables: [],
            buttonTxt: '',
            buttonColor: '',
            tooth_list: [],
            isSelected: false,
            success: {
                full_name: true,
                gender: true,
                bio: true,
                service_list: true,
            }
        };
    }



    componentDidMount() {
        this._isMounted = true;
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
              let payment = this.props.navigation.state.params.payment;
              let ids = this.props.navigation.state.params.ids;
              this.setState({payment:payment});
              this.setState({ids:ids});
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        this._onFocusListener.remove();
    }

    injectedToHtml() {
        const myData = { price: this.state.payment, ids: this.state.ids };
        let injectedData = `document.getElementById('price').value = '${myData.price}';document.getElementById('ids').value = '${myData.ids}';`;        
        return injectedData;
    }

    backButtonHandler = () => {
        // if (webviewRef.current) webviewRef.current.goBack()
        this.props.navigation.navigate('Digital');
    }

    frontButtonHandler = () => {
        //if (webviewRef.current) webviewRef.current.goForward()
        this.props.navigation.navigate('DentalPlan');
    }

    render() {
        const { navigation } = this.props;

        let { full_name, gender, bio, buttonTxt, service_list, isSelected, success } = this.state;


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
                                Paypal {Utils.translate("dentalnew.label")}
                            </Text>
                        </View>
                        <View style={styles.main_contain}>
                            <WebView
                                source={{ uri: Utils.SERVER_HOST + '/payment' }}
                                javaScriptEnabled={true}
                                injectedJavaScript={this.injectedToHtml()}
                                style={{ marginTop: 50, marginLeft: 30, marginRight: 30, backgroundColor: BaseColor.grayLightColor }}
                            />
                        </View>
                        <View style={styles.tabBarContainer}>
                            <TouchableOpacity onPress={this.backButtonHandler}>
                                <Text style={styles.button}>Novo Serviço</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.frontButtonHandler}>
                                <Text style={styles.button}>Lista de serviços</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </SafeAreaView>
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


export default connect(null, mapDispatchToProps)(Paypal);
