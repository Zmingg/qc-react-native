import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    BackHandler,
    ToastAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Search from '../../components/searchbar';
import ImagesBox from '../../components/imagesbox';
import { GetList } from '../../actions/action'

class Index extends Component {
    static navigationOptions = {
        title: '清尘居',
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {blogs:[],hasMore:true,isLoading:false,isRefreshing:false};
        this.page = 1;

    }

    componentDidMount(){
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
        }
    }

    componentWillUnmount(){
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
        }
        this.props.navigation.navigate('Home');
    }

    _foundRoute = ()=>{
        let nav = this.props.nav;
        let tab = nav.routes[nav.index];
        return tab.routes[tab.index].routeName;
    }

    _onBackAndroid = ()=>{

        let routeName = this._foundRoute();

        if(routeName!=='Index') {
            console.log(routeName)
            this.props.navigation.goBack(null);
            return true;
        }
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，退出
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;



     };





    _disableScroll = ()=>{
        this.list.getScrollResponder().setNativeProps({
            scrollEnabled : false
        })
    }
    _enableScroll = ()=>{
        this.list.getScrollResponder().setNativeProps({
            scrollEnabled : true
        })
    }

    _pushBlog = ()=>{
        if(this.state.hasMore&&!this.state.isLoading){
            this.setState({isLoading:true});
            this.props.GetList(this.page++).then(()=>{
                this.setState((pre)=>({
                    blogs: pre.blogs.concat(this.props.blogs)
                }));
                this.setState({
                    isLoading:false,
                    hasMore:this.props.hasMore
                });
            });
        }
    }

    _loading = ()=>{
        if(this.state.isLoading){
            return(
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={[styles.centering, {height: 30}]}
                        size="small"
                    />
                    <Text style={{lineHeight:18,textAlignVertical:'center',fontSize:13,marginLeft:8}} onPress={()=>this._pushBlog()}>正在加载中</Text>
                </View>
            )
        }else {
            return (
                <View/>
            )
        }

    }


    _goPage = (id)=>{
        this.props.navigation.navigate('Detail', {id:id});

    }

    _goSearch = ()=>{
        this.props.navigation.navigate('Search');
    }

    _renderTags = (arr)=>{
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

    render() {
        return (
            <View>
                <Search
                    ref={(ser)=>{this.search=ser}}
                    goSearch={()=>this._goSearch()}/>

                <FlatList
                    onScroll={(e)=>{
                        this.search._changeStyle(e.nativeEvent.contentOffset.y)
                    }}
                    refreshing={this.state.isRefreshing}
                    style={styles.list}
                    ref={(list)=>{this.list=list}}
                    ListHeaderComponent={
                    <View>
                        <ImagesBox
                            navigation={this.props.navigation}
                            disableScroll={()=>this._disableScroll()}
                            enableScroll={()=>this._enableScroll()}
                        />
                        <View style={{
                            paddingTop: 10,
                        }}/>
                    </View>
                    }
                    ListFooterComponent={()=>this._loading()}
                    data={this.state.blogs}
                    keyExtractor={(item, index) => item.id}
                    onEndReached={()=>{
                        this._pushBlog();
                    }}
                    onEndReachedThreshold={0.1}
                    renderItem={({item}) =>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>this._goPage(item.id)} >
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
                            margin: 5,
                            height: 0.5,
                            backgroundColor: '#ddd'
                            }}
                        />
                    }
                />
            </View>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        blogs: state.getList.items,
        hasMore: typeof state.getList.hasMore==='boolean'?state.getList.hasMore:true,
        nav: state.nav
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        GetList:bindActionCreators(GetList,dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);

const styles = StyleSheet.create({
    icon: {
        width:30,
        height:30
    },
    list: {
        backgroundColor: '#fdfdfc',
        top:-58,
        zIndex:0,
    },
    item: {
        height:70,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:5,
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