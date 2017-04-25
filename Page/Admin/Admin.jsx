var React=require("react");
var style=require("./Admin.css");
//var Helmet=require("react-helmet");
import Slider from "../../Common/Slider/Slider.jsx";
import Header from "../../Common/Header/Header.jsx"

//material-ui
import Paper from 'material-ui/Paper';

class Entry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectID: 1
        };
    }
    SelectMenuChange = (index) =>{
        this.setState({selectID : index});
    };
    render(){
        var beforeDeviderItems = [
            {"text": "全部申请", icon:"BookMark"},
            {"text": "课程补选申请", icon:"BookMark"},
            {"text": "场地补选申请", icon:"BookMark"}
        ];
        var afterDeviderItems = [
            {"text": "已受理申请", icon:"Done"}
        ];
        return(
            <div className="background">
                <Header/>
                <Slider defaultValue={this.state.selectID}
                        beforeDeviderItems={beforeDeviderItems}
                        afterDeviderItems={afterDeviderItems}
                        onChange={this.SelectMenuChange}
                />
                <Paper zDepth={1} className="main">
                    {this.state.selectID}
                </Paper>

            </div>
        )
    }
}

module.exports=Entry;