import React,{Component} from 'react'
import './checkbox.css'

class Checkbox extends Component{
    constructor(props){
        super(props);
        this.state = {
            ischecked:this.props.ischecked
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState({
            ischecked:!this.state.ischecked,
        })
    }
    render(){
        console.log("hello this is a test");
        return(
            <div className="checkbox1" style = {{display:"none"}}>
                <div className = "entity">
                    <input type="checkbox" id="scales" name="scales" checked = {this.state.ischecked} onChange = {this.toggle}
                        style = {{margin:'3px'}}
                    />Entity
                    
                </div>

                <div className = "Knowledge">
                <input type="checkbox" id="horns" name="horns" checked = {!this.state.ischecked} onChange = {this.toggle}
                    style = {{margin:'3px'}}
                />Knowledge
                </div>
            </div>
        )
    }
}
export default Checkbox;