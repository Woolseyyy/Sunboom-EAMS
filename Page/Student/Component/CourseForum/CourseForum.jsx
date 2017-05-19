import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

var css = require('./CourseForum.css')

const example_chexee_img = require('./static/chexee.jpg');
const example_jsa_img = require('./static/jsa.jpg');
const example_kolage_img = require('./static/kolage.jpg');

class Entry extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [
                {avatar: example_chexee_img, primaryText: "MobileODT Webinar for Kaggle", secondaryText: "Official Timeout"},
                {avatar: example_jsa_img, primaryText: "MobileODT Webinar for Kaggle", secondaryText: "Official Timeout"},
                {avatar: example_kolage_img, primaryText: "MobileODT Webinar for Kaggle", secondaryText: "Official Timeout"}
            ]

        };
    }
    render()
    {
        return (
            <div>
                <Paper className={css.gridContainer} zDepth={1}>
                    <List>
                      <Subheader>软件工程</Subheader>
                      {this.state.data.map((item, id) => {
                          return (
                              <div>
                                  <ListItem
                                      leftAvatar={<Avatar src={item.avatar}/>}
                                      primaryText={item.primaryText}
                                      secondaryText={
                                          <p>
                                              {item.secondaryText}
                                          </p>
                                      }
                                      secondaryTextLines={2}
                                  />
                                <Divider inset={true} />
                              </div>
                          )
                      })}
                    </List>
                </Paper>
            </div>
        )
    }
}
module.exports = Entry;
