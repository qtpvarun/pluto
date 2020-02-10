import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMetrices, defaultValue } from 'app/shared/model/metrices.model';

export const ACTION_TYPES = {
  FETCH_METRICES_LIST: 'metrices/FETCH_METRICES_LIST',
  FETCH_METRICES: 'metrices/FETCH_METRICES',
  CREATE_METRICES: 'metrices/CREATE_METRICES',
  UPDATE_METRICES: 'metrices/UPDATE_METRICES',
  DELETE_METRICES: 'metrices/DELETE_METRICES',
  RESET: 'metrices/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMetrices>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MetricesState = Readonly<typeof initialState>;

// Reducer

export default (state: MetricesState = initialState, action): MetricesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_METRICES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_METRICES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_METRICES):
    case REQUEST(ACTION_TYPES.UPDATE_METRICES):
    case REQUEST(ACTION_TYPES.DELETE_METRICES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_METRICES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_METRICES):
    case FAILURE(ACTION_TYPES.CREATE_METRICES):
    case FAILURE(ACTION_TYPES.UPDATE_METRICES):
    case FAILURE(ACTION_TYPES.DELETE_METRICES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_METRICES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_METRICES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_METRICES):
    case SUCCESS(ACTION_TYPES.UPDATE_METRICES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_METRICES):
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

const apiUrl = 'api/metrices';

// Actions

export const getEntities: ICrudGetAllAction<IMetrices> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_METRICES_LIST,
  payload: axios.get<IMetrices>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMetrices> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_METRICES,
    payload: axios.get<IMetrices>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMetrices> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_METRICES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMetrices> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_METRICES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMetrices> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_METRICES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
