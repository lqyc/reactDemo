import React,{Component} from 'react';
import 'echarts/lib/component/tooltip'

var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/title')

export default class LineEchart extends Component {

  constructor(props) {
    super(props)
    this.setBarOption = this.setBarOption.bind(this)
    this.initLineChart = this.initLineChart.bind(this)
  }

  initLineChart() {
    const data=this.props.data;
    const color=this.props.color
    const menuId=this.props.menuId
    let date=this.props.date
    var label=''
    let value=[]
    let axisTick=[]
    let newData=[]

    if(menuId==0){
          label='成交额:'
        }else if(menuId==1){
          label='订单成交数'
        }else {
          label='销售收益'
        }
    if(date=='5日'){
       newData=data.slice(0,5)
    }else if(date=='10日'){
      newData=data.slice(0,10)
    }else{
      newData=data.slice(0,30)
    }
    for(let item of newData){
      value.push(item.value)
      axisTick.push(item.axisTick)
    }
    let myChart = echarts.init(this.refs.lineChart)
    let options = this.setBarOption(axisTick,value,color,label)
    myChart.setOption(options)
  }

  componentDidMount() {
    this.initLineChart()
  }

  componentDidUpdate() {
    this.initLineChart()
  }

  setBarOption(axisTick,value,color,label) {
        return {
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['经营报表']
          },
         
          xAxis:  {
              type: 'category',
              boundaryGap: true,
              axisTick:{
                         show:false,//是否显示坐标轴刻度
                     },
              /*设置X轴字体样式*/
                     axisLabel: {
                         show: true,
                         interval: 0,
                         // rotate: 20,//倾斜30度
                         textStyle: {
                             color: '#ccc',
                             fontSize: 12,
                             fontFamily: 'PingFangSC-Regular'
                         }
                     },
                     axisLine: {
                         lineStyle:{
                             color:'#ccc'
                         }
                     },
              data: axisTick
          },
          yAxis: {
              type: 'value',
              show:true,
              axisTick:{
                   show:false,//是否显示坐标轴刻度
               },
               axisLine: {
                   lineStyle:{
                       color:'#ccc'
                   }
               },
              axisLabel: {
                  formatter: '{value} '
              }
          },
          series: [
             
              {
                 name:label,
                 type:'line',
                 data:value,
                 color:color,
                 symbolSize:14,
                 itemStyle: {
                     normal: {
                         color: color //图标颜色
                     }
                 },
                 lineStyle: {
                     normal: {
                         width: 4,  //连线粗细
                         color: color  //连线颜色
                     }
                 },
                smooth:true,//设置折线图平滑
              }
          ]
        }
  }
  render(){
    return (
      <div className="lineReact">
        <div ref="lineChart" style={{width: "100%", height: "300px"}}></div>
      </div>
    )
   }
}
  