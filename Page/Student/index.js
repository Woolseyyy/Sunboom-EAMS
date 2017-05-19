module.exports={
    path:'student',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require("./Student.jsx"))
        })
    }
};
