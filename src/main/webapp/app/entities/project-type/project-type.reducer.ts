import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProjectType, defaultValue } from 'app/shared/model/project-type.model';

export const ACTION_TYPES = {
  FETCH_PROJECTTYPE_LIST: 'projectType/FETCH_PROJECTTYPE_LIST',
  FETCH_PROJECTTYPE: 'projectType/FETCH_PROJECTTYPE',
  CREATE_PROJECTTYPE: 'projectType/CREATE_PROJECTTYPE',
  UPDATE_PROJECTTYPE: 'projectType/UPDATE_PROJECTTYPE',
  DELETE_PROJECTTYPE: 'projectType/DELETE_PROJECTTYPE',
  RESET: 'projectType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProjectType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProjectTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: ProjectTypeState = initialState, action): ProjectTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROJECTTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROJECTTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROJECTTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_PROJECTTYPE):
    case REQUEST(ACTION_TYPES.DELETE_PROJECTTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROJECTTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROJECTTYPE):
    case FAILURE(ACTION_TYPES.CREATE_PROJECTTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_PROJECTTYPE):
    case FAILURE(ACTION_TYPES.DELETE_PROJECTTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROJECTTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROJECTTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROJECTTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_PROJECTTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROJECTTYPE):
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

const apiUrl = 'api/project-types';

// Actions

export const getEntities: ICrudGetAllAction<IProjectType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROJECTTYPE_LIST,
  payload: axios.get<IProjectType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProjectType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROJECTTYPE,
    payload: axios.get<IProjectType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProjectType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROJECTTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProjectType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROJECTTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProjectType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROJECTTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
