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
const taskList = [
    { title: '诺不轻信故人不负我', type: '碎语', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'something' },
    { title: '失之淡然 得之坦然', type: '领悟', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'no' },
    { title: '诺不轻许故我不负人', type: '碎语', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'something' },
    { title: '不忘初心 方得始终', type: '坚信', state: 'right', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'nothing' },
    { title: '修己以清心为要', type: '碎语', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'something' },
    { title: '涉世以慎言为先', type: '碎语', state: 'sad', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'hello' },
    { title: '诺不轻信故人不负我', type: '碎语', state: 'happy', time: 'Fri Dec 08 2017 11:50:56 GMT+0800 (CST)', other: 'something' }
]

export default class TableContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newTasklist: [],
            checkAll: false,
            CheckedList:[]
        }
        this.checkAllHandle = this.checkAllHandle.bind(this)
        this.checkAdminTask =this.checkAdminTask.bind(this)
        this.checkHandle=this.checkHandle.bind(this)
        this.delTableList=this.delTableList.bind(this)
    }

    componentDidMount() {

        var newTasklists = taskList.map((item,id) =>
            ({
                ...item,
                checked: false,
                id:id
            })
        )
        this.setState({
            newTasklist: newTasklists
        });
        console.log(newTasklists)
        console.log(this.state.newTasklist)

    }
    checkAllHandle(e) {
        this.setState({
            checkAll: !this.state.checkAll
        })
        if (this.state.checkAll) {
            var newTasklists = taskList.map((item,id) =>
                ({
                    ...item,
                    checked: false,
                    id:id
                })
            )
            this.setState({
                newTasklist: newTasklists,
            })
        }else{
            var newTasklists = taskList.map((item,id) =>
                ({
                    ...item,
                    checked: true,
                    id:id
                })
            )
            this.setState({
                newTasklist: newTasklists,
                CheckedList:newTasklists
            })
        }
    }
    checkAdminTask(){
        this.setState({
            checkAll:true 
        });
    }
     checkHandle(id,task) {
        // console.log(id)
        this.setState({
            checkAll: false
        })
        var ifChecked=[]
        var newTbodys=task.map((item)=>
            item.id === id ?
                { ...item, checked: !item.checked } : item
        );
        this.setState({
            newTasklist: newTbodys
        });
        // console.log(newTbodys[id].checked)
        for(let i=0;i<newTbodys.length;i++){
          if(newTbodys[i].checked === true){
            ifChecked.push(newTbodys[i])
          }
        }
        this.setState({
            CheckedList: ifChecked
        });
        console.log(ifChecked)
        if(ifChecked.length==newTbodys.length){
        console.log(ifChecked)
            this.setState({
                checkAll:true
            })
        }
    }
    delTableList(){
        let delTbody=this.state.newTasklist
        let ifChecked=[]
        for(let i=0;i<delTbody.length;i++){
          if(delTbody[i].checked === false){
            ifChecked.push(delTbody[i])
          }
        }
         var newTbodys=ifChecked.map((item,id)=>
            ({ 
               ...item,
               id:id
            })
        );
        console.log(ifChecked)
        this.setState({
            newTasklist: newTbodys
        });
        console.log(this.state.newTasklist)

    }

    render() {
        let { pageInfo, searchParamas, actions } = this.props
        let { newTasklist, checkAll,CheckedList } = this.state

        return ( 
        <div className="innerBox">
             <div className="headBtn clearfix ">
                {/*<div className="addBtn left">新增<span></span></div>*/}
                <div className="delBtn right" onClick={this.delTableList}>删除<span></span></div>
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
                        newTasklist.map((task, id) => {
                            return <TaskItem
                            key = { id }
                            id = { id }
                            task = { task }
                            newTasklist = { newTasklist }
                            checkAdminTask={this.checkAdminTask}
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