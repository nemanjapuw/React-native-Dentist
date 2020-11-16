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
  labelTop : {
    color: BaseColor.primaryColor, 
    alignSelf: "center", 
    fontSize : 16,     
  },
  sub_main_contain : {    
    alignItems: "center",    
    backgroundColor: BaseColor.whiteColor,
    marginTop:50,
    borderRadius :20,    
    width: '100%',      
  },
  sub_text_number : {
    color:'#1d1d1d',
    fontWeight: "600",     
    fontSize : 18, 
    textAlign:"center",
  },
  sub_text : {
    color:'#484848',     
    fontSize : 15, 
    textAlign:"center",
  },
});
