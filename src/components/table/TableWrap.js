import React, { Component, PropTypes } from 'react'
import NavigationBar from '../NavigationBar'
import SelectWrap from './SelectWrap'
import TableContent from './TableContent'
import QuickBox from './QuickBox'


export default  class TableWrap extends Component{
	
    constructor(props) {
        super(props);
        this.state={
        	quickBox:false,
    		quickTip:'确定要删除当前任务吗？',
    		quickBtn:true,
    		confirmHide:false
        }
        this.pullTaskList = this.pullTaskList.bind(this)
        this.hideQuickBox=this.hideQuickBox.bind(this)
    }
    componentDidMount() {
      this.pullTaskList()	
    }
    pullTaskList(){
    	const pageInfo={currentPage:1,pageSize:10,totalPage:1,totalRecords:0}
    	const tasklists = [
		    { title: '诺不轻信故人不负我', type: '碎语', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'something' },
		    { title: '失之淡然 得之坦然', type: '领悟', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'no' },
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
        //目前是假数据，有接口则先调接口删除数据再重新请求pageInfo和taskList
        this.props.actions.batchDelAdminTask(pageInfo,taskList)
    }

    showQuickBox(taskList){
    	console.log(taskList)
    	let checkedList=[]
        for(var i=0;i<taskList.length;i++){
        	if(taskList[i].checked) checkedList.push(taskList[i])
        }
        	console.log(checkedList)
        if(checkedList==[]||checkedList.length==0){
        	console.log('no checked')
        	this.setState({
	        	quickBox:true,
	        	quickTip:'您还没有选择要删除的选项',
	        	quickBtn:true,
	        	confirmHide:true
	        });
        }else{
        	this.setState({
	        	quickBox:true,
	        	quickTip:'确定要删除当前任务吗？',
	        	quickBtn:true,
	        	confirmHide:false
	        });
        }
        
    }
    hideQuickBox(){
        this.setState({
        	quickBox:false 
        });
    }
    delTableList(taskList,actions){
        let checkedTask = []
        console.log(actions)
        taskList.forEach((task)=>{
          if(!task.checked){
            checkedTask.push(task)
          }
        })
        var checkeds=checkedTask.map((item,id)=>
            ({
                ...item,
                checked:false,
                id:id
            })
         )
        console.log(checkeds)
        //目前是假数据，有接口则先调接口删除数据再重新请求pageInfo和taskList
        const pageInfo={currentPage:2,pageSize:10,totalPage:1,totalRecords:0}
        actions.batchDelAdminTask(pageInfo,checkeds)
        // this.pullTaskList()
        const self=this
        self.setState({
        	quickTip: '删除成功！',
        	quickBtn:false
        });
        
        setTimeout(() => {
           self.hideQuickBox()
        },1500)

    }

	render(){
		let {quickBox,quickTip,quickBtn,confirmHide}=this.state
      let {actions,adminTaskList} = this.props
      let {checkAll,searchParamas,pageInfo,taskList} = adminTaskList
       console.log(taskList)
		return(
              <div>
			<NavigationBar current='about'/>
			{quickBox?<QuickBox confirmHide={confirmHide} quickBtn={quickBtn} quickTip={quickTip} hideQuickBox={this.hideQuickBox} delTableList={this.delTableList.bind(this,taskList,actions)} />:''}
			  <div className="wrap">
                 <SelectWrap/>
				   <div className="mainTable">
					     <TableContent actions = {actions}
                                      adminTaskList = {adminTaskList}
                                      taskList={taskList}
                                      searchParamas={searchParamas}
					                  pageInfo={pageInfo}
					                  checkAll={checkAll}
					                  showQuickBox={this.showQuickBox.bind(this,taskList)}/>
				   </div>
				</div>
			</div>
			)
	}
}



