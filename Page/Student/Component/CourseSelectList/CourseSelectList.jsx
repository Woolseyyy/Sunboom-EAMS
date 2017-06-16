var React = require("react");
var css = require("./CourseSelectList.css");

import CourseCardBundle from "../CourseCard/CourseCard.jsx"
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentSend from 'material-ui/svg-icons/content/send';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

require('es6-promise').polyfill();
require('isomorphic-fetch');

let avatar_blank = require('./static/avatar_blank.png');

var CourseCard = CourseCardBundle.CourseCard;
const CourseCardImgSource = CourseCardBundle.CourseCardImgSource;

var AssignmentSelection = []

class Entry extends React.Component
{
    constructor(props)
    {
        super(props);
        let assignmentSelect = localStorage.assignmentSelect;
        let courseTime = localStorage.courseTime;
        this.state = {
            data: [],
            assignmentSelect: (assignmentSelect) ? (JSON.parse(assignmentSelect)): [],
            courseTime: courseTime ? (JSON.parse(courseTime)) : []
        }
        this.selectAssignment = this.selectAssignment.bind(this);
        this.cancelSelection = this.cancelSelection.bind(this);
        this.submitSelection = this.submitSelection.bind(this);
    }

    cancelSelection = (courseId) => {
        var dic = this.state.assignmentSelect;
        dic[courseId] = null;
        this.setState({assignmentSelect: dic});
    };

    selectAssignment = (courseId, assignmentId, selectAssignmentTime, selectTeacherName, avatar, courseTime) => {
        var course_t = this.state.courseTime;
        courseTime.forEach(function (value, key) {
            for (var i = 0; i != value.duration; i++)
            {
                if (course_t[value.day][value.start_time + i])
                {
                    console.log("时间冲突");
                    return;
                }
            }
        })

        for (var i = 0; i != 7; i++)
        {
            for (var j = 1; j != 13; j++)
            {
                if (course_t[i][j])
                {
                    if (course_t[i][j].courseId == courseId)
                    {
                        console.log("课程重复");
                        return;
                    }
                }
            }
        }

        var dic = this.state.assignmentSelect;
        dic[courseId] = {
            assignmentId: assignmentId,
            subtitle: selectTeacherName + " " + selectAssignmentTime,
            avatar: avatar
        }
        this.setState({assignmentSelect: dic});
    };


    saveCourseSelectionLocal = () => {
        localStorage.assignmentSelect = JSON.stringify(this.state.assignmentSelect);
        console.log(localStorage.assignmentSelect);

    };

    submitSelection = () => {
        var data = new FormData();

        this.state.assignmentSelect.forEach(function (value, key) {
            if (value)
            {
                data.append("list", value.assignmentId);
            }
        });
        console.log(data);
        return fetch(localStorage.root_url + 'api/Enrollment/EnrollCourses', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.token,
            },
            body: data
        })
        .then((response) => response.json())
        .then((json) => {});
    }

    deleteLocal = () => {
        localStorage.removeItem("assignmentSelect");
        this.setState({assignmentSelect: []});
    }

    componentDidMount()
    {
        return fetch(localStorage.root_url + 'api/Course/Enrollable',
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
                        var data = new Array();
                        cb.data.forEach(function(value, key) {
                            var facultyList = [];
                            value.assignments.forEach(function(avalue, aid) {
                                var course_t = [];
                                for (var i in avalue.courseTimes)
                                {
                                    var item = avalue.courseTimes[i];
                                    course_t.push({
                                        day: item.day,
                                        start_time: item.startTime,
                                        duration: item.duration
                                    })
                                }
                                facultyList.push({
                                    assignmentId: avalue.assignmentID,
                                    name: avalue.instructorName,
                                    avatar: localStorage.root_url + avalue.instructorAvatar,
                                    course_time: course_t,
                                    course_time_str: avalue.courseTimeStr
                                })
                            });
                            data.push({
                                avatar_title: value.courseName,
                                avatar_subtitle: "",
                                avatar_img: localStorage.root_url + "api/File/MakeCharAvatar?ch=" + value.courseName[0],
                                course_img: localStorage.root_url + value.courseBanner,
                                course_id: value.courseID,
                                course_title: value.courseName,
                                course_info: value.courseInfo,
                                facultyList: facultyList
                            })
                        });
                        this.setState({data: data});
                        break;
                    default:
                        console.error("课程选择列表初始化失败");
                        break;
                }
            });
    }

    render()
    {
        return (
            <div>
                <div className={css.cardContainer}>
                    {
                        this.state.data.map((item, id) => {
                            return (this.state.assignmentSelect == null || this.state.assignmentSelect[item.course_id] == null) ? (
                                <div className={css.card} key={id}>
                                    <CourseSelectCard
                                        avatar_title={item.avatar_title}
                                        avatar_subtitle={item.avatar_subtitle}
                                        avatar_img={item.avatar_img}
                                        course_img={item.course_img}
                                        course_id={item.course_id}
                                        course_title={item.course_title}
                                        course_info={item.course_info}
                                        facultyList={item.facultyList}
                                        selectClick={this.selectAssignment}
                                        cancelClick={this.cancelSelection}
                                    />
                                </div>
                            ) : (
                                    <div className={css.card} key={id}>
                                        <CourseSelectCard
                                            avatar_title={item.avatar_title}
                                            avatar_subtitle={this.state.assignmentSelect[item.course_id].subtitle}
                                            avatar_img={this.state.assignmentSelect[item.course_id].avatar}
                                            course_img={item.course_img}
                                            course_id={item.course_id}
                                            course_title={item.course_title}
                                            course_info={item.course_info}
                                            facultyList={item.facultyList}
                                            selectClick={this.selectAssignment}
                                            cancelClick={this.cancelSelection}
                                        />
                                    </div>
                            );
                        })
                    }
                </div>
                <div className={css.toolBar}>
                    <Paper>
                        <List>
                            <ListItem primaryText="Save" leftIcon={<ContentInbox />} onClick={this.saveCourseSelectionLocal}/>
                            <ListItem primaryText="Submit" leftIcon={<ContentSend />} onClick={this.submitSelection}/>
                            <ListItem primaryText="Delete Local" leftIcon={<DeleteIcon />} onClick={this.deleteLocal}/>

                        </List>
                    </Paper>
                </div>
            </div>
        )
    }
}

class CourseSelectCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectTeacherName: ""
        };
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div>
                <CourseCard className={css.card}
                    avatar_title={this.props.avatar_title}
                    avatar_subtitle={this.props.avatar_subtitle}
                    avatar_img={this.props.avatar_img}
                    course_img={this.props.course_img}
                    course_title={this.props.course_title}
                    course_info={this.props.course_info}
                    buttons={[{label: '专业必修', onClick: this.handleTouchTap, labelColor: '#EB2A29', backgroundColor: '#D8D8D8'}]}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                    <Menu>
                        {
                            (this.props.facultyList.map((item, id) => {
                                return (
                                    <MenuItem primaryText={item.name + " (" + item.course_time_str + ")"} key={id} onClick={
                                            (courseId, assignmentId, selectAssignmentTime, selectTeacherName, avatar, courseTime) =>
                                            this.props.selectClick(this.props.course_id, item.assignmentId, item.course_time_str, item.name, item.avatar, item.course_time)
                                        }/>
                                )
                            }))
                        }
                        <MenuItem primaryText="取消" onClick={(courseId) => this.props.cancelClick(this.props.course_id)}/>
                    </Menu>
                </Popover>
            </div>
        );
    }
}
module.exports=Entry;
