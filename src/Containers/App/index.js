import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './../../Components/Auth/Login'

import { connect } from 'react-redux'

// import customConsole from './../../customConsole'
class App extends Component {
  constructor(props) {
    super(props)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.Login = this.Login.bind(this)
  }
  onFieldChange = (value, key) => {
    // customConsole(value, ',', previlige)
    console.log(value, ',', key)
    this.props.onFieldChange(value, key)
  }
  Login = (previlige) => {
    // console.log('previlige : ',previlige)
    switch (previlige) {
      case 'userLogin':
        // this.props.LoginUser({userName: this.props.userName, password: this.props.password});
        this.props.LoginUser(this.props);
        break;

      case 'adminLogin':
        // this.props.LoginAdmin({userName: this.props.userName, password: this.props.password});
        this.props.LoginAdmin(this.props);
        break;

      default:
        console.log('no proper action defined ...');
        break;
    }
  }
  render() {
    console.log('APP Props ', this.props)
    return (
      <div className={"App"
      }>
        {
          this.props.isLoading ?
            <div>Loading...</div>
            :
            <Login
              onFieldChange={this.onFieldChange}
              Login={this.Login}
            />
        }
      </div>
    );
  }
}
const mapState = (state) => {
  let { userName, password, isLoading } = state.AppReducer
  let { menuItem } = state.pageBaseReducer
  return { userName, password, isLoading, menuItem }
}
const mapDispatch = (dispatch) => ({
  LoginAdmin: (propsObj) => dispatch({ type: 'ADMIN_LOGIN', payload: { ...propsObj, previlige: 'userLogin', userName: propsObj.userName, password: propsObj.password } }),
  LoginUser: (propsObj) => dispatch({ type: 'USER_LOGIN', payload: { ...propsObj, previlige: 'adminLogin', userName: propsObj.userName, password: propsObj.password } }),
  onFieldChange: (value, key) => dispatch({ type: 'ON_FIELD_CHANGE', payload: { key, value } }),
  onBidChange: (value) => dispatch({ type: 'BID_CHANGE', payload: { value } }),
  onBiddingButtonClick: () => dispatch({ type: 'BIDDING_BUTTON_CLICK' }), // replace 'BIDDING_BUTTON_CLICK' with the actual action type
  placeBid: () => dispatch({ type: 'PLACE_BID' }),
})

export default connect(mapState, mapDispatch)(App);
