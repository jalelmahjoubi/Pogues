import { uuid } from 'utils/utils';

export const defaultState = {
  owner: '',
  id: '',
  label: '',
  name: '',
  serie: '',
  operation: '',
  campaigns: [],
  lastUpdatedDate: '',
  final: '',
  agency: '',
  declarationMode: [],
};

export function formToState(form) {
  const { label, name, serie, operation, campaigns, declarationMode } = form;

  return {
    label,
    name,
    serie,
    operation,
    campaigns: campaigns.split(','),
    declarationMode: declarationMode.split(','),
  };
}

export function stateToForm(currentState) {
  const { label, name, serie, operation, campaigns, declarationMode } = currentState;

  // If serie and operation doesn't exist, we use campaigns to obtain them calling a service
  return {
    label,
    name,
    serie,
    operation,
    campaigns: campaigns.join(),
    declarationMode: declarationMode.join(),
  };
}

const Factory = (initialState = {}) => {
  let currentState = {
    ...defaultState,
    ...initialState,
    id: initialState.id || uuid(),
  };
  return {
    formToState: form => {
      currentState = {
        ...currentState,
        ...formToState(form),
      };
      return currentState;
    },
    stateToForm: () => {
      return stateToForm(currentState);
    },
  };
};

export default Factory;
