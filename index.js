const express = require('express');
const app = express();
const PORT = 8080;

const myMath = require('./myMath')

app.use( express.json() )

app.listen(
  PORT,
  () => console.log(`Listening at localhost:${PORT}`)
)

// 1 . parse string into array of readable symbols
// 2 . convert array to expression
// 3 . evaluate expression

function getParsedClientInput(clientInput) {
  const noWhitespace = clientInput.match(/\S+/g).join('')
  
  const re = /\-+\d+|\d+|\*|\//g
  const parsedInput = noWhitespace.match(re)

  return parsedInput
}


function convertInputToExpression(parsedInput) {
  let expression = [];
  parsedInput.forEach(element => {
    console.log(element)
    const parsedNum = parseFloat(element)
    if (parsedNum) {
      expression.push(parsedNum)
    } else {
      expression.push(element)
    }
  });
  console.log(`done expression = ${expression}`)

  return expression
}


function computeExpression(expression) {
  if (expression.length == 2) {
    return myMath.computeSum(...expression)
  } else if (expression[1] == '*') {
    return myMath.computeMultiplication(expression[0],expression[2])
  } else if (expression[1] == '/') {
    return myMath.computeDivision(expression[0],expression[2])
  } else {
    return 'Error on evaluation'
  }
}

app.get('/api/calc', (req, res) => {
  console.log(req.body)

  const clientInput = req.body['evaluate']
  const parsedInput = getParsedClientInput(clientInput)
  const expression = convertInputToExpression(parsedInput)
  
  const result = computeExpression(expression)

  res.status(200).send({
    expression: clientInput,
    result: result
  })
});