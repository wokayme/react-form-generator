
const label = {
    name: 'label',
    label: 'Label',
    type: 'input',
}

const name = {
    name: 'name',
    label: 'Name',
    type: 'input',
}

const defaultValue = {
    name: 'defaultValue',
    label: 'Default value',
    type: 'input',
}

const className = {
    name: 'className',
    label: 'CSS classes',
    type: 'input',
}

const isRequired = {
    name: 'isRequire',
    label: 'Required',
    type: 'switch',
}

const inputType = {
    name: 'type',
    label: 'Type of input',
    type: 'select',
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


const fieldsJSON = [
    {
        label: "Input",
        name: 'input',
        options: [label, name, defaultValue, inputType, className, isRequired]
    },
    {
        label: "Text Area",
        name: 'textarea'
    },
    {
        label: "Radio Group",
        name: 'radioGroup'
    },
    {
        label: "Checkbox group",
        name: 'checkboxGroup'
    },
    {
        label: "Select",
        name: 'select'
    },
    {
        label: "Upload file",
        name: 'uploadFile'
    },
    {
        label: "Button",
        name: 'button'
    },
    {
        label: "Header",
        name: 'header'
    },
    {
        label: "Paragraph",
        name: 'paragraph'
    },
    {
        label: "Hidden input",
        name: 'hiddenInput'
    },
];

export default fieldsJSON;