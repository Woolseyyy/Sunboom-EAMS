import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton'

import FileDownload from 'material-ui/svg-icons/file/file-download';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import KeyBoardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

var css = require('./CourseInfo.css');
import CourseCardBundle from "../CourseCard/CourseCard.jsx";
import ToolFunction from "../ToolFuction/ToolFunction.jsx";
const CourseCardImgSource = CourseCardBundle.CourseCardImgSource;

import CourseForum from '../../../../Common/CourseForum/CourseForum.jsx';
import GradeReview from '../GradeReview/GradeReview.jsx';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const customDialogContentStyle = {
    width: '100%',
    maxWidth: 'none',
};
class Entry extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            reviewOpen: false,
            homeworkID: 1,
            dialogOpen: false,
            dialogTitle: "",
            dialogMsg: ""
        }
        this.submitHomework = this.submitHomework.bind(this);
        this.submitLatestHomework = this.submitLatestHomework.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false});
    }

    submitLatestHomework = () => {
        this.refs.uploadLatestHomeworkBrowser.click();
    }

    submitHomework = (e) => {
        this.setState({homeworkID: e});
        this.refs.uploadHomeworkBrowser.click();
    }

    handleGradeReview = () => {
        this.setState({reviewOpen: true});
    }

    closeGradeReview = () => {
        this.setState({reviewOpen: false});
    }

    postGradeReview = (msg) => {
        var data = new FormData();
        data.append("enrollmentID", this.props.data.enrollmentID);
        data.append("message", msg);
        return fetch(localStorage.root_url + 'api/Application/Reevaluate', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.token,
            },
            body: data
        })
        .then((response) => response.json())
        .then((json) => {});
    }

    render() {
        const actions = [
            <FlatButton
                label="我知道了"
                primary={true}
                onTouchTap={this.handleDialogClose}
            />];
        return (
            <div className={css.paperContainer}>
                <GradeReview
                    reviewOpen={this.state.reviewOpen}
                    closeGradeReview={this.closeGradeReview}
                    studentName={localStorage.studentName}
                    studentID={localStorage.studentID}
                    courseName={this.props.data.title}
                    postGradeReview={this.postGradeReview}
                />
                <ToolFunction secondIconClick={this.handleGradeReview} />
                <Paper zDepth={1}>
                    <div className="student-backto-courselist">
                        <IconButton
                            iconStyle={{width: "48px", height: "48px"}}
                            style={{marginLeft: "15px", marginTop: "10px", border: "0px", padding: "0px", width: "48px", height: "48px", verticalAlign: "middle"}}
                            onClick={this.props.clickBackCouseList}
                            >
                            <KeyBoardArrowLeft/>
                        </IconButton>
                    </div>
                    <div className="student-courseinfo-header">
                        <Avatar className={css.avatar} src={this.props.data.avatar} size={70}/>
                        <input className={css.title} type="text" value={this.props.data.title} readOnly='true'/>
                    </div>
                    <input className={css.hint} type="text" value="下一节课内容" readOnly='true'/>
                    <div className="student-courseinfo-nextclass">
                        <Card className={css.nextCourseCard}>
                            <CardMedia style={{paddingLeft: '35px', paddingTop: '20px', paddingRight: '40px'}}>
                                <img src={this.props.data.course_img}/>
                            </CardMedia>
                            <CardTitle title={this.props.data.next_chap_title}
                                       titleStyle={{fontSize: '15px', fontWeight: 'bold', marginLeft: '36px', marginTop: '12px'}}
                                       style={{padding: '0px'}}
                            />
                            <CardText style={{marginLeft: '26px', padding: '10px'}}>
                                {this.props.data.next_chap_content}
                            </CardText>
                            <CardActions style={{marginLeft: '30px'}}>
                                <RaisedButton labelColor='#868686' label="课件下载"
                                    onClick={() => {
                                        if (this.props.data.next_chap_url == null)
                                        {
                                            this.setState({dialogOpen: true, dialogMsg: "当前无课件下载", dialogTitle: "课件下载错误"})
                                        }
                                        else
                                        {
                                            window.open(localStorage.root_url + this.props.data.next_chap_url);
                                        }
                                    }}/>
                            </CardActions>
                        </Card>
                    </div>
                    <input className={css.hint} type="text" value="最近一次作业" readOnly='true'/>
                    <div className="student-courseinfo-homework">
                        <Card className={css.homework}>
                            <CardTitle title={this.props.data.homework_title}
                                       titleStyle={{paddingTop: '40px', marginLeft: '36px', fontWeight: 'bold', fontSize: '25px'}}
                                       style={{padding: '0px'}}
                            />
                            <CardText style={{marginLeft: '26px', padding: '10px'}}>
                                {this.props.data.homework_content}
                            </CardText>
                            <CardActions style={{marginLeft: '30px', paddingTop: '30px', paddingBottom: '30px'}}>
                                <RaisedButton labelColor='#868686' label="作业提交" onClick={this.submitLatestHomework}/>
                            </CardActions>
                        </Card>
                    </div>
                    <input className={css.hint} type="text" value="课程论坛" readOnly='true'/>
                    <div>
                        <div className={css.forum}>
                            <CourseForum />
                        </div>
                    </div>
                    <input className={css.hint} type="text" value="课程资料" readOnly='true'/>
                    <div style={{paddingBottom: '60px'}}>
                        <Paper className={css.material}>
                            <input className={css.material_title} type="text" value="个人成绩" readOnly='true'/>
                            <Divider style={{marginLeft: "30px", marginTop: "10px", marginRight: "40px"}}/>
                            <div className={css.material_table}>
                                <Table selectable={false}>
                                    <TableBody displayRowCheckbox={false}>
                                        {
                                            this.props.data.homework.map((item, id) => {
                                                return (
                                                    <TableRow displayBorder={false} key={id}>
                                                        <TableRowColumn style={{width: "60%", paddingLeft: "30px", paddingRight: "0px", color: "#868686"}}>{item.name}</TableRowColumn>
                                                        <TableRowColumn style={{width: "10%", paddingLeft: "0px", paddingRight: "0px", color: "#868686"}}>{item.grade}</TableRowColumn>
                                                        {
                                                            (item.submit) ? (
                                                                (item.grade != "") ? (
                                                                    <TableRowColumn style={{width: "10%", paddingLeft: "0px", paddingRight: "0px", color: "#868686"}}>
                                                                        已评分
                                                                        <IconButton iconStyle={{width: "23px", height: "23px"}} style={{border: "0px", padding: "0px", width: "23px", height: "23px", verticalAlign: "middle"}}>
                                                                            <FileDownload
                                                                                onClick={() => {
                                                                                    window.open(localStorage.root_url + item.url)
                                                                                }}/>
                                                                        </IconButton>
                                                                    </TableRowColumn>
                                                                ) : (
                                                                    <TableRowColumn style={{width: "10%", paddingLeft: "0px", paddingRight: "0px", color: "#868686"}}>
                                                                        已提交
                                                                        <IconButton iconStyle={{width: "23px", height: "23px"}} style={{border: "0px", padding: "0px", width: "23px", height: "23px", verticalAlign: "middle"}}>
                                                                            <FileDownload
                                                                                onClick={() => {
                                                                                    window.open(localStorage.root_url + item.url)
                                                                                }}/>
                                                                        </IconButton>
                                                                    </TableRowColumn>
                                                                )
                                                            ) : (
                                                                <TableRowColumn style={{width: "10%", paddingLeft: "0px", paddingRight: "0px", color: "#868686"}}>
                                                                    未上传
                                                                    <IconButton iconStyle={{width: "23px", height: "23px"}} onTouchTap={(e) => this.submitHomework(item.id)} style={{border: "0px", padding: "0px", width: "23px", height: "23px", verticalAlign: "middle"}}>
                                                                        <FileUpload/>
                                                                    </IconButton>
                                                                </TableRowColumn>
                                                            )
                                                        }
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                            <input className={css.material_title} type="text" value="资料下载" readOnly='true'/>
                            <Divider style={{marginLeft: "30px", marginTop: "10px", marginRight: "40px"}}/>
                            <div className={css.material_table}>
                                <Table selectable={false}>
                                    <TableBody displayRowCheckbox={false}>
                                        {
                                            this.props.data.material.map((item, id) => {
                                                return (
                                                    <TableRow displayBorder={false} key={id}>
                                                        <TableRowColumn style={{width: "70%", paddingLeft: "30px", paddingRight: "0px", color: "#868686"}}>{item.name}</TableRowColumn>
                                                        <TableRowColumn style={{width: "10%", paddingLeft: "0px", paddingRight: "0px", color: "#868686"}}>
                                                            可下载
                                                            <IconButton iconStyle={{width: "23px", height: "23px"}} style={{border: "0px", padding: "0px", width: "23px", height: "23px", verticalAlign: "middle"}}>
                                                                <FileDownload
                                                                    onClick={() => {
                                                                        if (this.props.data.next_chap_url == null)
                                                                        {
                                                                            this.setState({dialogOpen: true, dialogMsg: "该资料已经下线", dialogTitle: "资料下载错误"})
                                                                        }
                                                                        else
                                                                        {
                                                                            window.open(localStorage.root_url + item.url)
                                                                        }
                                                                    }}/>
                                                            </IconButton>
                                                        </TableRowColumn>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        </Paper>
                    </div>
                </Paper>
                <div className="info-dialog">
                    <Dialog
                        title={this.state.dialogTitle}
                        actions={actions}
                        modal={true}
                        contentStyle={customDialogContentStyle}
                        open={this.state.dialogOpen}
                    >
                        {this.state.dialogMsg}
                    </Dialog>
                </div>
                <input type="file" id="file" ref="uploadHomeworkBrowser" style={{display: "none"}} onChange={(files, homeworkID) => this.props.handleSubmitHomework(this.refs.uploadHomeworkBrowser.files, this.state.homeworkID)}/>
                <input type="file" id="file" ref="uploadLatestHomeworkBrowser" style={{display: "none"}} onChange={(files) => this.props.handleSubmitLatestHomework(this.refs.uploadLatestHomeworkBrowser.files)}/>
            </div>
        );
    }
}

module.exports = Entry;
