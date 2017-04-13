var React=require("react");
var style=require("./Slider.css");
//var Helmet=require("react-helmet");

class Slider extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Title</span>
                <nav className="mdl-navigation">
                    <a className="mdl-navigation__link" href="">学校新闻</a>
                    <a className="mdl-navigation__link" href="">校园通知</a>
                    <a className="mdl-navigation__link" href="">CC98</a>
                    <a className="mdl-navigation__link" href="">考试园地</a>
                </nav>
            </div>
        )
    }
}

module.exports=Slider;