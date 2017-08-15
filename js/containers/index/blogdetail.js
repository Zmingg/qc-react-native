import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    ScrollView,
    Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { GetItem } from '../../actions/action'

import textTrans from '../../lib/textTrans'

const win_H = Dimensions.get('window').height;

class BlogDetail extends Component {
    static navigationOptions = {
        tabBarVisible: false,
    };

    constructor(props){
        super(props);
        this.state = { blog:[] };
        props.GetItem(props.navigation.state.params.id).then(()=>{
            this.setState({ blog:this.props.item })
        })
    }


    _renderTags(arr){
        if((typeof arr)!=='object'){
            return;
        }
        let items=[];
        for(let i=0; i<arr.length; i++){
            items.push(
                <Text key={i} style={styles.tag}>{arr[i]}</Text>
            )
        }
        return items;
    }

    _renderContent(text){
        if((typeof text)!=='string'){
            return;
        }
        return textTrans(text);
    }

    render(){
        const blog = this.state.blog;
        const tags = this._renderTags(blog.tagsarr);
        const content = this._renderContent(blog.content);
        return (
            <ScrollView style={styles.back}>
                <View style={styles.container}>
                    <Text style={styles.title}>{blog.title}</Text>
                    <View style={styles.tags}>
                        {tags}
                    </View>
                    {content}
                </View>

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#fff',
    },
    container: {
        padding:10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    tags: {
        flexDirection: 'row'
    },
    tag: {
        padding: 5,
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        item: state.getItem.item
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        GetItem:bindActionCreators(GetItem,dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogDetail);

