import React, { Component } from "react";
import { View, Dimensions, ScrollView, FlatList, ImageBackground, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import { BaseStyle, BaseColor, Images, Icons } from "@config";
import { Header, Icon, Button, Text } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { connect } from "react-redux";
import { AuthActions, apiActions, typeActions } from "@actions";
import { bindActionCreators } from "redux";
import Toast from 'react-native-easy-toast';
import ModalSelector from 'react-native-modal-selector';
import { store } from "../../store";
import { element } from "prop-types";
import moment from "moment";

const Item = ({ data, press }) => (
    <TouchableOpacity onPress={press}>
    <View style={styles.item}>
        <View style={{ flexDirection: 'row', textAlign: 'left', fontSize: 15 }}>
            <View style={{ alignItems: 'flex-start', width: "70%" }}>
                <Text style={{ fontSize: 15 }}>N {data.id}</Text>
                <Text style={{ fontSize: 15 }}>{data.service_type},
                    {(data.pay_status == 0) && (
                        <Text style={{ color: 'red' }}> R$ {data.pay_mount}</Text>
                    )}
                    {(data.pay_status == 1) && (
                        <Text style={{ color: 'green' }}> R$ {data.pay_mount}</Text>
                    )}
                </Text>
                <Text style={{ fontSize: 14 }}>{moment(data.created_at).format("DD-MM-YYYY h:mm")}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', width: "30%" }}>
                {(data.service_status == '0') && (
                    <Text style={[styles.txtRight, { backgroundColor: 'red' }]}>{Utils.translate('dentalplan.pending')}</Text>
                )}
                {(data.service_status == '1') && (
                    <Text style={[styles.txtRight, { backgroundColor: 'green' }]}>{Utils.translate('dentalplan.received')}</Text>
                )}
                {(data.service_status == '2') && (
                    <Text style={[styles.txtRight, { backgroundColor: 'blue' }]}>{Utils.translate('dentalplan.finished')}</Text>
                )}
            </View>
        </View>
        <View
            style={{
                borderBottomColor: '#cdcbcb',
                borderBottomWidth: 1,
                paddingTop: 5
            }}
        />
        <View style={{ flexDirection: 'row', textAlign: 'left', paddingTop: 5 }}>
            <View style={{ alignItems: 'flex-start', width: "70%" }}>
                <Text style={{ fontSize: 13 }}>Patient:{data.full_name}</Text>
                {(data.service_status == '0') && (
                    <Text style={{ color: 'red', fontSize: 13 }}>Status: Pendente</Text>
                )}
                {(data.service_status == '1') && (
                    <Text style={{ color: 'green', fontSize: 13 }}>Status: Enviado</Text>
                )}
                {(data.service_status == '2') && (
                    <Text style={{ color: 'blue', fontSize: 13 }}>Status: Finalizado</Text>
                )}

            </View>
            <View style={{ alignItems: 'flex-end', width: "30%" }}>
                <Text>{data.city}</Text>
            </View>
        </View>
    </View>
    </TouchableOpacity>
);


class DentalPlan extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            filter: "",
            cond: "", 
            service_list: [],
            success: {
                loading: true,
                statename: true,
                search: true
            }
        };
    }

    viewItem(data){
        this.setState({ loading: true }, () => {
            this.props.actions.apiActions.getServiceItem(data, response => {                                   
                if (response.success) {                                                                             
                    const item = response.item;
                    item.read_write = 'read';
                    this.props.actions.dispatch(typeActions.onOrigin(item));                   
                    this.props.navigation.navigate('DentalNewService');                 
                } else {
                     this.refs.toast.show(Utils.translate("messages.error"));
                }
                this.setState({ loading: false });
            });
        });
    }

    getServiceList(cond) {
        this.setState({ service_list: [], loading: true }, () => {
            this.props.actions.apiActions.getServiceList(cond, response => {                              
                if (response.success) {                                                         
                    this.setState({
                        service_list: response.list,
                    });   

                    this.setState({ loading: false });
                } else {
                    this.refs.toast.show(Utils.translate("messages.error"));
                }
            });
        });
    }

    componentDidMount() {
        this._isMounted = true;
        let service = {};
        service.service_list = {};
        service.name = '';
        service.gender = '';
        service.bio = '';
        service.pay_mount = 0;
        this.props.actions.dispatch(typeActions.onService(service));
        let cond = {};
        cond.search = '';
        cond.filter = '';
        this.getServiceList(cond);
        //console.log(store.getState());   
        if (this.props.navigation.state.params) {
            if (!Utils.isEmpty(this.props.navigation.state.params.cond)) {
                let cond = this.props.navigation.state.params.cond;
                this.setState({ cond: cond });
            }
        }
    }

    searchCond(val, type) {
        let cond = {};
        if (type == 'search') cond.search = val;
        if (type == 'filter') cond.filter = val;
        this.getServiceList(cond);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { navigation } = this.props;
        let { search, statename, success } = this.state;
        const filter_list = Utils.filterList();
        const renderItem = ({ item }) => (
            <Item data={item} press={() => this.viewItem(item)} />
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
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Digital'); }}>
                                <Image source={Icons.icon_left_arrow} style={{ marginTop: 7, width: 30, height: 30, borderRadius: 2 }} />
                            </TouchableOpacity>
                            <View style={[BaseStyle.viewInput, { width: "85%" }]}>
                                <Image
                                    source={Icons.icon_search}
                                    style={BaseStyle.imgInput}
                                />
                                <TextInput
                                    style={[BaseStyle.textInput0]}
                                    placeholder={Utils.translate("dentalplan.search_txt")}
                                    onChangeText={text => { this.setState({ search: text }); this.searchCond(text, 'search'); }}
                                    autoCorrect={false}
                                    value={search}
                                />
                            </View>
                        </View>
                        <View style={styles.main_contain}>
                            <View style={[BaseStyle.viewPage]}>
                                <View style={styles.viewrow}>
                                    <View style={[styles.circle, { backgroundColor: "red", marginRight: 5 }]} />
                                    <Text>{Utils.translate("dentalplan.pending")}</Text>
                                </View>
                                <View style={[styles.viewrow, { paddingLeft: 20 }]}>
                                    <View style={[styles.circle, { backgroundColor: "green", marginRight: 5 }]} />
                                    <Text>{Utils.translate("dentalplan.received")}</Text>
                                </View>
                                <View style={[styles.viewrow, { paddingLeft: 20 }]}>
                                    <View style={[styles.circle, { backgroundColor: "blue", marginRight: 5 }]} />
                                    <Text>{Utils.translate("dentalplan.finished")}</Text>
                                </View>
                            </View>
                            <ModalSelector
                                data={filter_list}
                                initValue="Select something states in Brazil!"
                                supportedOrientations={['landscape']}
                                accessible={true}
                                scrollViewAccessibilityLabel={'Scrollable options'}
                                cancelButtonAccessibilityLabel={'Cancel Button'}
                                onChange={(option) => { this.setState({ filter: option.label }); this.searchCond(option.value, 'filter'); }}>
                                <View style={[BaseStyle.viewInput, { backgroundColor: "#cdcece", marginTop: 10 }]}>
                                    <Image
                                        source={Icons.icon_filter_verse}
                                        style={BaseStyle.imgInput}
                                    />
                                    <TextInput
                                        style={{ height: 40, width: Dimensions.get('window').width - 150 }}
                                        editable={false}
                                        placeholder={Utils.translate("dentalplan.filter_txt")}
                                        onChangeText={text => { this.setState({ filter: text }); }}
                                        autoCorrect={false}
                                        value={this.state.filter} />
                                </View>
                            </ModalSelector>
                            <View style={{ height: Dimensions.get('window').height - 240, marginTop: 5 }}>
                                {/* <ScrollView> */}
                                <FlatList
                                    data={this.state.service_list}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                />
                                {/* </ScrollView> */}
                            </View>
                            <View style={{ position: "absolute", bottom: 25, width: '100%', paddingRight: 5, alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalNew'); }}>
                                    {/* <Image
                                    source={Icons.icon_save}
                                    style={{width:60,height:60, alignItems:'flex-end'}}
                                /> */}
                                    <View style={{ backgroundColor: BaseColor.greenColor, borderRadius: 20, padding: 13, flexDirection: 'row', marginBottom: 10 }}>
                                        {/* <Image
                                            source={Icons.icon_save}
                                            style={{ width: 45, height: 45, marginRight: 5 }}
                                        /> */}
                                        <Text style={{ color: BaseColor.whiteColor, fontSize:16,fontWeight: '500' }}>{Utils.translate("dentalnew.create_service")}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </SafeAreaView>
        );
    }
}
const mapDispatchToProps = dispatch => {
    // return {
    //     actions: bindActionCreators(AuthActions, dispatch),
    //     dispatch
    // };
    return {
        actions: {
            AuthActions: bindActionCreators(AuthActions, dispatch),
            apiActions: bindActionCreators(apiActions, dispatch),
            dispatch
        }
    };
};


export default connect(null, mapDispatchToProps)(DentalPlan);
