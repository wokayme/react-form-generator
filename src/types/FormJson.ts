import Field, { FieldLoaded, FieldProto } from './Field';

export type FormJsonLoaded = Array<FieldLoaded>;
export type FormJsonOptions = Array<FieldProto>;
type FormJson = Array<Field>;
export default FormJson;
