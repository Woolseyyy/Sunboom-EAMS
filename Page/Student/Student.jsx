var React = require("react");
var css = require("./Student.css");

import Slider from "../../Common/Slider/Slider.jsx"
import Header from "../../Common/Header/Header.jsx"
import CourseCardBundle from "../Entry/Component/CourseCard/CourseCard.jsx"

var CourseCard = CourseCardBundle.CourseCard;
const CourseCardImgSource = CourseCardBundle.CourseCardImgSource;

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
        this.setState({selectID: index});
    };

    router = () => {
        switch (this.state.selectID)
        {
            case 0: return (
                <div className="main">
                    <div className={css.cardContainer}>
                        <div className={css.card}>
                            <CourseCard
                                avatar_title="软件工程"
                                avatar_subtitle="下一节课为 周日下午三四节"
                                avatar_img={CourseCardImgSource["SE"]["avator"]}
                                course_img={CourseCardImgSource["SE"]["course"]}
                                course_title='CH35 Project Scheduling'
                                course_info='Scheduling Principles, compartmentalization distinct tasks'
                                button1_title='课件'
                                button2_title='作业四'
                                alert_msg='作业四还有三天截止'
                            />
                        </div>
                        <div className={css.card}>
                            <CourseCard className={css.card}
                                avatar_title="人工智能"
                                avatar_subtitle="下一节课为 周五上午三四五节"
                                avatar_img={CourseCardImgSource["AI"]["avator"]}
                                course_img={CourseCardImgSource["AI"]["course"]}
                                course_title=''
                                course_info=''
                                button1_title='课件'
                                button2_title='作业二（已完成）'
                                alert_msg='目前无未提交作业'
                            />
                        </div>
                        <div className={css.card}>
                            <CourseCard className={css.card}
                                avatar_title="编译原理"
                                avatar_subtitle="下一节课为 周四下午六七八节"
                                avatar_img={CourseCardImgSource["Compiler"]["avator"]}
                                course_img={CourseCardImgSource["Compiler"]["course"]}
                                course_title='CH5 semantic analysis'
                                course_info='完全不知道编译原理是什么鬼'
                                button1_title='课件'
                                button2_title='作业二（未完成）'
                                alert_msg='考试取消啦哈哈哈哈哈哈'
                            />
                        </div>
                    </div>
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
