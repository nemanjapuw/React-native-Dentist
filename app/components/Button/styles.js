import { StyleSheet } from "react-native";
import { BaseColor, Typography, FontWeight } from "@config";

export default StyleSheet.create({
  default: {
    height: 42,
    borderRadius: 8,
    borderRadius:20,
    backgroundColor: BaseColor.primaryColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  textDefault: {
    ...Typography.headline,
    color: BaseColor.whiteColor,
    fontWeight: FontWeight.semibold
  },
  outline: {
    backgroundColor: BaseColor.whiteColor,
    borderWidth: 1,
    borderColor: BaseColor.primaryColor
  },
  textOuline: {
    color: BaseColor.whiteColor
  },
  full: {
    width: "100%",
    alignSelf: "auto"
  },
  round: {
    borderRadius: 28
  }
});
