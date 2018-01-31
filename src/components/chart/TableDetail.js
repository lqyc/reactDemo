import React, { Component, PropTypes } from 'react'

const detailList=[
'4568790987','新购／续费','团队版年费套餐包\r\n团队版机器人*1\r\n知识库*1\r\n群数据*1','5','￥550/月','12','￥2750.00'
]
const refundList=[
'4568790987','新购／续费','团队版年费套餐包\r\n团队版机器人*1\r\n知识库*1\r\n群数据*1','5','￥550/月','12','￥2750.00','审核中','2017/12/03','8个月','￥2750.00'
]
export default class TableDetail extends Component{
  constructor(props) {
        super(props);
    }
  render(){
  	let {state}=this.props
  	let thead=[];
  	if(state=='REFUND'){
			 thead=['订单号','订单类型','订单详情','数量（个）','单价（元）','时长（月）','付款（元）','退款状态','申请时间','退款时长','退款金额（元）']
		}else{
			 thead=['订单号','订单类型','订单详情','数量（个）','单价（元）','时长（月）','总计（元）']
		}
		
  	return(
  		<div className="detailWrap">
  		  <table  >
  		    	 <thead>
                    <tr className="theadName textCenter">
		  		    {thead.map((data,id)=>
		                  <td key={id}>{data} </td>
		  		    )}
                    </tr>
                </thead>
                <tbody>
                <tr>
                  { state=='REFUND'?
                   refundList.map((data,index)=>{
                  	return <td key={index} className="textCenter refundListTd">{data}</td>})
                  :detailList.map((data,index)=>
                  	 <td key={index} className="textCenter detailListTd">{data}</td>
                  	)
                  }
                  </tr>
                </tbody>
              </table>
  		</div>
  		)
  }
}