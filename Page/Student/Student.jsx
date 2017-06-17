var React = require("react");
var css = require("./Student.css");

import Slider from "../../Common/Slider/Slider.jsx"
import Header from "../../Common/Header/Header.jsx"
import CourseList from "./Component/CourseList/CourseList.jsx"
import CourseSelectList from "./Component/CourseSelectList/CourseSelectList.jsx"
import CourseInfo from "./Component/CourseInfo/CourseInfo.jsx"

import CourseForumDetail from "../../Common/CourseForumDetail/CourseForumDetail.jsx"
import ApplyList from "../../Common/ApplyList/ApplyList.jsx"
import Detail from "../../Common/Detail/Detail.jsx"

class Entry extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selectID: 0
        };
    }

    SelectMenuChange = (index) => {
        this.setState({selectID: index, alertCourseList: false});
    };

    router = () => {
        switch (this.state.selectID)
        {
            case 0: return (
                <div className="main">
                    <CourseList />
                </div>

            );
            case 1: return (
                <div className="main">

                </div>
            );
            case 3: return (
                <div className="main">
                    <CourseSelectList />
                </div>
            );
            case 4: return (
                <div className="main">
                    <Apply />
                </div>
            )
        }
    }

    render()
    {
        var beforeDeviderItems =
        [
            {"text": "课程列表", icon:"BookMark"},
            {"text": "个人信息", icon:"BookMark"},
            {"text": "已完成课程", icon: "Done"}
        ];
        var afterDeviderItems = [
            {"text": "选课", icon:"BookMark"},
            {"text": "其他申请", icon:"BookMark"},
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

class Apply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                title: "其他申请",
                data: [
                    {
                        id: "",
                        author: "",
                        status: "",
                        content: '',
                        reason: '',
                        date: ''
                    },
                ]
            },
            detailOpen: false,
            itemID: 0
        };
    }

    componentDidMount() {
        return fetch(localStorage.root_url + 'api/Application/MyApplications', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.token,
            },
        })
        .then((response) => response.json())
        .then((cb) => {
            switch (cb.errorCode)
            {
                case 200:
                    var list = this.state.list;
                    var data = [];
                    cb.data.forEach((value, key) => {
                        data.push({
                            id: value.issuerID,
                            author: value.issuerName,
                            status: value.status,
                            content: value.shortStr,
                            reason: value.message,
                            date: value.date
                        })
                    })
                    list.data = data;
                    this.setState({list: list});
                    break;
                default:
                    console.log("获取数据库申请列表失败");
            }
        });
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
            <div>
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
module.exports=Entry;
