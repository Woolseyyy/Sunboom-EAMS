var React = require("react");
var css = require("./CourseList.css");

import Toggle from 'material-ui/Toggle'
import CourseCardBundle from "../../../Entry/Component/CourseCard/CourseCard.jsx"
import CourseInfo from "../CourseInfo/CourseInfo.jsx"
import CourseGrid from "../CourseGrid/CourseGrid.jsx"

var CourseCard = CourseCardBundle.CourseCard;
const CourseCardImgSource = CourseCardBundle.CourseCardImgSource;

class Entry extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            OnCourseList: true,
            ToggleList: true,
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
            },
            grid: {
                header: [
                    {title: 'MON'}, {title: 'TUE'}, {title: 'WED'},
                    {title: 'THU'}, {title: 'FRI'}, {title: 'SAT'}, {title: 'SUN'}
                ],
                leftbar: [
                    {rows: '2'}, {rows: '3'}, {rows: '3'}, {rows: '2'}, {rows: '3'},
                ],
                data: [
                    {title: '', subtitle: '', rows: 2, cols: 7, filtered: false},
                    {title: "数值分析", subtitle: '周一3,4,5节\n黄劲\n紫金港西1-405(多)', rows: 3, cols: 1, filtered: true},
                    {title: "计算机网络", subtitle: '周二3,4,5节\n董玮\n玉泉教4-413', rows: 3, cols: 1, filtered: true},
                    {title: '', subtitle: '', rows: 3, cols: 2, filtered: false},
                    {title: "人工智能", subtitle: '周五3,4,5节\n李玺\n玉泉教4－419', rows: 3, cols: 1, filtered: false},
                    {title: '', subtitle: '', rows: 3, cols: 2, filtered: false},
                    {title: "微观经济学", subtitle: '周一6,7,8节\n赖普清\n紫金港东1-104(多)', rows: 3, cols: 1, filtered: true},
                    {title: '', subtitle: '', rows: 3, cols: 1, filtered: false},
                    {title: "编译原理", subtitle: '周三6,7,8节\n陈纯/冯雁\n玉泉曹光彪二期-104(多)', rows: 3, cols: 1, filtered: true},
                    {title: '', subtitle: '', rows: 3, cols: 4, filtered: false},
                    {title: '', subtitle: '', rows: 2, cols: 1, filtered: false},
                    {title: "软件工程", subtitle: '周二9,10节\n邓水光\n玉泉曹光彪二期-202(多)', rows: 2, cols: 1, filtered: true},
                    {title: '', subtitle: '', rows: 2, cols: 5, filtered: false},
                    {title: '', subtitle: '', rows: 4, cols: 7, filtered: false}
                ]
            }
        };
    }

    clickBackCouseList = () => {
        this.setState({OnCourseList: true});
    }

    clickOnCourse = () => {
        this.setState({OnCourseList: false});
    }

    clickOnToggle = () => {
        this.setState({ToggleList: !this.state.ToggleList})
    }

    router = () => {
        if (!this.state.ToggleList)
        {
            return <CourseGrid grid={this.state.grid}/>
        }
        else
        {
            if (this.state.OnCourseList)
            {
                return <CourseList handleClick={this.clickOnCourse}/>;
            }
            else
            {
                return <CourseInfo data={this.state.data} clickBackCouseList={this.clickBackCouseList}/>;
            }
        }
    }

    render()
    {
        return (
            <div>
                <div>
                    <Toggle
                        label={this.state.ToggleList ? "列表模式": "表格模式"}
                        labelStyle={{fontSize: "15px", color: "#7c7c7c", fontWeight: "bold"}}
                        style={{width: '200px', marginLeft: "20"}}
                        onClick={this.clickOnToggle}
                        />
                </div>
                <div className="junk-name" onChange={this.clickBackCouseList}>
                    {this.router()}
                </div>
            </div>
        )
    }
}

class CourseList extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <div className={css.cardContainer}>
                <div className={css.card} onClick={this.props.handleClick}>
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
