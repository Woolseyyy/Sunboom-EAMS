var React = require("react");
var css = require("./Student.css");

import Slider from "../../Common/Slider/Slider.jsx"
import Header from "../../Common/Header/Header.jsx"
import CourseList from "./Component/CourseList/CourseList.jsx"
import CourseSelectList from "./Component/CourseSelectList/CourseSelectList.jsx"
import CourseInfo from "./Component/CourseInfo/CourseInfo.jsx"

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
            case 3: return (
                <div className="main">
                    <CourseSelectList />
                </div>
            );
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
            {"text": "其他报告", icon:"InfoOutline"}
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
module.exports=Entry;
