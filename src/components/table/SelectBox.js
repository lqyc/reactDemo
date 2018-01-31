import React, {Component, PropTypes} from "react" 



export default class SelectBox extends Component{
    constructor() {
        super();
        this.state={
            showOption:false,
            currentId:-1,
            selectTitle:"请选择"
        }
    }
    showMoreOption(){
      if(!this.props.disable){
        this.setState({
            showOption:!this.state.showOption
        })  
      }
    }

    selectedOption(id,sentList,name,value){
        this.setState({
            currentId:id,
            selectTitle:sentList,
            showOption:!this.state.showOption
        })
    }
    hideOption(){
        this.setState({
            showOption:false
        })
    }
    render(){
        let {showOption,currentId,selectTitle}=this.state
        let {selectLabel,selectOption,paramaName,paramDefault,
          paramaValue,verify,disable} = this.props
        const id=this.props.id==undefined || this.props.id==''?'':this.props.id;
        const _currentId = paramDefault!=undefined&&currentId==-1? paramDefault.id : currentId
        return(
            <div className='selectWrapper left colorBlack ' onBlur={this.hideOption.bind(this)} tabIndex={1}>
                <div className="selectLabel  ">{selectLabel}:</div>
                <div className={showOption?"selectBox border boxShadow ":'selectBox border '} >
                    <div className="selectOption" id={id} onClick={this.showMoreOption.bind(this)} >
                        <em className="selectTip">{ selectTitle}</em>
                        <span className={showOption?"selectArrow  selIcon":"selIcon "}></span>
                    </div>
                    <div className="optionUl border" style={{display:showOption?"block":"none",transition:'all .4s'}}>
                        <ul>
                            {selectOption.map((data,id)=>{
                                return  <li
                                    key={id}
                                    className={_currentId==id?"selected":""}
                                    onClick={this.selectedOption.bind(this,id,data,paramaName,paramaValue[id])}
                                > {data} </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
