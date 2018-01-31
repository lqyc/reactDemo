import React, { Component} from 'react'
import { DateRange} from 'react-date-range'


function FormatDate (strTime) {
    let dateArr = []
    for(let id in strTime){
        var date = strTime[id]._d
        var month = ((date.getMonth()+1)<10)? '0'+(date.getMonth()+1) : (date.getMonth()+1)
        var day = (date.getDate()<10)? '0'+date.getDate() : date.getDate()
        var hours = (date.getHours()%10>=0) ? '0'+date.getHours() : date.getHours()
        var minutes = (date.getMinutes()%10>=0) ? '0'+date.getMinutes() : date.getMinutes()
        var seconds = (date.getSeconds()%10>=0) ? '0'+date.getSeconds() : date.getSeconds()
        dateArr.push(date.getFullYear()+"-"+month+"-"+day)

    }
    return dateArr
}
export default class DateRangePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateRang:''
    }
  }
  handleSelect(date) {
    if (this.props.onChange) {
      this.setState({
        dateRang:FormatDate(date)
      })
      this.props.onChange([null,null])
    }
  }
  hideDataBox() {
    const {dateRang} = this.state
    const self = this
    if (this.props.showPickerBox=='block') {
      this.props.onChange(dateRang)
      setTimeout(()=> {
        self.props.isHide()
      },50)
    }
  }

  render() {
    let {
      showPickerBox
    } = this.props;
    return (
      <div className='dateRangeBox' style={{display:showPickerBox}} >
                <DateRange
                    onChange={this.handleSelect.bind(this)}
                    lang = 'cn'
                />
                <div className='checkBtn right' onClick={this.hideDataBox.bind(this)}>确认</div>
            </div>
    )
  }
}
