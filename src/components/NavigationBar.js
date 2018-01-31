import React, { Component, PropTypes } from 'react'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Link } from 'react-router-dom'

const Menu=({current}) => {
	return(
           <div style = {{padding:'0 60px 0 100px',float:'right',height:'60px'}}>
		      <ul className="navList clearfix" style={{width:'100%',height:'60px',listStyle:'none',color:'#288bf2'}}>
		      <li><Link to='/' style = {{
		        textDecoration : 'none',
		        color : current==='/'?'#fffe66':'#fff',
		        fontFamily:current==='/'?'PingFangSC-Semibold':'PingFangSC-Light'
		      }} >首页</Link></li>
		      <li><Link to='/about' style = {{
		        textDecoration : 'none',
		        color : current==='about'?'#fffe66':'#fff',
		        fontFamily:current==='about'?'PingFangSC-Semibold':'PingFangSC-Light'
		        }}>表单</Link></li>
		         <li><Link to='/chart' style = {{
		        textDecoration : 'none',
		        color : current==='chart'?'#fffe66':'#fff',
		        fontFamily:current==='chart'?'PingFangSC-Semibold':'PingFangSC-Light'
		        }}>图表</Link></li>
		      </ul>
		    </div>
		)
}

const NavigationBar =({current})=>{
		return(
			<div className="NavigationBar colorBlue"> 
				<div className="logoImg left">
				  <img src="./image/robots.png"/>
				   React 
				</div>
                <div className=" navList">
                   <Menu  current={current}/>
                </div>
			</div>
			)
}
NavigationBar.PropTypes={
  current: PropTypes.string.isRequired
}
export default NavigationBar
