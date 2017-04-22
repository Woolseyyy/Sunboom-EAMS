import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Material-UI
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleFieldSelect = this.handleFieldSelect.bind(this);
        this.LoginFormSubmit = this.LoginFormSubmit.bind(this);
    }

    handleFieldSelect(event, index, value) { this.setState({value}); }

    LoginFormSubmit() {
        var data = {
            usrname: this.refs.usrname.input.value,
            password: this.refs.psd.input.value,
            identity: this.state.value
        };
        console.log(data);
        // DO SOMETHING
    }

    render() {
        var style = {
            width : "197px",
            height: "259px",
            background: "#F8F3F3",
            padding: "72px 75px 120px 75px"
        };
        var logoStyle = {
            position:"absolute",
            display:"block",
            width : "76px",
            height: "76px",
            marginLeft:"-35px"

        };
        var h1Style={
            position:"absolute",
            fontSize: "20px",
            color: "#4A4A4A",
            textAlign: "center",
            width:"197px",
            lineHeight:'75px',
            marginTop: '0px',
            marginBottom:'0px'
        };
        return (
            <div style={style}>
                <div style={{height: '75px'}}>
                    <img src={require("./static/logo.png")} style={logoStyle}/>
                    <h1 style={h1Style}>Sunboom 教务系统</h1>
                </div>

                <TextField ref='usrname' hintText="请输入用户名" floatingLabelText="请输入用户名" style={{verticalAlign: 'bottom', width: '60%'}}/>
                <SelectField
                    floatingLabelText="登录身份"
                    value={this.state.value}
                    onChange={this.handleFieldSelect}
                    style={{verticalAlign: 'bottom', width: '40%'}}
                >
                    <MenuItem value={1} primaryText="学生" />
                    <MenuItem value={2} primaryText="教师" />
                    <MenuItem value={3} primaryText="管理员" />
                </SelectField>
                <div className="form-field">
                    <TextField ref='psd' hintText="请输入密码" floatingLabelText="请输入密码" style={{width: '100%', marginBottom:'16px'}}/>
                </div>
                    <div className="form-submit">
                        <RaisedButton
                            label="登录"
                            labelColor="#ffffff"
                            backgroundColor="#757575"
                            style={{width: '100%'}}
                            onTouchTap={this.LoginFormSubmit}/>
                    </div>
            </div>
        );
    }
}

module.exports = LoginForm;
