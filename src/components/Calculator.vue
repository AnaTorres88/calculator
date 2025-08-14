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

</style>
