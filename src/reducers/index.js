import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import adminTaskList from './adminTaskList'


const rootReducer = combineReducers({
	adminTaskList, 
	routing: routerReducer
})

export default rootReducer
 