import React, { Component, PropTypes } from 'react'
import TaskItem from './TaskItem'

function FormatDate (strTime) {
    let date = new Date(strTime)
    let month = ((date.getMonth()+1)<10)? '0'+(date.getMonth()+1) : (date.getMonth()+1)
    let day = (date.getDate()<10)? '0'+date.getDate() : date.getDate()
    let hours = (date.getHours()<10) ? '0'+date.getHours() : date.getHours()
    let minutes = (date.getMinutes()<10) ? '0'+date.getMinutes() : date.getMinutes()
    let seconds = (date.getSeconds()<10) ? '0'+date.getSeconds() : date.getSeconds()
    return date.getFullYear()+"-"+month+"-"+day+' '+hours+':'+minutes
  }


export default class TableContent extends Component {
    constructor(props) {
        super(props);

        this.checkAllHandle = this.checkAllHandle.bind(this)
        this.checkHandle=this.checkHandle.bind(this)
        this.delTableList=this.delTableList.bind(this)
    }

    checkHandle(id,task) {
        console.log(id)
        let unchecked = []
        let checkAll = false
        this.props.taskList.forEach((task)=>{
            if(!task.checked){
                unchecked.push(task.id)
            }
        })
        if(unchecked.length==1&&unchecked[0]==id&&!task.checked){
            checkAll = true
        }
        this.props.actions.checkAdminTask(id,checkAll)
    }
    delTableList(){
        let checkedTask = []
        console.log(this.props.taskList)
        this.props.taskList.forEach((task)=>{
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

        this.props.actions.batchDelAdminTask(pageInfo,checkeds)
    }
     checkAllHandle(){
        this.props.actions.checkAllAdminTask()
    }

    render() {
        let { actions,adminTaskList } = this.props
        let {checkAll,searchParamas,pageInfo,taskList} = adminTaskList
         console.log(adminTaskList)

        return ( 
        <div className="innerBox">
             <div className="headBtn clearfix ">
                {/*<div className="addBtn left">新增<span></span></div>*/}
                <div className="addBtn left" >redux 批量操作</div>
                <div className="delBtn right" onClick={this.delTableList}>
                   删除<span></span>
                </div>
             </div>
             <table className = "tabeleWrap">
                <thead>
                    <tr className = "tableTitle">
                        <td>
                            <div className = "number">
                              <span className = { checkAll ? "checkBox  checked" : "checkBox " } onClick = { this.checkAllHandle } > </span> 
                              <span> 序号 </span> 
                            </div> 
                        </td> 
                        <td> 标题 </td> 
                        <td> 类型 </td> 
                        <td> 状态 </td> 
                        <td> 生成时间 </td> 
                        <td> 备注 </td> 
                    </tr> 
                </thead> 
                <tbody> 
                    {
                        taskList.map((task, id) => {
                            return <TaskItem
                            key = { id }
                            id = { id }
                            task = { task }
                            checkHandle={this.checkHandle}
                            />
                        })
                    } 
                </tbody> 
             </table>
         </div>
        )
    }
}