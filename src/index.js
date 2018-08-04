import React, { Component } from 'react';
import './FormBuilder.css';
import Field from './Field.js'
import FieldInGenerator from './FieldInGenerator.js'
class FormBuilder extends Component {

    jsonToLoad=[]

    constructor(props){
        super();


        if(props.fields){
            this.fields = Object.assign(this.fields, props.fields)
        }

        if(props.jsonToLoad!=undefined){
            //load existing json
            var arrayRes = []
            Object.keys(props.jsonToLoad).map((item)=>{
                arrayRes.push(this.normalElem(
                    props.jsonToLoad[item].typeField,
                    this.getCounter(),
                    props.jsonToLoad[item]
                    )
                )
            })


            this.state.fieldsToEdit = arrayRes
            this.state.formToGenerate = []


        }
    }

    someElementOfArrayHasClass(arr, className){
        var result = false
        arr.map(elem=>{
            if (elem.className)
                if(elem.className.includes(className)){
                    result = true
                }
        })
        return result
    }

    returnElementOfArrayHasClass(arr, className){
        var result = false
        arr.map(elem=>{
            if (elem.className)
                if(elem.className.includes(className)){
                    result = elem
                }
        })

        return result
    }
    dragedElement
    pos = 0
    outsideForm = false



    componentDidMount(){

        // if(this.props.jsonToLoad)
        //     this.jsonToLoad = this.props.jsonToLoad


        document.addEventListener("dragstart", ( event )=>{
            if(document.activeElement.tagName == "INPUT"||document.activeElement.tagName == "TEXTAREA"){
                event.preventDefault()
                return
            }
            this.dragedElement = event.target
            this.dragedElement.classList.add('actualmoving')

            if(event.target.className.includes('elementOFDrag')){
                this.dragedElement = event.target
            }
            this.outsideForm = false
        });
        document.addEventListener("dragover", ( event )=>{
            event.preventDefault();
            var dragedFieldClassNames = this.dragedElement.className

            if(this.someElementOfArrayHasClass(event.path,'formBuilderGroup')){
                //mouse over formbuilder
                if(dragedFieldClassNames.includes('fieldToDrag')){
                    //field is moving from right bar to generator form


                    //there aren't any field in generator form
                    if(this.state.fieldsToEdit.length == 0){
                        document.getElementById("formBuilder-form").classList.add("placeholder")
                    }else{
                        //there is some field in generator form
                        this.clearFromPlaceHolders()
                        var allExistingFields = document.querySelectorAll('.elementOFDrag')


                        if(this.returnElementOfArrayHasClass(event.path,'elementOFDrag')){
                            //position relative to existing fields

                            var posAct = 0


                            for(var item of allExistingFields){
                                if(item.getAttribute('data-order-form-builder') == this.returnElementOfArrayHasClass(event.path,'elementOFDrag').getAttribute('data-order-form-builder')){
                                    this.pos = posAct
                                    break
                                }
                                posAct++
                            }
                            //add placeholder to existing field
                            allExistingFields[this.pos].classList.add("placeholder-up")
                        }else{
                            //mouse over form but not on element, so select default under
                            document.getElementById("formBuilder-form").classList.add("placeholder")
                            //position on last item
                            if(allExistingFields)
                                this.pos = allExistingFields.length
                        }

                    }
                }else{
                    //moving existing field

                    //clear before placeholder first
                    this.clearFromPlaceHolders();


                    //get existing fields
                    var allExistingFields = document.querySelectorAll('.elementOFDrag')

                    //check if actual dragged element is on it self, if yes it won't show placeholder
                    if(
                        this.returnElementOfArrayHasClass(event.path,'elementOFDrag')
                        &&
                        this.dragedElement.getAttribute('data-order-form-builder') == this.returnElementOfArrayHasClass(event.path,'elementOFDrag').getAttribute('data-order-form-builder')
                    )
                        return

                    if(this.returnElementOfArrayHasClass(event.path,'elementOFDrag')){
                        //position relative to existing fields
                        var posAct = 0;

                        var blockAfterElementPlaceholder = false
                        for(var item of allExistingFields){
                            if(this.dragedElement.getAttribute('data-order-form-builder') == item.getAttribute('data-order-form-builder')){
                                //it's element draged over it self
                                blockAfterElementPlaceholder = posAct
                            }
                            if(item.getAttribute('data-order-form-builder') == this.returnElementOfArrayHasClass(event.path,'elementOFDrag').getAttribute('data-order-form-builder')){
                                //define position of element on which drag element is over
                                this.pos = posAct
                            }
                            posAct++
                        }

                        if(this.pos==blockAfterElementPlaceholder+1){
                            //block placeholder after draged element
                            return;
                        }
                        allExistingFields[this.pos].classList.add("placeholder-up")
                    }else{
                        //mouse is over form but any existing element
                        document.getElementById("formBuilder-form").classList.add("placeholder")
                        //position on last item
                        this.pos = allExistingFields.length;
                    }


                }
                //inform drag drop that mouse is over form
                this.outsideForm = false
            }else{
                //mouse outside form generator
                this.clearFromPlaceHolders();
                this.outsideForm = true
            }

        });
        document.addEventListener('dragend', (event)=>{
            if(this.outsideForm){
                //existing form outside form, so don't show its postion migration
                this.dragedElement.classList.remove('actualmoving')
                return
            }
            if(this.dragedElement.className.includes('fieldToDrag')){
                //field moved from right sidebar to generator

                event.preventDefault();
                //add first field to generator form
                if(this.state.fieldsToEdit.length == 0){
                    this.setState({
                        ...this.state,
                        fieldsToEdit: [
                            this.normalElem(
                                this.dragedElement.getAttribute('data-type-field'),
                                this.getCounter()
                            )
                        ]
                    },()=>{this.clearFromPlaceHolders()})
                }else{
                    //add next field to list
                    let newFieldsToEdit = this.state.fieldsToEdit.slice()

                    //add element to correct position
                    newFieldsToEdit.splice(this.pos, 0, this.normalElem(
                        this.dragedElement.getAttribute('data-type-field'),
                        this.getCounter()
                    ));
                    this.setState({

                        ...this.state,
                        fieldsToEdit: newFieldsToEdit

                    },()=>{this.clearFromPlaceHolders()})

                }
            }else{
                //field is existing and is moving
                this.dragedElement.classList.remove('actualmoving')

                let newFieldsToEdit = this.state.fieldsToEdit.slice()

                //define element which was dragged to move
                var element;
                newFieldsToEdit.map((item)=>{
                    if(item.number == this.dragedElement.getAttribute('data-order-form-builder')){
                        element = item
                    }
                })
                //add element in correct position
                newFieldsToEdit.splice(this.pos, 0, {
                    ...element,
                    number: this.getCounter()
                });
                //remove element from old position
                newFieldsToEdit = newFieldsToEdit.filter((item)=>{
                    if(item.number == this.dragedElement.getAttribute('data-order-form-builder')){
                        return false
                    }
                    return true
                })
                this.setState({
                    ...this.state,
                    fieldsToEdit: newFieldsToEdit
                },()=>{this.clearFromPlaceHolders()})
            }
        }, false);

    }


    clearFromPlaceHolders = ()=>{
        var arrOfPlaceholders = document.querySelectorAll('.placeholder, .placeholder-up')
        if(arrOfPlaceholders.length)
            for(var i of arrOfPlaceholders){
                i.classList.remove('placeholder')
                i.classList.remove('placeholder-up')
            }
    }


    fields = {
        text: {
            showFields: new Set(['type']),
            classIcon: 'fa-pencil-alt',// class for icon from notawesome
            label: "Text field",//show this label
            typeInput: "text",//Field recognize by this variable
            fields: {
                'type' : {
                    'inputType': "select",
                    'label': 'Type',
                    'name': 'type',
                    'options': [
                        {
                            'label': 'text',
                            'value': 'text'
                        },
                        {
                            'label': 'email',
                            'value': 'email'
                        },
                        {
                            'label': 'password',
                            'value': 'password'
                        },
                        {
                            'label': 'tel',
                            'value': 'tel'
                        },
                        {
                            'label': 'url',
                            'value': 'url'
                        }
                    ]
                },
                'minLength': {
                    'inputType': "number",
                    'label': 'Min length',
                    'value': "",
                    'step' : '1',
                    'name': 'min_length'
                },
                'maxLength': {
                    'inputType': "number",
                    'label': 'Max length',
                    'value': "",
                    'step' : '1',
                    'name': 'max_length'
                },
                'sufix': {
                    'inputType': "text",
                    'label': 'Sufix',
                    'value': "",
                    'name': 'sufix'
                }
            }
        },
        number: {
            classIcon: 'fa-calculator',
            showFields: new Set([]),
            label: "Number",
            typeInput: "number",
            fields: {
                'minValue': {
                    'inputType': "number",
                    'label': 'Min',
                    'value': "",
                    'step' : '0.1',
                    'name': 'min_value'
                },
                'maxValue': {
                    'inputType': "number",
                    'label': 'Max',
                    'value': "",
                    'step' : '0.1',
                    'name': 'max_value'
                },
                'step':{
                    'inputType': "number",
                    'label': 'Step',
                    'value': "",
                    'step' : '0.1',
                    'name': 'step'
                },
                'sufix': {
                    'inputType': "text",
                    'label': 'Sufix',
                    'value': "",
                    'name': 'sufix'
                }
            }
        },
        textArea: {
            classIcon: 'fa-align-left',
            label: "Text area",
            typeInput: "textArea",
            fields: {
                'minLength': {
                    'inputType': "number",
                    'label': 'Min length',
                    'value': "",
                    'step' : '1',
                    'name': 'min_length'
                },
                'maxLength': {
                    'inputType': "number",
                    'label': 'Max length',
                    'value': "",
                    'step' : '1',
                    'name': 'max_length'
                },
                'cols': {
                    'inputType': "number",
                    'label': 'Cols',
                    'value': "30",
                    'step' : '1',
                    'name': 'cols'
                },
                'rows': {
                    'inputType': "number",
                    'label': 'Rows',
                    'value': "10",
                    'step' : '1',
                    'name': 'rows'
                }
            },
        },
        autocomplete: {
            classIcon: 'fa-clone',
            showFields: new Set(['optionBuilder']),
            label: "Text autocomplete",
            typeInput: "autocomplete",
            fields: {
                'optionBuilder': {
                    'inputType': "optionBuilder",
                    'label': 'Options',
                    'value': "",
                    'name': 'options'
                },
            }
        },
        inputRadio: {
            classIcon: 'fa-clipboard-list',
            showFields: new Set(['optionBuilder']),
            label: "Input Radio group",
            typeInput: "inputRadio",
            fields: {
                'optionBuilder': {
                    'inputType': "optionBuilder",
                    'label': 'Options',
                    'value': "",
                    'name': 'options'
                },
            }
        },
        inputCheckbox: {
            classIcon: 'fa-check-square',
            showFields: new Set([]),
            label: "Checkbox",
            typeInput: "inputCheckbox",
            fields: {
                'defaultSelected' : {
                    'inputType': "checkbox",
                    'label': 'Default selected',
                    'value': false,
                    'name': 'defaultSelected'
                },
            }
        },
        select: {
            classIcon: 'fa-flag',
            showFields: new Set(['optionBuilder']),
            label: "Select",
            typeInput: "select",
            fields: {
                'optionBuilder': {
                    'inputType': "optionBuilder",
                    'label': 'Options',
                    'value': "",
                    'name': 'options'
                },
            },
            banField: new Set([
                'placeholder',
            ])
        },
        fileUpload: {
            classIcon: 'fa-download',
            showFields: new Set(['optionBuilder']),
            label: "Upload file",
            typeInput: "fileUpload",
            fields: {
            }
        },
        button: {
            classIcon: 'fa-circle',
            showFields: new Set(['type']),
            label: "Button",
            typeInput: "button",
            fields: {
                'type' : {
                    'inputType': "select",
                    'label': 'Type',
                    'name': 'type',
                    'options': [
                        {
                            'label': 'Button',
                            'value': 'button'
                        },
                        {
                            'label': 'Submit',
                            'value': 'submit'
                        },
                        {
                            'label': 'Reset',
                            'value': 'reset'
                        },
                    ]
                },
            },
            banField: new Set([
                'placeholder',
                'defaultValue',
                'required',
                'tipText',
                'name'
            ])
        },
        header: {
            classIcon: 'fa-heading',
            showFields: new Set(['headerLevel','Headertext']),
            label: "Header",
            typeInput: "header",
            fields: {
                'Headertext' : {
                    'inputType': "text",
                    'label': 'Header text',
                    'value': "",
                    'name': 'headertext'
                },
                'headerLevel' : {
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
                        {
                            'label': 'H3',
                            'value': 'h3'
                        },
                        {
                            'label': 'H4',
                            'value': 'h4'
                        },
                        {
                            'label': 'H5',
                            'value': 'h5'
                        },
                        {
                            'label': 'H6',
                            'value': 'h6'
                        },
                    ]
                },
            },
            banField: new Set([
                'placeholder',
                'defaultValue',
                'required',
                'tipText',
                'required',
                'label',
                'name'
            ])
        },
        paragraph: {
            classIcon: 'fa-paragraph',
            showFields: new Set(['content']),
            label: "Paragraph",
            typeInput: "paragraph",
            fields: {
                'content': {
                    'inputType': "textarea",
                    'label': 'Content',
                    'value': "",
                    'name': 'content',
                    'placeholder': 'Put paragraph content'
                },
            },
            banField: new Set([
                'placeholder',
                'defaultValue',
                'required',
                'tipText',
                'required',
                'label',
                'name'
            ])
        },
        hiddenInput: {
            classIcon: 'fa-eye-slash',
            showFields: new Set(['value']),
            label: "Hidden input",
            typeInput: "hiddenInput",
            fields: {
                'value': {
                    'inputType': "text",
                    'label': 'Value',
                    'value': "",
                    'name': 'value'
                },
            },
            banField: new Set([
                'placeholder',
                'defaultValue',
                'required',
                'tipText',
                'required',
                'label',
                'defaultValue',
                'class'
            ])
        },
        toAllFields: {
            showFields: new Set([
                'required',
                'label'
            ]),
            fields: {
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
            },
        }
    }





    state={
        fieldsInForm: [],
        onDragField: false,
        fieldsToEdit: []
    }
    normalElem = (typefield, number, optionalJson = {})=>(
        {
            typefield,
            number,
            index: Math.random().toString(36).substring(4)+"_"+(new Date().getTime()),
            optionalJson: {...optionalJson},
            classList: ''
        }

    )

    counter = 0;
    getCounter = ()=>{
        return this.counter++;
    }

    formJson = {}

    jsonCollector = ()=>{

        var jsonInCorrectOrder = this.getJson()

        if(document.getElementById('result'))
            document.getElementById('result').innerHTML = JSON.stringify(jsonInCorrectOrder, null, 4)
    }
    getJson = ()=>{

        var jsonInCorrectOrder = []

        this.state.fieldsToEdit.map((item)=>{
            jsonInCorrectOrder.push(item.optionalJson)
        })
        return jsonInCorrectOrder
    }

    addToFormJson = (name, value)=>{
        this.formJson[name] = {
            ...value,
        }

        var jsonInCorrectOrder = []

        this.state.fieldsToEdit = this.state.fieldsToEdit.map((item)=>{

            if(item.index == name)
                item.optionalJson = value;
            jsonInCorrectOrder.push(item.optionalJson)
            return item;
        })

        if(this.props.makeActionWhenJsonChange)
            this.props.makeActionWhenJsonChange(jsonInCorrectOrder)
        this.jsonCollector()
    }

    deleteField = (index)=>{
        this.setState({
            ...this.state,
            fieldsToEdit: this.state.fieldsToEdit.filter((item)=>{
                if(index==item.index)
                    return false
                return true
            })
        })
        delete this.formJson[index];
    }



    render() {
        return (
        <div id="formBuilder">
            <div id="formBuilder-form" className="formBuilderGroup">
                {this.state.fieldsToEdit.map(item=>
                            (
                            <div key={item.number}  data-order-form-builder={item.number} draggable="true" className={item.classList+" elementOFDrag"}>
                    {console.log(item.optionalJson)}
                <FieldInGenerator deleteField={this.deleteField} addToFormJson={this.addToFormJson}  actualElem={item} definedFields={this.fields} jsonData={item.optionalJson || this.formJson[item.index] || {}} />
                    </div>
                )
                )}
            </div>
            <div id="optionColumn">
            {Object.keys(this.fields).map((field)=>{
                if (field!="toAllFields")
                    return <Field data-field={this.fields[field]} key={this.getCounter()} className="elementOFDrag"/>
            })}
    <       /div>
        </div>
    );
    }
}

export default FormBuilder;