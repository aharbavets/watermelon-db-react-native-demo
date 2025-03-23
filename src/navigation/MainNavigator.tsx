import React from 'react'
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native'
import CreateNoteScreen from '../screens/CreateNoteScreen/CreateNoteScreen.tsx';
import {createStackNavigator} from '@react-navigation/stack'

export type RootStackParamList = {
    MainStack: undefined
}

export enum Modals {}

export enum Screens {
    CreateNote = 'CreateNote',
}

export type ScreenParamList = {
    [Screens.CreateNote]: undefined
}

const RootStack = createStackNavigator<RootStackParamList>()
const MainStack = createStackNavigator<ScreenParamList>()
export const mainNavigationRef = createNavigationContainerRef()

export const MainNavigator: React.FC = () => {
    const MainStackScreen = () => {
        return (
            <MainStack.Navigator initialRouteName={Screens.CreateNote}>
                <MainStack.Screen
                    name={Screens.CreateNote}
                    component={CreateNoteScreen}
                    options={{headerShown: false, gestureEnabled: false}}
                />
            </MainStack.Navigator>
        )
    }

    return (
        <NavigationContainer ref={mainNavigationRef}>
            <RootStack.Navigator>
                <RootStack.Screen
                    name="MainStack"
                    component={MainStackScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
