var React=require("react");
var style=require("./Admin.css");
//var Helmet=require("react-helmet");

import ApplyList from "./Component/ApplyList/ApplyList.jsx";
import Detail from "./Component/Detail/Detail.jsx";

import Slider from "../../Common/Slider/Slider.jsx";
import Header from "../../Common/Header/Header.jsx"

//material-ui
import Paper from 'material-ui/Paper';

class Entry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            detailOpen: false,
            selectID: 0,
            listID:0,
            itemID:0,
            list:[
                {
                    title:"课程补选申请列表",
                    data:[
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请上人工智能',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请上人工智能',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请上人工智能',
                            reason: '偶吼爱他啊'
                        }
                    ]
                },
                {
                    title:"对外交流申请列表",
                    data:[
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请去哈佛',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请去哈佛',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请去哈佛',
                            reason: '偶吼爱他啊'
                        }
                    ]
                },
                {
                    title:"开课申请列表",
                    data:[
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "wait",
                            content: '申请开人工智能',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请开人工智能',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请开人工智能',
                            reason: '偶吼爱他啊'
                        }
                    ]
                },
                {
                    title:"教学资源申请列表",
                    data:[
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请201',
                            reason: '偶吼爱他啊'
                        },
                        {
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请201',
                            reason: '偶吼爱他啊'
                        },{
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "wait",
                            content: '申请201',
                            reason: '偶吼爱他啊'
                        },{
                            id: "3140102349",
                            author: "吴昊潜",
                            statue: "done",
                            content: '申请201',
                            reason: '偶吼爱他啊'
                        }
                    ]
                }
            ]
        };
    }
    SelectMenuChange = (index) =>{
        this.setState({selectID : index});
    };
    selectItemHandle = (listID, index) =>{
        this.setState({
            detailOpen: true,
            itemID: index,
            listID:listID
        })
    };
    HandleClose=()=>{
        this.setState({
            detailOpen:false
        })
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
                                        listID={index}
                                        title={list.title}
                                        data={list.data}
                                        onlyDone={this.state.selectID==5}
                                        HandleSelect={this.selectItemHandle}
                                    />
                                )
                            }
                            else {
                                return null;
                            }
                        }.bind(this))
                    }
                </Paper>
                <Detail open={this.state.detailOpen}
                        title={this.state.list[this.state.listID].title}
                        data={this.state.list[this.state.listID].data[this.state.itemID]}
                        HandleClose={this.HandleClose}
                />
            </div>
        )
    }
}

module.exports=Entry;