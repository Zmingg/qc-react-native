import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Dimensions,
} from 'react-native';

const win_W = Dimensions.get('window').width;
const left = -win_W;

export default class Imagesbox extends Component {

    constructor(props){
        super(props);
        this.datas = [
            {source:require('../../res/imgbox_01.jpg')},
            {source:require('../../res/imgbox_02.jpg')}
        ];
        this.state={left: new Animated.Value(-win_W)};
        this.count = this.datas.length;
        this.index = 1;
        this._makeItems();
    }


    componentDidMount(){
        this._autoPlay();
    }

    componentWillUnmount(){
        this._autoPlay(0);
    }

    _makeItems(datas=this.datas){
        datas.unshift(datas[datas.length-1]);
        datas.push(datas[1]);
        this.items = [];
        for(let i=0;i<datas.length;i++){
            this.items.push(
                <Image style={styles.img} key={i} source={datas[i].source}/>
            );
        }
    }

    _autoPlay(num=1){
        if(num===0){
            clearInterval(this.timeid);
            this.timeid = null;
        }else{
            this.timeid = setInterval(()=>{
                this._next();
            },3000)
        }

    }

    render(){
        let _x;
        let _y;
        let lastX;
        this.isMoving = false;
        return(
            <View
                onStartShouldSetResponder={(e)=>{
                    this.props.disableScroll();
                    _x=e.nativeEvent.pageX;
                    _y=e.nativeEvent.pageY;
                    lastX=e.nativeEvent.pageX;
                    return true;
                }}
                onResponderMove={(e)=>{
                    if(Math.abs(e.nativeEvent.pageX-_x)===0&&Math.abs(e.nativeEvent.pageY-_y)===0){
                        return;
                    }
                    if(this.isMoving===false&&Math.abs(e.nativeEvent.pageX-_x)<Math.abs(e.nativeEvent.pageY-_y)){
                        this.props.enableScroll();
                    }else {
                        this._autoPlay(0);
                        this.isMoving = true;
                        Animated.timing(
                            this.state.left,
                            {
                                toValue: -win_W*this.index+(e.nativeEvent.pageX-lastX),
                                duration: 0,
                            }
                        ).start();
                        lastX = e.nativeEvent.locationX;
                    }


                }}
                onResponderRelease={(e)=>{
                    if(this.isMoving){
                        this._autoPlay();
                        if(e.nativeEvent.pageX-_x>50){
                            this._prev()
                        }else if(e.nativeEvent.pageX-_x<-50){
                            this._next()
                        }else{
                            this._showByIndex(this.index);
                        }
                        this.isMoving = false;
                        this.props.enableScroll();
                    }

                }}
                style={styles.box}>
                <Animated.View
                    style={{
                        flexDirection:'row',
                        width: win_W*2,
                        left: this.state.left,
                    }}

                >
                    {this.items}
                </Animated.View>
            </View>
        )
    }

    _next(){
        this._showByIndex(++this.index);

    }

    _prev(){
        this._showByIndex(--this.index);
    }

    _showByIndex(index){
        if(index>this.count){
            Animated.sequence([
                Animated.timing(
                    this.state.left,
                    {
                        toValue: -win_W*(this.index),
                        duration: 500,
                    }
                ),
                Animated.timing(this.state.left,
                    {
                        toValue: -win_W,
                        duration: 0,
                    })
            ]).start();
            this.index=1;
        }else if(index<1){
            Animated.sequence([
                Animated.timing(
                    this.state.left,
                    {
                        toValue: -win_W*this.index,
                        duration: 500,
                    }
                ),
                Animated.timing(this.state.left,
                    {
                        toValue: -win_W*this.count,
                        duration: 0,
                    })
            ]).start();
            this.index = this.count;
        }else{
            Animated.timing(
                this.state.left,
                {
                    toValue: -win_W*(index),
                    duration: 500,
                }
            ).start();
        }

    }
}


const styles = StyleSheet.create({
    box: {
        width: win_W,
        height: win_W/7*3,

    },
    img: {
        width: win_W,
        height: win_W/7*3,
    }
});