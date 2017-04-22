import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'

const CourseCard = prop => (
    <Card>
      <CardHeader
        title={prop.avatar_title}
        subtitle={prop.avatar_subtitle}
        avatar={prop.avatar_img}
      />
      <CardMedia>
        <img src={prop.course_img} />
      </CardMedia>
      <CardTitle title={prop.course_title} />
      <CardText>
        {prop.course_info}
      </CardText>
      <CardActions>
        <RaisedButton label={prop.button1_title} onClick={prop.button1_click} />
        <RaisedButton label={prop.button2_title} onClick={prop.button2_click} />
        <input type="text" id="text" value={prop.alert_msg} readOnly='true'
         style={{border: '0px', color: 'red', fontWeight: 'bold', marginLeft: '30'}}/>
      </CardActions>
    </Card>
);
export default CourseCard;
