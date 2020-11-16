import { StyleSheet, Dimensions } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white',
    paddingTop:20    
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
  main_contain : {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: BaseColor.grayLightColor,
    marginTop:10,
    borderTopLeftRadius :20,
    borderTopRightRadius :20,    
    padding:25,        
  },
  main_text : {
    color:'white', 
    alignSelf: "center", 
    fontSize : 15, 
    paddingLeft:15 
  },
  title : {
    color: BaseColor.primaryColor, 
    alignSelf: "center", 
    fontSize : 17,     
  },
  second_title : {   
    textAlign:"center",
    color: BaseColor.secLabel, 
    fontSize : 15,  
    paddingTop : 5,
    paddingBottom:5,   
  },
  view_contain : {
    flexDirection: 'row',    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseColor.whiteColor,    
    borderRadius: 10,        
    borderWidth: 2,
    height:30,
    borderColor: '#229cef'
  },
  view_title : {
    color: BaseColor.primaryColor, 
    alignSelf: "center", 
    fontSize : 13,     
  },
  modal: {   
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',    
    alignItems: 'center',
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    padding : 10,
    top: '50%',
    left: '50%',
    width:100,
    height:100
  }
 
});
