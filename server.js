require('dotenv').config()
const mongoose=require("mongoose")
const express=require("express")
const articleRouter=require("./routes/articles")
const methodOverride=require('method-override')
const app=express()
const Article=require('./models/articles')
mongoose.set("strictQuery", false);
mongoose.connect(process.env.db_URL)
app.set("view engine",'ejs')
// MiddleWares
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))


app.get('/',async(req,res)=>{
    const articles=await Article.find().sort({createdAt:'desc'})
    res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter)
app.listen(3000)