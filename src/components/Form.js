import React from 'react';
import { getGlobals } from '../utils/getGlobals';
import './deps/opt/bootstrap.css'
import './Form.css'


class Form extends React.Component {
    
    constructor(props){
        super(props);
        const {jf, $, _} = getGlobals();
        this.jf = jf;
        this.$ = $; 
        this._ = _;
        this.state = {
            url : this.props.url
        }
    }

    onSubmitButton= (errors, values) => {
        console.log(errors, values);
    }

    componentDidMount(){
        this.$el = this.$(this.el);
        let please = this.$el;
        console.log("inside forms.js: "+this.props.url);
        this.$.ajax(
            {
              url:this.props.url,
              type: "GET",
              success: function(data){
                console.log( data['schema']);
                // for(field in data['schema']){
                //   if(typeof(data['schema'][field])=="object"){
                //     for(attr_key in data['schema'][field]){
                //       if(attr_key=="onKeyUp"){
                //         // console.log(data['schema'][field][attr_key]);
                //         var myFunc = new Function("  ",data['schema'][field][attr_key]);
                //         data['schema'][field][attr_key]=myFunc;
                //       }
                //     }
                //   }
                // }
                please.jsonForm(data);
                
              }
            });
        this.$el.onSubmitValid = function (){
            console.log("hello 0")
            var values = this.please.jsonFormValue()
          console.log('Values extracted from submitted form', values);
          window.alert('Form submitted. Values object:\n' +
              JSON.stringify(values, null, 2));
          return false
        };
        this.$el.submit(function (){
            var values = please.jsonFormValue()
            console.log(JSON.stringify(values));
            alert(JSON.stringify(values, null, 2))
            return false;
        });
    }

    componentWillUnmount() {
        
    }
    componentDidUpdate(){
        
    }
    
    render(){
        return(
            <div className="col-md-6">
                <h1>JSON Form for expert </h1>
                <form meathod = "POST" ref={el => {this.el = el;}}></form>
            </div>
        );
    }
}

export default Form;