import express, { query } from 'express';
import _ from 'lodash';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import mongoose, { connect, model } from 'mongoose';

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

connect('mongodb+srv://Pchhalotre:Sonu321chh@cluster0.sjvnsih.mongodb.net/trees');

const Schema = {
    scientific_name: String,
    category: String,
    location: String,
    common_name: String,
    img_src: String
};


const messageSchema = new  mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    subject: { type: String, required: true},
    message: String
});

const Message = mongoose.model('MessageInfo', messageSchema);

const Tree = model('treeInfo', Schema);

const bg_fruit = '/images/fruit_bg.jpg';
const bg_flower = '/images/flower_bg.jpg';
const bg_medicinal = '/images/medicinal_bg.jpg';
const bg_cactus = '/images/cactus_bg.jpeg';
const bg_ornamental = '/images/ornamental_bg.jpg'; 
const bg_main = '/images/Title-img.jpg';
const bg_vegetable = '/images/vegetable_bg.jpg';


app.route('/')
    .get((req, res) =>{
        res.render('index');
    })

app.route('/medicinal')
    .get(async (req, res) =>{
        const foundItems = await Tree.find({category: 'Medicinal'});
        try{
            res.render('category', {Category: 'Medicinal Plants/Trees', Items: foundItems, bg: bg_medicinal});
        }catch(err){
            console.log(err);
        }
    })

app.route('/fruit')
    .get(async (req, res) =>{
        const foundItems = await Tree.find({category: 'Fruit'});
        try{
            res.render('category', {Category: 'Fruit Plants/Trees', Items: foundItems, bg: bg_fruit});
        }catch(err){
            console.log(err);
        }
    })
     

app.route('/cactus')
    .get(async (req, res) =>{
        const foundItems = await Tree.find({category: 'Cactus'});
        try{
            res.render('category', {Category: 'Cactus Plants', Items: foundItems, bg: bg_cactus});
        }catch(err){
            console.log(err);
        }
    })

app.route('/flowering')
    .get(async (req, res) =>{
        const foundItems = await Tree.find({category: 'Flowering'});
        try{
            res.render('category', {Category: 'Flowering Plants/Trees', Items: foundItems, bg: bg_flower});
        }catch(err){
            console.log(err);
        }
    })

app.route('/ornamental')
    .get(async (req, res) =>{
        const foundItems = await Tree.find({category: 'Ornamental'});
        try{
            res.render('category', {Category: 'Ornamental Plants/Trees', Items: foundItems, bg: bg_ornamental});
        }catch(err){
            console.log(err);
        }
    })

app.route('/vegetable')
    .get(async (req, res) =>{
        const foundItems = await Tree.find({category: 'Vegetable'});
        try{
            res.render('category', {Category: 'Vegetable Plants/Trees', Items: foundItems, bg: bg_vegetable});
        }catch(err){
            console.log(err);
        }
    })
    
app.route('/treemap')
    .get(async(req, res) =>{
        res.render('tree_map', {bg: bg_main});
    })    


app.route('/contactus')
    .get(async(req, res) =>{
        res.render('contactus', {bg: bg_main});
    })
    
app.route('/find/:name')
    .get(async (req, res) =>{
        const name = req.params.name;
        const foundItems = await Tree.find({common_name: name});
        try{
            res.render('find', {Items: foundItems, bg: bg_main});
        }catch (err){
            console.log(err);
        }
    })

app.route('/search')
    .get(async(req, res) =>{
        const query = req.query.query;
        const results = await Tree.find({
            $or: [
              { common_name: { $regex: query, $options: 'i' } },
              { scientific_name: { $regex: query, $options: 'i' } },
              { category: { $regex: query, $options: 'i' } },
              { location: { $regex: query, $options: 'i' } }
            ]
          });
          try{
            res.render('search', {Category: [results.length, query], Items: results, bg: bg_main})
          }catch (err){
            console.log(err);
          }
    })


app.listen(3000, function(){
    console.log('server running on port 3000.');
});