import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    TextInput,
    View,
    FlatList
} from 'react-native';
import { NavigationActions} from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { GetSearch } from "../../actions/action";

class Search extends Component {
    static navigationOptions = {
        header: null,
        tabBarVisible: false,
    };

    constructor(props){
        super(props);
        this.state = {
            text: '',
            items: []
        };
    }

    _goBack(){
        if(this.state.items.length===0){
            this.props.navigation.dispatch(NavigationActions.back())
        } else {
            this.setState({items:[],text:''});
        }

    }

    _search(){
        this.props.GetSearch(this.state.text).then(()=>{
            this.setState({items:this.props.items})
        });

    }
    _renderTags(arr){
        let tags = [];
        for(let i=0;i<arr.length;i++){
            tags.push(
                <Text key={i} style={styles.tag}>{arr[i]}</Text>
            )
        }
        return(
            <View style={styles.meta}>
                {tags}
            </View>
        )
    }

    _goPage(id){
        this.props.navigation.navigate('Detail', {id:id});
    }

    render(){
        return(
            <View>
                <View style={{
                    flexDirection:'row',
                    paddingTop: Platform.OS === 'ios' ? 10 : 0,
                    height:Platform.OS === 'ios' ? 68 : 58,
                    alignItems: 'center',
                    zIndex:999,
                    top:0
                }}>
                    <View style={styles.searchbox}>
                        <TextInput style={styles.inputText}
                                   keyboardType='web-search'
                                   underlineColorAndroid='transparent'
                                   placeholder='搜索...'
                                   autoFocus={true}
                                   onChangeText={(text)=>{
                                       this.setState({text:text})
                                   }}
                                   onSubmitEditing={()=>{
                                        this._search()
                                   }}
                                   value={this.state.text}
                        />
                    </View>
                    <TouchableOpacity  style={styles.button}
                        onPress={()=>this._goBack()}
                    >
                        <Text style={styles.text}>取消</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.list}
                    data={this.state.items}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({item}) =>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._goPage(item.id)}} >
                            <View style={styles.item}>
                                <Image style={styles.img} source={{uri:'http://zmhjy.xyz/'+item.thumb_img}} />
                                <View style={{flex:1,marginLeft:10,justifyContent:'space-between'}}>
                                    <Text style={styles.title}  numberOfLines={1}>{item.title}</Text>
                                    <Text style={styles.abstract} numberOfLines={1}>{item.abstract}</Text>
                                    {this._renderTags(item.tagsarr)}
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    ItemSeparatorComponent={()=>
                        <View style={{
                            height: 5,
                        }}
                        />
                    }
                />

            </View>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.getSearch.items,
        hasMore: state.getSearch.hasMore
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        GetSearch:bindActionCreators(GetSearch,dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);


const styles = StyleSheet.create({
    searchbox: {
        height:30,
        flexDirection: 'row',
        flex:1,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
    },
    inputText:{
        paddingTop:0,
        paddingBottom:0,
        flex:1,
        height:30,
        fontSize:14,
        textAlign:'center',
        textAlignVertical:'center',
    },
    button: {
        width:50,marginRight:20,
    },
    text: {
        flex:1,
        textAlign: 'right',
        textAlignVertical: 'center',
        fontSize:15,
        color: '#ee2800'
    },

    list: {
        marginBottom: 58,
        zIndex:0,
    },
    item: {
        height:77,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:5,
        backgroundColor: '#fff'
    },
    img: {
        width:120,
        height:67.5
    },
    title: {
        flex:1,
        marginTop: 5,
        color: '#333',
        fontSize: 13,
        lineHeight: 15,
    },
    abstract: {
        flex:2,
        fontSize: 10,
        lineHeight: 12,
        textAlignVertical: 'center',
    },
    meta: {
        flex:1,
        marginBottom: 5,
        flexDirection: 'row',
    },
    tag: {
        fontSize: 10,
        lineHeight: 12,
        textAlignVertical:'center',
        textAlign:'center',
        fontStyle: 'italic',
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 2,
        paddingRight: 2,
        marginRight: 3,
        backgroundColor: '#555',
        color: '#fff'
    }

});