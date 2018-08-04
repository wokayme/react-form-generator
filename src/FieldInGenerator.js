import React, { Component } from 'react';
import './FormBuilder.css';
import Input from './typeOfFields/input'
import Checkbox from "./typeOfFields/checkbox";
import Select from "./typeOfFields/select";
import OptionBuilder from "./typeOfFields/optionBuilder";
import Textarea from "./typeOfFields/textArea";

class FieldInGenerator extends Component {

    jsonField={}


    constructor(props){
        super()
        this.objectField = props.definedFields[props.actualElem.typefield]


        var newState = {
            generalFieldsShow: false,
            extraFieldsShow: false
        }


        this.state = newState

        console.log(props)

        this.jsonField = {
                            ...props.jsonData,
                            "typeField": props.actualElem.typefield
                        }
        props.addToFormJson(props.actualElem.index,this.jsonField)
    }


    addToJson = (jsonToAdd)=>{
        if(!jsonToAdd)
            return
        var actualJson = this.jsonField
        Object.keys(jsonToAdd).map((key)=>{
            actualJson[key] = jsonToAdd[key]
        })
        this.jsonField = actualJson


        this.props.addToFormJson(this.props.actualElem.index,actualJson)
    }

    counter = 0;
    getCounter = ()=>{
        return this.counter++;
    }


    render() {
        return (
            <div>
                <div className={"headerBar index_"+this.props.actualElem.index}>
                    <b>Field {this.props.jsonData.label}</b>
                    <span className="typeField">({this.props.actualElem.typefield})</span>
                    <span className="requied">{(this.props.jsonData.required)?("*"):("")}</span>
                    <button onClick={()=>{
                        this.setState({
                            ...this.state,
                            generalFieldsShow: !this.state.generalFieldsShow
                        })
                    }}>
                        Edit field
                    </button>
                    <button onClick={()=>{
                        if(window.confirm("Are you sure you want delete this field?")){
                            this.props.deleteField(this.props.actualElem.index)
                        }
                    }}>
                        Delete field
                    </button>
                </div>
                <div className={(this.state.generalFieldsShow)?"mainField show":"mainField hidden"}>
                    <div className="fieldsTop">
                        {/*Display global featured fields*/}
                        {Object.keys(this.props.definedFields['toAllFields'].fields).map((item)=>{
                            var actualInput = this.props.definedFields['toAllFields'].fields[item]
                            if(this.props.definedFields['toAllFields'].showFields.has(item)){
                                if(this.props.definedFields[this.props.actualElem.typefield].banField != undefined)
                                    if(this.props.definedFields[this.props.actualElem.typefield].banField.has(item))
                                        return
                                if(actualInput)
                                    switch (actualInput.inputType){
                                        case 'textarea':
                                            return <Textarea index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                        case 'text':
                                            return <Input index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                        case 'number':
                                            return <Input index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                        case 'checkbox':
                                            return <Checkbox index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                        case 'optionBuilder':
                                            return <OptionBuilder index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                        case 'select':
                                            return <Select index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                    }
                            }
                        })}
                        {/*Display local featured fields*/}
                        {Object.keys(this.props.definedFields[this.props.actualElem.typefield].fields).map((item)=>{
                            var actualInput = this.props.definedFields[this.props.actualElem.typefield].fields[item]
                            if(this.objectField.showFields && this.objectField.showFields.has(item)){
                                if(actualInput)
                                    switch (actualInput.inputType){
                                        case 'textarea':
                                            return <Textarea index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                        case 'text':
                                            return <Input index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                        case 'number':
                                            return <Input index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                        case 'checkbox':
                                            return <Checkbox index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                        case 'optionBuilder':
                                            return <OptionBuilder index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                        case 'select':
                                            return <Select index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                    }
                            }
                        })}
                    </div>
                    <div className="button-show-more">
                        <button onClick={()=>{
                            this.setState({
                                ...this.state,
                                extraFieldsShow: !this.state.extraFieldsShow
                            })
                        }}>
                            {(this.state.extraFieldsShow)?"Hide extra fields":"Show extra fields"}
                        </button>
                    </div>
                    <div className={(this.state.extraFieldsShow)?"hideExtraOptions show":"hideExtraOptions hidden"}>
                        <div className="fieldsBottom">
                            {/*Display normal featured fields*/}
                            {Object.keys(this.props.definedFields['toAllFields'].fields).map((item)=>{
                                var actualInput = this.props.definedFields['toAllFields'].fields[item]
                                if(!(this.props.definedFields['toAllFields'].showFields.has(item))){
                                    if(this.props.definedFields[this.props.actualElem.typefield].banField != undefined)
                                        if(this.props.definedFields[this.props.actualElem.typefield].banField.has(item))
                                            return
                                    if(actualInput)
                                        switch (actualInput.inputType){
                                            case 'textarea':
                                                return <Textarea index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                            case 'text':
                                                return <Input index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                            case 'number':
                                                return <Input index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                            case 'checkbox':
                                                return <Checkbox index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                            case 'optionBuilder':
                                                return <OptionBuilder index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                            case 'select':
                                                return <Select index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                        }
                                }
                            })}
                            {/*Display normal featured fields*/}
                            {Object.keys(this.props.definedFields[this.props.actualElem.typefield].fields).map((item)=>{
                                var actualInput = this.props.definedFields[this.props.actualElem.typefield].fields[item]
                                if(!(this.objectField.showFields && this.objectField.showFields.has(item))){
                                    if(actualInput)
                                        switch (actualInput.inputType){
                                            case 'textarea':
                                                return <Textarea index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                            case 'text':
                                                return <Input index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                            case 'number':
                                                return <Input index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                            case 'checkbox':
                                                return <Checkbox index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                            case 'optionBuilder':
                                                return <OptionBuilder index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                            case 'select':
                                                return <Select index={this.props.actualElem.index} updateLabel={this.updateLabel} jsonData={this.jsonField} jsonCollector={this.addToJson} key={this.getCounter()} formJson={actualInput}/>
                                        }
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FieldInGenerator;
