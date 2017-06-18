import React, {Component} from "react";
import ReactDOM from 'react-dom';
//var Helmet=require("react-helmet");

require('es6-promise').polyfill();
require('isomorphic-fetch');

import css from "./Courses.css";
import CourseForum from '../../../../Common/CourseForum/CourseForum.jsx'

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
import Dialog from 'material-ui/Dialog';

class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.getCourseInfo();
    }

    getCourseInfo() {
        fetch(localStorage.root_url + 'api/Assignment/MyAssignments',
            {
                method: "GET",
                headers: {
                    "Authorization": localStorage.token
                }
            }
        )
            .then((response) => response.json())
            .then((cb) => {
                //console.log(cb.data);
                //console.log(window.eams.obParse(cb.data));
                let data = window.eams.obParse(cb.data);

                this.setState({data: data})
            });
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
        let schedule = () => {
            let result = "";
            for (let item in this.props.data.schedule) {
                result += this.props.data.schedule[item].str + "; ";
            }
            return result;
        };
        return(
            <Paper zDepth={1} className={css.detail} onTouchTap={()=>{let open=this.state.open; if(!open){this.setState({open:!open})}}}>
                <div className={(this.state.open)?css.nameOpen:css.name}>{this.props.data.name}</div>
                <span className={css.schedule}>
                    {schedule()}
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
                    assignmentID={this.props.data.id}
                />
                {(!this.state.open)?null:
                    <div>
                        <Homework data={this.props.data.homework}/>
                        <CourseFile data={this.props.data.file}/>
                        <Forumn/>
                    </div>
                }
            </Paper>
        )
    }
}

class NextChapter extends Component{
    state = {
        open: [false, false, false],
        fileName: '',
        file: {},
        coverName: '',
        cover: {},
        title: '',
        description: ''
    };

    handleOpen = (index) => {
        let open = this.state.open;
        open[index] = true;
        this.setState({open: open});
    };

    handleClose = (index) => {
        let open = this.state.open;
        open[index] = false;
        this.setState({open: open});
    };

    handleFileBrowser() {
        let files = this.refs.fileUploader.files;
        if (files.length >= 1) {
            let data = new FormData();
            data.append('file', files[0], files[0].name);

            fetch(localStorage.root_url + 'api/Account/ChangeAvatar', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': localStorage.token,
                },
                body: data
            })
                .then((response) => response.json())
                .then((cb) => {
                    switch (cb.errorCode) {
                        case 200:

                            break;
                        default:

                    }
                });
        }
    }

    render(){
        let actions = [];
        actions[0] = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => {
                    this.handleClose(0)
                }}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {
                    let files = this.state.file;
                    let cover = this.state.cover;
                    let data = new FormData();
                    let title = this.state.title;
                    let description = this.state.description;

                    data.append('id', this.props.assignmentID);
                    data.append('title', title);
                    data.append('description', description);
                    (cover.length > 1) ? data.append('cover', cover[0], cover[0].name) : data.append('cover', null);
                    (files.length > 1) ? data.append('file', file[0], files[0].name) : data.append('files', null);

                    fetch(localStorage.root_url + 'api/Assignment/AddChapter', {
                        method: 'POST',
                        mode: "cors",
                        headers: {
                            'Authorization': localStorage.token,
                        },
                        body: data
                    }).then((response) => response.json())
                        .then((cb) => {
                            //console.log(cb);
                            window.location.href = window.location.href;
                        });
                    this.handleClose(0)
                }}
            />,
        ];

        return(
            <div className={(this.props.state)?css.cardContainer:null}>
                <div className={css.cardName} style={{display:(this.props.state)?'block':'none'}}>下一节课内容</div>
                <Paper className={(this.props.state)?css.card:css.cardClose} zDepth={(this.props.state)?1:0}>
                    <div>
                        <div className={css.cardTitle}>{this.props.data.title}</div>
                        <p className={css.cardP}>{this.props.data.text}</p>
                    </div>
                    <div className={css.buttonGroup}>
                        <RaisedButton label="新增内容" primary={true} onTouchTap={() => {
                            this.handleOpen(0)
                        }}/>
                        <Dialog
                            title="新增章节"
                            actions={actions[0]}
                            modal={false}
                            open={this.state.open[0]}
                            onRequestClose={() => {
                                this.handleClose(0)
                            }}
                        >
                            <TextField
                                ref="d0Title"
                                floatingLabelText="章节名称"
                                value={this.state.title}
                                onChange={
                                    (ob, val) => {
                                        this.setState({title: val});
                                    }
                                }
                            />
                            <br/>
                            <TextField
                                ref="d0Description"
                                floatingLabelText="章节介绍"
                                multiLine={true}
                                fullWidth={true}
                                value={this.state.description}
                                onChange={
                                    (ob, val) => {
                                        this.setState({description: val});
                                    }
                                }
                            />
                            <table style={{width: "100%"}}>
                                <tbody>
                                <tr>
                                    <td>
                                        <TextField
                                            disabled={true}
                                            value={this.state.coverName}
                                            fullWidth={true}
                                        />
                                    </td>
                                    <td style={{width: '88px'}}>
                                        <RaisedButton label="上传封面" secondary={true} onClick={() => {
                                            this.refs.coverUploader.click();
                                        }}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <table style={{width: "100%"}}>
                                <tbody>
                                <tr>
                                    <td>
                                        <TextField
                                            disabled={true}
                                            value={this.state.fileName}
                                            fullWidth={true}
                                        />
                                    </td>
                                    <td style={{width: '88px'}}>
                                        <RaisedButton label="上传课件" primary={true} onClick={() => {
                                            this.refs.fileUploader.click();
                                        }}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </Dialog>
                        <RaisedButton label="修改信息" onTouchTap={() => {
                            this.handleOpen(1)
                        }}/>
                        <RaisedButton label="上传课件" onTouchTap={() => {
                            this.handleOpen(2)
                        }}/>
                        <input type="file" id="d0FileUploader" ref="fileUploader" style={{display: "none"}}
                               onChange={() => {
                                   let files = this.refs.fileUploader.files;
                                   this.setState({file: files, fileName: files[0].name})
                               }}/>
                        <input type="file" id="d0CoverUploader" ref="coverUploader" accept=".jpg, .jpeg, .png, .bmp"
                               style={{display: "none"}}
                               onChange={() => {
                                   let files = this.refs.coverUploader.files;
                                   this.setState({cover: files, coverName: files[0].name})
                               }}/>
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
            modify: false,
            modifyBatch: {}
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
                                onTouchTap={() => {
                                    //submit


                                    let modifyBatch = this.state.modifyBatch;
                                    for (let key in modifyBatch) {
                                        var formData = new FormData();
                                        formData.append("id", key);
                                        formData.append("score", modifyBatch[key]);

                                        fetch(localStorage.root_url + 'api/Homework/EvaluateSubmission',
                                            {
                                                method: 'POST',
                                                headers: {
                                                    "Authorization": localStorage.token
                                                },
                                                body: formData
                                            });
                                    }

                                    let modify = this.state.modify;
                                    this.setState({modify: !modify, modifyBatch: {}})
                                }
                                }
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
                                                <TableRowColumn
                                                    className={css.homeworkId}>{item.studentID}</TableRowColumn>
                                                <TableRowColumn className={css.homeworkName}>{item.name}</TableRowColumn>
                                                <TableRowColumn className={css.homeworkIcon}>
                                                    {
                                                        (item.attachment) ?
                                                            <FileDownload
                                                                onClick={() => {
                                                                    window.open(localStorage.root_url + item.attachment)
                                                                }}
                                                                className="hover"
                                                            />
                                                            : null
                                                    }

                                                </TableRowColumn>
                                                <TableRowColumn/>
                                                <TableRowColumn className={css.homeworkScore}>
                                                    <TextField
                                                        fullWidth={true}
                                                        inputStyle={{textAlign:"center"}}
                                                        name={"score"+index}
                                                        disabled={!this.state.modify}
                                                        defaultValue={item.score}
                                                        hintText="未提交"
                                                        onChange={(event, value) => {
                                                            let modifyBatch = this.state.modifyBatch;
                                                            modifyBatch[item.id] = value;
                                                            this.setState({modifyBatch: modifyBatch});
                                                        }}
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
class Forumn extends Component {
    render() {
        return (
            <div className={css.cardContainer}>
                <div className={css.cardName}>课程论坛</div>
                <CourseForum />
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
                                                <TableRowColumn style={{textAlign: "right"}} className={css.fileIcon}>
                                                    <FileDownload
                                                        className="hover"
                                                        onClick={() => {
                                                            window.open(localStorage.root_url + item.url)
                                                        }}
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

module.exports = Courses;