const {app} = require('./config/express'); //{app} app: app

const main = () => {
    try{
        app.listen(app.get("port"));
        console.log(`Server running in http://localhost:${app.get("port")}/`);
        console.log(`Angular server running in http://localhost:4200/login`);
    }catch (err) {
        console.log(err);
    }
};

main();