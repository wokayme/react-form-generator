import React, { Component } from 'react';


class Input extends Component {


    //initial state
    constructor(props){
        super();



        this.state = {
            text: props.jsonData[props.formJson.name] || props.formJson.value || ""
        }
        if(this.state.text == ""&&props.formJson.name=="name"){
            this.state.text =  "field_"+Math.random().toString(36).substring(11)+"_"+(new Date().getTime())
        }
            props.jsonCollector({[props.formJson.name]: this.state.text})

    }

    //change input value
    changeValue(e){

        this.setState({
            text: e.target.value
        },()=>{
            if(this.props.formJson.name=='label'){
                document.querySelector(".index_"+this.props.index+" b").innerHTML = "Field "+this.state.text
            }
            this.props.jsonCollector({[this.props.formJson.name]: this.state.text})
        })



    }
    render() {
        return (
            <div className="field-input">
                <label className="mainLabel inputLabel">
                    {/*Label*/}
                    <span>
                        {this.props.formJson.label}
                    </span>
                    {/*Input*/}
                    <input type={this.props.formJson.inputType} onChange={e=>this.changeValue(e)} value={this.state.text}
                         maxLength={this.props.formJson.maxlength}
                         name={this.props.formJson.name}
                         placeholder={this.props.formJson.placeholder}
                         step={this.props.formJson.step}
                         min={this.props.formJson.min}
                         max={this.props.formJson.max}/>
                    {this.props.formJson.Unit}
                </label>
            </div>
        );
    }
}



export default Input;