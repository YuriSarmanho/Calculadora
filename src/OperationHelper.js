// definição
// responsabilidade de validar operações (operações ou não,...)
class OperationHelper {
    // só existe aqui
    operationStrings = ["+", "-", "X", "/", "ac", "+-", "%", "="];
    // tem que retornar true || false
    // não pode alterar o número de parametros
    isOperation(value) {
        //  tentar modificar como validar se é uma operação ou não
        //  if/else, loop for, loop while, switch
        //  return this.operationStrings.includes(value);
         for(var itensOperation=0; itensOperation < this.operationStrings.length;itensOperation++){
             if(value === this.operationStrings[itensOperation]){
                 return true 
             }
         } 
    }

    isSimpleOperation(value, isTypingSecondValue) {
        return isTypingSecondValue && value === "=";
    }

    isChangeValue(value, isTypingChange) {
        return isTypingChange && value === "+-";
    }

    isComposedOperation(typeComposed, value) {
        if (typeComposed) {
            return typeComposedOperation(true, value);
        }
            return typeComposedOperation(); 
    }
}
