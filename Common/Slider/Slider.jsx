import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import css from "./Slider.css"

// Material-UI
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import BookMark from '../../node_modules/material-ui/svg-icons/action/bookmark';
import Done from '../../node_modules/material-ui/svg-icons/action/done';
import Error from '../../node_modules/material-ui/svg-icons/alert/error';

let SelectableList = makeSelectable(List);

/*prop type
 * 1. defaultValue: which item defualt selected
 * 2. beforeDeviderItems: the items before devider
 *    [{
 *        text: string, the primary text
 *        icon: string, the name of icon, according to material-ui icon
 *     }]
 * 3. afterDeviderItems: the items afer devider
 * 4. onChange: the function to handle change, has index as argue
 */

class Slider extends Component {
    static propTypes = {
        defaultValue: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.defaultValue
        };
    }
    handleRequestChange = (event, index) => {
        this.setState({
            selectedIndex:index
        });
        this.props.onChange(index);
    };
    iconMaker = (string) => {
        switch (string){
            case "BookMark" : return <BookMark/>;
            case "Done" : return <Done/>;
            case "Error" : return <Error/>;
            default : return <BookMark/>;
        }
    };

    render() {
        return (
            <div className ={css.slider}>
                <SelectableList value={this.state.selectedIndex} onChange={this.handleRequestChange}>
                    {
                        this.props.beforeDeviderItems.map(function(data, index){
                            return(
                                <ListItem key={index} value={index} primaryText={data.text} leftIcon={this.iconMaker(data.icon)} />
                            )
                                }.bind(this))
                    }
                    <Divider/>
                    {
                        this.props.afterDeviderItems.map(function(data, index){
                            return(
                                <ListItem key={index+this.props.beforeDeviderItems.length}
                                          value={index+this.props.beforeDeviderItems.length}
                                          primaryText={data.text}
                                          leftIcon={this.iconMaker(data.icon)} />
                            )
                        }.bind(this))
                    }
                </SelectableList>
            </div>
        );
    }
}

module.exports = Slider;
