import TelaRefActionTypes from "./TelaRefActionTypes"

const initialState = {}

const TelaRefReducer = (state = initialState, action) => {
    if(action.type == TelaRefActionTypes.ADD) {
        return {
            ...state,
            [action.payload.id] : action.payload.ref
        }
    }
    if(action.type == TelaRefActionTypes.REMOVE) {
        delete state[action.payload.id]
        return {
            ...state
        }
    }
    return state
}

export default TelaRefReducer