import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Alert , ImageBackground,SafeAreaView} from "react-native";
import { BaseStyle, BaseColor, Images, Icons } from "@config";
import { Header, Icon, Button, Text } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { connect } from "react-redux";
import { AuthActions ,typeActions } from "@actions";
import { bindActionCreators } from "redux";
import Toast from 'react-native-easy-toast';

import DocumentPicker from 'react-native-document-picker';



class DentalServiceFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleFileOBJ: '',
        };
    }

    async SingleFilePicker() {
        try {
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
          
          });
     
          this.setState({ singleFileOBJ: res });
     
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            Alert.alert('Canceled');
          } else {
            Alert.alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
      }
     


    render() {
        const { navigation } = this.props;
        let { search, statename, success } = this.state;
        const state_list = Utils.filterList();
        const renderItem = ({ item }) => (
            <Item data={item} />
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
                        <View style={styles.MainContainer}>

                            <Text style={styles.text}>
                                File Name: {this.state.singleFileOBJ.name ? this.state.singleFileOBJ.name : ''}
                            </Text>

                            <Text style={styles.text}>
                                file Type: {this.state.singleFileOBJ.type ? this.state.singleFileOBJ.type : ''}
                            </Text>

                            <Text style={styles.text}>
                                File Size: {this.state.singleFileOBJ.size ? this.state.singleFileOBJ.size : ''}
                            </Text>

                            <Text style={styles.text}>
                                File URI: {this.state.singleFileOBJ.uri ? this.state.singleFileOBJ.uri : ''}
                            </Text>

                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.button}
                                onPress={this.SingleFilePicker.bind(this)}>
                                <Text style={styles.buttonText}>
                                    Click Here To Pick File
                                </Text>
                            </TouchableOpacity>

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


export default connect(null, mapDispatchToProps)(DentalServiceFile);
