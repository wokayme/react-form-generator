import { FieldType, FieldTypeCreator, InterfaceType } from './consts';

export type OptionsValues = {
  label?: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  helperText?: string;
  isDisabled?: boolean;
  radioForm?: Array<RadioValue>;
};

export type PredefinedField = {
  fieldLabel: string;
  fieldType: FieldType | InterfaceType | FieldTypeCreator;
  options: Array<OptionsValues>; // @TODO type
};

export type FieldLoaded = {
  label: string;
  fieldLabel?: string;
  fieldType?: string;
  optionsValues?: OptionsValues;
  options?: Array<FieldProto>;
  value?: string | Array<RadioValue>;
  name?: string;
};
export type FieldProto = FieldLoaded & {
  name: string;
  options?: Array<OptionsValues>;
  typeField: FieldType | InterfaceType | FieldTypeCreator;
};

type FieldBasic = {
  label: string;
  fieldLabel: string;
  fieldType: FieldType | InterfaceType;
  name: string;
  value?: string | Array<RadioValue>;
  options: Array<FieldProto>;
  optionsValues?: OptionsValues;
};

export type RadioValue = {
  label: string;
  name: string;
  defaultSelected: boolean;
};

export type FieldComponentGenerator = {
  updateField: Function;
  optionsValues?: OptionsValues;
  label: string;
};

export default FieldBasic;
