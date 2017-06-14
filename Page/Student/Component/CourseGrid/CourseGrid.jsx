import React from 'react';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

var css = require('./CourseGrid.css')
const filtered_img = require('./static/filtered.png')
const unfiltered_img = require('./static/unfiltered.png')
const leftbar_img = require('./static/leftbar.png')
class Entry extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return (
            <div>
                <Paper className={css.gridContainer} zDepth={1} style={{margin: "20px"}}>
                    <div className="gridHeader">
                        <input type="text" style={{height: '23px', width: "30px", marginTop: '8px', border: '0px', backgroundColor: '#F3F3F3', float: 'left'}}/>
                        <GridList cols={7} rows={1} cellHeight={40} padding={1}>
                            {this.props.grid.header.map((tile) => (
                                <GridTile>
                                    <input type="text" value={tile.title} readOnly='true'
                                        style={{paddingLeft: '30px', marginTop: '8px', border: '0px', color: 'black', fontWeight: 'bold', fontSize: '20px', backgroundColor: '#F3F3F3'}}/>
                                </GridTile>
                            ))}
                        </GridList>
                    </div>

                    <div className="course-grid-body" style={{float: 'left', width: '30px'}}>
                        <GridList cols={1} rows={14} cellHeight={100} padding={2}>
                            {this.props.grid.leftbar.map((tile) => (
                                <GridTile
                                    cols={1}
                                    rows={tile.rows}
                                    >
                                    <img src={leftbar_img}/>
                                </GridTile>
                            ))}
                        </GridList>
                    </div>
                    <div className="course-grid-body">
                        <GridList cols={7} rows={14} cellHeight={100} padding={2}>
                            {this.props.grid.data.map((tile, id) => (
                                (tile.title) ? (
                                    (tile.showText) ? (
                                        <GridTile
                                            key={id}
                                            title={tile.title}
                                            titlePosition="bottom"
                                            subtitle={tile.subtitle}
                                            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                                            cols={tile.cols}
                                            rows={tile.rows}
                                            >
                                            <img src={tile.filtered ? filtered_img: unfiltered_img} style={{height: '100%', width: '100%', objectFit: 'fill'}}/>
                                        </GridTile>
                                    ) : (
                                        <GridTile
                                            key={id}
                                            cols={tile.cols}
                                            rows={tile.rows}
                                            >
                                            <img src={tile.filtered ? filtered_img: unfiltered_img} style={{height: '100%', width: '100%', objectFit: 'fill'}}/>
                                        </GridTile>
                                    )

                                ): (
                                    <GridTile
                                        key={id}
                                        cols={tile.cols}
                                        rows={tile.rows}
                                        >
                                        <img src={leftbar_img}/>
                                    </GridTile>
                                )
                            ))}
                        </GridList>
                    </div>
                </Paper>
            </div>
        )
    }
}
module.exports = Entry;
