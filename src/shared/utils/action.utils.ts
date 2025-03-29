/**
 * Generic action interfaces and utilities to reduce Redux boilerplate
 */

/**
 * Standard Redux action interface
 */
export interface Action<T = any> {
  type: string;
  payload?: T;
}

/**
 * Generic error payload interface
 */
export interface ErrorPayload {
  errorMessage: string;
}

/**
 * Action creator function type
 */
export type ActionCreator<T = any> = ((payload?: T) => Action<T>) & { type: string };

/**
 * Creates a simple action creator function with embedded type
 * 
 * @param type The action type
 * @returns A function that creates an action with the specified type
 */
export const createAction = <T = void>(type: string): ActionCreator<T> => {
  const actionCreator = (payload?: T): Action<T> => ({
    type,
    payload,
  });
  
  // Store the type in the function itself
  (actionCreator as ActionCreator<T>).type = type;
  
  return actionCreator as ActionCreator<T>;
};

/**
 * Type for async action creators group
 */
export interface AsyncActionCreators<RequestT = any, SuccessT = any> {
  request: ActionCreator<RequestT>;
  success: ActionCreator<SuccessT>;
  failure: ActionCreator<ErrorPayload>;
  types: {
    request: string;
    success: string;
    failure: string;
  };
}

/**
 * Creates a set of standard async action creators (request, success, failure)
 * 
 * @param baseType The base action type 
 * @returns Object with request, success, and failure action creators
 */
export const createAsyncActions = <RequestT = any, SuccessT = any>(baseType: string): AsyncActionCreators<RequestT, SuccessT> => {
  const request = createAction<RequestT>(`${baseType}Request`);
  const success = createAction<SuccessT>(`${baseType}Success`);
  const failure = createAction<ErrorPayload>(`${baseType}Failure`);
  
  return {
    request,
    success,
    failure,
    types: {
      request: request.type,
      success: success.type,
      failure: failure.type,
    }
  };
};

/**
 * Type for setter action creator
 */
export interface SetterActionCreator<T = any> {
  type: string;
  setter: ActionCreator<T>;
}

/**
 * Creates an action creator for setting a value
 * 
 * @param propertyName The property name to set
 * @returns An action creator for setting the specified property
 */
export const createSetterAction = <T>(propertyName: string): SetterActionCreator<T> => {
  const type = `set${propertyName.charAt(0).toUpperCase() + propertyName.slice(1)}`;
  const setter = createAction<T>(type);
  
  return {
    type: setter.type,
    setter
  };
};

/**
 * Type for reducer handler functions
 */
export type ReducerHandler<State, Payload = any> = (state: State, payload?: Payload) => State;

/**
 * Type for reducer handler map
 */
export type ReducerHandlerMap<State> = {
  [actionType: string]: ReducerHandler<State, any>;
};

/**
 * Creates a reducer from a map of action types to handler functions
 * 
 * @param initialState The initial state
 * @param handlers Map of action types to handler functions
 * @returns A reducer function
 */
export const createReducer = <State>(initialState: State, handlers: ReducerHandlerMap<State>) => {
  return (state: State = initialState, action: Action): State => {
    const { type, payload } = action;
    
    if (handlers.hasOwnProperty(type)) {
      return handlers[type](state, payload);
    }
    
    return state;
  };
};
