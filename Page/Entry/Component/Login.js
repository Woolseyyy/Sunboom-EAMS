import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Material-UI
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export default class LoginForm extends Component {
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
        }
        console.log(data)
        // DO SOMETHING
    }

    render() {
        return (
            <div>
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
                    <TextField ref='psd' hintText="请输入密码" floatingLabelText="请输入密码" style={{width: '100%'}}/>
                </div>
                    <div className="form-submit">
                    <RaisedButton label="登录" secondary={true} style={{width: '100%'}} onClick={this.LoginFormSubmit}/>
                </div>
            </div>
        );
    }
}
