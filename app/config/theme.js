import { StyleSheet } from "react-native";
import { BaseColor } from "./color";

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  tabBar: {
    shadowColor: BaseColor.whiteColor,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10
  },
  textInput: {
    height: 42,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 20,
    padding: 10,
    width: "100%",
    justifyContent: "center"
  },
  viewInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseColor.fieldColor,
    height: 43,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#b5b3b3"
  },
  viewPage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgInput: {
    padding: 10,
    marginLeft: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  textInput0: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: BaseColor.whiteColor
  } 
});
