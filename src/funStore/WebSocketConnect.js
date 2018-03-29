import {store} from '../index'
import $ from 'jquery'
import { push, replace } from 'react-router-redux'
import AuthProvider from './AuthProvider'
import promiseXHR from './ServerFun'
import {WS_NAME,API_PATH} from '../constants/OriginName'
import Base64 from 'base64js'
class WebSocketConnect {
  constructor(){
    const self = this
    // this.setUserInfo()
    // .then((res) => {
    //   self.connector(res.userinfo.userId)
    // })
  }

  state = {
    socket:'',
    timer:''
  }

  encodeClientId(pipLineData){
    const self = this
    return new Promise((resolve,reject)=>{
      if(self.getCookie('webclient_id')==null){
        var webclient_id = Base64.encode('lizClient'+Math.random().toString())
        self.saveWebClienId(webclient_id)
      }
      setTimeout(()=>{
        resolve(pipLineData)
      },1300)
    })
  }

  saveWebClienId(webclient_id){
    let exp = new Date();
    exp.setTime(exp.getTime() + 1000*60*60*24*365)
    document.cookie = 'webclient_id' + "="+ escape (webclient_id) + ";expires=" + exp.toGMTString();
  }

  getCookie(key) {
         var aCookie = document.cookie.split("; ");
         // console.log(aCookie);
         for (var i=0; i < aCookie.length; i++)
         {
             var aCrumb = aCookie[i].split("=");
             if (key == aCrumb[0])
                 return unescape(aCrumb[1]);
         }
         return null;
   }

  connector(info){
    let ws = new WebSocket(WS_NAME)
    const self = this
    let timer;
        ws.onopen = function(e) {
            //WebSocket Status:: Socket Open
            //// 发送一个初始化消息

            try{
              ws.send(self.init(info));
              self.state.timer = self.heartbeat(ws)
              console.log('--连接')
            }catch(error){
              console.log(error)
            }

        }
        //监听当接收信息时触发匿名函数
        ws.onmessage= function(message){
          const data = eval('('+message.data+')')
          if(data.command === 0xff&&data.frame === 1){
            self.responseBeat(ws)
          }else if (data.command==0xef&&data.frame === 0) {
            store.dispatch(
              {type:'TURN_OFF_STATE'}
            )
            setTimeout(function(){
              ws.close()
              store.dispatch(
                push('/offline')
              )
            },500)
          }else if (data.command==254&&data.frame === 1) {
            setTimeout(function(){
              ws.send(self.init(info));
            },50)
          }else {
            if(data.command!=255&&data.command!=254&&data.command!=252&&data.command!=239){
              // console.log(store.getState().groupList.chatGroupId==data.data.groupId);
              // console.log(data.data.groupId);
              if(store.getState().messageData.roomType!='GROUPMSG'){
                if(store.getState().groupList.chatGroupId==data.data.msgInfo.groupId){
                  console.log('有消息');
                  store.dispatch(
                    {type:'SOCKETMESG',data : data.data}
                  )
                  console.log(store.getState().messageData.msgFlow.length > store.getState().messageData.sliceBegin+120);
                  if(store.getState().messageData.msgFlow.length > store.getState().messageData.sliceBegin+120){
                    store.dispatch(
                      {type:'CHANGE_NEWTIP', status: true}
                    )
                  }else {
                   $('#groupRoom').scrollTop($('#groupRoom')[0].scrollHeight-1)
                  }

                  console.log(store.getState().memberList.listData.find(item => item.id==store.getState().memberList.chatMemberId).nickName);
                  if(store.getState().memberList.chatMemberId==data.data.memInfo.id||(store.getState().groupList.targetGroup.robotGroupMemList[0].imMemId==data.data.memInfo.id&&data.data.msgInfo.content.includes(store.getState().memberList.listData.find(item => item.id==store.getState().memberList.chatMemberId).nickName))){
                    if(store.getState().singleMesgData.msgFlow.length > store.getState().singleMesgData.sliceBegin+120){
                      store.dispatch(
                        {type:'CHANGE_NEWTIP_SIN', status: true}
                      )
                    }else {
                      $('#memberRoom').scrollTop($('#memberRoom')[0].scrollHeight-1)
                    }
                    store.dispatch(
                      {type:'SOCKET_SINGLEMESGS',data : data.data}
                    )
                    // 当前消息致为已读
                    ws.send(self.readMesg(data.data.msgId))
                  }else {
                    if(data.data.keywordList.length>0){
                      store.dispatch(
                        {type:'ADD_MEMBER_UNREADMSG', id : data.data.memInfo.id,lastMsgTime:data.data.msgInfo.msgTime}
                      )
                    }
                  }
                }else {
                  if(data.data.keywordList.length>0){
                    store.dispatch(
                      {type:'ADD_UNREADMSG', id : data.data.msgInfo.groupId,lastMsgTime:data.data.msgInfo.msgTime}
                    )
                  }
                }
              }else {
                const imMemIdList = store.getState().groupList.listData.map(item => item.robotGroupMemList.length!=0 ? item.robotGroupMemList[0].imMemId:'')
                if(imMemIdList.includes(data.data.memInfo.id)){
                  // 群发消息
                  store.dispatch(
                    {type:'SOCKETMESG',data : data.data}
                  )
                }
              }
            }
            // console.log(data.data);

          }
          // console.log(store.getState().messageData.roomId);
    		  console.log(message.data)
       }

       ws.onclose = function(message){
    	//alert("与服务器连接中断，请重新连接");
          const socketState = store.getState().socketState
          clearInterval(self.state.timer)
          ws.close()
          console.log(socketState.closeState);
          if(socketState.closeState){
            setTimeout(function(){
              const userid = store.getState().userInfo.info.userinfo.userId
                  self.connector(userid)
            },500)
          }
          console.log('与服务器连接中断，请重新连接');
      }

      this.state.socket = ws
  }

  init(code){
    let map = {}
    map.command=0xfe
    map.frame = 1
    map.data = code
    return JSON.stringify(map)
  }

  beatMap(){
    let map = {}
    map.command=0xff
    map.frame = 1
    map.data = 'ping'
    return JSON.stringify(map)
  }

  readMesg(id){
    let map = {}
    map.command=0xfd
    map.frame = 0
    map.data = id
    return JSON.stringify(map)
  }

  responseBeat(ws){
    ws.send(this.beatMap());
    console.log('--我发的--'+this.beatMap());
  }


  receiveMsg(f){
    console.log(f);
  }

  heartbeat(ws){
    const data = this.beatMap()
    return setInterval(function(){
      ws.send(data);
      console.log('--我发的--'+data);
    },30000)
  }

  setUserInfo(){
    const self = this
    return AuthProvider.getAccessToken()
          .then((resolve,reject) => {
            return self.pullUserinfo(API_PATH+'/tenantadmin/authsec/tenantbase/currentuser',resolve)
          })
  }

  getUserInfo(){
    return store.getState().userInfo.info.userinfo.userId
  }

  pullUserinfo(url,resolve){
    return promiseXHR(url,{type:'Bearer',value:resolve},null,'GET')
          .then((res) => {
            const data = eval('('+res+')')
            return data.resultContent
          })
  }


}

export default WebSocketConnect
