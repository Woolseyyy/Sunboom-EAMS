import React, {Component} from "react";
import ReactDOM from 'react-dom';
//var Helmet=require("react-helmet");

import css from "./Courses.css";

//material-ui
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class Entry extends Component{
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
                        "姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐找一个小姐姐"
                    }
                }
            ]
        };
    }
    render(){

        return(
            <Paper zDepth={1} className="main">
                <Detail
                    data={this.state.data[0]}
                />
            </Paper>
        )
    }
}

class Detail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }

    render(){
        return(
            <Paper zDepth={1} className={css.detail} onTouchTap={()=>{let open=this.state.open; this.setState({open:!open})}}>
                <div className={(this.state.open)?css.nameOpen:css.name}>{this.props.data.name}</div>
                <span className={css.schedule}>
                    {this.props.data.schedule}
                </span>
                <NextChapter
                    data={this.props.data.nextChapter}
                    state={this.state.open}
                />
                {(!this.state.open)?null: <Homework data={this.props.data.homework}/>}
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
                </Paper>
            </div>
        )
    }
}

module.exports=Entry;