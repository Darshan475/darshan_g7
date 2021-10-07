const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode =require('./util/geocode')
const forecast =require('./util/forecast')
//Defining paths for Express config
const pubPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../temp/views')
const partials=path.join(__dirname,'../temp/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partials)

//SEtup static directory to serve

app.use(express.static(pubPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Darshan'
    })
})
app.get('',(req,res)=>{
    res.send('<h1>Hello Express!</h1>')
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name :'Darshan'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name :'Darshan'
    })
})

// app.get('/help/*',(req,res)=>{
//     res.render('404',{
//         title:'404',
//         name :'Darshan',
//         error:'help article not found.'
//     })
// })

// app.get('*',(req,res)=>{
//     res.render('404',{
//         title:'404',
//         name :'Darshan',
//         error:'Page not found.'
//     })
// })

// app.get('/help',(req,res)=>{
//     res.send({
//         name:'Darshan',
//         Age :23

//     })
// })
// app.get('/about',(req,res)=>{
//     res.send('About')
// })

app.get('/weather',(req,res)=>{
   if (!req.query.address) {
          return res.send({
              error :'You must provide an address!'
          })
       
   }
   geocode(req.query.address,(error,{lat,long,loc}={})=>{
       if(error){
           return res.send({error})
       }
       forecast(lat,long,(error,forecastData)=>{
           if (error) {
               return res.send({error})
           }
           res.send({
               forecast:forecastData,
               loc,
               address:req.query.address
           })
       })

   })
//    res.send({
//        forecast :'It is snowing',
//        location :'Bangalore',
//        address:req.query.address
//    })
})



app.listen(3000,()=>{
    console.log('Server is up in port 3000')
})