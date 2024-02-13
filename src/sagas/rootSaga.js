import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'

import appSaga from './../Containers/App/AppSaga'
// import watchTeachersFetch from './../TeachersSaga'
// import watchStudentsFetch from './../StudentsSaga'


export default function* rootSaga() {
    yield all([
        appSaga(),
        // watchStudentsFetch()
    ])
  }