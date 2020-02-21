import React, {Component} from 'react';
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import {connect} from "react-redux";
import {addOfficeTools, oneOrderTools, orderCategory, orderLocation, putOfficeTools} from "../../Store/actionOrder";


class FormOfficeTools extends Component {
    state={
      name: '',
      description: '',
      image: '',
      category: 1,
      location: 1,
    };

    inputChangeHandler = e => {
        this.setState({[e.target.name] : e.target.value})
    };
    fileChangeHandler = (e) => {
        this.setState({[e.target.name] : e.target.files[0]})
    };

    submitChangeHandler = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).forEach(key=> formData.append(key, this.state[key]));

        if(this.props.match.params.id){
            this.props.putOfficeTools(this.props.match.params.id, formData)
        }else{
            this.props.addOfficeTools(formData);
        }
        this.props.history.replace('/')
    };

   async componentDidMount() {
        if (this.props.match.params.id){
            const idTools = this.props.match.params.id;
           await this.props.oneOrderTools(idTools);
           await this.props.oneTools.forEach(key=> this.setState({
               name: key.name,
               description: key.description,
               image: key.image,
               category: key.category_id,
               location: key.location_id,
           }))
        }

        this.props.orderCategory();
        this.props.orderLocation()
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.submitChangeHandler}>
                    <FormGroup >
                        <Label for="name">Название</Label>
                        <Input type="text" name="name" id="name" required
                               placeholder="Введите название"
                               value={this.state.name}
                                onChange={this.inputChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup >
                        <Label for="description">Описание</Label>
                        <Input type="textarea" name="description" id="description"
                               required
                               placeholder="Введите описание"
                               value={this.state.description}
                               onChange={this.inputChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input type="file" name="image" id="image"
                               onChange={this.fileChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup row>
                        <Label for="category" sm={2}>Категория</Label>
                        <Col sm={10}>
                            <Input type="select" name="category" id="category"
                                   onChange={this.inputChangeHandler}
                                   value={this.state.category}
                            >
                                {this.props.category && this.props.category.map(key=>
                                    <option key={key.id} value={key.id}>{key.name}</option>
                                )}
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="location" sm={2}>Местоположение</Label>
                        <Col sm={10}>
                            <Input type="select" name="location" id="location"
                                   onChange={this.inputChangeHandler}
                                   value={this.state.location}
                            >
                                {this.props.location && this.props.location.map(key=>
                                    <option key={key.id} value={key.id}>{key.description}</option>
                                )}
                            </Input>
                        </Col>
                    </FormGroup>
                    <button>OK</button>
                </Form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    category: state.category,
    location: state.location,
    oneTools: state.oneTools
});
const mapDispatchToProps = dispatch => ({
    orderCategory: ()=> dispatch(orderCategory()),
    addOfficeTools: (file)=> dispatch(addOfficeTools(file)),
    orderLocation: ()=> dispatch(orderLocation()),
    putOfficeTools: (id, file) => dispatch(putOfficeTools(id,file)),
    oneOrderTools: (id)=> dispatch(oneOrderTools(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormOfficeTools);