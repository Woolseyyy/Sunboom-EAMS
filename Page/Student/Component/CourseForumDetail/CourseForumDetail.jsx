import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Textarea from 'react-textarea-autosize';

var css = require('./CourseForumDetail.css')
const example_author_avatar = require("./example/example_author_avatar.png")
const example_comment_avatar = require("./example/example_comment_avatar.png")
const example_writer_avatar = require('./example/example_writer_avatar.png')

const styles = {
    commentTextArea: {
        width: "90%",
        border: "0px",
        textOverflow: "ellipsis",
        overflowX: "hidden",
        overflowY: "hidden",
        outline: "none",
        resize: "none",
        paddingBottom: "30px",
        backgroundColor: "inherit",
        fontSize: "15px"
    },
    writerTextArea: {
        width: "90%",
        border: "2px",
        borderRadius: "3px",
        textOverflow: "ellipsis",
        overflowX: "hidden",
        overflowY: "hidden",
        outline: "none",
        resize: "none",
        paddingBottom: "30px",
        backgroundColor: "white",
        fontSize: "15px"
    }
}

class Entry extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: {
                author_avatar: example_author_avatar,
                author_name: "Wendy Kan",
                title: "Two stage competition FAQ",
                post_date: "posted in 软件工程 14 days ago",
                text: 'We would d like to remind you what will happen in the second stage of this competition: \nWhy second stage? Why so much trouble?\n\nThe spirit of having a second stage is to prevent hand labeling and leaderboard probing of the test data. In order to achieve this, we ask that you upload your source code, including the correct parameters that you used for generating your submission files. This is for you to prove that you have written automated code to create your final submission(s). These "models" that you submit may be examined by Kaggle and the competition host to determine your eligibility to win the competition and claim prizes.\n\nIf I don\'t have a chance to win, should I upload my model?\n\n',

                comments: [
                    {
                        avatar: example_comment_avatar,
                        name: "Alchemist",
                        post_date: "6 days ago",
                        text: "The current data set have some very heterogeneous images, especially the 'green' ones. Can you please confirm that the stage_2 dataset will be similar in that matter ?"
                    },
                    {
                        avatar: example_comment_avatar,
                        name: "Alchemist",
                        post_date: "6 days ago",
                        text: "The current data set have some very heterogeneous images, especially the 'green' ones. Can you please confirm that the stage_2 dataset will be similar in that matter ?"
                    }
                ],
                writer_avatar: example_writer_avatar
            }
        }
    }
    render()
    {
        return (
            <div>
                <div className={css.titleContainer}>
                    <div style={{float: "left", paddingLeft: "30px", paddingTop: "30px"}}>
                        <div>
                            <Avatar className={css.author_avatar} size={60} src={this.state.data.author_avatar} />
                        </div>
                        <div>
                            <input className={css.author_name} type="text" value={this.state.data.author_name} readOnly='true'/>
                        </div>
                    </div>
                    <div style={{marginLeft: "10px", marginRight: "30px", marginTop: "10px"}}>
                        <input className={css.title} type="text" value={this.state.data.title} readOnly='true'/>
                        <input className={css.post_date} type="text" value={this.state.data.post_date} readOnly='true'/>
                        <Divider/>
                    </div>
                    <div className="forum-junk-classname" style={{marginTop: "45px", paddingLeft: "30px"}}>
                        <Textarea
                            value={this.state.data.text}
                            style={styles.commentTextArea}
                            readOnly="true"
                            />
                    </div>
                </div>
                {this.state.data.comments.map((comm) => {
                    return (
                        <div className={css.comm}>
                            <div className={css.commentAvatar}>
                                <img width={40} height={40} src={comm.avatar} style={{borderRadius: "10px"}}/>
                            </div>
                            <div style={{marginTop: "10px", float: "left"}}>
                                <span className={css.dotLeft}></span>
                            </div>
                            <div className={css.commentBody}>
                                <Textarea
                                    value={comm.text}
                                    style={styles.commentTextArea}
                                    readOnly="true"
                                    />
                            </div>
                        </div>
                    )
                })}
                <div className={css.writer}>
                    <div className={css.writerAvatar}>
                        <img width={40} height={40} src={this.state.data.writer_avatar} style={{borderRadius: "10px"}}/>
                    </div>
                    <div style={{marginTop: "10px", float: "left"}}>
                        <span className={css.dotLeft}></span>
                    </div>
                    <div className={css.writerBody}>
                        <Textarea
                            defaultValue="Please leave a comment"
                            style={styles.writerTextArea}
                            readOnly={false}
                            />
                        <div>
                            <RaisedButton label="COMMENT" primary={true} style={{margin: "12px", float: "right", marginRight: "10%"}} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = Entry;
