import React, { Component } from "react";
import { View, CheckBox, Dimensions, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import { BaseStyle, BaseColor, Images, Icons } from "@config";
import { Header, Icon, Button, Text } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { connect } from "react-redux";
import { AuthActions, apiActions } from "@actions";
import { bindActionCreators } from "redux";
import Toast from 'react-native-easy-toast';
import DropDownPicker from 'react-native-dropdown-picker';
import ImageSequence from 'react-native-image-sequence';

const front_images = [
    require("@assets/images/ins/front/1.png"),
    require('@assets/images/ins/front/2.png'),
    require('@assets/images/ins/front/3.png'),
    require('@assets/images/ins/front/4.png')
];

const extra_images = [
    require('@assets/images/ins/extra/1.png'),
    require('@assets/images/ins/extra/2.png'),
    require('@assets/images/ins/extra/3.png'),
    require('@assets/images/ins/extra/4.png'),
];

const outside_images = [
    require('@assets/images/ins/outside/1.png'),
    require('@assets/images/ins/outside/2.png'),
    require('@assets/images/ins/outside/3.png'),
    require('@assets/images/ins/outside/4.png')
];

const internal_images = [
    require('@assets/images/ins/internal/1.png'),
    require('@assets/images/ins/internal/2.png'),
    require('@assets/images/ins/internal/3.png'),
    require('@assets/images/ins/internal/4.png')
];

const d2_images = [
    require("@assets/images/ins/2d/1.png"),
    require('@assets/images/ins/2d/2.png'),
    require('@assets/images/ins/2d/3.png')    
];

const centerIndex = Math.round(front_images.length / 2);

class Instruction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            plan: 'inicial',
            sub_plan_flag: true,
            plan_sub: "front",
        };
    }

    changePlan(item) {
        this.setState({ plan: item.value });
        if (item.value == 'inicial') {
            this.setState({ sub_plan_flag: true });
        } else {
            this.setState({ sub_plan_flag: false });
        }
    }

    changePlanSub(item) {
        this.setState({ plan_sub: item.value });
    }

    componentDidMount() {

    }


    componentDidUpdate(prevProps) {
        if (this.props != prevProps) {

        }
    }


    render() {
        const { navigation } = this.props;
        let { loading, plan } = this.state;
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
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Digital'); }}>
                                <Image source={Icons.icon_ins} style={{ width: 22, height: 25, borderRadius: 2 }} />
                            </TouchableOpacity>
                            <Text style={styles.main_text}>
                                {Utils.translate("ins.label")}
                            </Text>
                        </View>
                        <View style={styles.main_contain}>
                            <ScrollView style={{ width: "100%" }}>
                                <Text style={styles.labelTop}>
                                    {Utils.translate("ins.title")}
                                </Text>
                                <Text style={styles.second_title}>
                                    {Utils.translate("ins.desc")}
                                </Text>
                                <View style={{ paddingTop: 20, width: '100%' }}>
                                    <DropDownPicker
                                        items={[
                                            { label: 'Planeijamento Inicial', value: 'inicial' },
                                            { label: 'Planejamento 2D', value: '2d' },
                                        ]}
                                        defaultValue={this.state.plan}
                                        containerStyle={{ height: 43, width: '100%' }}
                                        style={{ border: 1, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, }}
                                        itemStyle={{
                                            justifyContent: 'flex-start',
                                            borderRadius: 20
                                        }}
                                        placeholder={Utils.translate('ins.holder1')}
                                        placeholderStyle={{ color: '#858687' }}
                                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                                        onChangeItem={item => this.changePlan(item)}
                                    />
                                </View>

                                {(this.state.sub_plan_flag) &&
                                    (
                                        <View>
                                            <View style={{ paddingTop: 20, width: '100%' }}>
                                                <View style={{ paddingBottom: 20 }}>
                                                    <Text style={[styles.labelTop, { textAlign: "center" }]}>
                                                        {Utils.translate("ins.title1")}
                                                    </Text>
                                                </View>
                                                <DropDownPicker
                                                    items={[
                                                        { label: 'Fotos Extra-bucais Frontal', value: 'front' },
                                                        { label: 'Fotos Extra-bucais Perfil', value: 'extra' },
                                                        { label: 'Fotos Extra-bucais Close-Up', value: 'outside' },
                                                        { label: 'Fotos Intra-bucais', value: 'internal' }
                                                    ]}
                                                    defaultValue={this.state.plan_sub}
                                                    containerStyle={{ height: 43, width: '100%' }}
                                                    style={{ border: 1, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, }}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start',
                                                        borderRadius: 20
                                                    }}
                                                    placeholder={Utils.translate('ins.holder1')}
                                                    placeholderStyle={{ color: '#858687' }}
                                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                                    onChangeItem={item => this.changePlanSub(item)}
                                                />
                                            </View>
                                            <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                                                <Text style={[styles.labelTop, { textAlign: "center" }]}>
                                                    {Utils.translate("ins.title2")}
                                                </Text>
                                            </View>
                                            {(this.state.plan_sub == "front") && (
                                                <View style={{ paddingTop: 10, paddingBottom: 10, textAlign: "center", justifyContent: 'flex-end', alignItems: 'center', }}>
                                                    <ImageSequence
                                                        images={front_images}
                                                        startFrameIndex={centerIndex}
                                                        framesPerSecond={1}
                                                        style={{ width: Dimensions.get('window').width, height: 250 }}
                                                        loop={true} />
                                                </View>
                                            )}
                                            {(this.state.plan_sub == "extra") && (
                                                <View style={{ paddingTop: 10, paddingBottom: 10, textAlign: "center", justifyContent: 'flex-end', alignItems: 'center', }}>
                                                    <ImageSequence
                                                        images={extra_images}
                                                        startFrameIndex={centerIndex}
                                                        framesPerSecond={1}
                                                        style={{ width: Dimensions.get('window').width, height: 250 }}
                                                        loop={true} />
                                                </View>
                                            )}
                                            {(this.state.plan_sub == "outside") && (
                                                <View style={{ paddingTop: 10, paddingBottom: 10, textAlign: "center", justifyContent: 'flex-end', alignItems: 'center', }}>
                                                    <ImageSequence
                                                        images={outside_images}
                                                        startFrameIndex={centerIndex}
                                                        framesPerSecond={1}
                                                        style={{ width: Dimensions.get('window').width, height: 250 }}
                                                        loop={true} />
                                                </View>
                                            )}
                                            {(this.state.plan_sub == "internal") && (
                                                <View style={{ paddingTop: 10, paddingBottom: 10, textAlign: "center", justifyContent: 'flex-end', alignItems: 'center', }}>
                                                    <ImageSequence
                                                        images={internal_images}
                                                        startFrameIndex={centerIndex}
                                                        framesPerSecond={1}
                                                        style={{ width: Dimensions.get('window').width, height: 250 }}
                                                        loop={true} />
                                                </View>
                                            )}
                                            <View style={{
                                                justifyContent: 'flex-end', alignItems: 'center',
                                                textAlign: 'center', width: "100%"
                                            }}>
                                                <Button
                                                    full
                                                    loading={loading}
                                                    onPress={() => { this.props.navigation.navigate('Digital'); }}
                                                    style={{ backgroundColor: BaseColor.primaryColor }}
                                                >
                                                    <Text>VOLTAR</Text>
                                                </Button>
                                            </View>
                                        </View>
                                    )}

                                {(!this.state.sub_plan_flag) && (
                                    <View>
                                        <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                                            <Text style={[styles.labelTop, { textAlign: "center" }]}>
                                                {Utils.translate("ins.title1")}
                                            </Text>
                                        </View>
                                        <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                                                <Text style={[styles.labelTop, { textAlign: "center" }]}>
                                                    {Utils.translate("ins.title2")}
                                                </Text>
                                            </View>
                                        <View style={{ paddingTop: 10, paddingBottom: 10, textAlign: "center", justifyContent: 'flex-end', alignItems: 'center', }}>
                                            <ImageSequence
                                                images={d2_images}
                                                startFrameIndex={centerIndex}
                                                framesPerSecond={1}
                                                style={{ width: Dimensions.get('window').width, height: 250 }}
                                                loop={true} />
                                        </View>
                                        <View style={{
                                            justifyContent: 'flex-end', alignItems: 'center',
                                            textAlign: 'center', width: "100%"
                                        }}>
                                            <Button
                                                full
                                                loading={loading}
                                                onPress={() => { this.props.navigation.navigate('Digital'); }}
                                                style={{ backgroundColor: BaseColor.primaryColor }}
                                            >
                                                <Text>VOLTAR</Text>
                                            </Button>
                                        </View>
                                    </View>
                                )}

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

export default connect(null, mapDispatchToProps)(Instruction);
