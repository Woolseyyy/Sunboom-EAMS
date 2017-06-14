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

var griddata = [];

class Entry extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            OnCourseList: true,
            ToggleList: true,
            data: {
                avatar: "",
                title: "",
                course_img: "",
                next_chap_title: "",
                next_chap_content: "",
                homework_title: "",
                homework_content: "",
                homework: [],
                material: []
            },
            gridpredata: {

            },
            grid: {
                header: [
                    {title: 'MON'}, {title: 'TUE'}, {title: 'WED'},
                    {title: 'THU'}, {title: 'FRI'}, {title: 'SAT'}, {title: 'SUN'}
                ],
                leftbar: [
                    {rows: '1'}, {rows: '1'}, {rows: '1'}, {rows: '1'}, {rows: '1'}, {rows: '1'},
                    {rows: '1'}, {rows: '1'}, {rows: '1'}, {rows: '1'}, {rows: '1'}, {rows: '1'},
                    {rows: '1'}
                ],
                data: []
            }
        };
        this.clickOnCourse = this.clickOnCourse.bind(this);
        this.clickOnToggle = this.clickOnToggle.bind(this);
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
        let leftbar = this.state.grid.leftbar;
        let header = this.state.grid.header;
        console.log(griddata);
        this.setState({ToggleList: !this.state.ToggleList, grid: {header: header, leftbar: leftbar, data: griddata}})
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
                        console.log(cb.data);
                        var prefGridData = [[], [], [], [], [], [], []];
                        for (var key in cb.data) {
                            var item = cb.data[key];
                            var dic = new Array();

                            for (var id in item.courseTime) {
                                var tmp = item.courseTime[id];
                                for (var j = 0; j < tmp.duration - 1; j++)
                                {
                                    prefGridData[tmp.day][tmp.startTime + j] = {
                                        title: item.avatarTitle,
                                        subtitle: item.instructorName,
                                        showText: false
                                    }
                                }
                                if (tmp.duration > 0)
                                {
                                    prefGridData[tmp.day][tmp.startTime + tmp.duration - 1] = {
                                        title: item.avatarTitle,
                                        subtitle: item.instructorName,
                                        showText: true
                                    }
                                }
                            }

                            dic["avatar_title"] = item.avatarTitle;
                            dic["avatar_subtitle"] = item.instructorName;
                            dic["avatar_img"] = localStorage.root_url + item.avatarImg;
                            dic["course_img"] = localStorage.root_url + item.courseImg;
                            dic["course_title"] = item.courseTitle;
                            dic["course_info"] = item.courseInfo;
                            dic["buttons"] =[{label: '课件', onClick: function(){}}, {label: '作业四', onClick: function(){}}];
                            dic["alert_msg"]="";
                            dic["course_id"]=item.id;
                            arrayData.push(dic);
                        }
                        griddata = [];
                        for (var i = 0; i < 13; i++)
                        {
                            for (var j = 0; j < 7; j++)
                            {
                                if (prefGridData[j][i] == undefined)
                                {
                                    griddata.push({title: "", subtitle: "", rows: 1, cols: 1, showText: false, filtered: false});
                                }
                                else
                                {
                                    griddata.push({
                                        title: prefGridData[j][i].title,
                                        subtitle: prefGridData[j][i].subtitle,
                                        rows: 1,
                                        cols: 1,
                                        showText: prefGridData[j][i].showText,
                                        filtered: true
                                    })
                                }
                            }
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
