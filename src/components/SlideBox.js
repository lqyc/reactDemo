import React, { Component, PropTypes } from 'react'

const CircleBar = ({chose,style}) => {
  return(
    style == 'blue' ?
    <div style={{postion:'relative',zIndex:1,height:'6px',width:'6px',borderRadius:'50%',background:'rgba(128,128,128,0.2)',margin:'10px auto'}}>
      <span style={{display:'block',postion:'absolute',zIndex:1001,left:0,top:0,width:'6px',height:'6px',borderRadius:'50%',background:'#C0E2FE',opacity:chose?1:0}}></span>
      <span></span>
    </div>  :
    <div style={{postion:'relative',zIndex:1,height:'6px',width:'6px',borderRadius:'50%',border:'solid 1px white',margin:'10px auto'}}>
      <span style={{display:'block',postion:'absolute',zIndex:1001,left:0,top:0,width:'6px',height:'6px',borderRadius:'50%',background:'white',opacity:chose?1:0}}></span>
      <span></span>
    </div>
  )
}

const FlipDots = ({targetIndex,item,style}) => {
  let arr = [false,false,false]
  arr[item] = true
  return (
    <div style={{position:'absolute',width:'60%',bottom:'56px',left:'20%',lineHeight:1,textAlign:'center',zIndex:10}}>
      <ul style={{display:'inline-block',listStyle:'none',margin:'0',padding:0}}>
        {arr.map((dot,i) =>
          <li key={i} style={{position:'relative',margin: '0 5px',width:'20px',height:'22px',float:'left',padding:0,cursor:'pointer'}}  onClick= { () => targetIndex(i)}>
            <CircleBar chose = {dot} style = {style} />
          </li>
        ) }
      </ul>
    </div>
  )
}

export const SlidersOuter = (props) => {
  const sliderMap = props.list
  const distance = {
    header: props.param.distance.header,
    inner: props.param.distance.inner,
    index: props.param.distance.index,
    volicity:props.param.distance.volicity,
    direction:props.param.distance.direction
  }
  const transition = distance.direction=='left'?[
    'all .7s ease-in-out ',
    'all 0s ease-in-out ',
    'all 0s ease-in-out ',
  ]:[
    'all .7s ease-in-out ',
    distance.index%3==0?'all 0s ease-in-out':'all .7s ease-in-out ',
    distance.index%3==0? 'all 0s ease-in-out '+'.7s' : 'all .7s ease-in-out ',
  ]
  const innerWraper = props.innerWraper
  // console.log((distance.index+1)%3);
  return (
    <div style = {{position:'absolute',verticalAlign: 'baseline',width:'100%',height:'100%',left:'0',top:'0',transform:'translate3d('+distance.header+'px,0,0)',transition:'all '+distance.volicity+' ease-in-out '}}>
     { sliderMap.map((item,i) =>
      <div  key={i} style = {{position:'absolute',width:'100%',height:'100%',left:'0',top:'0',overflowY:'hidden',willChange: 'transform',transform:'translate3d('+distance.inner[i]+'px,0,0)',transition:transition[i],background:'white'}}>
        {innerWraper[i]}
      </div>
    )}
   
    </div>
  )
}
export default class SlidersWraper extends Component {
  constructor(props){
    super(props)
  }
  state = {
    time: new Date(),
    index: 3,
    continuous: true, //是否循环滚动
    autoSlide: true,
    volicity: '.7s',
    direction: ''
  }
   componentDidMount(){
    const self = this
    this.timer = setInterval(function(){
      self.setState({
        ...self.state,
        time:new Date(),
        index: self.state.index + 1,
        volicity: '.7s',
        direction:'right'
      })
    },4000)
  }
    componentWillUnmount(){
       clearInterval(this.timer)
    }
    targetFlip(number){
    if((new Date() - this.state.time) > 400){
      const orinIndex = this.state.index > 3 ? Math.abs((this.state.index)%3) : this.state.index
      const v = (new Date() - this.state.time) > 700 ? '.7s' : (new Date() - this.state.time) > 500 ? '.5s' : '.3s'
      let targetIndex = number - orinIndex
      if(targetIndex==2){
        targetIndex = -1
      }
      if(targetIndex == -2){
        targetIndex = 1
      }

      console.log("index"+targetIndex+'---'+this.state.index + targetIndex)
      this.setState({
        ...this.state,
        time:new Date(),
        index: this.state.index + targetIndex,
        volicity: v,
        direction: targetIndex > 0 ? 'right' : 'left'
      })
    }
  }
  render(){
  	  const distance = this.props.screenWidth //移动距离
    const j = Math.floor((this.state.index + 1) / 3)
    const rate = Math.floor(this.state.index / 3)
    const o = - distance * this.state.index
    const p = distance * 3 * j
    const q = distance + rate * 3 * distance
    const r = 2 * distance + rate * 3 * distance
    const data = {
      header: o,
      inner: [p,q,r],
      index: this.state.index,
      volicity : this.state.volicity,
      direction:this.state.direction
    }

  	 return (
      <div style={{position:'absolute',width:'100%',height:'100%',overflowX:'hidden'}}>
        <SlidersOuter  list = {this.props.wraperList} param={{distance:data}} innerWraper = {this.props.innerWraper}/>
        <FlipDots targetIndex={this.targetFlip.bind(this)}  item={Math.abs((this.state.index)%3)} style = {this.props.style}/>
      </div>
    )
  }
}







