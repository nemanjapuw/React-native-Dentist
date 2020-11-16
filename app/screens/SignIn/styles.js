import { StyleSheet,Dimensions } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white'
  },
  signin_back : {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  contain: {
    alignItems: "center",
    margin: 15,
    padding:15,    
    marginTop:250
  },
  txtSignin:{        
    color:BaseColor.whiteColor,
    fontSize:15
  },
  signin_topview:  {
    flexDirection: 'row', 
    textAlign: 'left', 
    fontSize: 15, 
    marginTop:10, 
    marginLeft:10 
  },
  signin_text : {
    color:'white', 
    alignSelf: "center", 
    fontSize : 15, 
    paddingLeft:15 
  }

});
