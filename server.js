const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT ||3000;
var app=express();

hbs.registerPartials(__dirname+'/views/partial')
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    
    var now =new Date().toString();
    var log=`${now}:${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if (err){
            console.log('unable to append to the log file');
        }
    })
    next();

});

/*app.use((req,res,next)=>{
    res.render('maintenance.hbs')
})*/

app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        welcomeMesage:'Welcome to the website',
        pagetitle:'About us',
        
    })
});
app.get('/about',(req,res)=>{
    res.render('aboutus.hbs',{
        pagetitle:'About us',
        
    })
})

app.get('/project',(req,res)=>{
    res.render('project.hbs',{
        pagetitle:'Project Page',
        
    })

app.listen(port);