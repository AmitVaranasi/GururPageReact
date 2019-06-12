import React,{Component} from 'react'
import './ListDisplay.css'

class Listdisplay extends Component{
      render() {
        return  (
        <div className = "home">
            <table onClick={()=>this.props.trigger(this.props.element.display_name)} key = {this.props.element.id}>
                <tboady>
                    <tr>
                    <td>
                        <h3>{this.props.element.display_name}</h3>
                    </td>
                    </tr>
                </tboady>
            </table>
        </div>
      )
      }
}
export default Listdisplay;