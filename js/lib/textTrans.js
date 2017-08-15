import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';

function textTrans(text) {
    const win_W = Dimensions.get('window').width;
    const res=[];
    let txt = text.replace(/\s*/g,'');
    txt = txt.replace(/&nbsp;/g,' ');
    txt = txt.replace(/&quot;/g,'"');
    txt = txt.replace(/&#39;/g,"'");
    txt = txt.replace(/&lt;/g,'<');
    txt = txt.replace(/&gt;/g,'>');

    txt = txt.replace(/<a.*?>(.*?)<\/a>/g,'$1');
    txt = txt.replace(/<span.*?>(.*?)<\/span>/g,'$1');
    txt = txt.replace(/<pre.*?>(.*?)<\/pre>/g,'$1\n');
    txt = txt.replace(/<p.*?>(.*?)<\/p>/g,'$1\n');

    txt = txt.replace(/<br\/>/g,'');
    txt = txt.replace(/<img[./s]*src=['"]{1}(.*?)['"]{1}.*?\/>/g,'<img>$1<img>');
    let arr = txt.split(/<img>/);

    for(let i=0; i<arr.length; i++){
        if(arr[i].indexOf('http')===0){
            res.push(
                <Image style={{width:win_W-20,height:win_W/2}} key={i} source={{uri:arr[i]}}/>
            );
        } else {
            res.push(
                <Text key={i}>{arr[i]}</Text>
            );
        }
    }

    return res;
}

export default textTrans;