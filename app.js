let clickedValeus = []

let operations = []

const operationStrings = ['+','-','X','/','ac','+-','%','=']

let firstValue = []
let secondValue = []


var isTypingSecondValue = 0
var isTypingChange = false
var nextOperation = false
let changeValue = []

function inputHandler(value){
    const display = document.getElementById('visor')
    display.value += value
    const isOperation  = operationStrings.includes(value) 
    if(isOperation){
        operations.push(value)
        
        if(firstValue.length > 0){
            //clickedValeus.push(firstValue)
            isTypingSecondValue++
            isTypingChange = true
        }  
        //Operação simples
        if(isTypingSecondValue > 0 && value === '='){
            //clickedValeus.push(secondValue)
            const result = executeOperation()
            display.value = result 
            isTypingSecondValue++
            nextOperation = true
            changeValue = result
        }
        //Realizar operação composta
        if( isTypingSecondValue > 0 && operations[1] != '=' && secondValue > 0){
            const result = executeOperation()
            firstValue = result
            secondValue = []
            operations[0] = operations[1]
            operations.pop([1])
            nextOperation = false
        }   

         if(isTypingChange && value === '+-'){
            changeValue = changeValue*-1
            display.value = changeValue
            nextOperation = false
            secondValue= []
            operations=[]
            firstValue = changeValue
        }

        if(value === 'ac' && firstValue.length > 0){
            console.log('entrou')
            display.value = null 
            firstValue = []
            secondValue = []
            operations = []
            isTypingSecondValue = 0
            isTypingChange = false
            nextOperation = false 
        }  
        //Operação composta apertando igual
        if(isTypingSecondValue > 1 && value != '=' && nextOperation){ 
            const result = executeOperation()
            operations = [operations[2]]
            firstValue = [result]
            secondValue = []
        }

    } else{
        if(isTypingSecondValue){
            secondValue += value
        }else{
            firstValue += value 
        }
    }
}
function executeOperation(){
    const firstOperation = operations[0]
    switch(firstOperation){
        case '+':
            return Number(firstValue) + Number(secondValue)
        case '-':
            return Number(firstValue) - Number(secondValue)
        case 'X':
            return Number(firstValue)*Number(secondValue)
        case '/':
            return Number(firstValue)/Number(secondValue)
        case '%':
            return (Number(firstValue)/100) * Number(secondValue)
        }       
}