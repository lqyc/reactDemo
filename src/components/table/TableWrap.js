import React, { Component, PropTypes } from 'react'
import NavigationBar from '../NavigationBar'
import SelectWrap from './SelectWrap'
import TableContent from './TableContent'

export default  class TableWrap extends Component{
	
    constructor(props) {
        super(props);
        this.pullTaskList = this.pullTaskList.bind(this)

    }
    componentDidMount() {
      this.pullTaskList()	
    }
    pullTaskList(){
    	const pageInfo={currentPage:1,pageSize:10,totalPage:1,totalRecords:0}
    	const tasklists = [
		    { title: '诺不轻信故人不负我', type: '碎语', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'something' },
		    { title: '失之淡然 得之坦然', type: '领悟', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'no' },
		    { title: '诺不轻许故我不负人', type: '碎语', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'something' },
		    { title: '诺不轻许故我不负人', type: '碎语', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'something' },
		    { title: '不忘初心 方得始终', type: '坚信', state: 'right', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'nothing' },
		    { title: '修己以清心为要', type: '碎语', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'something' },
		    { title: '诺不轻许故我不负人', type: '碎语', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'something' },
		    { title: '涉世以慎言为先', type: '碎语', state: 'sad', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'hello' },
		    { title: '涉世以慎言为先', type: '碎语', state: 'sad', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'hello' },
		    { title: '诺不轻信故人不负我', type: '碎语', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'something' }
		]
	    var taskList =tasklists.map((item,id) =>
            ({
                ...item,
                checked: false,
                id:id
            })
         )
        this.props.actions.batchDelAdminTask(pageInfo,taskList)
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



