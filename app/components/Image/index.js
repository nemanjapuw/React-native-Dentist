import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import {  BaseColor } from "@config";
import * as Utils from '@utils';
import { Image as ImageElement } from 'react-native-elements';
export default class Image extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      forceReload:true,
    }
  }
  render() {
    let { style, resizeMode, source, avatar, local, ...rest } = this.props;
    let { forceReload } = this.state;
    if(forceReload) this.setState({forceReload:false});
    let url = `${Utils.SERVER_HOST}${source}`;
    if(!source)
      return (<View></View>);
    if(forceReload){
      url = `${url}?${Date.now()}`;
    }
    return (
      <ImageElement
        resizeMode={resizeMode}
        source={local==true ? source :{ uri: url }}
        style={StyleSheet.flatten([(style && style)])}
        PlaceholderContent={<ActivityIndicator size={avatar == true ? "small" : "large"} />}
        placeholderStyle={{backgroundColor:BaseColor.whiteColor}}
      />
    );
  }
}

Image.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Image.defaultProps = {
  style: {},
  resizeMode: "cover"
};
