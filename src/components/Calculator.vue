<script setup>
import { ref } from 'vue';

</script>

<template>
    <section class="calculator">
        <p> Efectua operaciones básicas como suma, resta, división, multiplicación, raíz cuadrada y potencia</p>
        <input type="text" class="display" />

        <div class="buttons">
            <button class="btn btn-clear">C</button>
            <button class="btn btn-operator">x/-</button>
            <button class="btn btn-operator">x^y</button>
            <button class="btn btn-operator">/</button>
            <button class="btn btn-operator">×</button>
            <button class="btn btn-number">7</button>

            <button class="btn btn-number">8</button>
            <button class="btn btn-number">9</button>
            <button class="btn btn-operator">-</button>
            <button class="btn btn-number">4</button>

            <button class="btn btn-number">5</button>
            <button class="btn btn-number">6</button>
            <button class="btn btn-operator">+</button>
            <button class="btn btn-number">1</button>

            <button class="btn btn-number">2</button>
            <button class="btn btn-number">3</button>
            <button class="btn btn-operator"> √ </button>
            <button class="btn btn-number">0</button>
            <button class="btn btn-number">.</button>
            <button class="btn btn-equals" rowspan="2">=</button>
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
        width: auto;
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
