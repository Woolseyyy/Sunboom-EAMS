import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';

import css from './GradeReview.css';
import Dialog from 'material-ui/Dialog';

// Material-UI
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        };
    }

    handleCancel = () => {
        this.setState({dialogOpen: false});
    }

    handleSubmit = () => {
        this.setState({dialogOpen: true});
    }

    handleConfirm = (msg) => {
        this.setState({dialogOpen: false});
        this.props.postGradeReview(msg);
        this.props.closeGradeReview();
    }

    render() {

        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleCancel}
            />,
            <FlatButton
                label="提交"
                primary={true}
                onTouchTap={(msg) => this.handleConfirm(this.refs.review_reason.input.refs.input.value)}
            />,
        ];
        return (
            <div>
                <Drawer
                    width={(document.body.clientWidth > 992) ? '50%' : '80%'}
                    docked={false}
                    open={this.props.reviewOpen}
                    onRequestChange={this.props.closeGradeReview}
                    openSecondary={true}
                    containerClassName={css.drawer}
                >
                    <h1 className={css.title}>{"成绩复议"}</h1>
                    <table>
                        <tbody>
                        <tr className={css.line}>
                            <td className={css.label}>申请人</td>
                            <td className={css.content}>{this.props.studentName}</td>
                        </tr>
                        <tr className={css.line}>
                            <td className={css.label}>学号/工号</td>
                            <td className={css.content}>{this.props.studentID}</td>
                        </tr>
                        <tr className={css.line}>
                            <td className={css.label}>复议课程</td>
                            <td className={css.content}>{this.props.courseName}</td>
                        </tr>
                        </tbody>
                    </table>
                    <TextField
                        ref='review_reason'
                        hintText="成绩复议理由(不超过200字)"
                        multiLine={true}
                        fullWidth={true}
                        rows={17}
                        rowsMax={20}
                    />
                    <div className={css.buttonGroup}>
                        <RaisedButton className={css.button} label="提交申请" onTouchTap={this.handleSubmit}/>
                    </div>
                </Drawer>
                <div className="review-dialog">
                    <Dialog
                        title="确定提交申请吗?"
                        actions={actions}
                        modal={true}
                        contentStyle={{width: '100%', maxWidth: 'none'}}
                        open={this.state.dialogOpen}
                    >
                        确定要提交课程{this.props.courseName}的成绩复议吗？
                    </Dialog>
                </div>
            </div>
        );
    }
}

module.exports = Review;
