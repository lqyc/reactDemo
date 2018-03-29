import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReportScope from '../components/reportPortal/ReportScope'
import * as TodoActions from '../actions'


const Report = ({actions,location}) => (
  <div>
    <ReportScope actions={actions} location={location.search}/>
  </div>
)

Report.propTypes = {
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report)
