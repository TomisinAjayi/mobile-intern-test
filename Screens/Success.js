import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyledContainer,
    InnerContainer,
    Header,
    PageTitle,
    SuccessContainer
} from '../components/styles';


const Success = ({navigation}) => {
    return(
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <Header>
                    <PageTitle onPress={() => navigation.navigate('Login')}>moneyrise</PageTitle>
                </Header>

                <SuccessContainer>
                    Welcome to moneyrise.
                    You've successfully logged in.
                </SuccessContainer>
            
            </InnerContainer>
        </StyledContainer>
    );
};

export default Success;