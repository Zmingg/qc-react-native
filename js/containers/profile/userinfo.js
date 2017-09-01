import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
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



class UserInfo extends Component {
    static navigationOptions = {
        title: '个人资料',
    };

    _changePic = ()=>{
        this.props.navigation.navigate('UserpicSelect',{uid:this.props.user.id})
    };

    render(){
        let user = this.props.user;
        return(
            <View style={{flex:1}}>

                <TouchableOpacity style={styles.header} activeOpacity={1} onPress={this._changePic}>
                    <Image style= {styles.userpic} source={{ uri: 'http://zmhjy.xyz'+user.pic }}/>
                    <Image style={[styles.userpic,{marginTop:-60}]} source={require('../../../res/userpic_shadow.png')}/>
                    <Text style={styles.changePicText}>更改头像</Text>
                </TouchableOpacity>

                <View>
                    <OptionItem name="昵称"/>
                    <OptionPadding/>
                    <OptionItem name="性别"/>
                    <OptionPadding/>
                    <OptionItem name="生日"/>
                    <OptionPadding/>
                    <OptionItem name="居住地"/>
                </View>
                <View style={{marginTop:10,}}>
                    <OptionItem name="简介"/>
                    <OptionPadding/>
                    <OptionItem name="标签"/>
                </View>

            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

export default connect(mapStateToProps)(UserInfo);

const styles = StyleSheet.create({
    header: {
        width:win_W,
        height:120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fdfdfc'
    },
    userpic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 0.3,
        borderColor: '#999'
    },
    changePicText: {
        height: 15,
        fontSize: 10,
        marginTop: -20,
        backgroundColor: 'transparent',
        color: '#eee',
    },
    signInText: {
        height: 18,
        fontSize: 15,
        color: '#666',
    },
    username: {
        marginTop: 5,
        fontSize: 18,
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