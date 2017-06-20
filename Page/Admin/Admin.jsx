import React, {Component} from "react";
import css from "./Admin.css";
//var Helmet=require("react-helmet");

require('es6-promise').polyfill();
require('isomorphic-fetch');

import ApplyList from "./Component/ApplyList/ApplyList.jsx";
import Detail from "./Component/Detail/Detail.jsx";

import Slider from "../../Common/Slider/Slider.jsx";
import Header from "../../Common/Header/Header.jsx"

//material-ui
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Entry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            detailOpen: false,
            selectID: 0,
            listID:0,
            itemID:0,
            list:[
                {
                    title:"课程补选申请列表",
                    data:[
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请上人工智能',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请上人工智能',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请上人工智能',
                            reason: '偶吼爱他啊'
                        }
                    ]
                },
                {
                    title:"对外交流申请列表",
                    data:[
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请去哈佛',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请去哈佛',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请去哈佛',
                            reason: '偶吼爱他啊'
                        }
                    ]
                },
                {
                    title:"开课申请列表",
                    data:[
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "wait",
                            content: '申请开人工智能',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请开人工智能',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请开人工智能',
                            reason: '偶吼爱他啊'
                        }
                    ]
                },
                {
                    title:"教学资源申请列表",
                    data:[
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请201',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请201',
                            reason: '偶吼爱他啊'
                        },{
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "wait",
                            content: '申请201',
                            reason: '偶吼爱他啊'
                        },{
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请201',
                            reason: '偶吼爱他啊'
                        }
                    ]
                }
            ]
        };
    }

    componentDidMount() {

    }
    SelectMenuChange = (index) =>{
        this.setState({selectID : index});
    };
    selectItemHandle = (listID, index) =>{
        this.setState({
            detailOpen: true,
            itemID: index,
            listID:listID
        })
    };
    HandleClose=()=>{
        this.setState({
            detailOpen:false
        })
    };
    render(){
        var beforeDeviderItems = [
            {"text": "全部申请", icon:"BookMark"},
            {"text": "课程补选申请", icon:"BookMark"},
            {"text": "对外交流申请", icon:"BookMark"},
            {"text": "开课申请", icon:"BookMark"},
            {"text": "教学资源申请", icon:"BookMark"}
        ];
        var afterDeviderItems = [
            {"text": "已受理申请", icon: "Done"},
            {"text": "选课管理", icon: "BookMark"}
        ];
        return(
            <div className="background header-bottom-container">
                <Header/>
                <Slider defaultValue={this.state.selectID}
                        beforeDeviderItems={beforeDeviderItems}
                        afterDeviderItems={afterDeviderItems}
                        onChange={this.SelectMenuChange}
                />
                <Paper zDepth={1} className="main">
                    {
                        this.state.list.map(function (list, index) {
                            if(this.state.selectID==0 || this.state.selectID==5 || this.state.selectID==index+1){
                                return(
                                    <ApplyList
                                        key={index}
                                        listID={index}
                                        title={list.title}
                                        data={list.data}
                                        onlyDone={this.state.selectID==5}
                                        HandleSelect={this.selectItemHandle}
                                    />
                                )
                            }
                            else {
                                return null;
                            }
                        }.bind(this))
                    }
                    {(this.state.selectID == 6) ? <Assignment/> : null}
                </Paper>
                <Detail open={this.state.detailOpen}
                        title={this.state.list[this.state.listID].title}
                        data={this.state.list[this.state.listID].data[this.state.itemID]}
                        HandleClose={this.HandleClose}
                />
            </div>
        )
    }
}

class Assignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modify: false,
            modifyBatch: {},
            startFilterCB: {},
            openAlert: false,
            assignment: []
        }
    }

    componentDidMount() {
        this.getAssignmentInfo();
    }

    getAssignmentInfo() {
        fetch(localStorage.root_url + 'api/Assignment/AllAssignments',
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

                this.setState({assignment: data})
            });
    }

    handleOpen = () => {
        this.setState({openAlert: true});
    };

    handleClose = () => {
        this.setState({openAlert: false});
    };

    render() {
        return (
            <div >
                <div style={{position: "relative"}}>
                    <div className={css.cardTitle + " " + css.inline}>教学班容量</div>
                    <FlatButton label="开始筛选" style={{margin: '0 20px'}} primary={true} onTouchTap={() => {
                        fetch(localStorage.root_url + 'api/Enrollment/StartFilter',
                            {
                                method: 'POST',
                                headers: {
                                    "Authorization": localStorage.token
                                }
                            })
                            .then((response) => response.json())
                            .then((cb) => {
                                //console.log(cb.data);
                                //console.log(window.eams.obParse(cb.data));
                                switch (cb.errorCode) {
                                    case 200: {
                                        this.setState({
                                            startFilterCB: {
                                                state: 'success',
                                                text: '筛选请求发送成功，服务器已开始筛选'
                                            }
                                        });
                                        break;
                                    }
                                    case 400: {
                                        this.setState({
                                            startFilterCB: {
                                                state: 'error',
                                                text: '服务器正在筛选，请不要重复发送筛选请求'
                                            }
                                        });
                                        break;
                                    }
                                    default: {
                                        this.setState({
                                            startFilterCB: {
                                                state: 'error',
                                                text: '请求发送失败，请稍后重试'
                                            }
                                        });
                                    }
                                }
                                this.handleOpen();
                            });
                    }}/>
                    <Dialog
                        title={"请求发送" + ((this.state.startFilterCB.state === 'success') ? "成功" : "失败")}
                        actions={
                            <FlatButton
                                label="好的"
                                primary={true}
                                onTouchTap={this.handleClose}
                                keyboardFocused={true}
                            />
                        }
                        modal={false}
                        open={this.state.openAlert}
                        onRequestClose={this.handleClose}
                    >
                        {this.state.startFilterCB.text}
                    </Dialog>
                    <div className={css.cardTitleButton + " " + css.inline}>
                        <Toggle
                            label="修改容量"
                            defaultToggled={this.state.modify}
                            onTouchTap={() => {
                                if (this.state.modify) {
                                    //submit
                                    let form = new FormData();
                                    let modifyBatch = JSON.stringify(this.state.modifyBatch);
                                    form.append('data', modifyBatch);
                                    console.log(modifyBatch);

                                    fetch(localStorage.root_url + 'api/Enrollment/SetEnrollable',
                                        {
                                            method: 'POST',
                                            headers: {
                                                "Authorization": localStorage.token
                                            },
                                            body: form
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
                                this.state.assignment.map((item, index) => {
                                    return (
                                        <TableRow key={index} displayBorder={false}>
                                            <TableRowColumn style={{width: '80px'}}>{item.id}</TableRowColumn>
                                            <TableRowColumn style={{width: '80px'}}>{item.courseName}</TableRowColumn>
                                            <TableRowColumn
                                                style={{width: '60px'}}>{item.instructorName}</TableRowColumn>
                                            <TableRowColumn/>
                                            <TableRowColumn style={{width: '50px'}}>
                                                <TextField
                                                    fullWidth={true}
                                                    inputStyle={{textAlign: "center"}}
                                                    name={"score" + index}
                                                    disabled={!this.state.modify}
                                                    defaultValue={item.enrollable}
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
            </div>
        )
    }
}

module.exports=Entry;