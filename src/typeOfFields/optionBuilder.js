import React, { Component } from 'react';


class OptionBuilder extends Component {



    //initial state
    constructor(props){
        super();
        this.state = {
            resultOption: props.jsonData[props.formJson.name] || [{pos: 1, label: "", value: ""}]
        }
        props.jsonCollector({[props.formJson.name]: this.state.resultOption})
    }



    counter = 2

    getCounter = ()=>{
        return this.counter++
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
                    <div className="optionFields">
                        <ol>
                            {this.state.resultOption.map((item)=>(
                                <li key={item.pos}>
                                    <input type="text" placeholder="Label" value={item.label || ""} onChange={(e)=>{
                                        this.setState({
                                            ...this.state,
                                            resultOption: [
                                                ...this.state.resultOption.map(elem=>{
                                                    if(elem.pos == item.pos)
                                                        elem.label = e.target.value
                                                    return elem
                                                })
                                            ]
                                        },()=>{
                                            this.props.jsonCollector({[this.props.formJson.name]: this.state.resultOption})
                                        })
                                    }}/>
                                    <input type="text" placeholder="Value" value={item.value || ""} onChange={(e)=>{
                                        this.setState({
                                            ...this.state,
                                            resultOption: [
                                                ...this.state.resultOption.map(elem=>{
                                                    if(elem.pos == item.pos)
                                                        elem.value = e.target.value
                                                    return elem
                                                })
                                            ]
                                        },()=>{
                                            this.props.jsonCollector({[this.props.formJson.name]: this.state.resultOption})
                                        })
                                    }}/>
                                    {(item.pos==1)?(""):(
                                            <button
                                                onClick={()=>{
                                                    this.setState({
                                                        ...this.state,
                                                        resultOption: [
                                                            ...this.state.resultOption.filter((elem)=>{
                                                                if(elem.pos == item.pos)
                                                                    return false
                                                                return true
                                                            })
                                                        ]
                                                    })
                                                }}
                                            >X</button>
                                        )}
                                </li>
                            ))}
                        </ol>
                        <button onClick={()=>{
                            this.setState({
                                ...this.state,
                                resultOption: [
                                    ...this.state.resultOption,
                                    {pos: this.getCounter(), label: "", value: ""}
                                ]
                            })
                            this.getCounter()
                        }}>Add position</button>
                    </div>
                </label>
            </div>
        );
    }
}



export default OptionBuilder;