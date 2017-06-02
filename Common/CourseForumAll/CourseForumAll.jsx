import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Comment from 'material-ui/svg-icons/action/question-answer';
import Badge from 'material-ui/Badge';

var css = require('./CourseForumAll.css');


class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: '0',
                    avatar: "./static/test.jpg",
                    title: "Hello SB!",
                    time: "14 days ago",
                    author: "Woolsey",
                    commentTime: "21 hours ago",
                    commentAuthor: "Woolsey",
                    commentNumber: 10
                },
                {
                    id: '1',
                    avatar: "./static/test.jpg",
                    title: "Hello SB!",
                    time: "14 days ago",
                    author: "Woolsey",
                    commentTime: "21 hours ago",
                    commentAuthor: "Woolsey",
                    commentNumber: 10
                }
            ]

        };
    }

    render() {
        return (
            <div>
                <div className={css.head}>
                    <div style={{color: 'rgb(58, 58, 58)', fontSize: '40px', marginLeft: '20px'}}>软件工程</div>
                    <FloatingActionButton
                        style={{
                            position: 'absolute',
                            right: '80px',
                            bottom: '-28px'
                        }}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
                <div>
                    {this.state.data.map((item, key) => {
                        return (
                            <table
                                key={key}
                                onClick={() => {
                                    this.props.callDetail(item.id)
                                }}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    background: '#fff',
                                    borderTop: 'solid #cecece 1px',
                                    borderBottom: 'solid #cecece 1px',
                                    boxShadow: '0px 3px 3px rgba(51, 51, 51, 0.31)'
                                }}>
                                <tr>
                                    <td style={{width: '5%', textAlign: 'center', lineHeight: '100%'}}>
                                        <img style={{width: '60px', height: '60px'}}
                                             src={require("./static/test.jpg")}/>
                                    </td>
                                    <td style={{width: '70%', paddingLeft: '45px'}}>
                                        <table>
                                            <tr className={css.primaryText} style={{height: '50%'}}>
                                                <td>{item.title}</td>
                                            </tr>
                                            <tr className={css.secondText} style={{height: '50%'}}>
                                                <td>posted {item.time} by <span
                                                    className={css.idText}>{item.author}</span></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style={{width: '20%'}}>
                                        <table>
                                            <tr className={css.secondText} style={{height: '50%'}}>
                                                <td>last comment by</td>
                                            </tr>
                                            <tr className={css.secondText} style={{height: '50%'}}>
                                                <td><span
                                                    className={css.idText}>{item.commentAuthor}</span> {item.commentTime}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style={{width: '5%'}}>
                                        <div>
                                            <Badge
                                                badgeContent={item.commentNumber}
                                                primary={true}
                                            >
                                                <Comment />
                                            </Badge>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        )
                    })}
                </div>
            </div>
        )
    }
}
module.exports = Entry;
