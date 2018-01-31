import React, { Component, PropTypes } from 'react'
import $ from 'jquery'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
const url = API_PATH+'/taskadminapi/authsec/taskmgmt/tasks'
export default class PageFragment extends Component {
  constructor(props){
    super(props)
    this.firstPage = this.firstPage.bind(this)
    this.lastPage = this.lastPage.bind(this)
    this.beforePage = this.beforePage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.targetPage = this.targetPage.bind(this)
  }
  beforePage(e){
      e.stopPropagation()
      e.preventDefault()

      let paramas = this.props.searchParamas
      paramas.currentPage = this.props.pageInfo.currentPage-1
      AuthProvider.getAccessToken()
      .then((resolve,reject)=>{
          promiseXHR(url,{type:'Bearer',value:resolve},paramas,'POST')
          .then(res => {
              const resData = JSON.parse(res)
              const pageInfo = resData.pageInfo
              const taskList = resData.resultContent.map((item)=>
              Object.assign({},{checked:false},item))
              this.props.pullAdminTask(pageInfo,taskList)
          })
      })
  }
  nextPage(e){
      e.stopPropagation()
      e.preventDefault()

      let paramas = this.props.searchParamas
      paramas.currentPage = this.props.pageInfo.currentPage+1
      AuthProvider.getAccessToken()
      .then((resolve,reject)=>{
          promiseXHR(url,{type:'Bearer',value:resolve},paramas,'POST')
          .then(res => {
              const resData = JSON.parse(res)
              const pageInfo = resData.pageInfo
              const taskList = resData.resultContent.map((item)=>
              Object.assign({},{checked:false},item))
              this.props.pullAdminTask(pageInfo,taskList)
          })
      })
  }
  targetPage(e){
    e.stopPropagation()
    e.preventDefault()

    let paramas = this.props.searchParamas
    paramas.currentPage = parseInt(e.target.id)
    AuthProvider.getAccessToken()
    .then((resolve,reject)=>{
        promiseXHR(url,{type:'Bearer',value:resolve},paramas,'POST')
        .then(res => {
            const resData = JSON.parse(res)
            const pageInfo = resData.pageInfo
            const taskList = resData.resultContent.map((item)=>
            Object.assign({},{checked:false},item))
            this.props.pullAdminTask(pageInfo,taskList)
        })
    })
  }
  lastPage(e){
    e.stopPropagation()
    e.preventDefault()

    let paramas = this.props.searchParamas
    paramas.currentPage = this.props.pageInfo.totalPage-1
    if(this.props.pageInfo.currentPage!=this.props.pageInfo.totalPage - 1){
      AuthProvider.getAccessToken()
      .then((resolve,reject)=>{
          promiseXHR(url,{type:'Bearer',value:resolve},paramas,'POST')
          .then(res => {
              const resData = JSON.parse(res)
              const pageInfo = resData.pageInfo
              const taskList = resData.resultContent.map((item)=>
              Object.assign({},{checked:false},item))
              this.props.pullAdminTask(pageInfo,taskList)
          })
      })
    }
  }
  firstPage(e){
    e.stopPropagation()
    e.preventDefault()

    let paramas = this.props.searchParamas
    paramas.currentPage = 0
    if(this.props.pageInfo.currentPage!=0){
      AuthProvider.getAccessToken()
      .then((resolve,reject)=>{
          promiseXHR(url,{type:'Bearer',value:resolve},paramas,'POST')
          .then(res => {
              const resData = JSON.parse(res)
              const pageInfo = resData.pageInfo
              const taskList = resData.resultContent.map((item)=>
              Object.assign({},{checked:false},item))
              this.props.pullAdminTask(pageInfo,taskList)
          })
      })
    }
  }
  render(){
    const {pageInfo} = this.props
    const totalPageNumber = pageInfo.totalPage
    const currentPageNumber = pageInfo.currentPage+1
    const items = []
    let start,end
    if(totalPageNumber<8){
      start = 1
      end = totalPageNumber
    }else if(currentPageNumber<5){
      start = 1
      end = 7
    }else if(currentPageNumber>totalPageNumber-4){
      start = totalPageNumber-6
      end = totalPageNumber
    }else {
      start = currentPageNumber-3
      end = currentPageNumber+3
    }

    for(var i = start; i <= end; i++){
     items.push(i)
    }
    return (
        <ul>
            <li className="firstPage" onClick={this.firstPage}>首页</li>
            <li className="prevPage" onClick={this.beforePage} style={{display:currentPageNumber==1?'none':'block'}}>上一页</li>
            {
              items.map((num)=>{
                return <li
                          className={num==currentPageNumber?"pages currentPage":"pages"}
                          key={num}
                          id={num-1}
                          onClick={this.targetPage}
                        >{num}</li>
              })
            }
            <li className="nextPage" onClick={this.nextPage} style={{display:currentPageNumber==totalPageNumber?'none':'block'}}>下一页</li>
            <li className="lastPage" onClick={this.lastPage}>末页</li>
        </ul>
    )
  }
}
