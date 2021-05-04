import store from './store'
import * as actions from './actionTypes'
import { bugAdded, bugResolved } from './actions';

//Function inside subscribe gets called every time the store gets changed
const unsubscribe = store.subscribe(() => {
  console.log('Store changed!', store.getState())
})

store.dispatch(bugAdded("Bug 1"))
store.dispatch(bugResolved(1))



console.log(store.getState())