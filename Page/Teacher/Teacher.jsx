var React=require("react");
var style=require("./Teacher.css");
//var Helmet=require("react-helmet");

import Courses from "./Component/Courses/Courses.jsx";
import ApplyList from "./Component/ApplyList/ApplyList.jsx";
import Detail from "./Component/Detail/Detail.jsx";

import Slider from "../../Common/Slider/Slider.jsx";
import Header from "../../Common/Header/Header.jsx"

//material-ui
import Paper from 'material-ui/Paper';

class Teacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectID: 0
        };
    }
    SelectMenuChange = (index) =>{
        this.setState({selectID : index});
    };
    router = () => {
        switch (this.state.selectID) {
            case 0:
                return <Courses/>;
            case 2:
                return <CourseApply/>;
            case 3:
                return <SourceApply/>;
        }

    };
    render(){
        var beforeDeviderItems = [
            {"text": "课程列表", icon:"BookMark"},
            {"text": "个人信息", icon:"BookMark"}
        ];
        var afterDeviderItems = [
            {"text": "开课申请", icon:"BookMark"},
            {"text": "教学资源申请", icon:"BookMark"}
        ];
        return(
            <div className="background header-bottom-container">
                <Header/>
                <Slider defaultValue={this.state.selectID}
                        beforeDeviderItems={beforeDeviderItems}
                        afterDeviderItems={afterDeviderItems}
                        onChange={this.SelectMenuChange}
                />
                {this.router()}
            </div>
        )
    }
}

class CourseApply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                title: "开课申请",
                data: [
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
            detailOpen: false,
            itemID: 0
        };
    }

    HandleClose = () => {
        this.setState({
            detailOpen: false
        })
    };

    selectItemHandle = (index) => {
        this.setState({
            detailOpen: true,
            itemID: index
        })
    };

    render() {
        return (
            <div className="main">
                <ApplyList
                    title={this.state.list.title}
                    data={this.state.list.data}
                    HandleSelect={this.selectItemHandle}
                />
                <Detail open={this.state.detailOpen}
                        title={this.state.list.title}
                        data={this.state.list.data[this.state.itemID]}
                        HandleClose={this.HandleClose}
                />
            </div>
        )
    }
}

class SourceApply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                title: "教学资源申请",
                data: [
                    {
                        id: "3140102349",
                        author: "吴昊潜",
                        statue: "wait",
                        content: '申请开208教室',
                        reason: '偶吼爱他啊'
                    },
                    {
                        id: "3140102349",
                        author: "吴昊潜",
                        statue: "done",
                        content: '申请保健室两点',
                        reason: '偶吼爱他啊'
                    }
                ]
            },
            detailOpen: false,
            itemID: 0
        };
    }

    HandleClose = () => {
        this.setState({
            detailOpen: false
        })
    };

    selectItemHandle = (index) => {
        this.setState({
            detailOpen: true,
            itemID: index
        })
    };

    render() {
        return (
            <div className="main">
                <ApplyList
                    title={this.state.list.title}
                    data={this.state.list.data}
                    HandleSelect={this.selectItemHandle}
                />
                <Detail open={this.state.detailOpen}
                        title={this.state.list.title}
                        data={this.state.list.data[this.state.itemID]}
                        HandleClose={this.HandleClose}
                />
            </div>
        )
    }
}

module.exports = Teacher;