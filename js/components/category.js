import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';


export default class Category extends Component {

    _itemRender(){
        let count = 10;
        let item_w = (Dimensions.get('window').width-10)/5*0.7;
        let item_s = (Dimensions.get('window').width-10)/5*0.3/2;
        let items = [];
        for (let i=0;i<count;i++){
            items.push(
                <CateItem key = {i}
                          id = {i}
                          _w = {item_w}
                          _s = {item_s}
                />
            )
        }
        return items;
    }

    render(){
        let items = this._itemRender();
        return (
            <View style={styles.itemlist}>
                {items}
            </View>
        )
    }

}

class CateItem extends Component {

    constructor(props){
        super(props);
    }

    render(){
        let _w = this.props._w;
        let _s = this.props._s;
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.chooseItem(this.props.id)} >
                <View style={{marginLeft:_s,marginRight:_s,marginBottom:5,}}>
                    <Image style={{width:_w,height:_w}} source={require('../../res/item.png')} />
                    <Text style={styles.title}>React{this.props.id}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    chooseItem(id){
        alert('点选了： React'+id)
    }

}

const styles = StyleSheet.create({
    itemlist: {
        flexDirection: 'row',
        flexWrap:'wrap',
    },
    title: {
        color:'#333',
        lineHeight:12,
        fontSize:12,
        textAlign:'center'
    }
});