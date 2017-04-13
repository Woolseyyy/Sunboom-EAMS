var React=require("react");
var ReactDOM=require("react-dom");
var routeObj=require("react-router");
var Router=routeObj.Router;
var hashHistory=routeObj.hashHistory;
var Header=require('./Common/Header/Header.jsx');
var Slider=require('./Common/Slider/Slider.jsx');

class App extends React.Component{
    render(){
        return(
            <div className="default-layout-transparent mdl-layout mdl-js-layout">
                <Header/>
                <Slider/>
                {this.props.children}
            </div>
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