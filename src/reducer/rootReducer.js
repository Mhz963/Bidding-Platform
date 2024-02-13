import {combineReducers} from 'redux'
import AppReducer from './../Containers/App/AppReducer'
import pageBaseReducer from './../Containers/PageBase/pageBaseReducer'
// import studentsReducer from './../containers/Students/studentsReducer'
// import teachersReducer from './../containers/Teachers/teachersReducer'

const RootReducers = combineReducers({
    AppReducer,
    pageBaseReducer,
    // studentsReducer,
})

export default RootReducers