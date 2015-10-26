import {Dispatcher} from 'flux';

const appDispatcher = new Dispatcher();
const dispatch = appDispatcher.dispatch.bind(appDispatcher);
const register = appDispatcher.register.bind(appDispatcher);


export default appDispatcher;
export {dispatch, register};
