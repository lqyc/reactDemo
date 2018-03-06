import React, {Component, PropTypes} from "react" 
import NavigationBar from '../../components/NavigationBar'
import BarChart from './BarChart'
import PieChart from './PieChart'

const data = [
  {value: 2, name: "葡萄"},
  {value: 17, name: "梨子"},
  {value: 5, name: "苹果"},
  {value: 13, name: "芒果"},
  {value: 5, name: "西瓜"}
]
const barData = [
  {value: 52, name: "西瓜"},
  {value: 372, name: "菠萝"},
  {value: 442, name: '栗子'},
  {value: 292, name: "芒果"}
]

export default class ChartMainScope extends Component{
	 constructor() {
         super();
     }
     render(){
     	return(
     		<div className="chartBox">
			  <NavigationBar current='chart'/>
                 <PieChart data={data}/>
                 <BarChart data={barData}/>
     		</div>
     		)
     }
}