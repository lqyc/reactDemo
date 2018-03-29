import React, { Component, PropTypes } from 'react'

const goods=[
{url:'/image/3.jpg',name:'北欧 ins 火烈鸟装饰画粉红色挂件图北欧 ins 火烈鸟装饰画粉红色',number:3},
{url:'/image/logo_lizicloud_web2.png',name:'烈鸟装饰画粉红色挂件图北欧 ins 火烈鸟装饰画粉红色',number:8},
{url:'/image/3.jpg',name:'画粉红色挂件 ins 火烈鸟装饰画粉红色挂件图北欧 ins 火烈鸟装饰画粉红色',number:5},
{url:'/image/liziLogo.png',name:'色挂件图北欧 ins 火烈鸟装饰画粉红色',number:4},
{url:'/image/icon_down.png',name:'北欧 ins 火烈鸟装饰画粉红色挂件图北欧 ins 火烈鸟装饰画粉红色',number:3},
{url:'/image/liziLogo.png',name:'北欧 ins 火烈鸟装饰画粉红色挂件图北欧 ins 火烈鸟装饰画粉红色',number:3},
{url:'/image/icon_down.png',name:'北欧 ins 火烈鸟装饰画粉红色挂件图北欧 ins 火烈鸟装饰画粉红色',number:3}
]
export default class GoodsRank extends Component {
  constructor(props) {
      super(props)
      this.state={
      	selled:true,
      	noData:false,
      	hasRefesh:true,
      	loadingMore:false
      }
      this.selloutData=this.selloutData.bind(this)
      this.bargainData=this.bargainData.bind(this)
  }
  selloutData(){
   this.setState({
   	selled:true 
   });
  }
  bargainData(){
   this.setState({
   	selled:false 
   });
  }
  render(){
  	const {date}=this.props
    let {selled,noData,hasRefesh,loadingMore}=this.state
  	return(
  		<div className="goodsRankWrap">
  		  <div className="title">
              <div className="left">{date}商品销售排行榜</div>
            <div className="right tabNav textCenter">
               <div className={selled?"navName left colorRed sellout":"navName left sellout"} onClick={this.selloutData}>销售件数</div>
               <div className={selled?"navName left ":"navName left colorRed"} onClick={this.bargainData}>成交额</div>
            </div>
  		  </div>
  		  <div className="goodsBox">
  		     {goods.map((item,id)=>
  		     	<div className="goodsList clearfix" key={id}>
	  		       <img src={item.url} alt="" className='goodsPic left'/>
	  		       <div className="detail left">
	                 <div className="detailName left colorGray">{item.name}</div>
	                 <div className="right">{item.number}件</div>
	  		       </div>
	  		    </div>
  		     )}
  		     {noData?'':
	  		     <div className="loadingBox" >
	  		       {hasRefesh?<div  className='loadMore'>
			                    <div className="loading"></div>
			                  </div>:<div className='loadMore'>
							            <span> {loadingMore?'上滑加载更多':'没有更多了'}</span>
							        </div>
                   }
			    </div>
		     }
  		  </div>
  		  <div className="bottomMask"></div>
  		</div>
  		)
  }
}
