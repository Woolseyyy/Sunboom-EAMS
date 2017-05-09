import React, {Component} from "react";
import ReactDOM from 'react-dom';
//var Helmet=require("react-helmet");

import css from "./Courses.css";

//material-ui
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import {cyan500, cyan700, white} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[
                {
                    name: "软件工程",
                    schedule:"周二 9,10 节",
                    nextChapter:{
                        title: "CH35 Project Scheduling",
                        text: "hahhahahahahahahha"
                    },
                    homework:{
                        title:"作业四",
                        text:"找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小" +
                        "姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐",
                        list:[
                            {
                                id : "3140102349",
                                name:"吴昊潜",
                                score:"100"
                            },
                            {
                                id : "3140102349",
                                name:"吴昊潜",
                                score:null
                            }

                        ]
                    },
                    file: {
                        list: [
                            {
                                name: "第三周：Chap33.pptx",
                            },
                            {
                                name: "第二周：Chap33.pptx",
                            }
                        ]
                    }
                },
                {
                    name: "软件工程",
                    schedule: "周二 9,10 节",
                    nextChapter: {
                        title: "CH35 Project Scheduling",
                        text: "hahhahahahahahahha"
                    },
                    homework: {
                        title: "作业四",
                        text: "找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小" +
                        "姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐",
                        list: [
                            {
                                id: "3140102349",
                                name: "吴昊潜",
                                score: "100"
                            },
                            {
                                id: "3140102349",
                                name: "吴昊潜",
                                score: null
                            }

                        ]
                    },
                    file:{
                        list:[
                            {
                                name:"第三周：Chap33.pptx",
                            },
                            {
                                name:"第二周：Chap33.pptx",
                            }
                        ]
                    }
                }
            ]
        };
    }
    render(){

        return(
            <Paper zDepth={1} className="main">
                {
                    this.state.data.map(function (data, index) {
                        return (
                            <Detail data={data} key={index}/>
                        )
                    }.bind(this))
                }
            </Paper>
        )
    }
}

class Detail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render(){
        return(
            <Paper zDepth={1} className={css.detail} onTouchTap={()=>{let open=this.state.open; if(!open){this.setState({open:!open})}}}>
                <div className={(this.state.open)?css.nameOpen:css.name}>{this.props.data.name}</div>
                <span className={css.schedule}>
                    {this.props.data.schedule}
                </span>
                {(!this.state.open) ? null :
                    <FlatButton label="收起" primary={true}
                                style={{position: 'absolute', top: '20px', right: '35px'}}
                                onTouchTap={() => {
                                    this.setState({open: false})
                                }}/>
                }
                <NextChapter
                    data={this.props.data.nextChapter}
                    state={this.state.open}
                />
                {(!this.state.open)?null:
                    <div>
                        <Homework data={this.props.data.homework}/>
                        <CourseFile data={this.props.data.file}/>
                    </div>
                }
            </Paper>
        )
    }
}

class NextChapter extends Component{
    render(){
        return(
            <div className={(this.props.state)?css.cardContainer:null}>
                <div className={css.cardName} style={{display:(this.props.state)?'block':'none'}}>下一节课内容</div>
                <Paper className={(this.props.state)?css.card:css.cardClose} zDepth={(this.props.state)?1:0}>
                    <div>
                        <div className={css.cardTitle}>{this.props.data.title}</div>
                        <p className={css.cardP}>{this.props.data.text}</p>
                    </div>
                    <div className={css.buttonGroup}>
                        <RaisedButton label="新增内容" primary={true}/>
                        <RaisedButton label="修改信息"/>
                        <RaisedButton label="上传课件"/>
                    </div>
                </Paper>
            </div>
        )
    }
}

class Homework extends Component{
    constructor(props){
        super(props);
        this.state={
            modify: false
        }
    }

    render(){
        return(
            <div className={css.cardContainer}>
                <div className={css.cardName}>最近作业</div>
                <Paper className={css.card}>
                    <div>
                        <div className={css.cardTitle}>{this.props.data.title}</div>
                        <p className={css.cardP}>{this.props.data.text}</p>
                    </div>
                    <div className={css.buttonGroup}>
                        <RaisedButton label="新增作业" primary={true}/>
                        <RaisedButton label="作业要求修改"/>
                        <RaisedButton label="作业打包下载"/>
                    </div>
                    <div style={{position:"relative"}}>
                        <div className={css.cardTitle+" "+css.inline}>作业情况</div>
                        <div className={css.cardTitleButton+" "+css.inline}>
                            <Toggle
                                label="修改成绩"
                                defaultToggled={this.state.modify}
                                onTouchTap={()=>{let modify=this.state.modify;this.setState({modify:!modify})}}
                            />
                        </div>
                    </div>
                    <Divider/>
                    <div className={css.listTableContainer}>
                        <Table selectable={false}>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    this.props.data.list.map((item, index)=>{
                                        return(
                                            <TableRow key={index} displayBorder={false}>
                                                <TableRowColumn className={css.homeworkId}>{item.id}</TableRowColumn>
                                                <TableRowColumn className={css.homeworkName}>{item.name}</TableRowColumn>
                                                <TableRowColumn className={css.homeworkIcon}><FileDownload/></TableRowColumn>
                                                <TableRowColumn/>
                                                <TableRowColumn className={css.homeworkScore}>
                                                    <TextField
                                                        fullWidth={true}
                                                        inputStyle={{textAlign:"center"}}
                                                        name={"score"+index}
                                                        disabled={!this.state.modify}
                                                        defaultValue={(item.score==null)?item.score:"未提交"}
                                                    />
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
        )
    }
}

class CourseFile extends Component{
    constructor(props){
        super(props);
        this.state={
            modify: false
        }
    }

    render(){
        return(
            <div className={css.cardContainer}>
                <div className={css.cardName}>课程资料</div>
                <Paper className={css.card}>
                    <div style={{position:"relative"}}>
                        <div className={css.cardTitle+" "+css.inline}>课程文件</div>
                        <div className={css.cardTitleButton2+" "+css.inline}>
                            <FlatButton
                                label="上传"
                                labelPosition="after"
                                primary={true}
                                icon={<CloudUpload color={cyan500} />}
                                style={{height:"44px"}}
                            />
                        </div>
                    </div>
                    <Divider/>
                    <div className={css.listTableContainer}>
                        <Table selectable={false}>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    this.props.data.list.map((item, index)=>{
                                        return(
                                            <TableRow key={index} displayBorder={false}>
                                                <TableRowColumn className={css.fileName}>{item.name}</TableRowColumn>
                                                <TableRowColumn/>
                                                <TableRowColumn style={{textAlign:"right"}} className={css.fileIcon}><FileDownload/></TableRowColumn>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </div>
        )
    }
}

module.exports = Courses;