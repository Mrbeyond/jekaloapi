const Routers = require("./Routes");
const { server, app, express } = require("./server");
require('dotenv').config();

app.use(express.json({limit: '50mb' }));
app.use(express.urlencoded({extended: true, limit: '50mb',}));
app.use(Routers);


app.get('/', (req,res)=>{
  console.log("working fine");
  res.status(200).json({success:true});
})



app.use((req,res, next)=>{
  res.status(404).send("Page Not Found!")
});

app.use(function (err, req, res, next) {
  // console.error(err.stack)
  res.status(500).send('Internal Server Error');
})




server.listen(process.env.PORT || 2022, ()=>{
  console.log("App started");
})