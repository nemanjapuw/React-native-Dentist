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
    padding:10,        
  },
  viewrow : {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",    
  },
  circle:{    
    height: 15,
    width: 15,
    marginTop:5,    
    alignItems: 'center',    
    borderRadius: 15/2,
  },  
  item: {
    width:Dimensions.get('window').width-30,  
    backgroundColor: '#f9c2ff',    
    marginTop:10,
    borderRadius:10,
    backgroundColor:BaseColor.whiteColor,
    padding:10
  },
  txtRight:{    
    borderRadius:5, 
    fontSize:15, 
    paddingVertical:2,
    paddingHorizontal:10, 
    color:'white',
  }
});
