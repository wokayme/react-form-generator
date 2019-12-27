
import { PredefinedField } from '../../types/field';
import { FieldType, InterfaceType} from '../../types/consts';

const label = {
    name: 'label',
    label: 'Label',
    type: FieldType.Input,
}

const name = {
    name: 'name',
    label: 'Name',
    type: FieldType.Input,
}

const defaultValue = {
    name: 'defaultValue',
    label: 'Default value',
    type: FieldType.Input,
}

const className = {
    name: 'className',
    label: 'CSS classes',
    type: FieldType.Input,
}

const isRequired = {
    name: 'isRequire',
    label: 'Required',
    type: FieldType.Switch,
}

const inputType = {
    name: 'type',
    label: 'Type of input',
    type: FieldType.Select,
    options: [
        {
            label: 'Text',
            value: 'text',
        },
        {
            label: 'Email',
            value: 'email',
        },
        {
            label: 'Number',
            value: 'number',
        }
    ]
}



const fieldsJSON: Array<PredefinedField> = [
    {
        label: "Input",
        name: FieldType.Input,
        options: [label, name, defaultValue, inputType, className, isRequired]
    },
    {
        label: "Text Area",
        name: FieldType.TextArea,
        options: [],
    },
    {
        label: "Radio Group",
        name: FieldType.RadioGroup,
        options: [],
    },
    {
        label: "Checkbox group",
        name: FieldType.CheckboxGroup,
        options: [],
    },
    {
        label: "Select",
        name: FieldType.Select,
        options: [],
    },
    {
        label: "Upload file",
        name: FieldType.UploadFile,
        options: [],
    },
    {
        label: "Button",
        name: InterfaceType.Button,
        options: [],
    },
    {
        label: "Heading",
        name: InterfaceType.Header,
        options: [],
    },
    {
        label: "Paragraph",
        name: InterfaceType.Paragraph,
        options: [],
    },
    {
        label: "Hidden input",
        name: FieldType.Hidden,
        options: [],
    },
];

export default fieldsJSON;