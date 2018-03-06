import React,{Component} from 'react';
import ReactDOM from 'react-dom';

var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/title')

export default class BarChart extends Component {

  constructor(props) {
    super(props)
    this.setBarOption = this.setBarOption.bind(this)
    this.initBarChart = this.initBarChart.bind(this)
  }

  initBarChart() {
    const data=this.props.data;
    let name=[]
    let value=[]
    for(let item of data){
      name.push(item.name)
      value.push(item.value)
    }
    let myChart = echarts.init(this.refs.barChart)
    let options = this.setBarOption(name,value)
    myChart.setOption(options)
  }

  componentDidMount() {
    this.initBarChart()
  }

  componentDidUpdate() {
    this.initBarChart()
  }

  setBarOption(name,value) {
        return {
          title: {
            text:'条形图',
            left: "center"
          },
           tooltip: {  
                    //触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'  
                    trigger: 'axis'  
                },
          xAxis: [{
            type: 'category',
            data:name
          }],
          yAxis : [{
              type : 'value'
          }],
          color:['#8fd3f4','#38f9d7', '#8ec5fc', '#48c6ef', '#fa709a'],
          series: [{
            name: '比例',
            type: 'bar',
            data: value
          }]
        }
  }
  render(){
    return (
      <div className="bar-react">
        <div ref="barChart" style={{width: "100%", height: "300px"}}></div>
      </div>
    )
   }
}
  