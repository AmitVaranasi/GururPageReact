import React,{Component} from 'react';
import './App.css';
import $ from 'jquery';
import ListDisplay from './ListDisplay'


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      list:["Domain"],
      rows:[],
      inputfield:'',
      inputdisable:false,
      domain:'',
      baseurl:'http://guru.southindia.cloudapp.azure.com:8001/knowlake/',
      path:'list_domains/',
      search:'?q='
      

    }
    this.apicall = this.apicall.bind(this);
    this.triggerapp = this.triggerapp.bind(this);
    this.domainapicall = this.domainapicall.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.apicall("");
  }
   async triggerapp(display_name){
    this.setState({
      list:[...this.state.list,display_name],
      rows:[],
      domain:display_name,
      inputfield:''
    })
    
    if(display_name === "Crop"){
      await  this.setState({
        path:`${this.state.path}`,
        search:'agriculture.models.entities.crop.Crop/list_entities/?q='
      })
    }
    else if(display_name === "Agriculture"){
     await  this.setState({
        path:`${display_name.toLowerCase()}/`,
        search:'list_entity_types?q='
      })     
  }
  this.apicall("")
  }

  async domainapicall(domain,searchterm){
    this.setState({
      inputdisable:false
    })
    console.log(this.state.rows);
    const urlstring = `http://guru.southindia.cloudapp.azure.com:8001/knowlake/${domain.toLowerCase()}/list_entity_types?q=${searchterm}`;
    $.ajax({
      url:urlstring,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        //console.log(searchResults)

        const results = searchResults
        //console.log(searchResults)
        const domains = [];
        results.forEach(element => {
          const entity = <ListDisplay key = {element.id} element = {element} trigger={this.triggerapp}/>
          domains.push(entity)
        });
         this.setState({
           rows:domains,
         })
        
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }
  async cropapicall(domain,searchterm){
    this.setState({
      inputdisable:false,
      inputfield:''
    })
    console.log(this.state.rows);
    const urlstring = `http://guru.southindia.cloudapp.azure.com:8001/knowlake/agriculture/agriculture.models.entities.crop.${domain}/list_entities/?q=${searchterm}`;
    $.ajax({
      url:urlstring,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        //console.log(searchResults)

        const results = searchResults
        //console.log(searchResults)
        const domains = [];
        results.forEach(element => {
          const crop = <ListDisplay key = {element.id} element = {element} trigger={this.triggerapp}/>
          domains.push(crop)
        });
         this.setState({
           rows:domains,
         })
        
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }
  apicall(searchterm){
    
    const urlstring = this.state.baseurl+this.state.path+this.state.search+searchterm;
    console.log(urlstring)
    $.ajax({
      url:urlstring,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        //console.log(searchResults)

        const results = searchResults
        //console.log(searchResults)
        const entities = [];
        results.forEach(element => {
          console.log(element)
          const entity = <ListDisplay key = {element.id} element = {element} trigger={this.triggerapp}/>
          entities.push(entity)
        });
         this.setState({
           rows:entities,
         })
        
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }
  handleclick(e){
    this.setState({
      inputfield:''
    })
    console.log(`i am ${e}`);
    if(this.state.list.length>1){
      const list = this.state.list.pop();
    }
    if(e === "Domain"){
      
      this.setState({
        list:this.state.list,
        rows:[],
        path:`list_domains/`,
        search:'?q='
      },()=>this.apicall(""))
      
    }else if(e === "Agriculture"){
      this.setState({
        list:this.state.list,
        rows:[],
        path:`${e.toLowerCase()}/`,
        search:'list_entity_types?q='
      },()=>this.apicall(""))
      
    }else if(e === "Crop"){
      this.setState({
        list:this.state.list,
        rows:[],
        path:`${this.state.path}`,
        search:'agriculture.models.entities.crop.Crop/list_entities/?q='
      },()=>this.apicall(""))
    }
    else{
      console.log("do nothing");
    }
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
        <ul className ="list">
          {this.state.list.map(number => <li key={number}><button onClick ={()=> this.handleclick(number)}>{number}</button></li>)}
        </ul>
        <input  style={{
          fontSize: 24,
          display: 'block',
          width: "30%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }}onChange={this.searchChangeHandler.bind(this)} value = {this.state.inputfield} disabled = {this.state.inputdisable}  placeholder="search here"/>
        {this.state.rows}
    </div>
    );
  }
}

export default App;
