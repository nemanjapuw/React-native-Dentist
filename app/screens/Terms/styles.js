import { StyleSheet, Dimensions } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white',
  },
  signup_back : {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  topview:  {
    flexDirection: 'row', 
    textAlign: 'left', 
    fontSize: 15, 
    marginTop:10, 
    marginLeft:10 
  },
  main_text : {
    color:'white', 
    alignSelf: "center", 
    fontSize : 15, 
    paddingTop:5,
    paddingLeft:5 
  },
  main_contain : {
    flex: 1,
    justifyContent: "flex-start",   
    backgroundColor: BaseColor.grayLightColor,
    marginTop:10,
    borderTopLeftRadius :20,
    borderTopRightRadius :20,    
    padding:30,        
  },
  text1 : {
    color:BaseColor.primaryColor,      
    fontSize : 15,     
  },
  text2 : {
    color:'#484848',     
    fontSize : 14, 
    textAlign:"center",
    marginTop:10
  },
  text : {
    color:'#484848',     
    fontSize : 13,
    textAlign :'justify',    
    marginTop:10
  },
});
