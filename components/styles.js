import styled from 'styled-components';
import { View, Text, Image } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.StatusBarHeight;

//colors
export const Colors = {
  primary: '#ffffff',
  secondry: '#e5e7eb',
  tertiary: '#1f2937',
  darkLight: '#9ca3af',
  brand: 'grey',
  green: '#10b981',
  red: '#ef4444',
  WelcomeButton: '#212121',
};

export const StyledContainer = {
  flex: 1,
  padding: 25,
  paddingTop: StatusBarHeight + 10,
  backgroundColor: Colors.primary,
};

export const InnerContainer = {
  flex: 1,
  alignItems: 'center',
};

// Welcome Page

export const WelcomePageImage = {
  width: 300,
  height: 350,
  marginTop: 50,
};

export const WelcomeHeading = {
  fontWeight: 'bold',
  fontSize: 20,
  marginTop:  20,
  marginBottom: 20
};

export const WelcomeDots = {
  paddingRight: 5,
  fontSize: 60,
  color: 'grey',
  lineHeight: 60
};

export const WelcomeButton = {
  backgroundColor: Colors.WelcomeButton,
  borderRadius: 10,
  height: 40,
  justifyContent: 'center',
  width: 180,
  marginTop: 20
};

// Form Page (Login and Register)

export const PageLogo = {
  width: 200,
  height: 250,
  marginTop: 30,
};

export const PageTitle = {
  fontSize: 30,
  textAlign: 'center',
  fontWeight: 'bold',
  color: Colors.brand,
  padding: 10,
};

export const TextBox = {
  height: 40,
};

export const PageSubTitle = {
  fontSize: 15,
  textAlign: 'center',
  fontWeight: 'bold',
  color: Colors.brand,
  padding: 10,
};

export const LoginButton = {
  height: 40,
  paddingTop: 5,
  alignSelf: 'center',
  width: '80%',
};

export const RegisterButton = {
  height: 40,
  paddingTop: 5,
  alignSelf: 'center',
  width: '70%',
  marginTop: 10,
};

export const ForgotButton = {
  fontSize: 10,
};

export const CenterText = {
  marginTop: '50%',
  textAlign: 'center',
  fontSize: 30
}

export const InputField = {
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 24,
  textAlign: 'center',
  width:'90%',
  marginBottom: 15,

}
export const InputWrapper = {
  flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2e64e515'
}
export const AddImage = {
  width: '100%',
    height: 250,
    marginBottom: 15,
}
export const SubmitBtn = {
  flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#2e64e515',
    borderRadius: 5,
    padding: 10
}
export const SubmitBtnText = {
  fontSize: 18,
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
    color: '#2e64e5',
}
export const StatusWrapper = {
  justifyContent: 'center',
    alignItems: 'center'
}

export const errorCode = {
  textAlign: 'center',
  color: 'red',
  marginTop: 20
}