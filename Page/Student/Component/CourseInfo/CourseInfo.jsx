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

var css = require('./CourseInfo.css')
import CourseCardBundle from "../../../Entry/Component/CourseCard/CourseCard.jsx"
const CourseCardImgSource = CourseCardBundle.CourseCardImgSource;

class Entry extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <div className={css.paperContainer}>
                <Paper zDepth={1}>
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
                                <RaisedButton labelColor='#868686' label="课件下载"/>
                            </CardActions>
                        </Card>
                    </div>
                    <input className={css.hint} type="text" value="未提交作业" readOnly='true'/>
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
                                <RaisedButton labelColor='#868686' label="作业要求下载"/>
                                <RaisedButton labelColor='#868686' label="作业提交" style={{marginLeft: '20px'}}/>
                            </CardActions>
                        </Card>
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
                                                                            <FileDownload/>
                                                                        </IconButton>
                                                                    </TableRowColumn>
                                                                ) : (
                                                                    <TableRowColumn style={{width: "10%", paddingLeft: "0px", paddingRight: "0px", color: "#868686"}}>
                                                                        已提交
                                                                        <IconButton iconStyle={{width: "23px", height: "23px"}} style={{border: "0px", padding: "0px", width: "23px", height: "23px", verticalAlign: "middle"}}>
                                                                            <FileDownload/>
                                                                        </IconButton>
                                                                    </TableRowColumn>
                                                                )
                                                            ) : (
                                                                <TableRowColumn style={{width: "10%", paddingLeft: "0px", paddingRight: "0px", color: "#868686"}}>
                                                                    未上传
                                                                    <IconButton iconStyle={{width: "23px", height: "23px"}} style={{border: "0px", padding: "0px", width: "23px", height: "23px", verticalAlign: "middle"}}>
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
                                                                <FileDownload/>
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
            </div>
        );
    }
}

module.exports = Entry;
