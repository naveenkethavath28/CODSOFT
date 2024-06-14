document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-num') || e.target.getAttribute('data-op');

            if (e.target.id === 'clear') {
                currentInput = '';
                operator = '';
                operand1 = '';
                operand2 = '';
                display.textContent = '';
                return;
            }

            if (value === '=') {
                operand2 = currentInput;
                if (operand1 && operator && operand2) {
                    display.textContent = calculate(operand1, operator, operand2);
                    operand1 = display.textContent; // Update operand1 to the result
                    currentInput = '';
                    operator = '';
                    operand2 = '';
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (operator && currentInput) {
                    operand2 = currentInput;
                    display.textContent = calculate(operand1, operator, operand2);
                    operand1 = display.textContent; // Update operand1 to the result
                    operator = value;
                    currentInput = '';
                } else if (currentInput) {
                    operator = value;
                    operand1 = currentInput;
                    currentInput = '';
                }
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    function calculate(operand1, operator, operand2) {
        let result;
        switch (operator) {
            case '+':
                result = parseFloat(operand1) + parseFloat(operand2);
                break;
            case '-':
                result = parseFloat(operand1) - parseFloat(operand2);
                break;
            case '*':
                result = parseFloat(operand1) * parseFloat(operand2);
                break;
            case '/':
                result = parseFloat(operand1) / parseFloat(operand2);
                break;
            default:
                return '';
        }
        return result.toString();
    }
});