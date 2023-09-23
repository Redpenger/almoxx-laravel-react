import { combineReducers} from 'redux'
import TelasReducer from './Telas/Reducer'
import TelaRefReducer from './TelaRef.jsx/Reducer'
import ForceReloadReducer from './ForceReload/Reducer'

const RootReducer = combineReducers({TelasReducer, TelaRefReducer, ForceReloadReducer})

export default RootReducer