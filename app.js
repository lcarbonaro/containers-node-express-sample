const express = require('express');
const app = express();
const port = 3000;

/* did not work here either :(
const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: false });
*/

app.disable('etag');

let db = [ 
  {
    id:1,
    min: 50,
    max: 100,
    prequal: true
  },
  {
    id:2,
    min: 50,
    max: 400,
    prequal: true
  }
];


/* did not work here either :(
app.get('/focl', (req, res) => {  
  nightmare
    .goto("https://toronto.craigslist.org/search/mss/zip")
    .wait(".cl-search-result")
    .evaluate(() => {
        const elements = document.querySelectorAll("li.cl-search-result");

        let responseObj = [];

        elements.forEach( elem => {
            let rec = {};
                        
            let aTag = elem.querySelector('a.main'); 
            rec.title = elem.title; 
            rec.link = aTag.href.trim();   

            responseObj.push(rec);
        });

        return responseObj;
    })
    .end()
    .then((result) => {
        //console.log('dot then');
        //console.log(result);
        res.json( { result } );
    })
    .catch((error) => {
        console.error("Scraping failed:", error);
    });

});
*/


app.get('/', (req, res) => {
  res.send(`JUST TESTING`);
});

app.get('/test', (req, res) => {
  res.json(
    {id:12, msg:"just testing", isMember:false}
  );
});

app.get('/secret', (req, res) => {
  res.json(
    {secretMsg:`${process.env.TEST_ENV_VAR}`}
  );
});

app.get('/api/merchant/:id', (req, res) => {
  let id = parseInt(req.params.id,10);
  let r = db.filter( r => r.id === id );
  
  // so we get 200 each time not 304 
  //res.header('Cache-Control', 'no-cache');

  if( r.length > 0) {
    res.status(200).json(r[0]);
  } else {
    res.status(400).json({ message: `id ${id} not found`});
  }
  
});

app.post('/api/merchant', (req,res) => {

});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  //console.log(`test env var = ${process.env.TEST_ENV_VAR}`);
});

