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
            url : this.props.url,
            display_name:this.props.display_name
        }
        this.onSubmittest = this.onSubmittest.bind(this);
    }

    onSubmitButton= (errors, values) => {
        console.log(errors, values);
    }
    onSubmittest(data){
        console.log("hey i am here")
        let urlpost = this.props.url;
        console.log(urlpost)
        this.$.ajax({
            url:urlpost,
            type:"POST",
            data:data,
            contentType: "application/json",
            success:function(data){
                alert(JSON.stringify(data))
            },
            error: function (d) {
                alert("error");
            }
        })
    }

    componentDidMount(){
        this.$el = this.$(this.el);
        let please = this.$el;
        let url = this.props.url;
        console.log(this.props.url.substring(0, this.props.url.length-1))
        console.log("inside forms.js: "+url);
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
        this.$el.submit(() => {
            var values = please.jsonFormValue()
            console.log(JSON.stringify(values));
            this.onSubmittest(JSON.stringify(values))
            
            return false;
        });
    }
    render(){
        return(
            <div className="col2">
                <h1>{this.state.display_name}</h1>
                <div className = "stylingform" >
                <form method = "POST" ref={el => {this.el = el;}} ></form>
                </div>
            </div>
        );
    }
}

export default Form;