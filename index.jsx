var React=require("react");
var ReactDOM=require("react-dom");
var routeObj=require("react-router");
var Router=routeObj.Router;
var hashHistory=routeObj.hashHistory;
import injectTapEventPlugin from 'react-tap-event-plugin';
var Header=require('./Common/Header/Header.jsx');
var Slider=require('./Common/Slider/Slider.jsx');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var style=require('./Common/init.css');

injectTapEventPlugin();

class App extends React.Component{
    render(){
        return(
            <MuiThemeProvider>
                <div>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        )
    }
}

var rootRoute={
    childRoutes:[{
        path:'/',
        component:App,
        indexRoute:require("./Page/Entry"),
        childRoutes:[
            require("./Page/Entry")
        ]
    }]
};

class Root extends React.Component{
    render(){
        return(
            <Router
                history={hashHistory}
                routes={rootRoute}
            />
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById("app")
);