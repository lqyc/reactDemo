import React from 'react'
import {render} from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import {Switch, Route,Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import reducers from './reducers'
import HomeMainScope from './components/index/HomeMainScope'
import TableContainer from './containers/TableContainer'
import ChartMainScope from './components/chart/ChartMainScope'
import Error from './containers/Error'
// import { HashRouter as Router,Route} from 'react-router-dom';

const history = createHistory({basename: ''})
const middleware = routerMiddleware(history)

// const history = createMemoryHistory(location)
// const history = createBrowserHistory()
export const store = createStore(
  reducers,
  applyMiddleware(middleware),
  // compose(applyMiddleware(middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //插件调试，未安装会报错
)


render(
  <Provider store={store}>
     { /* ConnectedRouter will use the store from Provider automatically */ }
     <Router history={history}>
       <div>
         <Switch>
           <Route exact path="/" component={HomeMainScope} />
           <Route path="/about" component={TableContainer} />
           <Route path="/chart" component={ChartMainScope} />
           <Route path="*" component={Error} />
         </Switch>
       </div>
     </Router>
   </Provider>,
  document.getElementById('root')
)
