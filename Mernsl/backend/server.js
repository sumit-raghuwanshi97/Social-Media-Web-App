const app = require('./app');
const {connectDataBase} = require("./config/database");

connectDataBase(); 

app.listen(process.env.PORT,() => {
    console.log(`server is running on port ${process.env.PORT}`);
});