import React,{Component} from 'react'

function FormatDate (strTime) {
    let date = new Date(strTime)
    let month = ((date.getMonth()+1)<10)? '0'+(date.getMonth()+1) : (date.getMonth()+1)
    let day = (date.getDate()<10)? '0'+date.getDate() : date.getDate()
    let hours = (date.getHours()<10) ? '0'+date.getHours() : date.getHours()
    let minutes = (date.getMinutes()<10) ? '0'+date.getMinutes() : date.getMinutes()
    let seconds = (date.getSeconds()<10) ? '0'+date.getSeconds() : date.getSeconds()
    return date.getFullYear()+"-"+month+"-"+day+' '+hours+':'+minutes
  }
class TaskItem extends Component{
    constructor(props){
        super(props)
        this.checkBoxHandle=this.checkBoxHandle.bind(this)
    }

    checkBoxHandle(id,task){
        this.props.checkHandle(id,task)
    }

    render(){
        const {id,task,pageInfo,searchParamas,sendingTime,actions,checkHandle} = this.props
        return (
            <tr id={task.id}>
                <td>
                    <div className="number">
                        <span className={task.checked?"checkBox  checked":"checkBox "} onClick={this.checkBoxHandle.bind(null,id,task)}></span>
                        <span>{id+1}</span>
                    </div>
                </td>
                <td>
                    <div className="title" >{task.title}</div>
                </td>
                <td>{task.type}</td>
                <td>
                    <div className="state" >
                        {task.state}
                    </div>
                </td>
                <td>{FormatDate(task.time)}</td>
                <td className="other">{task.other}</td>
            </tr>
        )
    }
}

export default TaskItem
