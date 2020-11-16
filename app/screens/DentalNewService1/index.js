import React, { Component } from "react";
import { View, Dimensions, CheckBox, FlatList, ImageBackground, TouchableOpacity, Image, TextInput, SafeAreaView, Alert } from "react-native";
import { BaseStyle, BaseColor, Images, Icons } from "@config";
import { Header, Icon, Button, Text } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { connect } from "react-redux";
import { AuthActions, typeActions } from "@actions";
import { bindActionCreators } from "redux";
import Toast from 'react-native-easy-toast';
import DatePicker from 'react-native-datepicker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { store } from "../../store";


class DentalNewService1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            loading: false,
            read_write: 'write',
            fileList: [],
            singleFile: '',
            file_text: '',
            _isMounted: false,
        };
    }


    async componentDidMount() {
        this._isMounted = true;
        let item = this.props.navigation.state.params.item;
        this.setState({ item: item });
        if (!Utils.isEmpty(item.file)) {
            this.setState({ fileList: item.file.file_list });
            this.setState({ file_text: item.file.file_text });
        }
        let origin = {};
        if (!Utils.isEmpty(store.getState().origin.origin)) {
            origin = store.getState().origin.origin;
            if (!Utils.isEmpty(origin)) {
                if (!Utils.isEmpty(origin.file)) {
                    this.setState({ fileList: origin.file.file_list });
                    this.setState({ file_text: origin.file.file_text });
                }
                await this.promisedSetState({ read_write: origin.read_write });
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


    //process file
    async SingleFilePicker() {
        if (this._isMounted) {
            try {
                const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.allFiles],

                });

                this.setState({ singleFile: res });
                let file_name = this.state.singleFile.name ? this.state.singleFile.name : '';
                let file_type = this.state.singleFile.type ? this.state.singleFile.type : '';
                let file_size = this.state.singleFile.size ? this.state.singleFile.size : '';
                let file_url = this.state.singleFile.uri ? this.state.singleFile.uri : '';
                let file_base64 = '';
                RNFS.readFile(file_url, "base64").then(result => {
                    file_base64 = result;
                    let file = {};
                    file.id = this.state.fileList.length + 1;
                    file.name = file_name;
                    file.type = file_type;
                    file.size = file_size;
                    //file.base64 = 'data:'+file_type+';base64,' +file_base64;
                    file.base64 = file_base64;
                    let savedFileList = this.state.fileList;
                    savedFileList.push(file);
                    this.setState({ fileList: savedFileList });
                });

            } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                    Alert.alert('Canceled');
                } else {
                    Alert.alert('Unknown Error: ' + JSON.stringify(err));
                    throw err;
                }
            }
        }
    }

    //delete file
    deleteFile(index) {
        let savedFileList = this.state.fileList;
        savedFileList.splice(index, 1);
        this.setState({ fileList: savedFileList });
    }
    //complete button
    completeBtn() {
        let file = {};
        file.file_text = this.state.file_text;
        file.file_list = this.state.fileList;

        let data = store.getState().plan;
        let service = data.service;

        let item = this.state.item;
        item.file = file;
        let type = item.service_type_option;
        switch (type) {
            case "asses":
                service.service_list.asses = item;
                break;
            case "plan2d":
                service.service_list.plan2d = item;
                break;
            case "plan3d":
                service.service_list.plan3d = item;
                break;
            case "model":
                service.service_list.model = item;
                break;
            case "guide":
                service.service_list.guide = item;
                break;
        }
        //service.service_list.push(item);        
        this.props.dispatch(typeActions.onService(service));
        this.props.navigation.navigate('DentalNew');
    }

    render() {
        const { navigation } = this.props;
        let { file_text, loading, success } = this.state;
        const renderItem = ({ item, index }) => (
            <View style={styles.item}>
                <Image source={Icons.icon_new} style={{ width: 40, height: 40, textAlign: "center" }} />
                <TouchableOpacity style={{ position: "absolute", top: 7, left: 50 }} onPress={() => { this.deleteFile(index) }} >
                    <Image source={Icons.icon_delete} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
                <Text style={[styles.service_title, { color: "#9e9d9d" }]}>{Utils.cutString(item.name)}</Text>
            </View>
        );

        const renderNoItem = ({ item }) => (
            <View style={{
                alignItems: "center", flexDirection: 'row', justifyContent: 'center',
                alignItems: 'center', width: "100%"
            }}>
                <Text style={{ color: "#9e9d9d", paddingLeft: 100 }}>{Utils.translate('dentalnew.no_service')}</Text>
            </View>
        );
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
                                <Image source={Icons.icon_folder} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                            <Text style={styles.main_text}>
                                {Utils.translate("dentalnew_s1.label")}
                            </Text>
                        </View>
                        <View style={styles.main_contain}>
                            <Text style={styles.title}>
                                {Utils.translate("dentalnew_s1.title")}
                            </Text>
                            <Text style={styles.second_title}>
                                {Utils.translate("dentalnew_s1.desc")}
                            </Text>

                            <View style={{ backgroundColor: 'white', borderRadius: 15, height: 140, width: "100%", marginTop: 5 }}>
                                <FlatList
                                    horizontal={true}
                                    data={this.state.fileList}
                                    ListEmptyComponent={renderNoItem}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                />
                                <View
                                    style={{
                                        borderBottomColor: '#cdcbcb',
                                        borderBottomWidth: 1,
                                        width: '95%',
                                        marginLeft: 10,
                                        paddingTop: 5
                                    }}
                                />
                                <View style={{ width: '100%', paddingRight: 5, alignItems: 'center' }}>
                                    <TouchableOpacity onPress={this.SingleFilePicker.bind(this)} >
                                        {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalServiceFile'); }}> */}
                                        <Image
                                            source={Icons.icon_save}
                                            style={{ width: 40, height: 40, margin: 10, alignItems: 'flex-end' }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={[styles.title, { paddingTop: 10 }]}>
                                {Utils.translate("dentalnew_s1.title1")}
                            </Text>
                            <Text style={styles.second_title}>
                                {Utils.translate("dentalnew_s1.desc1")}
                            </Text>
                            <View style={{ backgroundColor: 'white', borderRadius: 15, height: 110, width: "100%", marginTop: 5 }}>
                                <View style={{ flexDirection: 'row', padding: 20, paddingBottom: 5 }}>
                                    <TextInput
                                        style={[BaseStyle.textInput0, { color: '#636465' }]}
                                        editable={true}
                                        onChangeText={text => { this.setState({ file_text: text }); }}
                                        autoCorrect={false}
                                        placeholder={Utils.translate("dentalnew_s1.palce_txt")}
                                        value={file_text} />
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: '#cdcbcb',
                                        borderBottomWidth: 1,
                                        paddingTop: 5
                                    }}
                                />
                            </View>
                            <View style={{
                                width: "100%",
                                flex: 1,
                                justifyContent: 'flex-end',
                                marginBottom: 36,
                                alignItems: "center"
                            }}>
                                {(this.state.read_write == "write") ?
                                    <View style={{ width: "100%" }}>
                                        <Button
                                            full
                                            loading={loading}
                                            onPress={() => this.completeBtn()}
                                            style={{ backgroundColor: BaseColor.greenColor }}
                                        >
                                            {Utils.translate("dentalnew_s1.add_service")}
                                        </Button>
                                    </View>
                                    :
                                    <View style={{ width: "100%" }}>
                                        <Button
                                            full
                                            loading={loading}                                           
                                            style={{ backgroundColor: "#a2a2a2" }}
                                        >
                                            {Utils.translate("dentalnew_s1.add_service")}
                                        </Button>
                                    </View>
                                }

                                <View style={{ flexDirection: "row", textAlign: "center", alignItems: "center", marginTop: 10 }}>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalNewService'); }}>
                                        <Image source={Icons.icon_left_arrow} style={{ tintColor: BaseColor.primaryColor, width: 30, height: 30 }} />
                                    </TouchableOpacity>
                                    <Text style={styles.signup_labelSecond}>
                                        {Utils.translate("dentalnew_s1.page2")}
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
        dispatch
    };
};


export default connect(null, mapDispatchToProps)(DentalNewService1);
