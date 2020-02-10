import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICalender, defaultValue } from 'app/shared/model/calender.model';

export const ACTION_TYPES = {
  FETCH_CALENDER_LIST: 'calender/FETCH_CALENDER_LIST',
  FETCH_CALENDER: 'calender/FETCH_CALENDER',
  CREATE_CALENDER: 'calender/CREATE_CALENDER',
  UPDATE_CALENDER: 'calender/UPDATE_CALENDER',
  DELETE_CALENDER: 'calender/DELETE_CALENDER',
  RESET: 'calender/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICalender>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CalenderState = Readonly<typeof initialState>;

// Reducer

export default (state: CalenderState = initialState, action): CalenderState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CALENDER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CALENDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CALENDER):
    case REQUEST(ACTION_TYPES.UPDATE_CALENDER):
    case REQUEST(ACTION_TYPES.DELETE_CALENDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CALENDER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CALENDER):
    case FAILURE(ACTION_TYPES.CREATE_CALENDER):
    case FAILURE(ACTION_TYPES.UPDATE_CALENDER):
    case FAILURE(ACTION_TYPES.DELETE_CALENDER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CALENDER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CALENDER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CALENDER):
    case SUCCESS(ACTION_TYPES.UPDATE_CALENDER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CALENDER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/calenders';

// Actions

export const getEntities: ICrudGetAllAction<ICalender> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CALENDER_LIST,
  payload: axios.get<ICalender>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICalender> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CALENDER,
    payload: axios.get<ICalender>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICalender> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CALENDER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICalender> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CALENDER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICalender> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CALENDER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
