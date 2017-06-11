var React = require("react");
var css = require("./CourseSelectList.css");

import CourseCardBundle from "../CourseCard/CourseCard.jsx"

var CourseCard = CourseCardBundle.CourseCard;
const CourseCardImgSource = CourseCardBundle.CourseCardImgSource;

class Entry extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
                <div className={css.cardContainer}>
                    <div className={css.card}>
                        <CourseCard
                            avatar_title="软件工程"
                            avatar_subtitle="春夏长学期 周日下午三四节 周一上午六七节"
                            avatar_img={CourseCardImgSource["SE"]["avator"]}
                            course_img={CourseCardImgSource["SE"]["course"]}
                            course_title='Software Engineering'
                            course_info='"软件工程"指导学生理解软件工程基本概念的重要性，介绍软件过程模型、方法与工具、以及软件管理这三大基础，讨论传统方法学与面向对象方法学。通过模拟案例，使学生在实践中体会软件的生命周期，包括需求分析、总体设计、详细设计、编码、测试、维护、以及团队合作。在实践中学生将学习使用传统工具，如数据流图、数据字典、实体-关联图、系统层次图；还有面向对象工具如脚本、事件跟踪图、状态迁移图、CRC卡等。'
                            buttons={[{label: '专业必修', onClick: function(){}, labelColor: '#EB2A29', backgroundColor: '#D8D8D8'}]}
                            alert_msg=''
                        />
                    </div>
                    <div className={css.card}>
                        <CourseCard className={css.card}
                            avatar_title="人工智能"
                            avatar_subtitle="下一节课为 周五上午三四五节"
                            avatar_img={CourseCardImgSource["AI"]["avator"]}
                            course_img={CourseCardImgSource["AI"]["course"]}
                            course_title='Artificial Intelligence'
                            course_info='玄学炼丹'
                            buttons={[{label: '专业选修', onClick: function(){}, labelColor: '#7C7C7C', backgroundColor: '#D8D8D8'}]}
                            alert_msg=''
                        />
                    </div>
                    <div className={css.card}>
                        <CourseCard className={css.card}
                            avatar_title="编译原理"
                            avatar_subtitle="下一节课为 周四下午六七八节"
                            avatar_img={CourseCardImgSource["Compiler"]["avator"]}
                            course_img={CourseCardImgSource["Compiler"]["course"]}
                            course_title='Compiling Theory'
                            course_info='完全不知道编译原理是什么鬼'
                            buttons={[{label: '专业必修', onClick: function(){}, labelColor: '#EB2A29', backgroundColor: '#D8D8D8'}]}
                        />
                    </div>
                </div>
        )
    }
}
module.exports=Entry;
