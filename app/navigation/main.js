import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { BaseColor, BaseStyle } from "@config";
import { Icon } from "@components";
import * as Utils from "@utils";
import { Dimensions } from 'react-native'
import { createAppContainer } from 'react-navigation';


/* Modal Screen only affect iOS */
import SignUp from "@screens/SignUp";
import SignIn from "@screens/SignIn";
import Forgot from "@screens/Forgot";
import Digital from "@screens/Digital";
import DentalPlan from "@screens/DentalPlan";
import DentalNew from "@screens/DentalNew";
import DentalNewService from "@screens/DentalNewService";
import DentalNewService1 from "@screens/DentalNewService1";
import DentalServiceFile from "@screens/DentalServiceFile";
import DentalDelivery from "@screens/DentalDelivery";
import LabDentalNewService1 from "@screens/LabDentalNewService1";
import LabDentalNewService from "@screens/LabDentalNewService";
import LabDentalNewService2 from "@screens/LabDentalNewService2";
import LabDentalNewService3 from "@screens/LabDentalNewService3";
import Paypal from "@screens/Paypal";
import Instruction from "@screens/Instruction";
import Profile from "@screens/Profile";
import PatientReg from "@screens/PatientReg";
import Terms from "@screens/Terms";


// left side menu
import { createDrawerNavigator } from 'react-navigation-drawer';
import Drawer from '@components/Drawer'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


// Main Stack View App
const StackNavigator = createStackNavigator(
  {  
    SignUp: {
      screen: SignUp
    },
    SignIn: {
      screen: SignIn
    },
    Forgot: {
      screen: Forgot
    },
    Digital: {
      screen: Digital
    },
    DentalPlan : {
      screen : DentalPlan
    },
    DentalNew : {
      screen : DentalNew
    },
    DentalNewService : {
      screen : DentalNewService
    },
    DentalNewService1 : {
      screen : DentalNewService1
    },
    DentalServiceFile : {
      screen : DentalServiceFile
    },
    DentalDelivery : {
      screen : DentalDelivery
    },
    LabDentalNewService : {
      screen : LabDentalNewService
    },  
    LabDentalNewService1 : {
      screen : LabDentalNewService1
    },
    LabDentalNewService2 : {
      screen : LabDentalNewService2
    },
    LabDentalNewService3 : {
      screen : LabDentalNewService3
    },
    Paypal : {
      screen : Paypal
    },
    Instruction : {
      screen: Instruction
    },
    Profile : {
      screen: Profile
    },
    PatientReg:{
      screen: PatientReg
    },
    Terms : {
      screen :Terms
    }
  },
  {
    headerMode: "none",
    initialRouteName: "SignIn"
  }
);

// Define Root Stack support Modal Screen
const RootStack = createStackNavigator(
  {
    StackNavigator: {
      screen: StackNavigator
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    initialRouteName: "StackNavigator",
    // transitionConfig: screen => {
    //   return handleCustomTransition(screen);
    // },
    transparentCard: true
  }
);
// Drawer
/* Permistion check authenticate*/
const defaultGetStateForAction = StackNavigator.router.getStateForAction;

StackNavigator.router.getStateForAction = (action, state) => {    
  if(state && state.index > 0 && state.routes.length > 1){   
    state.routes = state.routes.filter(item => {     
      if(item && (item.routeName == "SignIn")){
        if(state.index > 0)
          state.index = state.index -1;
        return false;
      }
      return true;
      })
  }
  return defaultGetStateForAction(action, state);
};

const DrawerNavigator = createDrawerNavigator(
  {
    StackNavigator: {
      screen: StackNavigator,
    }
  },
  {
    initialRouteName: 'StackNavigator',
    contentComponent: Drawer,
    drawerLockMode: "unlocked",
    swipeEnabled:true,    
    //keyboardDismissMode : 'on-drag',
    //drawerType: "front", 
    // disableGestures: false,  
    // gestureEnabled:true,
    //drawerWidth: screenWidth - 60,
    // swipeEdgeWidth:100,
    // edgeWidth: 200,
    contentOptions: {
        activeTintColor: 'yellow',
    },
    layout: {
        orientation: ["portrait"],
    },
});

export default createAppContainer(DrawerNavigator);
// export default RootStack;
