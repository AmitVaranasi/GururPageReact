import React,{Component} from 'react';
import './App.css';
import $ from 'jquery';
import ListDisplay from './ListDisplay'
import Checkbox from './components/Checkbox'
import Formcheck from './components/Formcheck'
import Dropdown from './components/Dropdown'
import logo from './Guru logo_small.svg'
import gif from './25.gif'



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      list:[{key:"domain",baseurl:"http://guru.southindia.cloudapp.azure.com:8051/knowlake/",path:"/list_domains?q="}],
      rows:[],
      inputfield:'',
      domain:'',
      baseurl:'http://guru.southindia.cloudapp.azure.com:8051/knowlake/',
      path:'/list_domains?q=',
      state:true,
      url:"http://guru.southindia.cloudapp.azure.com:8051/knowlake/agriculture/agriculture.models.entities.crop.Crop/5cee1953b116556c730c7667/details/",
      formdisplay:"none",
      formcheck:false,
      ischecked:true,
      add_url:"",
      buttonvisibility:"none",
      loading:true,
      search:true,

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
      inputfield:'',
      search:true,
    
    })
    if(this.state.list.length === 4){
      console.log(`hello i am ${display_name}`)
      await this.setState({
        path:id,
        state:false,
        formcheck:true,
        formdisplay:"block",
        loading:false,
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
    const search = this.state.search;
    if(search){
      this.setState({
        loading:true
      })
    }
    
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
           loading:false,
         })}
         else{
           this.setState({
             loading:false,
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
    console.log(e.path)
    if(e.path !== "/list_domains?q="){
      search = "?q=";
    }
    console.log(`this comment is inside handleclick func`)
    console.log(`this is search term ${search}`)
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
        console.log("when you click the crop name")
       }
    
  }   
  }

    async searchChangeHandler(event) {
    
      this.setState({ inputfield: event.target.value,search:false });
    
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
        inputfield:'',
        domain:''
    })
  }
  componentDidMount(){
    this.demoAsyncCall().then(() => this.setState({ loading: false }));
  }
  render(){
    if(this.state.loading === true){
      console.log("hey i am"+ this.state.loading)
      return(
        <img className = "loader" src={gif} alt = "" />
      )
    }
    else{
      
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
          <Checkbox ischecked = {this.state.ischecked} ></Checkbox>
          <label className  = "version">V 0.0.1</label>
          <ul className ="list">
            {this.state.list.map(number => <li key={number.key}><button onClick ={()=> this.handleclick(number)}>{number.key}</button></li>)}
          </ul></div>
         <div className = "stylingbody">
         <div className = "body">
          
          <input  style={{
            fontSize: 16,
            display: 'block',
            width: "50%",
            paddingTop: 18,
            paddingBottom: 18,
            paddingLeft: 16,
            
          }}onChange={this.searchChangeHandler.bind(this)} value = {this.state.inputfield}   placeholder="Start searching here"/>
          <div style ={{display:this.state.buttonvisibility}}>
          <button className = "addbutton"  onClick = {this.onAddbuttonclick.bind(this)}>
            + 
          </button>
          <label>Click to Add</label>
          </div>
          <Dropdown />
          
          </div>
         <div className = "tablestyling">
         <div className="table">{this.state.rows}</div>
          <div className = "form" >
          {console.log(this.state.formcheck)}
            <Formcheck state = {this.state.formcheck} url = {this.state.baseurl+this.state.path} display_name = {this.state.domain}/>
          </div>
         </div>
         </div>
      </div>
      );
    }
  }

   demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  }
}

export default App;

