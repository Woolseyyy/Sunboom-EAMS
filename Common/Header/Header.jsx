var React=require("react");
var style=require("./Header.css");
//var Helmet=require("react-helmet");

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){

    }
    render(){
        return(
            <header className="mdl-layout__header mdl-layout__header--transparent">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Sunboom 教务系统</span>
                    <div className="mdl-layout-spacer"></div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                  mdl-textfield--floating-label mdl-textfield--align-right">
                        <label className="mdl-button mdl-js-button mdl-button--icon"
                               for="fixed-header-drawer-exp">
                            <i className="material-icons">search</i>
                        </label>
                        <div className="mdl-textfield__expandable-holder">
                            <input className="mdl-textfield__input" type="text" name="sample"
                                   id="fixed-header-drawer-exp"/>
                        </div>
                    </div>
                    <nav className="mdl-navigation">
                        <a className="mdl-navigation__link" href="">学校新闻</a>
                        <a className="mdl-navigation__link" href="">校园通知</a>
                        <a className="mdl-navigation__link" href="">CC98</a>
                        <a className="mdl-navigation__link" href="">考试园地</a>
                    </nav>
                </div>
            </header>
        )
    }
}

module.exports=Header;