const express = require("express");
const app = express();
const puppeteer = require('puppeteer');
const jquery = require('jquery');

app.get("/",async function(req,res)
{ 
    const browser = await puppeteer.launch({args:["--no-sandbox"]});
    const page = await browser.newPage();
    await page.goto('https://sportskeeda.com/cricket');
    
    await page.click('.score-carousel-scroll-right');
   
   var data = await page.evaluate( () => { var x=[];
     for(var i =1; i<20;i++)
     {
       var desc = document.querySelector("#keeda_cricket_widget > div.keeda_widget > div > div:nth-child("+i+") > div> div:nth-child(1)");
        if(desc)desc = desc.innerText; else continue;
       var status = document.querySelector("#keeda_cricket_widget > div.keeda_widget > div > div:nth-child("+i+") > div> div:nth-child(3)").innerText;
       var team1 = document.querySelector("#keeda_cricket_widget > div.keeda_widget > div > div:nth-child("+i+") > div> div:nth-child(2)>div:nth-child(1)>span:nth-child(2)").innerText
       var team2 = document.querySelector("#keeda_cricket_widget > div.keeda_widget > div > div:nth-child("+i+") > div> div:nth-child(2)>div:nth-child(2)>span:nth-child(2)").innerText
       var score1 = document.querySelector("#keeda_cricket_widget > div.keeda_widget > div > div:nth-child("+i+") > div> div:nth-child(2)>div:nth-child(1)>span:nth-child(3)").innerText
       var score2 = document.querySelector("#keeda_cricket_widget > div.keeda_widget > div > div:nth-child("+i+") > div> div:nth-child(2)>div:nth-child(2)>span:nth-child(3)").innerText
       var team1img = document.querySelector("#keeda_cricket_widget > div.keeda_widget > div > div:nth-child("+i+") > div> div:nth-child(2)>div:nth-child(1)>span:nth-child(1)");
        
       var team2img = document.querySelector("#keeda_cricket_widget > div.keeda_widget > div > div:nth-child("+i+") > div> div:nth-child(2)>div:nth-child(2)>span:nth-child(1)");
        var style = team1img.currentStyle || window.getComputedStyle(team1img, false);
var bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
       
 style = team2img.currentStyle || window.getComputedStyle(team2img, false);
var bi1 = style.backgroundImage.slice(4, -1).replace(/"/g, "");
       x.push({desc:desc,team1:team1,team2:team2,score1:score1,score2:score2,team1img:bi,team2img:bi1,status:status});
     }
     return x;
    });
  res.send(data);

})
app.listen(3000,function()
{
    console.log("Server connected");
})

  