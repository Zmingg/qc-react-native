import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

const win_W = Dimensions.get('window').width;

class OptionItem extends Component {
    render(){
        return(
            <View style={styles.option}>
                <Text style={styles.option_title}>{this.props.name}</Text>
                <Text style={styles.option_prompt}>{this.props.prompt}   ></Text>
            </View>

        )
    }
}

const OptionPadding = ()=>(
    <View style={styles.option_padding}/>
);

class SignIn extends Component{
    render(){
        return (
            <TouchableOpacity style={styles.header} activeOpacity={1} onPress={this.props.signIn}>
                <ImageBackground style={styles.header} source={require('../../../res/profile_headbg.jpg')}>
                    <Image style={styles.userpic} source={require('../../../res/user-nosign.jpg')}/>
                    <Text style={styles.signInText}>点击登录</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

class UserHeader extends Component{
    render(){
        let user = this.props.user;
        return(
            <TouchableOpacity activeOpacity={1}  onPress={this.props.userInfo}>
                <ImageBackground style={styles.header} source={require('../../../res/profile_headbg.jpg')}>
                    <Image style={styles.userpic} source={{ uri: 'http://zmhjy.xyz'+user.pic }}/>
                    <Image style={{width:15,height:15,marginTop:-10,left:27.5}} source={require('../../../res/brush.png')}/>
                    <Text style={styles.username}>{ user.nickname }</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

class Profile extends Component {
    static navigationOptions = {
        title: '个人中心',
        header: null
    };

    _isSignIn = ()=>{
        return this.props.isAuth;
    };

    _setup = ()=>{
        this.props.navigation.navigate('Setup');
    };

    _userInfo = ()=>{
        this.props.navigation.navigate('UserInfo');
    };

    _signIn = ()=>{
        this.props.navigation.navigate('SignIn',{backKey: this.props.navigation.state.key})
    };

    render(){
        return(
            <View>
                <View style={{justifyContent:'flex-end',alignItems:'flex-end',height:50,marginRight:15,zIndex:10}}>
                    <TouchableOpacity activeOpacity={0.5}  onPress={this._setup}>
                    <Image style={{width:30,height:30}} source={require('../../../res/setup.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:-50}}>
                {this._isSignIn()
                    ?<UserHeader userInfo={this._userInfo} user={this.props.user}/>
                    :<SignIn signIn={this._signIn}/>
                }
                </View>



                <View style={{marginTop:10,}}>
                    <OptionItem name="我的收藏"/>
                    <OptionPadding/>
                    <OptionItem name="我的关注"/>
                </View>
                <View style={{marginTop:10,}}>
                    <OptionItem name="最近浏览"/>
                    <OptionPadding/>
                    <OptionItem name="夜间模式"/>
                    <OptionPadding/>
                    <OptionItem name="账号设置" prompt="个人信息设置更改"/>
                </View>
                <View style={{marginTop:10,}}>
                    <OptionItem name="意见反馈"/>
                    <OptionPadding/>
                    <OptionItem name="版本信息"/>
                </View>

            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
    header: {
        width:win_W,
        height:win_W/2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    userpic: {
        width: 60,
        height: 60,
        borderRadius: 30,

    },
    username: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#eee',
    },
    signInText: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#eee',
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
        paddingHorizontal: 20,
        backgroundColor:'#fdfdfc'
    },
    option_padding: {
        height: 0.2,
        backgroundColor: '#ddd',
    },
    option_title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    option_prompt: {
        fontSize: 12,
    }

});