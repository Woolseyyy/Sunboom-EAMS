import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Apps from 'material-ui/svg-icons/navigation/apps';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import AssistantPhoto from 'material-ui/svg-icons/image/assistant-photo';
import {grey900} from 'material-ui/styles/colors';

var css = require('./ToolFunction.css');

class ToolFunction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    render() {
        return (
            <div className={css.group}>
                <FloatingActionButton className={css.mainButton} onTouchTap={() => {
                    this.setState({show: !this.state.show})
                }}>
                    <Apps />
                </FloatingActionButton>
                <FloatingActionButton backgroundColor="grey400" mini={true}
                                      className={(this.state.show) ? css.subButtonShow : css.subButtonHidden}
                                      style={{animationDuration: '1s'}}>
                    <GroupAdd color={grey900}/>
                </FloatingActionButton>
                <FloatingActionButton backgroundColor="grey400" mini={true}
                                      className={(this.state.show) ? css.subButtonShow : css.subButtonHidden}
                                      style={{animationDuration: '1.5s'}}>
                    <AssistantPhoto color={grey900}/>
                </FloatingActionButton>
                <FloatingActionButton backgroundColor="grey400" mini={true}
                                      className={(this.state.show) ? css.subButtonShow : css.subButtonHidden}
                                      style={{animationDuration: '2s'}}>
                    <ContentAdd color={grey900}/>
                </FloatingActionButton>
            </div>
        )
    }
}
module.exports = ToolFunction;
