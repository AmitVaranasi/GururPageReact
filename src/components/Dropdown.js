import React,{Component} from 'react'
import Dropdown from './Dropdown.css'

class Dropdownlan extends Component{
    constructor(props){
        super(props);
        this.state = {
            list : ['item1','item2','item3','item4','item5']
        }
    }
    render(){
        return(
            <div>
                <select>
                    {
                        this.state.list.map(items => <option key  = {items} >{items}</option>)
                    }
                </select>
            </div>
        )
    }
}
export default Dropdownlan;