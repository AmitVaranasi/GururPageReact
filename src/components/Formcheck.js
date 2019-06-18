import React,{Component} from 'react'
import Form from './Form'

class Formcheck extends Component{
    constructor(props){
        super(props);
        this.state = {
            state:this.props.state,
            url:this.props.url
        }
        console.log(this.state.state);
    }
    render(){
        console.log("hello");
        if(this.props.state){
            console.log(console.log("hello if"))
            return(
                <Form url = {this.props.url}/>
            )
        }
        else{
            console.log("hello else")
            return(<div></div>);
        }
    }
}
export default Formcheck;