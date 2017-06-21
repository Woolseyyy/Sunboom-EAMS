import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Paper from 'material-ui/Paper';
var css = require('./Profile.css');

const maleDefault = require('./static/male.png');
const femaleDefault = require('./static/female.png');

import RaisedButton from 'material-ui/RaisedButton';
import AvatarPicker from './AvatarPicker.jsx'
import Dialog from 'material-ui/Dialog'

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: "",
            gender: "",
            name: "",
            major: "",
            id: "",
            dialogOpen: false,
            uploadedFile: "",
        };
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.loadAndSaveProfile = this.loadAndSaveProfile.bind(this);
        this.handleFileBrowser = this.handleFileBrowser.bind(this);
    }

    setEditorRef = (editor) => {
        if (editor) {
            this.editor = editor;
        }
    }

    handleUploadImage = () => {
        this.refs.fileUploader.click();
    }

    handleSave = () => {
        this.setState({
            dataURL: this.editor.getImageScaledToCanvas().toDataURL()
        })
    }

    handleConfirmChange = () => {
        var dataURL = this.editor.getImageScaledToCanvas().toDataURL();
        var blob = dataURItoBlob(dataURL);
        var fd = new FormData();
        fd.append("file", blob, "avatar_new.png");

        fetch(localStorage.root_url + 'api/Account/ChangeAvatar', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': localStorage.token,
            },
            body: fd
        })
            .then((response) => response.json())
            .then((cb) => {
                switch (cb.errorCode) {
                    case 200:
                        this.loadAndSaveProfile();
                        break;
                    default:
                        console.error("图片上传错误");
                }
            });
        this.handleCloseDialog();
    }

    loadAndSaveProfile() {
        return fetch(localStorage.root_url + 'api/Account/MyInformation', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': localStorage.token,
            },
        })
            .then((response) => response.json())
            .then((cb) => {
                console.log(cb);
                switch (cb.errorCode) {
                    case 200:
                        this.setState({
                            photo: localStorage.root_url + cb.data.avatar,
                            gender: cb.data.gender,
                            id: cb.data.id,
                            major: cb.data.major,
                            name: cb.data.name
                        });
                        break;
                    default:
                        console.log("获取数据库个人信息失败");
                }
            });
    }

    componentDidMount() {
        this.loadAndSaveProfile();
    }

    handleFileBrowser = () => {
        var files = this.refs.fileUploader.files;
        if (files.length >= 1) {
            var data = new FormData();
            data.append('file', files[0], files[0].name);

            fetch(localStorage.root_url + 'api/Account/ChangeAvatar', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': localStorage.token,
                },
                body: data
            })
                .then((response) => response.json())
                .then((cb) => {
                    switch (cb.errorCode) {
                        case 200:
                            this.setState({uploadedFile: localStorage.root_url + cb.data, dialogOpen: true});
                            break;
                        default:
                            console.error("图片上传错误");
                    }
                });
        }
    }

    handleCloseDialog = () => {
        this.setState({dialogOpen: false});
    };

    render() {
        const actions = [
            <RaisedButton
                style={{width: "100%", height: "100%", fontSize: "20px"}}
                labelStyle={{fontSize: "20px"}}
                label="确认修改并提交"
                primary={true}
                onTouchTap={this.handleConfirmChange}
            />,
        ];

        return (
            <div className="main">
                <div className={css.profilePaper}>
                    <Paper zDepth={1} style={{display: 'inline-block', width: '100%', paddingBottom: "20px"}}>
                        <div style={{float: 'left'}}>
                            <div className={css.photo}>
                                <img src={this.state.photo} style={{maxWidth: "250px", maxHeight: "auto"}}/>
                                <div style={{marginTop: "10px", display: "flex"}}>
                                    <RaisedButton style={{margin: "auto"}} label="上传图片" primary={true}
                                                  onClick={this.handleUploadImage}/>
                                </div>
                            </div>
                            <div className={css.basicInfo}>
                                <h3> 姓名: {this.state.name} </h3>
                                <h3> 性别: {this.state.gender} </h3>
                                <h3> 学号/工号: {this.state.id} </h3>
                                <h3> 主修专业/方向: {this.state.major} </h3>
                            </div>
                        </div>
                    </Paper>
                    <Dialog
                        titleStyle={{textAlign: "center", fontWeight: "bold"}}
                        actionsContainerStyle={{height: '60px', width: '300px', margin: "0 auto"}}
                        title="请选取合适的图片比例"
                        actions={actions}
                        modal={false}
                        open={this.state.dialogOpen}
                        onRequestClose={this.handleCloseDialog}
                    >
                        <AvatarPicker image={this.state.uploadedFile} setEditorRef={this.setEditorRef}
                                      handleSave={this.handleSave}/>
                    </Dialog>
                    <input type="file" id="file" accept=".jpg, .jpeg, .png, .bmp" ref="fileUploader"
                           style={{display: "none"}} onChange={this.handleFileBrowser}/>
                </div>
            </div>
        );
    }
}

module.exports = Profile;
