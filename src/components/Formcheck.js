import React,{Component} from 'react'
import Form from './Form'

class Formcheck extends Component{
    constructor(props){
        super(props);
        this.state = {
            state:this.props.state,
            url:this.props.url,
            display_name:this.props.display_name
        }
        console.log(this.state.state);
    }
    render(){
        if(this.props.state){
            return(
                <Form url = {this.props.url} display_name= {this.props.display_name}/>
            )
        }
        else{
            return(<div></div>);
        }
    }
}
export default Formcheck;