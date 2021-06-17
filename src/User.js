//Receber e determinar as ações através dos comandos do usuário
class User{
    inputHandler(value) {
        if (helper.isOperation(value)) {
            saveOperation(value);
            // define isTypingSecondValue
            if (memory.firstValue.length > 0) {
                nextNumber();
            }
            //Operação simples
            if (helper.isSimpleOperation(value, memory.isTypingSecondValue)) {
                calculator.execSimpleEqual();
            }
            //Realizar operação composta
            if (helper.isComposedOperation()) {
                calculator.execComposedOperation();
            }
            //Operação composta apertando igual
            if (helper.isComposedOperation(true, value)) {
                memory.operations[1] = memory.operations[2];
                calculator.execComposedOperation();
            }
            if (helper.isChangeValue(value, memory.isTypingChange)) {
                changeValue();
            }
            if (value === "ac") {
                updateVisor(null, true);
                calculator.cleanMemory();
            }
        } else {
            addNumber(value);
        }
    }
}