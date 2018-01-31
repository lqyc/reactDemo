import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TableWrap from '../components/table/TableWrap'
import * as TodoActions from '../actions'

const TableMainBox =({actions,adminTaskList})=>{
	console.log(adminTaskList)
	return(
	<div className="tableMainBox">
      <TableWrap actions={actions}
                 adminTaskList={adminTaskList}/>
	</div>
)}

TableMainBox.propTypes={
  actions:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  adminTaskList: state.adminTaskList
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps)(TableMainBox)