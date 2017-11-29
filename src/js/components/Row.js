import React, { Component } from 'react';

// Компонент строки адресса в списке

export default class Row extends Component {
    constructor(props) {
        super(props);
        this.handleItem = this.handleItem.bind(this);  
        this.handleDel = this.handleDel.bind(this);  
    }
    // передает в основной компонент метод клика по определенному объекту вместе с данным объектом
    handleItem(){
        this.props.handleclick(this.props.item);
    }
    // передает в основной компонент объект для удаления из стора и монгодб
    handleDel(){
        this.props.deleteItem(this.props.item);
    }
    render() {
        return (
            <tr onClick={this.handleItem}>
                <td>{this.props.item.country}</td>  
                <td>{this.props.item.city}</td> 
                <td>{this.props.item.street}</td> 
                <td>{this.props.item.house}</td> 
                <td><button onClick={this.handleDel} className="btn-enter"><i className="fa fa-trash fa-3" aria-hidden="true"></i></button></td>
            </tr>
        )
    }
}
    

