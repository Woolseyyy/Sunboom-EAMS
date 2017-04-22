var React=require("react");
var style=require("./Entry.css");
//var Helmet=require("react-helmet");
var LoginForm=require("./Component/LoginForm/LoginForm.jsx");

class Entry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className={style.background + " " + "background"}>
                <div className={style.box}>
                    <LoginForm/>
                </div>
            </div>
        )
    }
}

module.exports=Entry;