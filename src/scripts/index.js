// The following line makes sure your styles are included in the project. Don't remove this.

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';
import '../styles/main.css';

import 'bootstrap';
import _ from 'lodash'; 
import imgLady from 'images/ladyInRed-530-800.png';
import imgChris from 'images/chris.png';
import imgFluegel from 'images/fluegel_260.png';
//require("html-loader!./index.html");

// mp3 einbinden
var src = require('../media/Chris-De-Burgh-The-Lady-In-Red.mp3');
//var ladyImg = require('../images/ladyInRed-530-800.png');
var chrisImg = require('images/chris.png');
var fluegelImg = require('images/fluegel_260.png');

const ladyImg = new Image();
ladyImg.src=imgLady;
//document.getElementById('audio').src = src;
console.log("ladyimg: "+ladyImg.src)
jQuery(document).ready(function (f) {

    $("#audio").src = src;

    //image find and set attrribute
    $(this).find('#lady').attr("src", ladyImg.src);
    //  $(this).find('#lady').attr("src", imgLady);
    $(this).find('#chris').attr("src", chrisImg.default);
    //$(this).find('#chris').attr("src", imgChris);
    $(this).find('#fluegel').attr("src", fluegelImg.default);
    // $(this).find('#fluegel').attr("src", imgFluegel);
    console.log(ladyImg.src)
    console.log(fluegelImg.default)
});