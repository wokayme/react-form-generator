import { PredefinedField } from '../../types/Field';
import { FieldType, FieldTypeCreator, InterfaceType } from '../../types/consts';

const label = {
  name: 'label',
  label: 'Label',
  typeField: FieldType.Input
};

const name = {
  name: 'name',
  label: 'Name',
  typeField: FieldType.Input
};

const placeholder = {
  name: 'placeholder',
  label: 'Placeholder',
  typeField: FieldType.Input
};

const defaultValue = {
  name: 'defaultValue',
  label: 'Default value',
  typeField: FieldType.Input
};

const className = {
  name: 'className',
  label: 'CSS classes',
  typeField: FieldType.Input
};

const helperText = {
  name: 'helperText',
  label: 'Tip text',
  typeField: FieldType.Input
};

const isRequired = {
  name: 'isRequire',
  label: 'Required',
  typeField: FieldType.Switch
};

const isDisabled = {
  name: 'isDisabled',
  label: 'Disabled',
  typeField: FieldType.Switch
};

const radioCreator = {
  name: 'radioForm',
  label: 'Radio options',
  typeField: FieldTypeCreator.Radio
};

const inputType = {
  name: 'type',
  label: 'Type of input',
  typeField: FieldType.Select,
  options: [
    {
      label: 'Text',
      value: 'text'
    },
    {
      label: 'Email',
      value: 'email'
    },
    {
      label: 'Number',
      value: 'number'
    },
    {
      label: 'Password',
      value: 'password'
    }
  ]
};

const fieldsJSON: Array<PredefinedField> = [
  {
    fieldLabel: 'Input',
    fieldType: FieldType.Input,
    options: [
      label,
      name,
      defaultValue,
      inputType,
      className,
      isRequired,
      placeholder,
      isDisabled,
      helperText
    ]
  },
  {
    fieldLabel: 'Text Area',
    fieldType: FieldType.TextArea,
    options: []
  },
  {
    fieldLabel: 'Radio Group',
    fieldType: FieldType.RadioGroup,
    options: [label, name, radioCreator]
  },
  {
    fieldLabel: 'Checkbox group',
    fieldType: FieldType.CheckboxGroup,
    options: [label, name]
  },
  {
    fieldLabel: 'Select',
    fieldType: FieldType.Select,
    options: [label, name]
  },
  {
    fieldLabel: 'Upload file',
    fieldType: FieldType.UploadFile,
    options: []
  },
  {
    fieldLabel: 'Button',
    fieldType: InterfaceType.Button,
    options: []
  },
  {
    fieldLabel: 'Heading',
    fieldType: InterfaceType.Header,
    options: []
  },
  {
    fieldLabel: 'Paragraph',
    fieldType: InterfaceType.Paragraph,
    options: []
  },
  {
    fieldLabel: 'Hidden input',
    fieldType: FieldType.Hidden,
    options: []
  }
];

export default fieldsJSON;
