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
        this.state = { shadow: 1 }
    }

    onMouseOver = () => this.setState({ shadow: 3 });
    onMouseOut = () => this.setState({ shadow: 1 });

    render() {
        return (
            <Card
                zDepth={this.state.shadow}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
            >
                <CardHeader
                    title={this.props.avatar_title}
                    subtitle={this.props.avatar_subtitle}
                    avatar={this.props.avatar_img}/>
                <CardMedia>
                    <div style={{paddingLeft: "10%", paddingRight: "10%"}}>
                        <img src={this.props.course_img} style={{height: "50%", width: "50%"}}/>
                    </div>
                </CardMedia>
                <CardTitle title={this.props.course_title} />
                <CardText>
                    {this.props.course_info}
                </CardText>
                <CardActions>
                    {
                        (this.props.buttons != undefined) ? (
                            this.props.buttons.map(function(button, i) {
                                return <RaisedButton label={button['label']} onClick={button['onClick']} key={i} backgroundColor={button['backgroundColor']} labelColor={button['labelColor']}/>
                            })
                        ) : (<div></div>)
                    }
                </CardActions>
            </Card>
        );
    }

};

module.exports = {
   CourseCard,
   CourseCardImgSource
}
