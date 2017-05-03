var React = require("react");
var css = require("./CourseList.css");

import CourseCardBundle from "../../../Entry/Component/CourseCard/CourseCard.jsx"
import CourseInfo from "../CourseInfo/CourseInfo.jsx"

var CourseCard = CourseCardBundle.CourseCard;
const CourseCardImgSource = CourseCardBundle.CourseCardImgSource;

class Entry extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            OnCourseList: true,
            data: {
                avatar: CourseCardImgSource["SE"]["avator"],
                title: "软件工程",
                course_img: CourseCardImgSource["SE"]["course"],
                next_chap_title: "CH35 Project Scheduling",
                next_chap_content: "乌鲁鲁噜噜噜噜噜噜",
                homework_title: "作业四",
                homework_content: "巴啦啦啦啦啦啦啦啦啦啦啦",
                homework: [
                    {name: "第一次作业", grade: "95/100", submit: true},
                    {name: "第二次作业", grade: "", submit: true},
                    {name: "第三次作业", grade: "", submit: false}
                ],
                material: [
                    {name: "第三周：chap33.pptx"},
                    {name: "作业四要求.pptx"},
                    {name: "第二周：chap31.pptx"}
                ]
            }
        };
    }

    router = () => {
        if (this.state.OnCourseList)
        {
            return this.CourseList();
        } else {
            return (
                <CourseInfo data={this.state.data}/>
            )
        }
    }

    changeOnCourseList = () => {
        this.state.OnCourseList = false;
        console.log(this.state.OnCourseList);
    }

    render()
    {
        return this.router();
    }

    CourseList() {
        return (
                <div className={css.cardContainer}>
                    <div className={css.card} onClick={this.changeOnCourseList}>
                        <CourseCard
                            avatar_title="软件工程"
                            avatar_subtitle="下一节课为 周日下午三四节"
                            avatar_img={CourseCardImgSource["SE"]["avator"]}
                            course_img={CourseCardImgSource["SE"]["course"]}
                            course_title='CH35 Project Scheduling'
                            course_info='Scheduling Principles, compartmentalization distinct tasks'
                            buttons={[{label: '课件', onClick: function(){}}, {label: '作业四', onClick: function(){}}]}
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
                            buttons={[{label: '课件', onClick: function(){}}, {label: '作业二（已完成）', onClick: function(){}}]}
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
                            buttons={[{label: '课件', onClick: function(){}}, {label: '作业三（未提交）', onClick: function(){}}]}
                            alert_msg='考试取消啦哈哈哈哈哈哈'
                        />
                    </div>
                </div>
        )
    }
}
module.exports=Entry;
