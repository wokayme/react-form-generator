import { FieldType, InterfaceType } from './consts';

export type OptionsValues = {[key: string]: string}

export type PredefinedField = {
    label: string,
    name: FieldType | InterfaceType,
    options: Array<Object>, //@TODO type
};

type FieldBasic = {
    label: string,
    type: FieldType | InterfaceType,
    name: string,
    value?: string,
    options: Array<FieldBasic>, //@TODO upate
    optionsValues?: OptionsValues,
}


export default FieldBasic;