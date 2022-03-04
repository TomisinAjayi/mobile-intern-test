import React, { useState, createRef } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Formik } from 'formik';
import {
    StyledContainer,
    InnerContainer,
    Header,
    PageTitle,
    SubTitle,
    StyledFormArea,
    RightIcon,
    StyledTextInput,
    Colors,
    MsgBox,
    ErrorText,
    CheckboxContainer,
    CheckboxLabel,
    StyledButton,
    ButtonText,
    ForgotPassword,
    ForgotPasswordContent,
    Footer,
    FooterText,
    Help,
    Here
} from '../components/styles';
import { View, Keyboard, Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as EmailValidator from "email-validator";
const { white, inputPlaceholder, black } = Colors;

const Login = ({navigation}) => {
    const [ hidePassword, setHidePassword ] = useState(true);
    const [ checked, onChange ] = useState(true);

    const passwordInputRef = createRef();
    
    return(
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <Header>
                    <PageTitle onPress={() => navigation.navigate('Login')}>moneyrise</PageTitle>
                    <HamburgerIcon />
                </Header>
                <Formik
                    initialValues = {{email: '', password: ''}}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            console.log(values);
                            setSubmitting(false);
                        }, 500); 
                    }}
                    validate={values => {
                        let errors = {};
                        if (!values.email) {
                          errors.email = "Email Required";
                        } else if (!EmailValidator.validate(values.email)) {
                          errors.email = "Invalid email address.";
                        }
                    
                        if (!values.password) {
                          errors.password = "Password Required";
                        }                     
                        return errors;
                      }}
                >{({ handleBlur, handleChange, errors, touched, isSubmitting, values }) => 
                (<StyledFormArea>
                    <SubTitle>Sign in</SubTitle>
                    <MyTextInput 
                        placeholder="Email address"
                        placeholderTextColor={inputPlaceholder}
                        onChangeText={ handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        className={errors.email && touched.email && "error"}
                        onSubmitEditing={() =>
                            passwordInputRef.current &&
                            passwordInputRef.current.focus()
                        }
                        keyboardType="email-address"
                    />
                    {errors.email && touched.email && (
                        <MsgBox>
                            <ErrorText>{errors.email}</ErrorText>
                        </MsgBox>
                    )}
                    <MyTextInput 
                        placeholder="Password"
                        placeholderTextColor={inputPlaceholder}
                        onChangeText={ handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        className={errors.password && touched.password && "error"}
                        onSubmitEditing={Keyboard.dismiss}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                    />
                    {errors.password && touched.password && (
                        <MsgBox>
                            <ErrorText>{errors.password}</ErrorText>
                        </MsgBox>
                    )}
                    <CheckboxContainer>
                        <MyCheckBox 
                            checked={checked}
                            onChange={onChange}
                        />
                        <CheckboxLabel>Remember me</CheckboxLabel>
                    </CheckboxContainer>
                    <StyledButton disabled={isSubmitting}>
                        <ButtonText onPress={() => navigation.navigate('Success')}>
                            SIGN IN
                        </ButtonText>
                    </StyledButton>
                    <ForgotPassword>
                        <ForgotPasswordContent>I forgot my password</ForgotPasswordContent>
                    </ForgotPassword>
                </StyledFormArea>)}
                </Formik>
                <Footer>
                    <FooterText>If you find difficulty accessing your account, Get help</FooterText>
                    <Help>
                        <Here>here.</Here>
                    </Help>
                </Footer>
            
            </InnerContainer>
        </StyledContainer>
    );
};

const HamburgerIcon = () => {
    return (
        <TouchableOpacity>
            <Ionicons name="menu" size={26} color={ white } />
        </TouchableOpacity>
    );
}

const MyTextInput = ({ isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <StyledTextInput { ...props } />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={ hidePassword ? 'md-eye' : 'md-eye-off' } size={30} color={ white } />
                </RightIcon>
            )}
        </View>
    )
}
const MyCheckBox = ({ checked, onChange, activeIconProps, inactiveIconProps }) => {
    const iconProps = checked ? activeIconProps : inactiveIconProps;
    return (
        <Pressable
            style={ {backgroundColor: checked ? "white" : "white" }}
            onPress={() => onChange(!checked)}>
            {checked && <Ionicons name="checkmark" size={24} color={ black } { ...iconProps} />}

        </Pressable>
    );
}



export default Login;