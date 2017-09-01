import React, { Component } from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Image,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { ReceivePassport,GetUser } from "../../actions/passport";
import { requestPassport,getUser } from "../../lib/api";

class SignIn extends Component {
    static navigationOptions = {
        header: null,
        tabBarVisible: false,
    };

    constructor(props){
        super(props);
        this.state = {email:'',pass:''}
    }

    _signin = ()=>{
        requestPassport({email:'157679749@qq.com',pass:'blank1987'},
            (json)=>{
                this.props.ReceivePassport(json);
                this._getUser();
            },
            (err)=>{
                console.log(err)
            }
        );
    };

    _getUser = ()=>{
        getUser(this.props.token,
            (json)=>{
                this.props.GetUser(json);
                const navigateAction = NavigationActions.navigate({
                    routeName: 'Profile',
                    action: NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Index'})
                        ]
                    })
                });
                this.props.navigation.dispatch(navigateAction);
            },
            (err)=>{
                console.log(err)
            }
        )

    };

    render(){
        return (
            <View style={styles.main}>
                <Image style={styles.logo} source={require('../../../res/item.png')}/>
                <TextInput
                    style={styles.input}
                    placeholder="邮箱/用户名"
                    onChangeText={(text)=>this.setState({email:text})}
                />
                <TextInput
                    style={styles.input}
                    placeholder="密码"
                    onChangeText={(text)=>this.setState({pass:text})}
                />
                <TouchableOpacity activeOpacity={0.9} onPress={this._signin}>
                    <View style={styles.signin}>
                        <Text style={styles.signtext}>登 录</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.other}>
                    <Text style={{fontSize:12,color:'#666'}}>忘记密码</Text>
                    <View style={{width:1,height:10,marginHorizontal:5,backgroundColor:'#ccc'}} />
                    <Text style={{fontSize:12,color:'#666'}}>快速注册</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.passport
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ReceivePassport: bindActionCreators(ReceivePassport,dispatch),
        GetUser: bindActionCreators(GetUser,dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);

const styles = StyleSheet.create({
    main: {
        flex:1,
        justifyContent: 'center',
        backgroundColor: '#fefefd',
    },
    logo: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        marginBottom: 40,
    },
    input: {
        marginBottom: 10,
        marginHorizontal: 15,
        height: 30,
        borderBottomWidth: 0.2,
        fontSize: 13,
    },
    signin: {
        backgroundColor: '#e9ffe3',
        marginVertical: 15,
        marginHorizontal: 15,
        height: 40,
        borderRadius: 20,
        borderWidth: 0.3,
        borderColor: '#66de7a',
    },
    signtext: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
        lineHeight: 40,
        color: '#23de4c',
    },
    other: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }


});