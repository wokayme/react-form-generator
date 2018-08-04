import React, { Component } from 'react';


class Checkbox extends Component {



    constructor(props){
        super();


        this.state = {
            is_checked: props.jsonData[props.formJson.name]|| props.formJson.value || false
        }
        props.jsonCollector({[props.formJson.name]: this.state.is_checked})


    }


    handleInputChange = () => {
        this.setState({
            ...this.state,
            is_checked: !this.state.is_checked
        },()=> {
                if (this.props.formJson.name == 'required') {
                    if(this.state.is_checked){
                        //is required
                        document.querySelector(".index_" + this.props.index + " span.requied").innerHTML = "*"
                    }else{
                        document.querySelector(".index_" + this.props.index + " span.requied").innerHTML = ""
                    }

                }
                this.props.jsonCollector({[this.props.formJson.name]: this.state.is_checked})
            }
        )
    }

    render() {
        return (
            <div className="field-input">
                <div className="radio-box">
                        <label className="mainLabel">
                            <span>
                            {this.props.formJson.label}
                            </span>
                            {/*Input*/}
                            <input
                                type="checkbox"
                                checked={this.state.is_checked}
                                onChange={()=>this.handleInputChange()}
                            />
                        </label>
                </div>
            </div>
        );
    }
}


export default Checkbox;