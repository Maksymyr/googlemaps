import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Row from '../components/Row';
import {addAddress, addMongo, delAddress} from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {addresses: state.addresses}
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addAddress, addMongo, delAddress}, dispatch)
}

@connect (mapStateToProps, mapDispatchToProps)
export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: "",
            data: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        
        var lat = 50;
        var lng = 30;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                getCoords();
            }, function(error) {
                clearTimeout(location_timeout);
                geolocFail();
            },
                {
                    maximumAge:Infinity,
                    timeout:Infinity,
                    enableHighAccuracy:false
                });
        } else {
            geolocFail();
        }
        function geolocFail(){
            alert("Timeout");
        }
            var getCoords = () =>{

           
            this.mapper(lat, lng);
            var self=this.props;
            let addresses = [];
            fetch('/upload', {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                mode: 'cors',
                }).then(function(response) {  
                    console.log("this is res", response)
                    return response.text();  
                }).then(function(text) {  
                JSON.parse(text).map((item) => self.addMongo(item))
  
            }).catch((err) => {console.log(err)})
        }
    }
    handleClick (item) {
        this.setState({item})
        console.log(item);
        var lat = item.lat;
        var lng = item.lng;
        this.mapper(lat, lng);


    }
    mapper(lat, lng) {
        var map;
        var pos = new google.maps.LatLng(lat,lng);
        var myOptions = {
            zoom: 10,
            center:  pos,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            marker: marker
        };
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        var point = new google.maps.LatLng(lat,lng);
        var marker = new google.maps.Marker({
            position: point, map: map, title: 'Address'
        });
    }
    handleSubmit = (event) => {
        let checkFill = 0;
        for (let i = 0; i < 4; i++) {
            this.refs.form.children[i].style.backgroundColor = "transparent";
            if(this.refs.form.children[i].value.trim() == '') {
                this.refs.form.children[i].style.backgroundColor = "rgb(243, 210, 210)";
            }
            else checkFill++;
        }
        if(checkFill==4) {
            let country = this.refs.country.value.trim();
            let city = this.refs.city.value.trim()
            let street = this.refs.street.value.trim();
            let house = this.refs.house.value.trim()
            let lat;
            let lng;
            let check ='ZERO_RESULTS';
            fetch(`http://maps.googleapis.com/maps/api/geocode/json?address=${country}+${city}+${street}+${house}&sensor=false`, {
                method: "GET",
                }).then(function(response) {  
                    return response.text();  
                }).then(function(text) {  
                    check = JSON.parse(text).status;
                    lat = JSON.parse(text).results[0].geometry.location.lat;
                    lng = JSON.parse(text).results[0].geometry.location.lng;                   
            }).catch((err) => {console.log(err)})
            setTimeout (() => {
                if (check == 'OK') {
                    this.props.addAddress({country, city, street, house, lat, lng})
                    for (let i = 0; i < 4; i++) {
                        this.refs.form.children[i].value = '';
                    }
                }
                else if (check == 'OVER_QUERY_LIMIT') {
                    alert("Over query limit!");
                } 
                else {
                    alert("No such address!");
                }
            }, 1000)
        }
        else {
            alert("Fill all fields please!")
        };
    }
    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="searchbar form-group"> 
                            <div ref="form">
                                <input type="text" ref="country" className="form-control" placeholder="Country"/>
                                <input type="text" ref="city" className="form-control" placeholder="City"/>
                                <input type="text" ref="street" className="form-control" placeholder="Street"/>
                                <input type="number" ref="house" className="form-control" placeholder="House #"/>
                                <button onClick={this.handleSubmit} className="btn-enter">
                                    <i className="fa fa-plus-square-o fa-3" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                    <div id="map"></div>
                        </div>
                    <div className="col-sm-12">
                        <table className="user-list table table-striped">
                            <thead>
                                <tr>
                                    <th>Country</th>
                                    <th>City</th>
                                    <th>Street</th>
                                    <th>House</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {!this.props.addresses ? null : this.props.addresses.map((item, index) => <Row deleteItem={this.props.delAddress} handleclick={this.handleClick} item={item} key={index}/>)}
                            </tbody>
                        </table>
                    </div>
                </div>             
            </div>
        ); 
    }
}

