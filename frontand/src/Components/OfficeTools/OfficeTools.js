import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteTools, orderOfficeTools} from "../../Store/actionOrder";
import {apiURL} from "../../apiUrl";
import './officeTools.css';
import {NavLink} from "react-router-dom";

class OfficeTools extends Component {
    componentDidMount() {
        this.props.orderOfficeTools()
    }
    category=(id)=>{
        const categoryId = id.category_id;
        if (this.props.category) {
            const c = this.props.category.find(key => key.id === categoryId);
            return c.name
        }
    };
    location=(id)=>{
        const locationId = id.location_id;
        if (this.props.location) {
            const l = this.props.location.find(key => key.id === locationId);
            return l.description
        }
    };

    render() {
        return (
            <div>
                {this.props.officeTools && this.props.officeTools.map(key=>
                <div key={key.id} className="toolsBlock">
                    <div>
                        Категория : <b>{this.category(key)}</b>
                    </div>
                    <div>
                        Местоположение: <b>{this.location(key)}</b>
                    </div>
                    <h4>{key.name}</h4>
                    <p>{key.description}</p>
                    <img className="imgTools" src={apiURL + '/uploads/' + key.image} alt={key.name}/>
                    <button onClick={()=> this.props.deleteTools(key.id)}>delete</button>
                    <NavLink to={`/officetools/${key.id}`}>Edit</NavLink>
                </div>
                )}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    officeTools: state.officeTools,
    category: state.category,
    location: state.location
});
const mapDispatchToProps = dispatch=>({
    orderOfficeTools: ()=> dispatch(orderOfficeTools()),
    deleteTools: (id)=> dispatch(deleteTools(id))
});
export default connect(mapStateToProps, mapDispatchToProps) (OfficeTools);