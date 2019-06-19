import React,{Component} from 'react';
import './App.css';
import $ from 'jquery';
import ListDisplay from './ListDisplay'
import Checkbox from './components/Checkbox'
import Formcheck from './components/Formcheck'


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

    }
    this.apicall = this.apicall.bind(this);
    this.triggerapp = this.triggerapp.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.apicall("");
  }
   async triggerapp(display_name,id){
     console.log("this is id length: "+id.length);
    await this.setState({
      list:[...this.state.list,{key:display_name,baseurl:this.state.baseurl,path:id}],
      rows:[],
      path:id,
      domain:display_name,
      inputfield:''
    
    })
    if(id.length === 83){
      console.log(`hello i am ${display_name}`)
      await this.setState({
        state:false,
        formcheck:true,
        formdisplay:"block"
      })
    }
    
  //   if(display_name === "Crop"){
  //     await  this.setState({
  //       path:`${this.state.path}agriculture.models.entities.crop.Crop/`,
  //       search:'list_entities/?q=',
  //       formdisplay:"none"
  //     })
  //   }
  //   else if(display_name === "Agriculture"){
  //    await  this.setState({
  //       path:`${display_name.toLowerCase()}/`,
  //       search:'list_entity_types?q=',
  //       formdisplay:"none"
  //     })     
  // }
  //   else {
  //     await  this.setState({
  //       path:`agriculture/agriculture.models.entities.crop.Crop/`,
  //       search:`${id}/details/`,
  //       state:false,
  //       url:this.state.baseurl+`agriculture/agriculture.models.entities.crop.Crop/`+`${id}/details/`,
  //       formdisplay:"block",
  //       formcheck:true
  //     })  
  //   }
  console.log("this is url: "+this.state.url)  
  this.apicall("")
  }

  
  apicall(searchterm){
    
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
    if(e.path.length!==83){
    await this.setState({
      inputfield:'',
      rows:[],
      path:e.path,
      formcheck:false,
      state:true
    })
    while(this.state.list[this.state.list.length-1].key !== e.key){
         if(this.state.list.length>1){
           const list = this.state.list.pop();
         }
       }

    
  }
  this.apicall("")
    // console.log(`i am ${e}`);
    // if(this.state.list.length===2){
    //   const list = this.state.list.pop();}
    // while(this.state.list[this.state.list.length-1] !== e){
    //   if(this.state.list.length>1){
    //     const list = this.state.list.pop();
    //   }
    // }
    // if(e === "Domain"){
      
    //   this.setState({
    //     list:this.state.list,
    //     rows:[],
    //     path:`list_domains/`,
    //     search:'?q=',
    //     domain:e,
    //     schema:{},
    //     state:true,
    //     formdisplay:"none",
    //     formcheck:false
    //   },()=>this.apicall(""))
      
    // }else if(e === "Agriculture"){
    //   this.setState({
    //     list:this.state.list,
    //     rows:[],
    //     path:`${e.toLowerCase()}/`,
    //     search:'list_entity_types?q=',
    //     domain:e,
    //     schema:{},
    //     state:true,
    //     formdisplay:"none",
    //     formcheck:false
    //   },()=>this.apicall(""))
      
    // }else if(e === "Crop"){
    //   this.setState({
    //     list:this.state.list,
    //     rows:[],
    //     path:`agriculture/`,
    //     search:'agriculture.models.entities.crop.Crop/list_entities/?q=',
    //     domain:e,
    //     schema:{},
    //     state:true,
    //     formdisplay:"none",
    //     formcheck:false
    //   },()=>this.apicall(""))
    // }
    // else{
    //   console.log("do nothing");
    // }
  }

    searchChangeHandler(event) {
    /* await this.setState(({
      inputfield:event.target.value,
    }))*/
     this.setState({ inputfield: event.target.value });
    
    console.log(this.state.inputfield)
    const searchTerm = event.target.value      
    this.apicall(searchTerm);
  }
  render(){
    return(
      <div className="App">
      
      <table className="titleBar">
          <tbody>
            <tr>
              
              <td width="8"/>
              <td>
                <h1>entity ingestion</h1>
              </td>
            </tr>
          </tbody>
        </table>
        <Checkbox ischecked = {this.state.ischecked}></Checkbox>
        <ul className ="list">
          {this.state.list.map(number => <li key={number.key}><button onClick ={()=> this.handleclick(number)}>{number.key}</button></li>)}
        </ul>
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
        {this.state.rows}
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
