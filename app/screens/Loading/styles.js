import { StyleSheet, Dimensions} from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white'
  }, 
  splash: {    
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height    
  },  
});
