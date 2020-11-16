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
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
  },
 
  button: {
    width: '100%',
    backgroundColor: '#0091EA',
    borderRadius:9,
  },
 
  buttonText: {
    color: '#fff',
    fontSize: 21,
    padding: 10,
    textAlign: 'center'
  },
 
  text: {
    color: '#000',
    fontSize: 16,
    padding: 10,
    textAlign: 'left'
  },
});
