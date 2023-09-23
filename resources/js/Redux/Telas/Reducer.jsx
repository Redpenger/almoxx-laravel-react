import TelasActionTypes from "./TelasActionTypes"

const initialState = {}

const TelasReducer = (state = initialState, action) => {
    if(action.type == TelasActionTypes.ADD) {
        return {
            ...state,
            [action.payload.id]: action.payload.tela
        }
    }
    if(action.type == TelasActionTypes.REMOVE) {
        delete state[action.payload.id]
        return {
            ...state
        }
    }
    return state
}

export default TelasReducer