import FormJson, { FormJsonLoaded } from '../../types/FormJson';
import fieldsJSON from './fieldsTypes';
import FieldBasic from '../../types/Field';

export function parseJsonLoaded(jsonLoaded: FormJsonLoaded): FormJson {
  return jsonLoaded.map(field => {
    const { label, fieldType } = field;
    return {
      ...fieldsJSON.find(fieldProto => fieldProto.fieldType === fieldType),
      ...field,
      optionsValues: {
        ...field.optionsValues,
        label
      }
    } as FieldBasic;
  });
}

export function clearJsonOutput(jsonToClean: FormJson): FormJsonLoaded {
  return jsonToClean.map(field => {
    const { label: optionsLabel, ...optionsValues } = field.optionsValues || {};
    return {
      label: optionsLabel || field.fieldLabel,
      fieldType: field.fieldType,
      optionsValues,
      value: field.value
    };
  });
}
