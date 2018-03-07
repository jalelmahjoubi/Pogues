import {
  QUESTION_TYPE_ENUM,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DATATYPE_NAME
} from 'constants/pogues-constants';
import { uuid } from 'utils/utils';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;
const { TEXT, BOOLEAN } = DATATYPE_NAME;

export function sortByYAndX(store) {
  return (id1, id2) => {
    let c1 = id1;
    let c2 = id2;
    if (store) {
      c1 = store[id1];
      c2 = store[id2];
    }

    if (!c1.y) return c1.x - c2.x;
    return c1.y * 100 + c1.x - (c2.y * 100 + c2.x);
  };
}

export function getCollecteVariable(
  name,
  label,
  coordinates,
  reponseFormatValues = {}
) {
  let collectedVariable = {
    id: uuid(),
    name,
    label,
    type: reponseFormatValues.type,
    TEXT: reponseFormatValues.TEXT,
    NUMERIC: reponseFormatValues.NUMERIC,
    DATE: reponseFormatValues.DATE,
    BOOLEAN: reponseFormatValues.BOOLEAN
  };

  if (coordinates) collectedVariable = { ...collectedVariable, ...coordinates };

  return collectedVariable;
}

export function getCollectedVariablesMultiple(
  questionName,
  form,
  codesListStore
) {
  const {
    [PRIMARY]: { [DEFAULT_CODES_LIST_SELECTOR_PATH]: { codes, id } },
    [MEASURE]: { type: typeMeasure }
  } = form;
  let listCodes = codes;

  if (codesListStore[id]) {
    const codesStore = codesListStore[id].codes;
    listCodes = Object.keys(codesStore).map(key => codesStore[key]);
  }

  let reponseFormatValues = {
    type: BOOLEAN
  };

  if (typeMeasure === CODES_LIST) {
    reponseFormatValues = {
      type: TEXT,
      [TEXT]: {
        maxLength: 1,
        pattern: ''
      }
    };
  }

  return listCodes.map((c, index) =>
    getCollecteVariable(
      `${questionName}${index + 1}`,
      `${c.value} - ${c.label}`,
      { x: index + 1 },
      reponseFormatValues
    )
  );
}

export function getCollectedVariablesTable(questionName, form, codesListStore) {
  function getReponsesValues(measure) {
    let reponseFormatValues = {
      type: TEXT,
      [TEXT]: {
        maxLength: 1,
        pattern: ''
      }
    };

    if (measure.type === SIMPLE) {
      reponseFormatValues = {
        type: measure[SIMPLE].type,
        BOOLEAN: measure[SIMPLE].BOOLEAN,
        DATE: measure[SIMPLE].DATE,
        NUMERIC: measure[SIMPLE].NUMERIC,
        TEXT: measure[SIMPLE].TEXT
      };
    }
    return reponseFormatValues;
  }
  const collectedVariables = [];
  let codesListState;
  let codesStore;
  let codesStatePrimary;
  let codesStateSecondary;
  let codePrimary;
  let codeSecondary;
  let measure;
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState
  } = form;

  if (primaryState.type === CODES_LIST) {
    const {
      [CODES_LIST]: {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: {
          codes: componentCodesStatePrimary,
          id: codesListIdPrimary
        }
      }
    } = primaryState;

    codesListState = codesListStore[codesListIdPrimary] || {};
    codesStore = codesListState.codes || {};
    codesStatePrimary = Object.keys(codesStore).map(key => codesStore[key]);
    if (codesStatePrimary.length === 0)
      codesStatePrimary = componentCodesStatePrimary;

    if (secondaryState && secondaryState.showSecondaryAxis) {
      const {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: {
          codes: componentCodesStateSecondary,
          id: codesListIdSecondary
        }
      } = secondaryState;

      codesListState = codesListStore[codesListIdSecondary] || {};
      codesStore = codesListState.codes || {};
      codesStateSecondary = Object.keys(codesStore).map(key => codesStore[key]);
      if (codesStateSecondary.length === 0)
        codesStateSecondary = componentCodesStateSecondary;

      // First case
      for (let i = 0; i < codesStatePrimary.length; i += 1) {
        codePrimary = codesStatePrimary[i];
        for (let j = 0; j < codesStateSecondary.length; j += 1) {
          codeSecondary = codesStateSecondary[j];
          collectedVariables.push(
            getCollecteVariable(
              `${questionName}${i + 1}${j + 1}`,
              `${codePrimary.label}-${codeSecondary.label}-${
                measureState.label
              }`,
              { x: i + 1, y: j + 1 },
              getReponsesValues(measureState)
            )
          );
        }
      }
    } else {
      // Second case
      for (let i = 0; i < codesStatePrimary.length; i += 1) {
        codePrimary = codesStatePrimary[i];
        for (let j = 0; j < listMeasuresState.measures.length; j += 1) {
          measure = listMeasuresState.measures[j];
          collectedVariables.push(
            getCollecteVariable(
              `${questionName}${i + 1}${j + 1}`,
              `${codePrimary.label}-${measure.label}`,
              {
                x: i + 1,
                y: j + 1
              },
              getReponsesValues(measure)
            )
          );
        }
      }
    }
  } else {
    const { LIST: { numLinesMin, numLinesMax } } = primaryState;
    const numLines = numLinesMax - numLinesMin + 1;

    // Third case
    for (let i = 0; i < numLines; i += 1) {
      for (let j = 0; j < listMeasuresState.measures.length; j += 1) {
        measure = listMeasuresState.measures[j];

        collectedVariables.push(
          getCollecteVariable(
            `${questionName}${i + 1}${j + 1}`,
            `Line${i + 1}-${measure.label}`,
            {
              x: i + 1,
              y: j + 1
            },
            getReponsesValues(measure)
          )
        );
      }
    }
  }
  return collectedVariables.sort(sortByYAndX());
}

export function generateCollectedVariables(
  responseFormat,
  questionName,
  form,
  codesListStore,
  reponseFormatValues
) {
  let generatedCollectedVariables = [];

  if (responseFormat === SIMPLE) {
    generatedCollectedVariables = [
      getCollecteVariable(
        questionName,
        `${questionName} label`,
        undefined,
        reponseFormatValues
      )
    ];
  } else if (responseFormat === SINGLE_CHOICE) {
    generatedCollectedVariables = [
      getCollecteVariable(questionName, `${questionName} label`, undefined, {
        type: TEXT,
        [TEXT]: {
          maxLength: 1,
          pattern: ''
        }
      })
    ];
  } else if (responseFormat === MULTIPLE_CHOICE) {
    generatedCollectedVariables = getCollectedVariablesMultiple(
      questionName,
      form,
      codesListStore
    );
  } else if (responseFormat === TABLE) {
    generatedCollectedVariables = getCollectedVariablesTable(
      questionName,
      form,
      codesListStore
    );
  }

  return generatedCollectedVariables;
}
