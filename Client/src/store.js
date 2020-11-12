import React, {createContext, useReducer} from 'react';
import booksReducer from "./Reducers/BooksReducer";
import bookInfoReducer from "./Reducers/BookInfoReducer";

const store = createContext({});

const { Provider } = store;

const rootReducers = (state={}, action={}) => {
    return {
        books: booksReducer(state.books, action),
        bookInfo: bookInfoReducer(state.bookInfo, action)
    }
}

const InitialRootReducer = rootReducers();

const Logger = ({action, state, nextState }) => {
  console.log(
    `%c ${action.type}`, 
    'background: #222; padding: 3px; color: #bada55',
    "Action: ", action, 
    "State: ", state ,
    "NextState", nextState 
  )
}

const throttle = (time) => {
  let cache = {}

  return ({prop, func}) => {
    const currentTime = new Date().getTime();
    const cachedTimeForProp = cache[prop];
    const isExists = !!cachedTimeForProp;

    if ((isExists && currentTime - cachedTimeForProp > time) || !isExists) {
      cache[prop] = currentTime;
      func(); 
    }
  }
}

const throttled = throttle(100);

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    const nextState = rootReducers(state, action);

    throttled({ 
      prop: action.type,
      func: () => Logger({action, state, nextState})
    });
    
    return rootReducers(state, action)
  }, InitialRootReducer);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }