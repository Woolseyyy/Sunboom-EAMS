var React=require("react");
var style=require("./Entry.css");
//var Helmet=require("react-helmet");
var LoginForm=require("./Component/Login/Login.jsx");

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
            <div>
                <LoginForm/>
            </div>
        )
    }
}

module.exports=Entry;