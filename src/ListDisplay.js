import React,{Component} from 'react'
import './ListDisplay.css'
import $ from 'jquery'

class Listdisplay extends Component{
    constructor(props){
        super(props);
        this.state = {
            count:0,
            value:'hi'
        }
    
    }

        
    
      render() {
        return  (
        <div className = "home">
            <table onClick={()=>this.props.trigger(this.props.element.display_name,this.props.element.id,this.props.element.add_url)} key = {this.props.element.id}>
                
                    <tbody>
                    <tr className = "rowstyling">
                    <td  className = "listelement">
                          {this.props.element.display_name}
                        
                    </td>
                    </tr>

                    </tbody>
                
            </table>
        </div>
      )
      }
}
export default Listdisplay;