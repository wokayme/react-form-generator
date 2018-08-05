# React form builder generator
By this plugin you can easly create form by drag and drop available fields.
Live Preview: http://reactformbuilder.wokay.me/

![alt text](https://wokay.me/uploads/1533415655.gif)


# Quick start
##### 1. Install Plugin
`npm i react-form-creator`
##### 2. Import component to script
`import FormBuilder from 'react-form-creator'`
##### 3. Display/render component
```
          <FormBuilder />
```

# Component 'FilterBuilder options'

`jsonLoad` - You can pass previous generated json to recreate existing form

`fields` - Here you can define your own field to add. Example of value this option:
```
 fields={
         relation: { // name of new field
             classIcon: 'fa-flag',
             showFields: new Set(['optionBuilder']), //show field without open tab
             label: "Relation", //displayed label
             typeInput: "relation", //this same name like key of the object
             fields: {
                 'text': {
                     'inputType': "text",//possible type, another options: textarea | text |                      'inputType': "text",//possible type, another options: textarea | text | number | checkbox | optionBuilder | select
                     'label': 'Relation to component',//label
                     'value': "",//default value
                     'name': 'componentRelation'//name to which is added value in json
                 },
             },
             banField: new Set([
                 'placeholder',//remove default fields, list of them below
             ])
         },
     }
```
# Methods
**Get Json Callback**
`getJson` - Function which get data from existing form generator filter as argument. _IMPORTANT YOU NEED TO USE REFS TO CONNECT TO FORM, EXAMPLE OF USE UNDER_
`makeActionWhenJsonChange` - This function is trigger when form is changed, independs what change was made, it can be edit field or add new

# Examples
### Example of use methods
```


    getJsonCallback(){
        console.log(this.refs.formBuilder.getJson());
    }

    makeActionWhenJsonChange = (json) => {
        console.log(json)
    }
 
            <FormBuilder ref="formBuilder" makeActionWhenJsonChange={this.makeActionWhenJsonChange}/>
            <button onClick={()=>console.log(this.getJsonCallback())}>Show form in console</button>

```
### Example of use existing form to recreate
```
jsonload = [
               {
                   "typeField": "number",
                   "label": "number",
                   "required": true,
                   "name": "field_9_1533415584155",
                   "class": "",
                   "tipText": "",
                   "placeholder": "",
                   "value": "",
                   "min_value": "",
                   "max_value": "",
                   "step": "",
                   "sufix": ""
               },
               {
                   "typeField": "textArea",
                   "label": "",
                   "required": false,
                   "name": "field_dqd_1533415591447",
                   "class": "",
                   "tipText": "",
                   "placeholder": "",
                   "value": "",
                   "min_length": "",
                   "max_length": "",
                   "cols": "30",
                   "rows": "10"
               }
           ]

 <FormBuilder jsonLoad={this.jsonload}/>
            
```
### Pre defined fields
```
{
                'label' : {
                    'inputType': "text",
                    'label': 'Label',
                    'value': "",
                    'name': 'label'
                },
                'name' : {
                    'inputType': "text",
                    'label': 'Name',
                    'value': "",
                    'name': 'name'
                },
                'required' : {
                    'inputType': "checkbox",
                    'label': 'Required',
                    'value': false,
                    'name': 'required'
                },
                'class': {
                    'inputType': "text",
                    'label': 'CSS class',
                    'value': "",
                    'name': 'class'
                },
                'tipText': {
                    'inputType': "text",
                    'label': 'Tip',
                    'value': "",
                    'name': 'tipText'
                },
                'placeholder': {
                    'inputType': "text",
                    'label': 'Placeholder',
                    'value': "",
                    'name': 'placeholder'
                },
                'defaultValue': {
                    'inputType': "text",
                    'label': 'Default value',
                    'value': "",
                    'name': 'value'
                },
            }  
```

### Input type select
```
            {
                    'inputType': "select",
                    'label': 'Header level',
                    'name': 'headerlevel',
                    'options': [
                        {
                            'label': 'H1',
                            'value': 'h1'
                        },
                        {
                            'label': 'H2',
                            'value': 'h2'
                        },
                    ]
                }
```

# How generate form? Use another plugin:
https://github.com/seapage/generate-form-from-json

# License
GNU 3.0

# Author

### Krzysztof Łokaj "Wokay"
- Blog https://wokay.me/
- Twitter https://twitter.com/_Wokay
- Linkedin https://www.linkedin.com/in/wokay/
