import React, { Component, PropTypes } from 'react'

export default class QuickBox extends Component{
   constructor(props){
    	super(props);
   }

   render(){
   	let {quickTip,quickBtn,confirmHide}=this.props
   	return(
   		<div className=" maskBox">
            <div className="quickBox ">
               {!quickBtn?<div className='iconDel'><img src="./image/success.png"/></div>:''}
                 <div className="quickTip textCenter">
                    {quickTip}
                 </div>
               {quickBtn?<div className="quickBtnBox clearfix">
		                   {confirmHide?<div className=" quickBtn right borderBlue textCenter" onClick={this.props.hideQuickBox}>确定</div>:
		                                <div className=" quickBtn left borderBlue textCenter" onClick={this.props.delTableList}>确定</div>}
		                   {confirmHide?'':<div className=" quickBtn right borderBlue textCenter" onClick={this.props.hideQuickBox}>取消</div>}
		                </div>:''}
   		    </div>
   		</div>
   		)
   }
}