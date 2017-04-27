var React=require("react");
var style=require("./Teacher.css");
//var Helmet=require("react-helmet");

import Courses from "./Component/Courses/Courses.jsx";

import Slider from "../../Common/Slider/Slider.jsx";
import Header from "../../Common/Header/Header.jsx"

//material-ui
import Paper from 'material-ui/Paper';

class Entry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectID: 0
        };
    }
    SelectMenuChange = (index) =>{
        this.setState({selectID : index});
    };
    router = () => {
        switch (this.state.selectID) {
            case 0: return <Courses/>
        }
    };
    render(){
        var beforeDeviderItems = [
            {"text": "课程列表", icon:"BookMark"},
            {"text": "个人信息", icon:"BookMark"}
        ];
        var afterDeviderItems = [
            {"text": "开课申请", icon:"BookMark"},
            {"text": "教学资源申请", icon:"BookMark"}
        ];
        return(
            <div className="background header-bottom-container">
                <Header/>
                <Slider defaultValue={this.state.selectID}
                        beforeDeviderItems={beforeDeviderItems}
                        afterDeviderItems={afterDeviderItems}
                        onChange={this.SelectMenuChange}
                />
                {this.router()}
            </div>
        )
    }
}

module.exports=Entry;