import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//var Helmet=require("react-helmet");
import css from "./Header.css"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import {grey900} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render(){
        var barStyle={
            position: "fixed",
            height : "64px",
            background: "#F9F3F3",
            boxShadow: "0 0 4px 0 rgba(0,0,0,0.12), 0 3px 8px 0 rgba(0,0,0,0.24)",
            color:"#000000",
            top: 0
        };
        var titleStyle={
            color:"#000000",
            fontSize:"20px",
            lineHeight:"64px",
            marginLeft: "30px"
        };
        return(
            <AppBar
                style={barStyle}
                title="SunBoom-教育管理系统"
                titleStyle={titleStyle}
                iconElementLeft = {<IconButton><NavigationMenu color={grey900}/></IconButton>}
                iconStyleLeft = {{display :"none"}}
                iconElementRight={<FlatButton label="退出" secondary={true} onTouchTap={() => {
                    window.location = "#/";
                }}/>}
            />
        )
    }
}

module.exports=Header;