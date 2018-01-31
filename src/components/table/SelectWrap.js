import React, { Component, PropTypes } from 'react'
import SelectBox from './SelectBox'
import DateRangePicker from './DateRangePicker'

const slectData = {
        label:'下拉列表',
        options: [ '发送方式','手动发送','自动发送','随便什么','手动发送','自动发送'],
        paramaName: 'senderType',
        paramaValue: ['manual','sysAuto']
    }

export default class SelectWrap extends Component{
   constructor(props) {
        super(props);
        this.state={
          initValue:['宝宝','bb','宝宝玩具','宝宝哈哈','bbc','宝宝11','宝宝331','bbfsdfsdf','bbhahah'],
          searchBox:false,
          inputValue:'',
          showPickerBox:'none',
          dateArr:[],
          dateFocus:false
        }
        this.showSearchBox=this.showSearchBox.bind(this)
        this.searchFor=this.searchFor.bind(this)
        this.hideOption=this.hideOption.bind(this)

   }
  keyUpEvent(e){
     if(e.keyCode == 13){
      console.log('input confirm 回车')
      // this.setState({
      //   searchBox:true 
      // });
     }
  }
   showSearchBox(){
    this.setState({
      searchBox:true 
    });
   }
	searchedValue(data){
    console.log(data)
    this.setState({
      searchBox:false ,
      inputValue:data
    });
  }
  searchFor(e){
   this.setState({
     inputValue: e.target.value
   });
   var initValues=['宝宝','bb','宝宝玩具','宝宝哈哈','bbc','宝宝11','宝宝331','bbfsd2f','bbha4hah','b6','宝45','宝宝快乐','宝宝/bb']
   var targetValue=e.target.value
   var searchKey=[]
   if(e.target.value.length >0){
     for(var i=0;i < initValues.length; i++){
       var searchKeys=initValues[i]
       if(searchKeys.indexOf(targetValue)> -1 ){ //匹配搜索词indexOf（）>-1
         searchKey.push(searchKeys)
       }
     }
      this.setState({
       searchBox:true,
       initValue:searchKey
      })
   }else{
     this.setState({
       searchBox:false 
     });
   }
  }
  hideOption(){
    this.setState({
      searchBox:false  
    });
  }
  showDatePicker(){
      this.setState({
          showPickerBox:'block',
          dateFocus:true
      })
  }
 setDateHandle(){
      const beginTime = new Date(this.state.dateArr[0])
      .getTime()-8*3600*1000
      let endTime = new Date(this.state.dateArr[1])
      .getTime()-8*3600*1000
      if(beginTime==endTime){
        endTime += 86399000
      }
        this.setState({
          showPickerBox:'none',
          dateFocus:false
        })
    }
    changeDateRange(dateArr){
       this.setState({
         dateArr:dateArr
       });
    }
	render(){
    let {searchBox,inputValue,showPickerBox,dateArr,dateFocus}=this.state
		return(
			<div className="slectWrap clearfix" >
  			  <div className="selctBox left" onBlur={this.hideOption.bind(this)} tabIndex={1}>
                   <input className='titleInput colorBlack border' type='text'
                            maxLength='12'
                            ref = 'searchTitle'
                            placeholder='请输入宝宝/bb'
                            value={inputValue}
                             onChange={this.searchFor}
                             onKeyUp = {this.keyUpEvent.bind(this)}
                             />
                    <img src="/image/search.png" onClick={this.showSearchBox}/>
                    <div className="showInput border" style={{display:searchBox?'block':'none'}}>
                     {this.state.initValue.map((data,id)=>
                        <div className="innerValue colorBlack " onClick={this.searchedValue.bind(this,data)} key={id}>{data}</div>
                      )}
                    </div>
  			  </div>
         <SelectBox selectLabel={slectData.label}
                    selectOption={slectData.options}
                    paramaName={slectData.paramaName}
                    paramaValue={slectData.paramaValue}
                />
         <div className='selectWrapper left colorBlack clearfix' >
           <div className="selectLabel  ">选择日期:</div>
           <div className={dateArr[0]==undefined?'titleInput border right':'titleInput selectTip right border'}  onClick={this.showDatePicker.bind(this)} style={{boxShadow:dateFocus?'0px 1px 9px 0 #1da6f8':'none',borderColor:dateFocus?'#1da6f8':'#b5bdc6'}}>
                           {dateArr[0]==undefined?'请选择时间':dateArr[0]+' 至 '+dateArr[1]}</div>
           <DateRangePicker showPickerBox={showPickerBox}
                            onChange={this.changeDateRange.bind(this)}
                            isHide={this.setDateHandle.bind(this)}/>
         </div>
			</div>
			)
	}
}