import React, { Component } from "react";
import { View, Dimensions, ScrollView, FlatList, ImageBackground, TouchableOpacity, Image, TextInput, SafeAreaView, Alert } from "react-native";
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


class LabDentalNewService2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fileList1: [],
            fileList2: [],            
            singleFile: '',
            file_text: '',
            _isMounted: false
        };
    }


    componentDidMount() {     
        this._isMounted = true;
        // let item = this.props.navigation.state.params.item;
        let file = store.getState().origin.origin.file;
        if (!Utils.isEmpty(file)) {
            if (!Utils.isEmpty(file.file_list1))
                this.setState({ fileList1: file.file_list1 });
            if (!Utils.isEmpty(file.file_list2))
                this.setState({ fileList2: file.file_list2 });            
            this.setState({ file_text: file.file_text });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    //process file
    async SingleFilePicker(cond) {
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
                    if (cond == '1') file.id = this.state.fileList1.length + 1;
                    if (cond == '2') file.id = this.state.fileList2.length + 1;               
                    file.name = file_name;
                    file.type = file_type;
                    file.size = file_size;
                    file.base64 = file_base64;
                    file.cond = cond;

                    if (cond == '1') {
                        let savedFileList = this.state.fileList1;
                        savedFileList.push(file);
                        this.setState({ fileList1: savedFileList });
                    }
                    if (cond == '2') {
                        let savedFileList = this.state.fileList2;
                        savedFileList.push(file);
                        this.setState({ fileList2: savedFileList });
                    }                    
                    //console.log(JSON.stringify(this.state.fileList1));
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
    deleteFile(index, cond) {
        if (cond == '1') {
            let savedFileList = this.state.fileList1;
            savedFileList.splice(index, 1);
            this.setState({ fileList1: savedFileList });
        }
        if (cond == '2') {
            let savedFileList = this.state.fileList2;
            savedFileList.splice(index, 1);
            this.setState({ fileList2: savedFileList });
        }        
    }
    //complete button
    completeBtn() {
        let file = {};
        file.file_text = "";
        file.file_list1 = this.state.fileList1;
        file.file_list2 = this.state.fileList2;       
        this.props.navigation.navigate('LabDentalNewService', { file2: file });
    }

    render() {
        const { navigation } = this.props;
        let { file_text, loading, success } = this.state;
        const renderItem = ({ item, index }) => (
            <View style={styles.item}>
                <Image source={Icons.icon_new} style={{ width: 40, height: 30, textAlign: "center" }} />
                <TouchableOpacity style={{ position: "absolute", top: 7, left: 50 }} onPress={() => { this.deleteFile(index, item.cond) }} >
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
                                {Utils.translate("Ldentalnewservcie2.label")}
                            </Text>
                        </View>
                        <View style={styles.main_contain}>
                            <View style={{ width: '100%', height: Dimensions.get('window').height - 140, marginTop: 5 }}>
                                <ScrollView>
                                    {/* first part */}
                                    <View>
                                        <Text style={[styles.title, { textAlign: 'center' }]}>
                                            {Utils.translate("Ldentalnewservcie2.title1")}
                                        </Text>
                                        <Text style={styles.second_title}>
                                            {Utils.translate("Ldentalnewservcie2.desc1")}
                                        </Text>
                                    </View>
                                    <View style={{ backgroundColor: 'white', borderRadius: 15, height: 120, width: "100%", marginTop: 5 }}>
                                        <FlatList
                                            horizontal={true}
                                            data={this.state.fileList1}
                                            ListEmptyComponent={renderNoItem}
                                            renderItem={renderItem}
                                            keyExtractor={item => item.id}
                                        />
                                        <View
                                            style={{
                                                borderBottomColor: '#cdcbcb',
                                                borderBottomWidth: 1,
                                                width: '95%',
                                                marginLeft: 10
                                            }}
                                        />
                                        <View style={{ width: '100%', paddingRight: 5, alignItems: 'center' }}>
                                            <TouchableOpacity onPress={this.SingleFilePicker.bind(this, '1')} >
                                                {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalServiceFile'); }}> */}
                                                <Image
                                                    source={Icons.icon_save}
                                                    style={{ width: 40, height: 40, margin: 5, alignItems: 'flex-end' }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {/* second part         */}
                                    <View style={{ paddingTop: 25 }}>
                                        <Text style={[styles.title, { textAlign: 'center' }]}>
                                            {Utils.translate("Ldentalnewservcie2.title2")}
                                        </Text>
                                        <Text style={styles.second_title}>
                                            {Utils.translate("Ldentalnewservcie2.desc2")}
                                        </Text>
                                    </View>
                                    <View style={{ backgroundColor: 'white', borderRadius: 15, height: 120, width: "100%", marginTop: 5 }}>
                                        <FlatList
                                            horizontal={true}
                                            data={this.state.fileList2}
                                            ListEmptyComponent={renderNoItem}
                                            renderItem={renderItem}
                                            keyExtractor={item => item.id}
                                        />
                                        <View
                                            style={{
                                                borderBottomColor: '#cdcbcb',
                                                borderBottomWidth: 1,
                                                width: '95%',
                                                marginLeft: 10
                                            }}
                                        />
                                        <View style={{ width: '100%', paddingRight: 5, alignItems: 'center' }}>
                                            <TouchableOpacity onPress={this.SingleFilePicker.bind(this, '2')} >
                                                {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalServiceFile'); }}> */}
                                                <Image
                                                    source={Icons.icon_save}
                                                    style={{ width: 40, height: 40, margin: 5, alignItems: 'flex-end' }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>                                    
                                    
                                    {/* ////         */}
                                    <View style={{
                                        width: "100%",
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        marginTop: 20,
                                        marginBottom: 10,
                                        alignItems: "center"
                                    }}>
                                        <View style={{ width: "100%" }}>
                                            <Button
                                                full
                                                loading={loading}
                                                onPress={() => this.completeBtn()}
                                                style={{ backgroundColor: BaseColor.primaryColor }}
                                            >
                                                {Utils.translate("Ldentalnewservcie2.continue")}
                                            </Button>
                                        </View>
                                        <View style={{ flexDirection: "row", textAlign: "center", alignItems: "center", marginTop: 10 }}>
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalNewService'); }}>
                                                <Image source={Icons.icon_left_arrow} style={{ tintColor: BaseColor.primaryColor, width: 30, height: 30 }} />
                                            </TouchableOpacity>
                                            <Text style={styles.signup_labelSecond}>
                                                {Utils.translate("Ldentalnewservcie2.page2")}
                                            </Text>
                                        </View>
                                    </View>
                                </ScrollView>
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


export default connect(null, mapDispatchToProps)(LabDentalNewService2);
