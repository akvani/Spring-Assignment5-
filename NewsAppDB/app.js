//Wtrite entire app code in this Finally

const express= require('express');
const app= express();
const router= express.Router();
router.get("/", (req, res)=>{
    res.send("Welcome TO News App DB");
})

router.get('/contacts',(req, res)=>{
    res.send("All ur DB connections are Available");
})

router.post('/', (req, res)=>{
    res.send(req.body);
})
app.use(router);


module.exports= app;
