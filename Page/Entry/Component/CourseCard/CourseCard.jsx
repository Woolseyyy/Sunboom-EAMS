import React, {Component}from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'

const CourseCardImgSource = {
    SE: {
        avator: require('./static/SE_avator.png'),
        course: require('./static/SE_course.png')
    },
    AI: {
        avator: require('./static/AI_avator.png'),
        course: require('./static/AI_course.png')
    },
    Compiler: {
        avator: require('./static/Compiler_avator.png'),
        course: require('./static/Compiler_course.png')
    }
};

class CourseCard extends Component
{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.avatar_title}
                    subtitle={this.props.avatar_subtitle}
                    avatar={this.props.avatar_img}/>
                <CardMedia>
                    <img src={this.props.course_img}/>
                </CardMedia>
                <CardTitle title={this.props.course_title} />
                <CardText>
                    {this.props.course_info}
                </CardText>
                <CardActions>
                    <RaisedButton label={this.props.button1_title} onClick={this.props.button1_click} />
                    <RaisedButton label={this.props.button2_title} onClick={this.props.button2_click} />
                    <input type="text" id="text" value={this.props.alert_msg} readOnly='true'
                    style={{border: '0px', color: 'red', fontWeight: 'bold', marginLeft: '30'}}/>
                </CardActions>
            </Card>
        );
    }

};

module.exports = {
   CourseCard,
   CourseCardImgSource
}
