import { combineReducers } from 'redux';
import UserReducer from './UserReducer';

const RootReducer = combineReducers({
    user: UserReducer
});
export default RootReducer;
export type RootState = ReturnType<typeof RootReducer>;