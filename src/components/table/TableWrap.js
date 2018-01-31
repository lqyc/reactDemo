import React, { Component, PropTypes } from 'react'
import NavigationBar from '../NavigationBar'
import SelectWrap from './SelectWrap'
import TableContent from './TableContent'

export default  class TableWrap extends Component{
	
    constructor(props) {
        super(props);
    }

	render(){
    let {actions,adminTaskList} = this.props
      let {checkAll,searchParamas,pageInfo,taskList} = adminTaskList
       
		return(
              <div>
			<NavigationBar current='about'/>
			  <div className="wrap">
                 <SelectWrap/>
				   <div className="mainTable">
					     <TableContent actions = {actions}
                                      adminTaskList = {adminTaskList}
                                      taskList={taskList}
                                      searchParamas={searchParamas}
					                  pageInfo={pageInfo}
					                  checkAll={checkAll}/>
				   </div>
				</div>
			</div>
			)
	}
}



