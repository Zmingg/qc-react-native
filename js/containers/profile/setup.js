import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { SignOut } from "../../actions/passport";

class SignOutButton extends Component {
    render(){
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={this.props.signout}>
                <View style={styles.signout}>
                    <Text style={styles.signout_text}>退出登录</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
class OptionItem extends Component {
    render(){
        return(
            <View style={styles.option}>
                <Text style={styles.option_title}>{this.props.title}</Text>
                <Text style={styles.option_prompt}> ></Text>
            </View>
        )
    }
}
const OptionLine = ()=>(
    <View style={styles.option_line}/>
);


class Setup extends Component {
    static navigationOptions = {
        title: '设置',
        tabBarVisible: false,
    };
    _signout = ()=>{
        this.props.SignOut();
        this.props.navigation.navigate('Profile');const navigateAction = NavigationActions.navigate({
            routeName: 'Profile',
            action: NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Index'})
                ]
            })
        });
        this.props.navigation.dispatch(navigateAction);
    };

    render(){
        return(
            <View style={styles.main}>
                <OptionItem title="关于我们"/>
                <OptionLine/>
                <OptionItem title="清除缓存"/>
                {(this.props.isAuth)?
                    <SignOutButton signout={this._signout}/>
                :null}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        SignOut:bindActionCreators(SignOut,dispatch)
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Setup);

const styles = StyleSheet.create({
    main: {
        marginTop: 40,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        backgroundColor:'#fdfdfc'
    },
    option_title: {
        fontSize: 15,
    },
    option_line: {
        height: 0.5,
        backgroundColor: '#ddd',
    },
    signout: {
        marginTop: 30,
        marginHorizontal: 10,
        height: 45,
        backgroundColor: '#ee0000',
        justifyContent: 'center',
    },
    signout_text: {
        textAlign: 'center',
        fontSize: 18,
        color: '#eee',
    }
});