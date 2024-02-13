// @flow strict

import * as React from 'react';
import SideMenu from './../../Components/SideMenu'
import {connect}  from 'react-redux'

// type Props = {||};

class PageBase extends React.Component{
    constructor(props){
        super(props)
    }
    
    render() {
        console.log(` PageBase Props are >`, this.props)
        return (
            <div style={{display:'flex'}}>
                <SideMenu previlige={this.props.previlige} dashboardProps={this.props.dashboardProps} selectMenuItem={this.props.selectMenuItem} activeItem={this.props.menuItem}/>
                <div>
                {
                    this.props.children
                }
                </div>
            </div>
        );
    }
}
const mapState = state => {
    let {menuItem} = state.pageBaseReducer
    let {AppState} = state.AppReducer

    return {
       menuItem,
       AppState,
       state
    }
}
const mapDispatch = dispatch => {
    // console.log('diapatch in pagebase',dispatch)
    return{
        selectMenuItem: (item, props) =>{ 
            if(item.title === 'Log out')
            {   
                return  dispatch({type: 'LOG_OUT'}) 
            }
            else{
               return dispatch({type: 'SELECT_MENU_ITEM', payload:item.title}) 
            }
        }
    }
}
export default connect(mapState, mapDispatch)(PageBase)