import React, { Component, PropTypes } from 'react'
import TableDetail from './TableDetail'
const HeadTitle = ({state}) => {
	var tip;
    switch(state){
    case 'NOT_PAY':  tip='剩余 3天12小时03分22秒，请在 2017/12/03 前完成支付，超时未支付订单将被关闭。';break;
    case 'PAST_DUE':  tip='您的订单由于长时间未支付已过期，若仍需购买请点击重新下单。';break;
    case 'CANCEL':  tip='您的订单已取消，若仍需购买请点击重新下单。';break;
    case 'PAYED':  tip='您订单内的资源尚在分配中，分配成功后可前往控制台查看并使用您的资源。';break;
    case 'REFUND':  tip='您订单的退款申请正在审核中。';break;
    default:break;
    }

	return(
		<div className="header">
			      <span className="title">订单详情</span>
			      <span className="tip">{tip}</span>
	    </div>
		)
}

export default class OrderDetail extends Component{
    constructor() {
         super();
         this.state={
         	state:'REFUND'
         }
     }

	render(){
		let {state}=this.state
		console.log(state)
		return(
			<div className="orderDetail">
			   <HeadTitle state={state}/>
			   <TableDetail state={state}/>
			</div>
			)
	}
}