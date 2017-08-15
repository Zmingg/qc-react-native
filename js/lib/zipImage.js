import React from 'react';
import { ImageEditor } from 'react-native';


export default ZipImage = function(img){

    let uri = img.uri;
    let options = {
        offset: {x:0, y:0},
        size: {
            width: img.width,
            height: img.height,
        },
        displaySize: {
            width: 200,
            height: 200,
        },
        resizeMode: 'cover'
    };

    return new Promise(function (resolve,reject) {
        ImageEditor.cropImage(
            uri,
            options,
            (cur_uri)=>{
                return resolve(cur_uri);
            },
            (err)=>{
                return reject(err);
            }
        );
    })





}