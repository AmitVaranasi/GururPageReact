import React,{Component} from 'react';
import './App.css';
import $ from 'jquery';
import ListDisplay from './ListDisplay'
import Checkbox from './components/Checkbox'
import Formcheck from './components/Formcheck'
import logo from './Guru logo_small.svg'


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      list:[{key:"domain",baseurl:"http://guru.southindia.cloudapp.azure.com:8051/knowlake/",path:"/list_domains?q="}],
      rows:[],
      inputfield:'',
      inputdisable:false,
      domain:'',
      baseurl:'http://guru.southindia.cloudapp.azure.com:8051/knowlake/',
      path:'/list_domains?q=',
      schema:{},
      state:true,
      url:"http://guru.southindia.cloudapp.azure.com:8051/knowlake/agriculture/agriculture.models.entities.crop.Crop/5cee1953b116556c730c7667/details/",
      formdisplay:"none",
      formcheck:false,
      ischecked:true,
      add_url:"",
      buttonvisibility:"none"

    }
    this.apicall = this.apicall.bind(this);
    this.triggerapp = this.triggerapp.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.apicall("");
  }
   async triggerapp(display_name,id,class_name){
     console.log("this is id length: "+id.length);
    await this.setState({
      list:[...this.state.list,{key:display_name,baseurl:this.state.baseurl,path:id}],
      rows:[],
      path:id+'?q=',
      domain:display_name,
      inputfield:''
    
    })
    if(this.state.list.length === 4){
      console.log(`hello i am ${display_name}`)
      await this.setState({
        path:id,
        state:false,
        formcheck:true,
        formdisplay:"block"
      })
    }
    if (typeof class_name !== 'undefined'){
      await this.setState({
        add_url:class_name
      })
      console.log(this.state.add_url)
    }
    
  
  console.log("this is url: "+this.state.url)  
  this.apicall("")
  }

  
  async apicall(searchterm){
    
    const urlstring = this.state.baseurl+this.state.path+searchterm;
    console.log(urlstring)
    $.ajax({
      url:urlstring,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        //console.log(searchResults)
        console.log(this.state.domain)
        const results = searchResults
        //console.log(searchResults)
        if(this.state.state){
        const entities = [];
        results.forEach(element => {
          console.log(element)
          const entity = <ListDisplay key = {element.id} element = {element} trigger={this.triggerapp}/>
          entities.push(entity)
        });
         this.setState({
           rows:entities,
         })}
         else{
           this.setState({
             schema:results,
           })
         }
        
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })

    
  }
  async handleclick(e){
    let search = "";
    if(e.path !== "/list_domains?q="){
      search = "?q=";
    }
    if(this.state.list.length<=4){
      console.log(this.state.list.length)
    await this.setState({
      inputfield:'',
      rows:[],
      path:e.path+search,
      formcheck:false,
      state:true
    })
    while(this.state.list[this.state.list.length-1].key !== e.key){
         if(this.state.list.length>1){
           const list = this.state.list.pop();
         }
       }
       if(this.state.list.length<4){
       this.apicall("")}
       else{

       }
    
  }   
  }

    async searchChangeHandler(event) {
    
      this.setState({ inputfield: event.target.value });
    
    console.log(this.state.inputfield)
    const searchTerm = event.target.value
    if(this.state.rows.length === 0){
      await this.setState({
        buttonvisibility:"block"
      })
    }
    else{
      await this.setState({
        buttonvisibility:"none"
      })
    }      
    this.apicall(searchTerm);
  }
  async onAddbuttonclick(){
    await this.setState({
      path:this.state.add_url,
        state:false,
        formcheck:true,
        formdisplay:"block",
        buttonvisibility:"none",
        inputfield:''
    })
  }
  render(){
    return(
      <div className="App">
      <div className="Header">
      <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img src ={logo} style = {{width:70,height:70,paddingTop:12}}/>
              </td>
              <td width="8" />
              <td >
                <h1>Guru Knowledge</h1>
              </td>
            </tr>
          </tbody>
        </table>
        <Checkbox ischecked = {this.state.ischecked}></Checkbox>
        <ul className ="list">
          {this.state.list.map(number => <li key={number.key}><button onClick ={()=> this.handleclick(number)}>{number.key}</button></li>)}
        </ul></div>
       <div className = "stylingbody">
       <div className = "body">
        
        <input  style={{
          fontSize: 24,
          display: 'block',
          width: "45%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16,
          
        }}onChange={this.searchChangeHandler.bind(this)} value = {this.state.inputfield} disabled = {this.state.inputdisable}  placeholder="search here"/>
        <button className = "addbutton" style ={{display:this.state.buttonvisibility}} onClick = {this.onAddbuttonclick.bind(this)}>
          + 
        </button>
        <div className="table">{this.state.rows}</div>
        
        </div>
        <div className = "form" >
        {console.log(this.state.formcheck)}
          <Formcheck state = {this.state.formcheck} url = {this.state.baseurl+this.state.path}/>
        </div>
       </div>
    </div>
    );
  }
}

export default App;
