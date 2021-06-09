const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

//default comic data
var comicInfo = {"title": "", "month": "", "day": "", "year": "", "num": 1, "img": "", "alt": "", "transcript": [""], "random": 1};

var comicID = 2;

// format data fetched from xkcd API
function formatData(dataInput){
    comicInfo.title = dataInput.title;
    comicInfo.month = dataInput.month;
    comicInfo.day = dataInput.day;
    comicInfo.year = dataInput.year;
    comicInfo.num = dataInput.num;
    comicInfo.img = dataInput.img;
    comicInfo.alt = dataInput.alt;

    comicInfo.random = Math.floor(Math.random() * 2473);

    // split transcript by newline char
    comicInfo.transcript = dataInput.transcript.split('\n');
    
  }

function checkURL(newID){
    if (newID > 0 && newID < 2474){
        comicID = newID;
        return true;
    }
    return false;
    
}

function getUrl(){
    let url = 'https://xkcd.com/' + comicID + '/info.0.json';
    return url;
}

router.get('/:id', async (req, res) => {

    // redirect to previous page (or default id=1) if request id out of bound
    if (!checkURL(parseInt(req.params.id, 10))){
        return res.redirect('/' + comicID);
    }

    // fetch from xkcd API and reformat data.
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
    
    res.render('./../views/index', {comicInfo: comicInfo})
})

//redirect to PORT/1
router.get('/', async (req, res) => {   
    return res.redirect('/1');
})

// search by input id
router.post('/', async (req, res) => {
    return res.redirect('/' + req.body.id);
})

module.exports = router; 