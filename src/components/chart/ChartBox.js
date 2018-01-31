import React, {Component, PropTypes} from "react" 
import NavigationBar from '../../components/NavigationBar'
import OrderDetail from './OrderDetail'

export default class ChartBox extends Component{
	 constructor() {
         super();
     }
     render(){
     	return(
     		<div className="chartBox">
			 <NavigationBar current='chart'/>
     		   {/*chartBox*/}
               <OrderDetail/>
     		</div>
     		)
     }
}