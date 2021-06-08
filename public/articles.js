const express = require('express');
// const Article = require('../models/article')
const fetch = require('node-fetch');

const router = express.Router();

//default comic data
var comicInfo = {"title": "", "month": "", "day": "", "year": "", "num": 1, "img": "", "alt": "", "transcript": ["1","2"], "random": 1, "views": 1};

var comicID = 2;

function formatData(dataInput){
    comicInfo.title = dataInput.title;
    comicInfo.month = dataInput.month;
    comicInfo.day = dataInput.day;
    comicInfo.year = dataInput.year;
    comicInfo.num = dataInput.num;
    comicInfo.img = dataInput.img;
    comicInfo.alt = dataInput.alt;

    comicInfo.random = Math.floor(Math.random() * 2473);

    comicInfo.transcript = dataInput.transcript.split('\n');
    
    // console.log(dataInput);

    return true;
  }

function checkURL(newID){
    if (newID > 0 && newID < 2474){
        comicID = newID;
        return true;
    }
    return false;
    
}

function getUrl(newID){
    let url = 'https://xkcd.com/' + comicID + '/info.0.json';
    return url;
}

router.get('/:id', async (req, res) => {

    if (!checkURL(parseInt(req.params.id, 10))){
        return res.redirect('/' + comicID);
    }

    try{
        const fetchResponse = await fetch(getUrl(), {
                                        method: 'GET',
                                        header: {'Content-Type': 'application/json'}
                                        })
                                    .then(response => {
                                        return response.json()
                                    })
        formatData(fetchResponse);
    } catch (err){
        console.log(err)
    }

    // const article = await Article.findById(req.params.id)
    // if (article == null){
    //     res.redirect('/')
    // }
    
    res.render('./../views/index', {comicInfo: comicInfo})
})

router.get('/', async (req, res) => {   
    return res.redirect('/1');
})

router.post('/', async (req, res) => {
    return res.redirect('/' + req.body.id);
})

module.exports = router; 