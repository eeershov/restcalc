const myMath = require('./myMath')

const ERROR= 'ERROR';


function getParsedClientInput(clientInput) {
  // cleaning client's input
  const onlyKnownChars = clientInput.match(/[0-9]+|\,+|\.+|\++|\-+|\*+|\/+|\S/g).join('').replace(",",".")
  
  // get array of nums and operators
  const re = /[+-]?\d+.?\d*|[\/\*\+\-]/g
  const regexedInput = onlyKnownChars.match(re)

  // check and convert for nums and operators
  let parsedInput = [];
  for (let i = 0; i < regexedInput.length; i++) {
    const element = regexedInput[i];
    const convertedElement = convertToNumOp(element)
    parsedInput.push(convertedElement)
  }
  
  // check for "Error"
  if (parsedInput.includes(ERROR)) {
    return ERROR
  } else {
    return parsedInput
  }
};

// try to convert piece of a str to a num or an operator
function convertToNumOp(str) {
  const parsedNum = parseFloat(str)
  const operators = ["+","-","*","/"]

  if (parsedNum) {
    return parsedNum
  } else if (operators.includes(str)) {
    return str
  } else {
    return ERROR
  }
}


function convertInputToExpression(parsedInput) {
  const inputLength = parsedInput.length;
  const a = parsedInput[0];
  const b = parsedInput[inputLength-1];
  let expression = [];

  // checks
  if (inputLength > 3) {
    return ERROR
  } else if (inputLength == 2 && typeof b != 'number') {
    return ERROR
  } else if (inputLength == 2 && typeof b == 'number') {
    expression.push(a,'+',b)
  } else {
    expression = parsedInput;
  }
    
  return expression
};


function computeExpression(expression) {
  const a = expression[0];
  const b = expression[expression.length-1];
  const operator = expression[1];

  switch (operator) {
    case '+':
      return myMath.computeSum(a,b)
    case '-':
      return myMath.computeSubtraction(a,b)
    case '*':
      return myMath.computeMultiplication(a,b)
    case '/':
      return myMath.computeDivision(a,b)
    default:
      return 'Error on evaluation'
  }
  
};


function parseAndEvaluate(clientInput) {
  const parsedInput = getParsedClientInput(clientInput['evaluate'])
  if (parsedInput == ERROR) {
    return ERROR
  }

  const expression = convertInputToExpression(parsedInput)
  if (expression == ERROR) {
    return ERROR
  }
  
  expressionString = expression.join(" ")
  
  const result = {
    "user input" : clientInput["evaluate"],
    "parsed input" : expressionString,
    "result" : computeExpression(expression)
  };

  return result
};


module.exports = { parseAndEvaluate };