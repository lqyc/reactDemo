import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TableMainScope from '../components/table/TableMainScope'
import * as TodoActions from '../actions'

const TableContainer =({actions,adminTaskList})=>{
	// console.log(actions)
	return(
	<div className="tableMainBox">
      <TableMainScope actions={actions}
                 adminTaskList={adminTaskList}/>
	</div>
)}

TableContainer.propTypes={
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
	mapDispatchToProps)(TableContainer)