const moongose = require('mongoose');

exports.connectDataBase =  () => {
    moongose.connect(process.env.Mongo_URI)
    .then(()=> console.log("DataBase Connected"))
    .catch((e)=> console.log(`Error ${e}`));
};