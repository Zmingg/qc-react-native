import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StackNavigator,TabNavigator,addNavigationHelpers } from 'react-navigation';
import { Image } from 'react-native';
import Index from '../containers/index/index';
import BlogDetail from '../containers/index/blogdetail';
import Search from '../containers/index/search';
import Profile from '../containers/profile/profile';
import UserInfo from '../containers/profile/userinfo';
import UserpicSelect from '../containers/profile/userpicselect'
import SignIn from '../containers/profile/signin';
import Setup from '../containers/profile/setup';



const HomeStack = StackNavigator({
    Index: {
        screen: Index,
    },
    Detail: {
        path: 'blog/:id',
        screen: BlogDetail,
    },
    Search: {
        screen: Search,
        mode: 'modal',
        navigationOptions: {
            header: null,
        }
    }
},{
    initialRouteName: 'Index',
});

const ProStack = StackNavigator({
    Index: {
        screen: Profile,
    },
    Setup: {
        screen: Setup,
    },
    UserInfo: {
        screen: UserInfo,
    },
    UserpicSelect: {
        screen: UserpicSelect,
    },
    SignIn: {
        screen: SignIn,
    }
},{
    initialRouteName: 'Index',
});

export const Nav = TabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions : {
            tabBarLabel: '推荐',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../../res/home_icon.png')}
                    style={[{width:25,height:25}, {tintColor: tintColor}]}
                />
            ),
        }
    },
    Profile: {
        screen: ProStack,
        navigationOptions : {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../../res/mine_icon.png')}
                    style={[{width:25,height:25}, {tintColor: tintColor}]}
                />
            ),
        }
    },
}, {
    initialRouteName: 'Home',
    tabBarPosition:'bottom',
    swipeEnabled: false,
    tabBarOptions: {
        inactiveTintColor: '#333',
        activeTintColor: '#ee3300',
        showIcon:true,
        showLabel:true,
        labelStyle: {
            fontSize: 10,
            margin:0,
        },
        iconStyle: {
            width: 25,
            height: 25
        },
        style: {
            backgroundColor: '#eee',
            height: 50
        },
    },
});


const AppWithNavigationState = ({ dispatch, nav }) => (
    <Nav navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = (state={}) => ({
    nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);

// export default Nav;