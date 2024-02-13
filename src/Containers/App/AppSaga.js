import {
    takeLatest,
    // call, 
    put
} from 'redux-saga/effects'
// import { delay } from 'redux-saga'
import Data from './../../LocalStore'
// FETCH_USERS
function* userLogin(action) {
    try {
        yield console.log('userlogin ....', action, window, window.history)
        let { userName, password, previlige } = action.payload
        if (Data.users[userName] && password === Data.users[userName]['pwd']) {
            yield put({ type: 'SET_PREVILIGE', payload: 'USER' })
            // yield console.log(userName in Data.admins ,  password === Data.admins[userName].pwd, 'data.... ', Data.admins[userName] )
            yield put({ type: 'START_LOADING' })
            yield put({ type: 'FETCH_USER_DATA', payload: Data.users[userName] })
            yield action.payload.history.push(`/Dashboard`)
            yield put({ type: 'SELECT_MENU_ITEM', payload: 'Dashboard' })
            yield put({ type: 'STOP_LOADING' })
        }
    }
    catch (error) {
        console.log(error)
        yield put({ type: 'FETCH_STUDENTS_FAILED', payload: 'some error' })
    }
}

function* adminLogin(action) {
    try {
        yield console.log('admin login ....', action)
        let { userName, password, previlige } = action.payload
        if (Data.admins[userName] && password === Data.admins[userName]['pwd']) {
            yield put({ type: 'SET_PREVILIGE', payload: 'ADMIN' })
            // yield console.debug(' ------->',userName in Data.admins ,  password === Data.admins[userName].pwd,  'data.... ', Data.users[userName])
            yield put({ type: 'START_LOADING' })
            yield put({ type: 'FETCH_ADMIN_DATA', payload: Data.admins[userName] })
            yield action.payload.history.push(`/Dashboard`)
            yield put({ type: 'SELECT_MENU_ITEM', payload: 'Dashboard' })
            yield put({ type: 'STOP_LOADING' })
        }
    }
    catch (error) {
        console.log(error)
        yield put({ type: 'FETCH_STUDENTS_FAILED', payload: 'some error' })
    }
}

function* logout(action) {
    console.log('logout ', action)
    try {
        yield put({ type: 'LOG_OUT_AND_RESET' })
        // yield action.payload.history.push(`/`)
    }
    catch (error) {
        console.log(error)
        yield put({ type: 'LOG_OUT_FAILED', payload: 'some error' })
        // yield action.payload.history.push(`/`)
    }
}
// function* login(action) {
//     // console.log('LOGIN :', action)
//     let { userName, password, previlige } = action.payload
//     try {
//         yield console.log('LOGIN', Data, '\n payload: ', action, Data.users[userName] && password === Data.users[userName]['pwd'])
//         yield put({ type: 'SET_PREVILIGE', payload: previlige })

//         previlige === 'adminLogin' && Data.admins[userName] && password === Data.admins[userName]['pwd'] ?
//             yield adminLogin(userName, action)

//             : action.payload.previlige === 'userLogin' && Data.users[userName] && password === Data.users[userName]['pwd'] ?

//                 yield userLogin(userName, action)
//                 :


//                 yield put({ type: 'STOP_LOADING' })

//         //  yield action.payload.history.push(`/Result`)
//     }
//     catch (error) {
//         console.log(error)
//         yield put({ type: 'FETCH_STUDENTS_FAILED', payload: 'some error' })
//     }
// }

// use them in parallel
export default function* appSaga() {
    yield takeLatest('ADMIN_LOGIN', adminLogin)
    yield takeLatest('USER_LOGIN', userLogin)
    yield takeLatest('LOG_OUT', logout)
    //   yield takeEvery('CREATE_USER', createUser)
}




