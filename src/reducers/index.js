import linksReducers from './links';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  links: linksReducers
});

export default allReducers;
