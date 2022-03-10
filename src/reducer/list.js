const initialState = []
const listTrackReducer = (state = initialState,action) => {
    switch (action.type) {
        case 'SET_LIST_TRACK': {
            return action.payload
        }
        default: {
            return state
        }
    }
}
export default listTrackReducer