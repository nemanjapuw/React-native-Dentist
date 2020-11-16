import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { Icon, Thumbnail } from 'native-base';
import { Image } from 'react-native';
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Text, Alert, Dimensions, TouchableOpacity, View, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BaseColor, Images, Icons} from "@config";
import * as Utils from "@utils";

// const arrMenu = [
//     { 'id': 0, name: Utils.translate("digital.dental_plan_s") , 'icon': Icons.icon_tooth, 'navScreen': 'DentalNew' },
//     { 'id': 1, name: Utils.translate("digital.lab_services_s"), 'icon':  Icons.icon_filter, 'navScreen': 'DentalNew' },
//     { 'id': 2, name: Utils.translate("digital.myaccount"), 'icon': Images.signin_usericon, 'navScreen': 'Profile' },
//     { 'id': 3, name: Utils.translate("digital.instruction_s") , 'icon': Icons.icon_setting, 'navScreen': 'Instruction' },
//     { 'id': 4, name: Utils.translate("digital.log_off"), 'icon': Icons.icon_logout, 'navScreen': 'Loading' }
// ]

const arrMenu = [
    { 'id': 0, name: 'Planejamento Dentário' , 'icon': Icons.icon_tooth, 'navScreen': 'DentalNew' },
    { 'id': 1, name: 'Serviços Laboratoriais', 'icon':  Icons.icon_filter, 'navScreen': 'DentalNew' },
    { 'id': 2, name: 'Minha Conta', 'icon': Images.signin_usericon, 'navScreen': 'Profile' },
    { 'id': 3, name: 'Instruções' , 'icon': Icons.icon_setting, 'navScreen': 'Instruction' },
    { 'id': 4, name: 'Sair', 'icon': Icons.icon_logout, 'navScreen': 'Loading' }
]

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


class Drawer extends React.Component {

    constructor(props) {
        super(props)
        this.navigateToScreen = this.navigateToScreen.bind(this);
    }


    render() {        
        return (
            <SafeAreaView style={styles.container}  >
                    {/* onTouchOutside={() => {
                this.setState({ patientModal: false });
              }}
              onSwipeOut={(event) => {
                this.setState({ patientModal: false });
              }} */}
                <StatusBar backgroundColor="#019df2" barStyle="light-content" />
                <View style={styles.headerContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>                        
                        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '600', paddingLeft: 10, flex:1 }}>
                            {Utils.translate("digital.hello")} Renata
                        </Text>
                        <TouchableOpacity style={{marginRight:20}} onPress = {() => this.props.navigation.toggleDrawer() }>
                            <Image source={Icons.icon_leftclose} style={{width: 25, height: 25, marginLeft:20}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.menuContainer}>
                    {this.renderFlatList()}
                </View>
                <View style={[styles.footerContainer, { bottom: (screenHeight > 800) ? 30 : 20 }]}>
                    <Text style={[styles.footerText,{fontWeight:"600", fontSize:17}]}>{Utils.translate("digital.user")}: Renata</Text>
                    <Text style={styles.footerText}>{Utils.translate("digital.last_login")}: 21 September, 2020</Text>
                    <Text style={styles.footerText}>{Utils.translate("digital.version")}: 1.0.0</Text>
                </View>
            </SafeAreaView>
        );
    }
    //logout
    onLogOut() {
        this.setState(
          {
            loading: true
          },
          () => {
            this.props.actions.authentication(false, null, response => {                
              if (response.success) {
                this.props.navigation.navigate("Loading");
              } else {
                this.setState({ loading: false });
              }
            });
          }
        );
    }
    //renderIcon
    renderIcon() {
        return (
            <Icon name='menu' style={{ color: '#fff' }} />
        );
    }

    renderFlatList() {
        return (
            <FlatList
                scrollEnabled={(screenHeight >= 667) ? false : true}
                data={arrMenu}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => this.navigateToScreen(item.navScreen)}>
                        <View style={{ height: 45, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image source={item.icon} style={{width: 25, height: 25, marginLeft:20}} />
                            <Text style={styles.menuText}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    }

    navigateToScreen(navScreen) {
        if(navScreen == 'Loading') {
            this.onLogOut();
        }else {
            this.props.navigation.navigate(navScreen);
        }
    }
}

//export default Drawer;


const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators(AuthActions, dispatch)
    };
  };
  
  export default connect(null, mapDispatchToProps)(Drawer);
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(7,27,52)',
    },
    headerContainer: {
        flex: 0.9,
        justifyContent: 'center',
        backgroundColor: BaseColor.primaryColor
    },
    menuContainer: {
        flex: 3,
        justifyContent: 'center',
        backgroundColor: BaseColor.grayLightColor
    },
    headerText: {
        fontSize: 50,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    menuText: {
        fontSize: 18,
        color: '#4e4c4c',
        textAlign: 'center',
        marginLeft: 20
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'center',
        height: 30,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0
    },
    footerText: {
        fontSize: 16,
        color: '#4e4c4c',                
        paddingLeft:15
    },
    overlay:{
        width:screenWidth,
        height:screenHeight,
        position:"absolute",
        top:0,
        right:0,
        left:0,
        bottom:0,
        backgroundColor:"red"
    }
});