import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { nextTick } from "vue";
// Se importa el componente cuandos e acreado
import Calculator from "@/components/Calculator.vue";

// metodo describe del framework de tests para englobar los tests del componente
describe("Calculator", () => {
    let wrapper; // wrapper del componente, instancia retornada por mount
    let component;
    beforeEach(() => {
    wrapper = mount(Calculator);
    component = wrapper?.vm; // propiedad que nos da acceso a los métodos del componente
  });

  const getDisplay = () => wrapper.find(".display").element;
  const displayStringValue = () => parseFloat(getDisplay().text());

  // Primera prueba renderizar el componente
  it("Renderiza el componente", () => {
    const paragraph =
        "Efectua operaciones básicas como suma, resta, división, multiplicación, raíz cuadrada y potencia";
    expect(wrapper.find("p").text()).toBe(paragraph);
  });

  // Mostrar números

  it("Empieza con 0", () => {
    expect(wrapper.find(".display").text()).toBe("");
    expect(getDisplay().placeholder).toBe("0");
    expect(getDisplay().value).toBe("0");
  });

  // Es un test asíncrono, estamos esperando que pase tiempo para evaluar resultado con async/await
  // nextTick() simula el paso del tiempo en los tests

  it("Muestra un número", async () => {
    component.inputNumber("7");
    await nextTick();
    expect(component.output).toBe("7");
    expect(getDisplay().value).toBe("7");
  });

  it("Añade más números", async () => {
    component.inputNumber("7");
    await nextTick();
    component.inputNumber("8");
    await nextTick();
    expect(getDisplay().value).toBe("78");
  });

  it("Muestra números decimales", async () => {
    component.inputNumber("1");
    await nextTick();
    component.inputDecimal();
    await nextTick();
    component.inputNumber("5");
    await nextTick();
    expect(getDisplay().value).toBe("1.5");
  });

  it("Previene mostrar numeros decimales dos veces", async () => {
    component.inputNumber("1");
    await nextTick();
    component.inputDecimal();
    await nextTick();
    component.inputDecimal();
    await nextTick();
    expect(getDisplay().value).toBe("1.");
  });

  // // Operaciones con dos dígitos
  describe("Operaciones binarias: Conjunto de operaciones con dos números", () => {
    it("Suma dos números", async() => {
        component.inputNumber("7");
        await nextTick();
        component.inputOperator("add");
        await nextTick();
        component.inputNumber("3");
        await nextTick();
        component.calculate();
        await nextTick();
        expect(getDisplay().value).toBe("10");
    });
    it("Suma de decimales con precisión mayor a 1e-3", async() => {
        component.inputNumber("1.2345");
        await nextTick();
        component.inputOperator("add");
        await nextTick();
        component.inputNumber("2.3456");
        await nextTick();
        component.calculate();
        await nextTick();
        expect(getDisplay().value).toBeCloseTo(3.5801, 4);
    });

    it("Resta dos números", async() => {
        component.inputNumber("9");
        await nextTick();
        component.inputOperator("sub");
        await nextTick();
        component.inputNumber("4");
        await nextTick();
        component.calculate();
        await nextTick();
        expect(getDisplay().value).toBe("5");
    });

    it("Resta de decimales con precisión mayor a 1e-3", async() => {
        component.inputNumber("5.6789");
        await nextTick();
        component.inputOperator("sub");
        await nextTick();
        component.inputNumber("1.2345");
        await nextTick();
        component.calculate();
        await nextTick();
        expect(Number(getDisplay().value)).toBeCloseTo(4.4444, 4);
    });

    it("Multiplica dos números", async() => {
        component.inputNumber("6");
        await nextTick();
        component.inputOperator("mult");
        await nextTick();
        component.inputNumber("5");
        await nextTick();
        component.calculate();
        await nextTick();
        expect(getDisplay().value).toBe("30");
    });

    it("Multiplicación de decimales con precisión mayor a 1e-3", async() => {
        component.inputNumber("2.5");
        await nextTick();
        component.inputOperator("mult");
        await nextTick();
        component.inputNumber("0.4");
        await nextTick();
        component.calculate();
        await nextTick();
        expect(Number(getDisplay().value)).toBeCloseTo(1.0, 4);
    });

    it("Divide dos números", async() => {
        component.inputNumber("8");
        await nextTick();
        component.inputOperator("div");
        await nextTick();
        component.inputNumber("4");
        await nextTick();
        component.calculate();
        await nextTick();
        expect(getDisplay().value).toBe("2");
    });

    it("Divide decimales con precisión mayor a 1e-3", async() => {
        component.inputNumber("1");
        await nextTick();
        component.inputOperator("div");
        await nextTick();
        component.inputNumber("3");
        await nextTick();
        component.calculate();
        await nextTick();
        expect(Number(getDisplay().value)).toBeCloseTo(0.3333, 4);
    });

    it("Muestra un error al dividir entre cero", async() => {
        const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        await nextTick();
        component.inputNumber("8");
        await nextTick();
        component.inputOperator("div");
        await nextTick();
        component.inputNumber("0");
        await nextTick();
        component.calculate();
        await nextTick();
        expect(consoleMock).toHaveBeenCalledWith(
        "¡No se puede dividir entre cero!"
        );
        expect(getDisplay().value).toBe("0");
    });

    it("Calcula potencia", async () => {
        component.inputNumber("2");
        await nextTick();
        component.inputOperator("pow");
        await nextTick();
        component.inputNumber("3");
        await nextTick();
        component.calculate();
        await nextTick();
        expect(getDisplay().value).toBe("8");
    });

    it('Calcula la potencia con precisión mayor a 1e-3', async () => {
        component.inputNumber('9');
        await nextTick();
        component.inputOperator('pow');
        await nextTick();
        component.inputNumber('0.5');
        await nextTick();
        component.calculate();
        await nextTick();
        expect(Number(getDisplay().value)).toBeCloseTo(3, 4);
    });
  });

  describe("Operaciones unarias: con un solo dígito", () => {
    it("Convierte numero positivo a negativo", async() => {
        component.inputNumber("5");
        await nextTick();
        component.inputOperator("negate");
        await nextTick();
        expect(getDisplay().value).toBe("-5");
    });
    it('Conversión de signo funciona para decimales también', async() => {
        component.inputNumber('5.1234');
        await nextTick();
        component.inputOperator('negate');
        await nextTick();
        expect(Number(getDisplay().value)).toBeCloseTo(-5.1234, 4);
    });
    it("Calcula la raíz cuadrada de un número", async() => {
        component.inputNumber("9");
        await nextTick();
        component.inputOperator("sqrt");
        await nextTick();
        expect(parseFloat(getDisplay().value)).toBeCloseTo(3);
    });

    it('Calcula la raíz cuadrada con precisión mayor a 1e-3', async() => {
        component.inputNumber('2');
        await nextTick();
        component.inputOperator('sqrt');
        await nextTick();
        expect(Number(getDisplay().value)).toBeCloseTo(Math.SQRT2, 4);
    });

    it("Muestra un console.error para una raíz cuadrada de número negativo", async() => {
        const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        component.inputNumber("5");
        await nextTick();
        component.inputOperator("negate");
        await nextTick();
        component.inputOperator("sqrt");
        await nextTick();
        expect(consoleMock).toHaveBeenCalledWith(
        "¡No se puede calcular la raíz cuadrada de un número negativo!"
        );
        expect(getDisplay().value).toBe("NaN");
    });
  });

  // it("Limpia la calculadora", () => {
  //   component.inputNumber("7");
  //   component.inputOperator("add");
  //   component.inputNumber("2");
  //   component.clear();
  //   expect(getDisplay()).toBe("0");
  //   expect(component.previousValue).toBeNull();
  //   expect(component.currentOperation).toBeNull();
  // });
});
