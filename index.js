const express = require('express');
const app = express();
const PORT = 8080;

const { parseAndEvaluate } = require('./clientInput');

app.use( express.json() );


// 1 . parse string into array of readable symbols
// 2 . convert array to expression
// 3 . evaluate expression


app.get('/api/calc', (req, res) => {
  
  result = parseAndEvaluate(req.body)
  if (result == 'ERROR') {
    res.status(400).send(
      {
        expression: req.body['evaluate'],
        result: 'Error in expression'
      }
    )
  } else {
    res.status(200).send(result)
  }

});


app.get('*', (req, res) => {
  res.status(404).send(
    {
      message: 'url not found'
    }
  )
})

app.listen(
  PORT,
  () => console.log(`Listening at localhost:${PORT}`)
)