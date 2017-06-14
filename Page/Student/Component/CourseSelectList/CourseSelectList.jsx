var React = require("react");
var css = require("./CourseSelectList.css");

import CourseCardBundle from "../CourseCard/CourseCard.jsx"
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

require('es6-promise').polyfill();
require('isomorphic-fetch');

let avatar_blank = require('./static/avatar_blank.png');

var CourseCard = CourseCardBundle.CourseCard;
const CourseCardImgSource = CourseCardBundle.CourseCardImgSource;

class Entry extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: []
        }
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
                        console.log(cb.data);
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
                                    name: avalue.instructorName,
                                    avatar: localStorage.root_url + avalue.instructorAvatar,
                                    course_time: course_t,
                                    course_time_str: avalue.courseTimeStr
                                })
                            });
                            data.push({
                                avatar_title: value.courseName,
                                avatar_subtitle: "",
                                avatar_img: avatar_blank,
                                course_img: localStorage.root_url + value.courseBanner,
                                course_title: value.courseName,
                                course_info: value.courseInfo,
                                facultyList: facultyList
                            })
                        });
                        this.setState({data: data});
                        console.log(data);
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
                <div className={css.cardContainer}>
                    {
                        this.state.data.map((item, id) => {
                            return (
                                <div className={css.card} key={id}>
                                    <CourseSelectCard
                                        avatar_title={item.avatar_title}
                                        avatar_subtitle={item.avatar_subtitle}
                                        avatar_img={item.avatar_img}
                                        course_img={item.course_img}
                                        course_title={item.course_title}
                                        course_info={item.course_info}
                                        facultyList={item.facultyList}
                                    />
                                </div>
                            );
                        })
                    }
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
        this.handleClickOnItem = this.handleClickOnItem.bind(this);
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

    handleClickOnItem = (e) => {
        this.setState({selectTeacherName: e});
    }

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
                    buttons={[{label: (this.state.selectTeacherName == "") ? '专业必修': (this.state.selectTeacherName), onClick: this.handleTouchTap, labelColor: '#EB2A29', backgroundColor: '#D8D8D8'}]}
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
                                    <MenuItem primaryText={item.name + " (" + item.course_time_str + ")"} key={id} onClick={(e) => this.handleClickOnItem(item.name)}/>
                                )
                            }))
                        }
                    </Menu>
                </Popover>
            </div>
        );
    }
}
module.exports=Entry;
