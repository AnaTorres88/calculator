<script setup>
    import { ref } from 'vue';
    // Control de estados para input, output y valores
    const output = ref('0');
    const input = ref('0');
    const previousValue = ref(null);
    const currentOperation = ref(null);
    const waitingForNewValue = ref(false);
    const isDecimal = ref(false);

        // Auxiliares devuelve el entero más grande menor o igual a ese número
        function floor(num) {
            return num >= 0 ? num - (num % 1) : num - (num % 1) - (num % 1 === 0 ? 0 : 1);
        }
        // Valor absoluto
        function abs(integer) {
            return integer < 0 ? -integer : integer;
        }
    /**
     * Función que se ejecuta al hacer click en un número, pasa números al output
     * que también está enlazado con el element input de html
     * @param {number} num - Un número real
     */
    function inputNumber(num) {
        if (waitingForNewValue.value) {
            output.value = num;
            waitingForNewValue.value = false;
            isDecimal.value = false;
        } else {
            output.value = output.value === '0' ? num : output.value + num;
        }
    }
    /**
     * Función que se ejecuta al hacer click en el símbolo del punto decimal
     * Si empieza con punto, añade 0., si no, añade el punto después de un número.
     * Previene multiples puntos en el mismo valor
     */
    function inputDecimal() {
        if (waitingForNewValue.value) {
            output.value = '0.';
            waitingForNewValue.value = false;
            isDecimal.value = true;
        } else if (!isDecimal.value && output.value.indexOf('.') === -1) {
            output.value += '.';
            isDecimal.value = true;
        }
    }
     /**
     * Función que se ejecuta al hacer click en el símbolo igualdad.
     * Si tenemos un operador seleccionado, un valor anterior y no estamos esperando a elegir otro valor,
     * Se llama a la función performCalculation, el resultado se convierte a String y se guarda en variablel output
     * Se limpian variables del estado y se indica si el rultado es decimal o no.
     */
    function calculate() {
        if (
            currentOperation.value &&
            previousValue.value !== null &&
            !waitingForNewValue.value
        ) {
            const result = performCalculation();
            output.value = String(result);
            previousValue.value = null;
            currentOperation.value = null;
            waitingForNewValue.value = true;
            isDecimal.value =
            typeof result === 'number' && result.toString().includes('.');
        }
    }
     /**
     * Función que se ejecuta al hacer click en un operador en la calculadora
     * Convierte el número el valor de la variable output, si se trata del primer número
     * que presionamos, lo guardamos en la variable previousValue. Si el operador ya tiene
     * un valor y no estamos esperando por un nuevo valor, hacemos el cálculo y optenemos el resultado
     * Este resultado se asigna a previousValue.
     * Al final se espera un nuevo valor, se guarda el operador actual y isDecimal vuelve a su valor original.
     * @param {string} operator - Una cadena de caracteres
     */
        function inputOperator(operator) {
            const inputValue = parseFloat(output.value);

            // Operadores Unarios se ejecutan inmediatamente
            if (operator === "negate") {
                output.value = String(negate(inputValue));
                return;
            }

            if (operator === "sqrt") {
                const result = sqrt(inputValue);
                output.value = String(result);
                waitingForNewValue.value = true;
                isDecimal.value = output.value.includes('.');
                return;
            }

            // Operadores binarios
            if (previousValue.value === null) {
                previousValue.value = inputValue;
            }
            else if (currentOperation.value && !waitingForNewValue.value) {
                const result = performCalculation();
                output.value = String(result);
                previousValue.value = result;
            }

            waitingForNewValue.value = true;
            currentOperation.value = operator;
            isDecimal.value = false;
        }
    /**
     * Función Para obtener valor previo y actual
     * Manda a llamar a la función adecuada para cada operación segun el valo rque tenga
     * la variable de operador actual: currentOperation
     */
    function performCalculation() {
        const prev = previousValue.value;
        const current = parseFloat(output.value);
        switch (currentOperation.value) {
            case 'add': return addition(prev, current);
            case 'sub': return substraction(prev, current);
            case 'mult': return multiplication(prev, current); 
            case 'div': return division(prev, current);
            case 'pow': return pow(prev, current);
            default: return current;
        }
    }

    // Operaciones

    function addition(a, b) { return a + b; } 
    function substraction(a, b) { return a - b; } 
    function division(a, b) { if (b === 0) { 
        console.error('¡No se puede dividir entre cero!'); 
        return 0; 
    } 
        return a / b; 
    }
    function multiplication(a, b) { return a * b; }

    // DE: https://www.geeksforgeeks.org/javascript/javascript-program-to-find-the-square-root/
    function sqrt(number) {
        if (number < 0) {
            console.error("¡No se puede calcular la raíz cuadrada de un número negativo!");
            return NaN;
        }
        if (number === 0) {
            return 0;
        }
        let guess = number / 2;
        const tolerance = 0.000001;
        while (abs(guess * guess - number) > tolerance) {
            guess = (guess + number / guess) / 2;
        }
        return guess;
    }
// DE: https://www.geeksforgeeks.org/dsa/write-you-own-power-without-using-multiplication-and-division/
function pow(a, b) {
    // Si la base es 0
    if (b === 0) return 1;

    // Si hay exponente negativo
    if (b < 0) return 1 / pow(a, -b);

    // Si la base es 0.5
    if (b === 0.5) return sqrt(a);

    // Si el exponente es un número entero
    if (Number.isInteger(b)) {
        if (b % 2 === 0) {
            return pow(a * a, b / 2);
        } else {
            return a * pow(a * a, (b - 1) / 2);
        }
    }

    // Para otros exponentes
    return expApprox(b * lnApprox(a));
}

    // Aproximación Log. Natural
    function lnApprox(x) {
        if (x <= 0) return NaN;
        let y = (x - 1) / (x + 1);
        let y2 = y * y;
        let sum = 0;
        let term = y;
        let n = 1;
        while (n < 50) {
            sum += term / n;
            term *= y2;
            n += 2;
        }
        return 2 * sum;
    }

    // Aproximación exponencial de Taylor
    function expApprox(x) {
        let term = 1;
        let sum = 1;
        for (let i = 1; i < 30; i++) {
            term *= x / i;
            sum += term;
        }
        return sum;
    }
    // Niega un valor
    function negate(a) {
        let current= Number(a);
         if (current !== 0) {
            current = current * -1;
        }
        return current;
    }
    // Limpiar
    function clear() {
        output.value = '0';
        input.value = '0';
        previousValue.value = null;
        currentOperation.value = null;
        waitingForNewValue.value = false;
        isDecimal.value = false;
    }
</script>

<template>
    <p> Efectua operaciones básicas como suma, resta, división, multiplicación, raíz cuadrada y potencia</p>
    <section class="calculator">
        <input type="text"
            class="display"
            v-model="output"
            readonly
            :placeholder="output || '0'"/>

        <div class="buttons">
            <button class="btn btn-clear" @click="clear">C</button>
            <button class="btn btn-operator" @click="inputOperator('negate')">+/-</button>
            <button class="btn btn-operator" @click="inputOperator('pow')">x^y</button>
            <button class="btn btn-operator" @click="inputOperator('div')">/</button>
            <button class="btn btn-operator" @click="inputOperator('mult')">×</button>
            <button class="btn btn-number" @click="inputNumber('7')">7</button>

            <button class="btn btn-number" @click="inputNumber('8')">8</button>
            <button class="btn btn-number" @click="inputNumber('9')">9</button>
            <button class="btn btn-operator" @click="inputOperator('sub')">-</button>
            <button class="btn btn-number" @click="inputNumber('4')">4</button>

            <button class="btn btn-number" @click="inputNumber('5')">5</button>
            <button class="btn btn-number" @click="inputNumber('6')">6</button>
            <button class="btn btn-operator" @click="inputOperator('add')">+</button>
            <button class="btn btn-number" @click="inputNumber('1')">1</button>

            <button class="btn btn-number" @click="inputNumber('2')">2</button>
            <button class="btn btn-number" @click="inputNumber('3')">3</button>
            <button class="btn btn-operator" @click="inputOperator('sqrt')"> √ </button>
            <button class="btn btn-number" @click="inputNumber('0')">0</button>
            <button class="btn btn-number" @click="inputDecimal">.</button>
            <button class="btn btn-equals" rowspan="2" @click="calculate" >=</button>
        </div>
    </section>
</template>

<style scoped>
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .calculator {
        background: #2d3748;
        border-radius: 20px;
        padding: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        margin: 0 auto;
    }

    .display {
        background: #1a202c;
        border: none;
        border-radius: 10px;
        color: #e2e8f0;
        font-size: 2rem;
        font-weight: 300;
        text-align: right;
        padding: 20px;
        margin-bottom: 20px;
        width: 100%;
        box-sizing: border-box;
        min-height: 60px;
        overflow: hidden;
    }

    .buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
    }

    .btn {
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        font-weight: 500;
        padding: 25px;
        cursor: pointer;
        transition: all 0.2s ease;
        min-height: 60px;
    }

    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .btn:active {
        transform: translateY(0);
    }

    .btn-number {
        background: #4a5568;
        color: #e2e8f0;
    }

    .btn-number:hover {
        background: #5a6578;
    }

    .btn-operator {
        background: #ed8936;
        color: white;
    }

    .btn-operator:hover {
        background: #f6ad55;
    }

    .btn-clear {
        background: #e53e3e;
        color: white;
    }

    .btn-clear:hover {
        background: #fc8181;
    }

    .btn-equals {
        background: #38a169;
        color: white;
    }

    .btn-equals:hover {
        background: #48bb78;
    }

    .btn-zero {
        grid-column: span 2;
    }
</style>
