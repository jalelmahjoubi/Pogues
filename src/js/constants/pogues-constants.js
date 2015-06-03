module.exports = {

  ActionTypes: {
    LOAD_QUESTIONNAIRE_LIST: 'LOAD_QUESTIONNAIRE_LIST',
    RECEIVE_QUESTIONNAIRE_LIST: 'RECEIVE_QUESTIONNAIRE_LIST',
    QUESTIONNAIRE_LIST_LOADING_FAILED: 'QUESTIONNAIRE_LIST_LOADING_FAILED',
    SELECT_QUESTIONNAIRE: 'SELECT_QUESTIONNAIRE',
    LOAD_QUESTIONNAIRE: 'LOAD_QUESTIONNAIRE',
    RECEIVE_QUESTIONNAIRE: 'RECEIVE_QUESTIONNAIRE',
    QUESTIONNAIRE_LOADING_FAILED: 'QUESTIONNAIRE_LOADING_FAILED',
    CREATE_QUESTIONNAIRE_LOCAL: 'CREATE_QUESTIONNAIRE_LOCAL',
    CREATE_QUESTIONNAIRE_DISTANT: 'CREATE_QUESTIONNAIRE_DISTANT',
    ADD_COMPONENT: 'ADD_COMPONENT',
    DELETE_SEQUENCE: 'DELETE_SEQUENCE',
    ADD_QUESTION: 'ADD_QUESTION',
    DELETE_QUESTION: 'DELETE_QUESTION',
    EDIT_COMPONENT : 'EDIT_COMPONENT',
    FILTER_COMPONENTS : 'FILTER_COMPONENTS',
    FILTER_QUESTIONNAIRES: 'FILTER_QUESTIONNAIRES',
    LANGUAGE_CHANGED: 'LANGUAGE_CHANGED',
    SAVE_QUESTIONNAIRE : 'SAVE_QUESTIONNAIRE',
    SWITCH_VIEW_QUESTIONNAIRE: 'SWITCH_VIEW_QUESTIONNAIRE',
    SWITCH_VIEW_PICKER: 'SWITCH_VIEW_PICKER',
    SWITCH_VIEW_CONFIG: 'SWITCH_VIEW_CONFIG',
    SHOW_NEW_QUESTIONNAIRE: 'SHOW_NEW_QUESTIONNAIRE',
    RECEIVE_NEW_ID_FROM_SERVER: 'RECEIVE_NEW_ID_FROM_SERVER',
    EDIT_QUESTIONNAIRE: 'EDIT_QUESTIONNAIRE',
    CHANGE_CONFIG: 'CHANGE_CONFIG'
  },
  PayloadSources: {
    SERVER_SOURCE: 'SERVER_SOURCE',
    VIEW_SOURCE: 'VIEW_SOURCE'
  },
  StoreEvents: {
    CHANGE_EVENT: 'CHANGE_EVENT'
  },
  General: {
    ENTER_KEY_CODE: 13
  },
  ViewTypes: {
    'PICKER': 'PICKER',
    'QUESTIONNAIRE': 'QUESTIONNAIRE',
    'EDITION': 'EDITION',
    'CONFIG': 'CONFIG'
  }
};
