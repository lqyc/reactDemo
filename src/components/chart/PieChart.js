import React,{Component} from 'react';
import 'echarts/lib/component/tooltip'
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/title')

export default class PieChart extends Component {

    constructor(props) {
        super(props)
        this.setPieOption = this.setPieOption.bind(this)
        this.initPieChart = this.initPieChart.bind(this)
    }

    initPieChart() {
        const { data } = this.props
        let myChart = echarts.init(this.refs.pieChart)
        let options = this.setPieOption(data)
        myChart.setOption(options)
    }

    componentDidMount() {
        this.initPieChart()
    }

    componentDidUpdate() {
        this.initPieChart()
    }
    setPieOption(data) {
        return {
            title:{
              text:"饼图",
              x:"center"
            },
            tooltip:{
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color:['#8fd3f4','#38f9d7', '#b5bdc6', '#48c6ef', '#fa709a'],
            series :[
                {
                    name: '比例',
                    type: 'pie',
                    data: data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        normal: {
                            formatter: "{d}% \n{b}",
                        }
                    },
                     animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                }
            ]
        }
    }
    render() {
        return (
            <div className="pie-react">
                <div ref="pieChart" style={{width: "100%", height: "330px"}}></div>
            </div>
        )
    }
}