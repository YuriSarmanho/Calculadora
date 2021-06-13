// definção
// a responsabilidade (calcular operações, retorna os resultados, define os valores na memória)
// todo: analisar de quem é a responsabilidade de atualizar o visor

class Calculator {
    inputHandler(value) {
        if (helper.isOperation(value)) {
            saveOperation(value);
            // define isTypingSecondValue
            if (memory.firstValue.length > 0) {
                nextNumber();
            }
            //Operação simples
            if (helper.isSimpleOperation(value, memory.isTypingSecondValue)) {
                execSimpleEqual();
            }
            //Realizar operação composta
            if (isComposedOperation()) {
                execComposedOperation();
            }
            //Operação composta apertando igual
            if (isComposedOperation(true, value)) {
                memory.operations[1] = memory.operations[2];
                execComposedOperation();
            }
            if (helper.isChangeValue(value, memory.isTypingChange)) {
                changeValue();
            }
            if (value === "ac") {
                updateVisor(null, true);
                cleanMemory();
            }
        } else {
            addNumber(value);
        }
    }
}
