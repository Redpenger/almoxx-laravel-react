const { default: FiltroActionTypes } = require("./FiltroActionTypes")

const initialState = {}

const FiltroReducer = (state = initialState, action) => {
    if(action.type == FiltroActionTypes.ADD) {
        return {
            ...state,
            [action.payload.id] : action.payload.filtro
        }
    }
    return state
}