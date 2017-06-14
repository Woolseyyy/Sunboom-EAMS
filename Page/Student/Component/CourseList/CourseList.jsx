var React = require("react");
var css = require("./CourseList.css");

import Toggle from 'material-ui/Toggle'
import CourseCardBundle from "../CourseCard/CourseCard.jsx"
import CourseInfo from "../CourseInfo/CourseInfo.jsx"
import CourseGrid from "../CourseGrid/CourseGrid.jsx"

require('es6-promise').polyfill();
require('isomorphic-fetch');

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
        this.clickOnCourse = this.clickOnCourse.bind(this);
    }

    clickBackCouseList = () => {
        this.setState({OnCourseList: true});
    }

    clickOnCourse = (e) => {
        this.setState({OnCourseList: false});
        return fetch(localStorage.root_url + 'api/Enrollment/EnrollmentDetail?id=' + e.toString(),
            {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.token
                },
            })
            .then((response) => response.json())
            .then((cb) => {
                switch (cb.errorCode)
                {
                    case 200:
                        var dic = new Array();

                        dic['avatar']=localStorage.root_url+cb.data.avatar;
                        dic['title']=cb.data.title;
                        dic['course_img']=localStorage.root_url+cb.data.courseImg;
                        dic['next_chap_title'] = cb.data.nextChapTitle;
                        dic['next_chap_content'] = cb.data.nextChapContent;
                        dic['homework_title'] = cb.data.homeworkTitle;
                        dic['homework_content'] = cb.data.homeworkContent;

                        var homework = [];
                        for (var key in cb.data.homeworks) {
                            var item = cb.data.homeworks[key];
                            homework.push(item);
                        }
                        dic['homework'] = homework;

                        var material = [];
                        for (var key in cb.data.materials) {
                            var item = cb.data.materials[key];
                            material.push(item);
                        }
                        dic['material'] = material;

                        this.setState({data: dic});
                        break;
                    default:
                        console.error("课程详细信息错误");
                        break;
                }
            });
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
        this.state = {
            data: [

            ]
        }
    }

    componentDidMount()
    {
        return fetch(localStorage.root_url + 'api/Enrollment/MyEnrollments',
            {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.token
                }
            })
            .then((response) => response.json())
            .then((cb) => {
                switch (cb.errorCode)
                {
                    case 200:
                        var arrayData = [];
                        for (var key in cb.data) {
                            var item = cb.data[key];
                            var dic = new Array();

                            dic["avatar_title"] = item.avatarTitle;
                            dic["avatar_subtitle"] = item.courseTime;
                            dic["avatar_img"] = localStorage.root_url + item.avatarImg;
                            dic["course_img"] = localStorage.root_url + item.courseImg;
                            dic["course_title"] = item.courseTitle;
                            dic["course_info"] = item.courseInfo;
                            dic["buttons"] =[{label: '课件', onClick: function(){}}, {label: '作业四', onClick: function(){}}];
                            dic["alert_msg"]="";
                            dic["course_id"]=item.id;
                            arrayData.push(dic);
                        }
                        this.setState({data: arrayData});
                        break;
                    default:
                        console.error("课程列表初始化错误");
                        break;
                }
            });
    }

    render() {
        return (
            <div className={css.cardContainer}>
            {
                this.state.data.map((item, id) => {
                    return (
                        <div className={css.card} onClick={(e) => this.props.handleClick(item.course_id)} key={id}>
                            <CourseCard
                                avatar_title={item.avatar_title}
                                avatar_subtitle={item.avatar_subtitle}
                                avatar_img={item.avatar_img}
                                course_img={item.course_img}
                                course_title={item.course_title}
                                course_info={item.course_info}
                                buttons={item.buttons}
                                alert_msg={item.alert_msg}
                            />
                        </div>
                    )
                })
            }
            </div>
        )
    }
}
module.exports=Entry;
