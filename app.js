import express from 'express';
import _ from 'lodash';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import { connect, model } from 'mongoose';

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

connect('mongodb+srv://Pchhalotre:Sonu321chh@cluster0.sjvnsih.mongodb.net/treesData');

const Schema = {
    scientific_name: String,
    category: String,
    location: String,
    common_name: String,
    img_src: String,
    descrp: String
};

const Tree = model('treesInfo', Schema);

const bg_fruit = '/images/fruit_bg.jpg';
const bg_flower = '/images/flower_bg.jpg';
const bg_medicinal = '/images/medicinal_bg.jpg';
const bg_cactus = '/images/cactus_bg.jpeg';
const bg_ornamental = '/images/ornamental_bg.jpg'; 
// const FruitTree = model('FruitTree', Schema);
// const FloweringTree = model('FloweringTree', Schema);
// const VegetableTree = model('VegetableTree', Schema);


// const flowering = [
//     {
//         name: 'Pinwheel',
//         img_src: 'flowering_images/pinwheel.jpg'
//     }
// ]

// const medicinal = [
//     {
//         name: 'Pinwheel',
//         img_src: 'flowering_images/pinwheel.jpg'
//     }
// ]

// const fruit = [
//     {
//         name: 'Pinwheel',
//         img_src: 'flowering_images/pinwheel.jpg'
//     }
// ]

// const vegetable = [
//     {
//         name: 'Pinwheel',
//         img_src: 'flowering_images/pinwheel.jpg'
//     }
// ]

app.route('/')
    .get((req, res) =>{
        res.render('index');
    });

app.route('/medicinal')
    .get(async (req, res) =>{
        const foundItems = await Tree.find({category: 'Medicinal'});
        try{
            res.render('category', {Category: 'Medicinal Plants/Trees', Items: foundItems, bg: bg_medicinal});
        }catch(err){
            console.log(err);
        }
    });

app.route('/fruit')
    .get(async (req, res) =>{
        const foundItems = await Tree.find({category: 'Fruit'});
        try{
            res.render('category', {Category: 'Fruit Plants/Trees', Items: foundItems, bg: bg_fruit});
        }catch(err){
            console.log(err);
        }
    });
     

app.route('/cactus')
    .get(async (req, res) =>{
        const foundItems = await Tree.find({category: 'Cactus'});
        try{
            res.render('category', {Category: 'Cactus Plants', Items: foundItems, bg: bg_cactus});
        }catch(err){
            console.log(err);
        }
    });

app.route('/flowering')
    .get(async (req, res) =>{
        const foundItems = await Tree.find({category: 'Flowering'});
        try{
            res.render('category', {Category: 'Flowering Plants/Trees', Items: foundItems, bg: bg_flower});
        }catch(err){
            console.log(err);
        }
    }); 


app.listen(3000, function(){
    console.log('server running on port 3000.');
});