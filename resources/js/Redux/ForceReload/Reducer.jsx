import ForceReloadActionTypes from "./ForceReloadActionTypes"

const initialState = {}

const ForceReloadReducer = (state = initialState, action) => {
    if(action.type == ForceReloadActionTypes.RELOAD) {
        return {
            ...state,
            [action.payload.id] : state[action.payload.id] != null ? state[action.payload.id] + 1 : 0
        }
    }
    return state
}

export default ForceReloadReducer