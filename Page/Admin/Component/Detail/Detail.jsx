import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import css from "./Detail.css";

// Material-UI
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

/*prop type
 * 1. open: if open
 * 2. data: the data to present
 */

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit = () =>{
        //send request
        this.handleClose();
    };
    refuse = () => {
        //send request
        this.handleClose();
    };
    handleClose = () => this.props.HandleClose();
    render() {
        return (
            <Drawer
                width={(document.body.clientWidth>992)?'50%':'80%'}
                docked={false}
                open={this.props.open}
                onRequestChange={this.handleClose}
                openSecondary={true}
                containerClassName={css.drawer}
            >
                <h1 className={css.title}>{this.props.title}</h1>
                <table>
                    <tbody>
                    <tr className={css.line}>
                        <td className={css.label}>申请人</td>
                        <td className={css.content}>{this.props.data.author}</td>
                    </tr>
                    <tr className={css.line}>
                        <td className={css.label}>学号/工号</td>
                        <td className={css.content}>{this.props.data.id}</td>
                    </tr>
                    <tr className={css.line}>
                        <td className={css.label}>申请事项</td>
                        <td className={css.content}>{this.props.data.content}</td>
                    </tr>
                    <tr className={css.line}>
                        <td className={css.label}>申请理由</td>
                        <td className={css.content}>{this.props.data.reason}</td>
                    </tr>
                    </tbody>
                </table>
                <div className={css.buttonGroup}>
                    <RaisedButton className={css.button} label="通过" primary={true} onTouchTap={this.submit}/>
                    <RaisedButton className={css.button} label="驳回" secondary={true} onTouchTap={this.refuse}/>
                    <RaisedButton className={css.button} label="取消" onTouchTap={this.handleClose}/>
                </div>

            </Drawer>
        );
    }
}

module.exports = Detail;
