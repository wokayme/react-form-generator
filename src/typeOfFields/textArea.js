import React, { Component } from 'react';


class TextArea extends Component {



    //initial state
    constructor(props){
        super();


        if(props.formJson.name=='label'){
            console.log("New")
            console.log(props.formJson)
            console.log(props.formJson.name)
        }
        this.state = {
            text: props.jsonData[props.formJson.name] || props.formJson.value || ""
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
                <textarea placeholder={this.props.formJson.placeholder} onChange={e=>this.changeValue(e)} defaultValue={this.state.text}>

                            </textarea></label>
            </div>
        );
    }
}


export default TextArea;