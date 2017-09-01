import React,{ Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

export default class Search extends Component {
    constructor(props){
        super(props);
        this._opacity = true;
    }

    _changeStyle(y){
        if(y<125&&!this._opacity) {
            this._setProps(0.5,'transparent');
            this._opacity = true;
        }
        if(y>125&&y<130) this._setProps(0.6,'transparent');
        if(y>130&&y<135) this._setProps(0.6,'#fff');
        if(y>135&&y<140) this._setProps(0.7,'#fff');
        if(y>140&&y<145) this._setProps(0.8,'#fff');
        if(y>145&&y<150) this._setProps(0.9,'#fff');
        if(y>150&&this._opacity) {
            this._setProps(1,'#fff');
            this._opacity = false;
        }

    }
    _setProps(opa,back){
        this.main.setNativeProps({
            style: {
                opacity:opa,
                backgroundColor:back,
            }
        });
    }

    render(){

        return (
            <View
                ref={(view)=>this.main=view}
                onPress={this.props.goSearch}
                style={[{
                    opacity: 0.5
                }, styles.main]}>
                <TouchableOpacity
                    style={styles.searchbox}
                    activeOpacity={1}
                    onPress={()=>{
                    this.props.goSearch();
                }} >
                    <View style={styles.searchbox}>
                        <Text style={styles.text}>
                            搜索热门内容
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    main: {
        flexDirection:'row',
        paddingTop: Platform.OS === 'ios' ? 10 : 0,
        height:Platform.OS === 'ios' ? 58 : 58,
        alignItems: 'center',
        zIndex:999,
        top:0
    },
    searchbox: {
        height: 30,
        flexDirection: 'row',
        flex: 1,
        borderRadius: 15,
        backgroundColor: '#eee',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    text:{
        paddingTop: 0,
        paddingBottom:0,
        flex:1,
        height:30,
        lineHeight: 30,
        fontSize:14,
        textAlign: 'center',
        textAlignVertical:'center',
        flexDirection:'row',

    },
});