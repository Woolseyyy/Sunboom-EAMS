import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Tooltip from 'material-ui/internal/Tooltip.js';
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
                <FloatingActionButtonWithTooltip
                    show={this.state.show}
                    icon={<GroupAdd color={grey900}/>}
                    animationDuration="1s"
                    tooltip="签到"
                    verticalOffset={135}
                />
                <FloatingActionButtonWithTooltip
                    show={this.state.show}
                    icon={<AssistantPhoto color={grey900}/>}
                    animationDuration="1.5s"
                    tooltip="成绩复议"
                    onTouchTap={this.props.secondIconClick}
                    verticalOffset={85}
                />
                <FloatingActionButtonWithTooltip
                    show={this.state.show}
                    icon={<ContentAdd color={grey900}/>}
                    animationDuration="2s"
                    tooltip="论坛发帖"
                    verticalOffset={35}
                />
            </div>
        )
    }
}

class FloatingActionButtonWithTooltip extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            hoveredTooltip: false
        };
    }
    render () {
        return (
            <div>
                <FloatingActionButton
                    backgroundColor="grey400"
                    mini={true}
                    className={(this.props.show) ? css.subButtonShow : css.subButtonHidden}
                    style={{animationDuration: this.props.animationDuration}}
                    onTouchTap={this.props.onTouchTap}
                    onMouseEnter={()=>{this.setState({hoveredTooltip: true})}}
                    onMouseLeave={()=>{this.setState({hoveredTooltip: false})}}
                >
                    {
                        this.props.icon
                    }
                </FloatingActionButton>
                <Tooltip show={this.state.hoveredTooltip}
                    label={this.props.tooltip}
                    style={{right: 60, top: this.props.verticalOffset}}
                    horizontalPosition="left"
                    verticalPosition="top"
                    touch={true}
                />
            </div>
        );
    }
}
module.exports = ToolFunction;
