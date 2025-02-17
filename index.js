const app = require("./app")

app.listen(process.env.PORT, ()=>{
    console.log(`APP Connected to PORT ${process.env.PORT}`);
    
})