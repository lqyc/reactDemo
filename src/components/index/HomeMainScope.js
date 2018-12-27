import React, { Component, PropTypes } from 'react'
import {animationDatas} from '../../constants/DataModel'
import CartoonBox from './CartoonBox'
import SliderBox from './SlideBox'
import NavigationBar from '../../components/NavigationBar'
import './animation.css'

const animationBox=animationDatas.map((item)=>
   <CartoonBox imgUrls={item.imgArr} animation = {item.animation}
title = {item.title}
canvasBoxStyle = {item.canvasBoxStyle}
text = {item.text} />
	)

export default class HomeMainScope extends Component{
  constructor(props){
    super(props)
  }
  state = {
    screenWidth: document.documentElement.clientWidth
  }
  componentDidMount() {
    window.document.title='canvas 动画'
  }
  // componentDidMount() {
  // 	 window.onresize = () => {
  //     this.setState({
  //       screenWidth: document.documentElement.clientWidth, //移动距离
  //     })
  //   }
  // }
 
  render(){
    const wallimgList = ['wallimg1','wallimg2','wallimg0']

  	return(
      <div className="homeBox">
        <NavigationBar current='/'/>
         <div className="section" style={{width:'100%',height:'590px'}}>
           <div  style={{width:'100%',height:'510px',position:'absolute'}}>
            <SliderBox screenWidth = {this.state.screenWidth}
           wraperList = {wallimgList}
           innerWraper = {animationBox}
           typeStyle = 'circle'
           style = 'blue'
           withButton = {false}/>
           </div>
         </div>
         </div>
  		)
  }
}