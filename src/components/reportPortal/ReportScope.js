import React, { Component, PropTypes } from 'react'
import {history} from '../../index'
import { push, replace } from 'react-router-redux'
import LineEchart from './LineEchart'
import GoodsRank from './GoodsRank'
import NavigationBar from '../../components/NavigationBar'
import  './report.css';


const lineData = [
  {value: 1,axisTick:'1.23'},
  {value: 2,axisTick:'1.23'},
  {value: 17,axisTick:'1.23'},
  {value: 5,axisTick:'1.23'},
  {value: 12,axisTick:'1.23'},
  {value: 4,axisTick:'1.23'},
  {value: 2,axisTick:'1.23'},
  {value: 12,axisTick:'1.23'},
  {value: 5,axisTick:'1.23'},
  {value: 12,axisTick:'1.23'},
  {value: 2,axisTick:'1.23'},
  {value: 12,axisTick:'1.23'},
  {value: 0,axisTick:'1.23'},
  {value: 1,axisTick:'1.23'},
  {value: 8,axisTick:'1.23'}
]
const dateNav=['5日','10日','30日']
const menuNav=['成交额(元)','订单成交数(件)','销售收益(元)']
const reportData=[{}]
export default class ReportScope extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.state={
            currentId:1,
            date:'10日',
            bargain:'14',
            orderNum:'3',
            profits:'12.3',
            menuId:1,
            color:'#58A7F8'
        }

  }
  componentDidMount() {
    window.document.title='经营报表'
  }
  selectedOption(id,item){
        this.setState({
            currentId:id,
            date:item
        })
        
  }
  selectedmenuList(id,item){
       this.setState({
            menuId:id
        })
       if(id==0){
          this.setState({
            color: '#F15668'
          })
        }else if(id==1){
          this.setState({
            color:'#58A7F8' 
          })
        }else {
          this.setState({
            color:'#7DD18D' 
          })
        }
  }
  render() {
    const {actions} = this.props
    let {currentId,date,bargain,orderNum,profits,menuId,color}=this.state

    return (
      <div >
        <NavigationBar current='/Report'/>        
        <div  className="reportWrap">
          <ul className="tabMenuBox clearfix">
            {dateNav.map((item,id)=>
              <li className={currentId==id?"tapNav textCenter colorWhite bgRed":"colorRed tapNav textCenter"} key={id} onClick={this.selectedOption.bind(this,id,item)}>{item}</li>
            )}
          </ul>
          <LineEchart data={lineData} color={color} menuId={menuId} date={date}/>
          <div className="canvasMenu textCenter">
            {menuNav.map((item,id)=>{
              let dataValue=''
              switch(id){
                case 0:dataValue=<div className="data">{bargain}</div>;
                break;
                case 1:dataValue=<div className="data">{orderNum}</div>;
                break;
                case 2:dataValue=<div className="data">{profits}</div>;
                break;
                default:dataValue=<div className="data">0</div>;
              }
              return(
                <div className={menuId==id?"menuList left selectNavBg":"menuList left "} onClick={this.selectedmenuList.bind(this,id,item)} key={id}>
                  <div className="navTitle bargain">{item}</div>
                    {dataValue}
              </div>
                )
              }
            )}
          </div>
          <GoodsRank date={date}/>
        </div>
      </div>
    )
  }
}