import React from 'react';
import ReactDOM from 'react-dom';
import CourseCard from './CourseCard.js'
// import LoginForm from './Login.js';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <CourseCard
     avatar_title='软件工程'
     avatar_subtitle='下一节课为 XXX'
     avatar_img='./images/avator_img.png'
     course_img='./images/course_img.png'
     course_title='CH35 Project Scheduling'
     course_info='Scheduling Principles, compartmentalization distinct tasks'
     button1_title='课件'
     button2_title='作业四'
     alert_msg='作业四还有三天截止'
     />
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'))
