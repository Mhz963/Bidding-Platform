const initialState ={
    menuItem: '',

}

const pageBaseReducer = (state=initialState, action) => {
    switch(action.type){
        case 'SELECT_MENU_ITEM':
            console.log('SELECT_MENU_ITEM is called with payload : ',action.payload)
            return Object.assign({}, state, {menuItem: action.payload})

        default:
        return state
    }
}

export default pageBaseReducer