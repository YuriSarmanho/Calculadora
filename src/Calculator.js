// definção
// a responsabilidade (calcular operações, retorna os resultados, define os valores na memória)
// todo: analisar de quem é a responsabilidade de atualizar o visor
//Colocar a atualização do visor aqui 

class Calculator {
    
    execComposedOperation() {
        const result = this.executeOperation();
        memory.firstValue = result;
        memory.secondValue = [];
        memory.nextOperation = false;
        memory.operations = [memory.operations[1]];
    }
     
    execSimpleEqual() {
        memory.result = this.executeOperation();
        updateVisor(memory.result, true);
        memory.nextOperation = true;
    }

    cleanMemory() {
        memory.firstValue = [];
        memory.secondValue = [];
        memory.operations = [];
        memory.isTypingChange = false;
        memory.nextOperation = false;
        memory.isTypingSecondValue = false;
        updateVisor(null, true);
    }

    changeValue() {
        memory.result *= -1; //memory.result = memory.result * -1
        memory.nextOperation = false;
        memory.secondValue = [];
        memory.operations = [];
        memory.firstValue = memory.result;
        updateVisor(memory.result, true);
    }
    setAfterEqualValue(){
        memory.operations[1] = memory.operations[2];
    }
    
    executeOperation() {
        const firstOperation = memory.operations[0];
            switch (firstOperation) {
                case "+":
                    return Number(memory.firstValue) + Number(memory.secondValue);
                case "-":
                    return Number(memory.firstValue) - Number(memory.secondValue);
                case "X":
                    return Number(memory.firstValue) * Number(memory.secondValue);
                case "/":
                    return Number(memory.firstValue) / Number(memory.secondValue);
                case "%":
                    return (Number(memory.firstValue) / 100) * Number(memory.secondValue);
        }
    }
}
