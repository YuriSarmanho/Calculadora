// definção
// a responsabilidade (calcular operações, retorna os resultados, define os valores na memória)
// todo: analisar de quem é a responsabilidade de atualizar o visor
//Colocar a atualização do visor aqui

class Calculator {
    constructor(memory) {
        if (typeof memory === "undefined") {
            throw Error("InputHandler needs a memory object");
        }
        this.memory = memory;
    }

    visorNotify(){
        const display = document.getElementById("visor");
        app.updateVisor('',true);
        setTimeout(app.updateVisor(this.memory.firstValue), 2000);
    }

    

    execComposedOperation() {
        const result = this.executeOperation();
        this.memory.firstValue = result;
        this.memory.secondValue = [];
        this.memory.nextOperation = false;
        this.memory.operations = [this.memory.operations[1]];
    }

    execSimpleEqual() {
        this.memory.result = this.executeOperation();
        app.updateVisor(this.memory.result, true);
        this.memory.nextOperation = true;
    }

    cleanMemory() {
        this.memory.firstValue = [];
        this.memory.secondValue = [];
        this.memory.operations = [];
        this.memory.isTypingChange = false;
        this.memory.nextOperation = false;
        this.memory.isTypingSecondValue = false;
        app.updateVisor(null, true);
    }
        
    
    changeValue() {
        this.memory.result *= -1; //this.memory.result = this.memory.result * -1
        this.memory.nextOperation = false;
        this.memory.secondValue = [];
        this.memory.operations = [];
        this.memory.firstValue = this.memory.result;
        app.updateVisor(this.memory.result, true);
    }
    setAfterEqualValue() {
        this.memory.operations[1] = this.memory.operations[2];
    }

    executeOperation() {
        const firstOperation = this.memory.operations[0];
        switch (firstOperation) {
            case "+":
                return (
                    Number(this.memory.firstValue) +
                    Number(this.memory.secondValue)
                );
            case "-":
                return (
                    Number(this.memory.firstValue) -
                    Number(this.memory.secondValue)
                );
            case "*":
                return (
                    Number(this.memory.firstValue) *
                    Number(this.memory.secondValue)
                );
            case "/":
                return (
                    Number(this.memory.firstValue) /
                    Number(this.memory.secondValue)
                );
            case "%":
                return (
                    (Number(this.memory.firstValue) / 100) *
                    Number(this.memory.secondValue)
                );
        }
    }
}
