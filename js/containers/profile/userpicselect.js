import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GetUser } from "../../actions/passport";
import { changeUserPic } from '../../lib/api';
import ImagePicker from 'react-native-image-crop-picker';

const win_W = Dimensions.get('window').width;

class UserpicSelect extends Component {

    constructor(props){
        super(props);
        this.state = {data:[]};
        this.cursor = null;
        this.hasMore = true;
        this._images();
    }

    // _listPush = ()=>{
    //     CameraRoll.getPhotos({first:28,after:this.cursor,mimeTypes:['image/jpeg']}).then((data)=>{
    //         this.setState(pre=>({data:pre.data.concat(data.edges)}));
    //         this.hasMore = data.page_info.has_next_page;
    //         this.cursor = data.page_info.end_cursor;
    //
    //     })
    // };

    _images = ()=>{
        console.log(ImagePicker)
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
        });
    };

    _uploadImg = (img)=>{
        let uid = this.props.navigation.state.params.uid;
        changeUserPic({uid,img},
            (uri)=>{
                this.props.GetUser({pic:uri.file});
                this.props.navigation.goBack(null);
            }
        );
    };

    render(){
        return(
            <FlatList
                style={{marginHorizontal:3,flex:1}}
                data={this.state.data}
                numColumns={4}
                ListHeaderComponent={<View style={{height: 10}}/>}
                ListFooterComponent={<View style={{height: 10}}/>}
                onEndReachedThreshold={0.95}
                onEndReached={()=>{
                    if(this.hasMore){
                        this._listPush()
                    }
                }}
                keyExtractor={(item, index) => item.node.timestamp+'s'+index}
                renderItem={({item}) =>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this._uploadImg(item.node.image)}>
                        <View>
                            <Image style={styles.img} source={{uri:item.node.image.uri}} />
                        </View>
                    </TouchableOpacity>
                }
            />
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetUser: bindActionCreators(GetUser,dispatch)
    }
};
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(UserpicSelect);

const styles = StyleSheet.create({
    img: {
        width: (win_W-22)/4,
        height: (win_W-22)/4,
        margin: 2,
    }
});