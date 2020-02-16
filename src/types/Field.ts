import { FieldType, InterfaceType } from './consts';

export type OptionsValues = {
  label?: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  helperText?: string;
  isDisabled?: boolean;
};

export type PredefinedField = {
  fieldLabel: string;
  fieldType: FieldType | InterfaceType;
  options: Array<OptionsValues>; // @TODO type
};

export type FieldLoaded = {
  label: string;
  fieldLabel?: string;
  fieldType?: string;
  optionsValues?: OptionsValues;
  options?: Array<FieldProto>;
  value?: string;
  name?: string;
};
export type FieldProto = FieldLoaded & {
  name: string;
  options?: Array<OptionsValues>;
  typeField: FieldType | InterfaceType;
};

type FieldBasic = {
  label: string;
  fieldLabel: string;
  fieldType: FieldType | InterfaceType;
  name: string;
  value?: string;
  options: Array<FieldProto>;
  optionsValues?: OptionsValues;
};

export type FieldComponentGenerator = {
  updateField: Function;
  optionsValues?: OptionsValues;
  label: string;
};

export default FieldBasic;
