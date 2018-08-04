import React, { Component } from 'react';


class Select extends Component {



    //initial state
    constructor(props){
        super();
        this.state = {
            text: props.jsonData[props.formJson.name] || ""
        }
        if(!this.state.text && props.formJson.options.length)
            props.jsonCollector({[props.formJson.name]: props.formJson.options[0]['value']})
        else
            props.jsonCollector({[props.formJson.name]: this.state.text})
    }


    //change input value
    changeValue(e){
        this.setState({
            text: e.target.value
        })
        this.props.jsonCollector({[this.props.formJson.name]: e.target.value})
    }


    render() {
        return (
            <div className="field-input">
                <label className="mainLabel">
                    {/*Label*/}
                    <span data-tip={this.props.formJson.description}>
                        {this.props.formJson.label}
                        {(this.props.formJson.required)?(<span className="requiredStar">*</span>):("")}
                    </span>
                    <select
                            value={this.state.text}
                            name={this.props.formJson.name}
                            onChange={e=>this.changeValue(e)}
                    >
                            {this.props.formJson.options.map((field)=>(
                                <option key={field.value} value={field.value}>{field.label}</option>
                            ))}
                    </select>
                </label>
            </div>
        );
    }
}



export default Select;