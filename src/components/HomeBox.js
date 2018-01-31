import React, { Component, PropTypes } from 'react'
import {animationDatas} from '../constants/DataModel'
import CartoonWrapper from './CartoonWrapper'
import SlidersWraper from './SlideBox'
import NavigationBar from './NavigationBar'

const animationBox=animationDatas.map((item)=>
   <CartoonWrapper imgUrls={item.imgArr} animation = {item.animation}
title = {item.title}
canvasBoxStyle = {item.canvasBoxStyle}
text = {item.text} />
	)

export default class HomeBox extends Component{
  // static propTypes = {
  //   actions: PropTypes.object.isRequired
  // }
  // constructor(props){
  //   super(props)
  // }
  state = {
    screenWidth: document.documentElement.clientWidth
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
            <SlidersWraper screenWidth = {this.state.screenWidth}
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