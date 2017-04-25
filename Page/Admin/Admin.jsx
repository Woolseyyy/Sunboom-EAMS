var React=require("react");
var style=require("./Admin.css");
//var Helmet=require("react-helmet");

import ApplyList from "./Component/ApplyList/ApplyList.jsx";

import Slider from "../../Common/Slider/Slider.jsx";
import Header from "../../Common/Header/Header.jsx"

//material-ui
import Paper from 'material-ui/Paper';

class Entry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectID: 0,
            list:[
                {
                    title:"课程补选申请列表",
                    data:[
                        {
                            author: "3140102349 吴昊潜",
                            statue:"done"
                        },
                        {
                            author: "3140102349 吴昊潜",
                            statue:"wait"
                        },
                        {
                            author: "3140102349 吴昊潜",
                            statue:"done"
                        }
                    ]
                },
                {
                    title:"对外交流申请列表",
                    data:[
                        {
                            author: "3140102349 吴昊潜",
                            statue:"done"
                        },
                        {
                            author: "3140102349 吴昊潜",
                            statue:"done"
                        },
                        {
                            author: "3140102349 吴昊潜",
                            statue:"wait"
                        }
                    ]
                },
                {
                    title:"开课申请列表",
                    data:[
                        {
                            author: "3140102349 吴昊潜",
                            statue:"wait"
                        },
                        {
                            author: "3140102349 吴昊潜",
                            statue:"done"
                        },
                        {
                            author: "3140102349 吴昊潜",
                            statue:"done"
                        }
                    ]
                },
                {
                    title:"教学资源申请列表",
                    data:[
                        {
                            author: "3140102349 吴昊潜",
                            statue:"done"
                        },
                        {
                            author: "3140102349 吴昊潜",
                            statue:"wait"
                        },
                        {
                            author: "3140102349 吴昊潜",
                            statue:"wait"
                        },
                        {
                            author: "3140102349 吴昊潜",
                            statue:"done"
                        }
                    ]
                }
            ]
        };
    }
    SelectMenuChange = (index) =>{
        this.setState({selectID : index});
    };
    render(){
        var beforeDeviderItems = [
            {"text": "全部申请", icon:"BookMark"},
            {"text": "课程补选申请", icon:"BookMark"},
            {"text": "对外交流申请", icon:"BookMark"},
            {"text": "开课申请", icon:"BookMark"},
            {"text": "教学资源申请", icon:"BookMark"}
        ];
        var afterDeviderItems = [
            {"text": "已受理申请", icon:"Done"}
        ];
        return(
            <div className="background header-bottom-container">
                <Header/>
                <Slider defaultValue={this.state.selectID}
                        beforeDeviderItems={beforeDeviderItems}
                        afterDeviderItems={afterDeviderItems}
                        onChange={this.SelectMenuChange}
                />
                <Paper zDepth={1} className="main">
                    {
                        this.state.list.map(function (list, index) {
                            if(this.state.selectID==0 || this.state.selectID==5 || this.state.selectID==index+1){
                                return(
                                    <ApplyList
                                        key={index}
                                        title={list.title}
                                        data={list.data}
                                        onlyDone={this.state.selectID==5}/>
                                )
                            }
                            else {
                                return null;
                            }
                        }.bind(this))
                    }
                </Paper>

            </div>
        )
    }
}

module.exports=Entry;