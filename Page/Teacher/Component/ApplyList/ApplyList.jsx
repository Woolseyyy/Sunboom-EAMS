import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import css from "./ApplyList.css";

// Material-UI
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Done from 'material-ui/svg-icons/action/done';
import WatchLater from 'material-ui/svg-icons/action/watch-later';
import IconButton from 'material-ui/IconButton';

/*prop type
 * 1. HandleSelect: the function to deal with select argument is (event: object, isKeyboardFocused: boolean)
 * 2. data array of data
 * 3. title string
 * 4. onChange: the function to handle change, has index as argue
 * 5. onlyDone
 */

class ApplyList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Paper className={css.paper}>
                <h1 className={css.title}>{this.props.title}</h1>
                <Divider/>
                <List>
                    {
                        this.props.data.map(function (data, index) {
                            return (
                                <ListItem
                                    key={index}
                                    primaryText={data.content}
                                    onTouchTap={() => {
                                        this.props.HandleSelect(index)
                                    }}
                                    rightIconButton={(data.statue == "done") ?
                                        <IconButton tooltip="已受理" tooltipPosition="bottom-right">
                                            <Done/>
                                        </IconButton>
                                        :
                                        <IconButton tooltip="未受理" tooltipPosition="bottom-right">
                                            <WatchLater/>
                                        </IconButton>
                                    }
                                />
                            )

                        }.bind(this))
                    }
                </List>
            </Paper>
        );
    }
}

module.exports = ApplyList;
