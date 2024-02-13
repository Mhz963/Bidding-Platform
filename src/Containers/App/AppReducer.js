const initialState = {
    adminData: null,
    userData: null,
    userName: null,
    password: null,
    isLoading: false,
    previlige: null,
    bidding: {
        currentBid: 0,
        userBid: 0,
        highestBidder: null,
    },
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return Object.assign({}, state, { isLoading: true, userData: null, adminData: null, })

        case 'STOP_LOADING':
            return Object.assign({}, state, { isLoading: false })

        case 'SET_PREVILIGE':
            return Object.assign({}, state, { previlige: action.payload })

        case 'FETCH_ADMIN_DATA':
            return Object.assign({}, state, { adminData: action.payload })

        case 'FETCH_USER_DATA':
            return Object.assign({}, state, { userData: action.payload })

        case 'FETCH_SUCCEEDED':
            console.log('FETCH_SUCCEEDED ... ', action.payload);
            return Object.assign({}, state, { students: action.payload })

        case 'ON_FIELD_CHANGE':
            return Object.assign({}, state, { [action.payload.key]: action.payload.value })

        case 'LOG_OUT_AND_RESET':
            return Object.assign({}, state, {
                adminData: null,
                userData: null,
                userName: null,
                password: null,
                isLoading: false,
                previlige: null
            })

        case 'BIDDING_BUTTON_CLICK':

            console.log('Bidding button clicked!');
            console.log('Mhz');

            return state;


        case 'BID_CHANGE':
            return {
                ...state,
                bidding: {
                    ...state.bidding,
                    userBid: parseInt(action.payload.value, 10) || 0,
                },
            };

        case 'PLACE_BID':
            if (state.bidding.userBid > state.bidding.currentBid) {
                return {
                    ...state,
                    bidding: {
                        ...state.bidding,
                        currentBid: state.bidding.userBid,
                        highestBidder: state.userName, // Assuming user is logged in
                    },
                };
            }
            return state;


        default:
            return state
    }
}

export default AppReducer