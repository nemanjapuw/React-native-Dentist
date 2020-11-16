import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white'
  },  
  signup_back : {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  signup_topview:  {
    flexDirection: 'row', 
    textAlign: 'left', 
    fontSize: 15, 
    marginTop:10, 
    marginLeft:10 
  },
  signup_text : {
    color:'white', 
    alignSelf: "center", 
    fontSize : 15, 
    paddingLeft:15 
  },
  main_contain : {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: BaseColor.grayLightColor,
    marginTop:10,
    borderTopLeftRadius :20,
    borderTopRightRadius :20,    
    padding:30,        
  },
  main_topview:  {
    flexDirection: 'row', 
    textAlign: 'left', 
    fontSize: 15, 
    marginTop:10,    
  },
  signup_labelTop : {
    color: BaseColor.primaryColor, 
    alignSelf: "center", 
    fontSize : 20,     
  },
  signup_labelSecond : {   
    alignSelf: "center", 
    color: BaseColor.secLabel, 
    fontSize : 15,  
    paddingTop : 5,
    paddingBottom:5   
  },
  signup_link : {   
    alignSelf: "center", 
    color: BaseColor.primaryColor, 
    fontSize : 15,  
    paddingTop : 5,
    paddingBottom:5   
  },
  txtSignin:{        
    color:BaseColor.whiteColor,
    fontSize:15
  },
  checkbox: {
    alignSelf: "center",
  },
});
