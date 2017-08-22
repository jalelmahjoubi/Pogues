import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateComponent } from 'actions/component';
import { setCurrentCodesListsInQuestion, addCodesListToQuestion } from 'actions/app-state';
import ComponentNewEdit from 'questionnaire/components/component/component-new-edit';
import { getCurrentCodesListsIdsStore } from 'utils/model/state-to-form-utils';
import { getActiveCodesListsStore } from 'utils/model/form-to-state-utils';
import ComponentTransformerFactory from 'utils/transformation-entities/component';
import CalculatedVariableTransformerFactory from 'utils/transformation-entities/calculated-variable';
import ExternalVariableTransformerFactory from 'utils/transformation-entities/external-variable';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

const mapStateToProps = state => {
  return {
    activeComponentsStore: state.appState.activeComponentsById,
    activeCodesListsStore: state.appState.activeCodeListsById,
    activeCalculatedVariablesStore: state.appState.activeCalculatedVariablesById,
    activeExternalVariablesStore: state.appState.activeExternalVariablesById,
    currentCodesListsIdsStore: state.appState.codeListsByActiveQuestion,
  };
};

const mapDispatchToProps = {
  updateComponent,
  setCurrentCodesListsInQuestion,
  addCodesListToQuestion,
};

class ComponentEditContainer extends Component {
  static propTypes = {
    updateComponent: PropTypes.func.isRequired,
    setCurrentCodesListsInQuestion: PropTypes.func.isRequired,
    componentId: PropTypes.string.isRequired,
    activeComponentsStore: PropTypes.object.isRequired,
    activeCodesListsStore: PropTypes.object.isRequired,
    activeCalculatedVariablesStore: PropTypes.object.isRequired,
    activeExternalVariablesStore: PropTypes.object.isRequired,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
    errors: PropTypes.array,
    currentCodesListsIdsStore: PropTypes.object,
    addCodesListToQuestion: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onSuccess: undefined,
    onCancel: undefined,
    errors: [],
    currentCodesListsIdsStore: {},
  };

  componentWillMount() {
    const { activeComponentsStore, componentId, setCurrentCodesListsInQuestion } = this.props;
    const component = activeComponentsStore[componentId];
    let currentCodesListsStoreFromQuestion = {};

    if (component.type === QUESTION) {
      currentCodesListsStoreFromQuestion = getCurrentCodesListsIdsStore(component.responseFormat);
    }

    setCurrentCodesListsInQuestion(currentCodesListsStoreFromQuestion);
  }

  render() {
    const {
      updateComponent,
      componentId,
      activeComponentsStore,
      activeCodesListsStore,
      activeCalculatedVariablesStore,
      activeExternalVariablesStore,
      onSuccess,
      onCancel,
      errors,
      currentCodesListsIdsStore,
      addCodesListToQuestion,
    } = this.props;
    const componentType = activeComponentsStore[componentId].type;
    const componentTransformer = ComponentTransformerFactory({
      initialStore: activeComponentsStore,
      codesListsStore: activeCodesListsStore,
      calculatedVariablesStore: activeCalculatedVariablesStore,
      externalVariablesStore: activeExternalVariablesStore,
      currentCodesListsIdsStore,
    });
    const initialValues = componentTransformer.stateToForm({ id: componentId });
    const submit = values => {
      let updatedCalculatedVariablesStore = {};
      let updatedExternalVariablesStore = {};
      let updatedCodesListsStore = {};
      const updatedComponentsStore = componentTransformer.formToStore(values, componentId);

      if (componentType === QUESTION) {
        updatedCodesListsStore = getActiveCodesListsStore(updatedComponentsStore[componentId].responseFormat);
        updatedCalculatedVariablesStore = CalculatedVariableTransformerFactory().formToStore(
          values.calculatedVariables
        );
        updatedExternalVariablesStore = ExternalVariableTransformerFactory().formToStore(values.externalVariables);
      }

      updateComponent(
        componentId,
        updatedComponentsStore,
        updatedCalculatedVariablesStore,
        updatedExternalVariablesStore,
        updatedCodesListsStore
      );
      if (onSuccess) onSuccess();
    };

    return (
      <ComponentNewEdit
        type={componentType}
        initialValues={initialValues}
        onSubmit={submit}
        onCancel={onCancel}
        errors={errors}
        onAddCodesList={addCodesListToQuestion}
        edit
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentEditContainer);
