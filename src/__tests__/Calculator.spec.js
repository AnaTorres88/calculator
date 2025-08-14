
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest'
// Se importa el componente cuandos e acreado
import Calculator from '@/components/Calculator.vue'

// metodo describe del framework de tests para englobar los tests del componente
describe("Calculator", () => {
    let wrapper; // wrapper del componente, instancia retornada por mount
    let component = wrapper?.vm; // propiedad que nos da acceso a los métodos del componente
    beforeEach(() => {
        wrapper = mount(Calculator);
    });

  // const getDisplay = () => traer el resultado o output

  // Primera prueba renderizar el componente
    it("Renderiza el componente", () => {
        const paragraph = "Efectua operaciones básicas como suma, resta, división, multiplicación, raíz cuadrada y potencia";
        expect(wrapper.find("p").text()).toBe(paragraph);
    });

  // TODO: Crear métodos y testearlos
  // Mostrar números

  // it("Empieza con 0", () => {
  //   expect(getDisplay()).toBe("0");
  // });

  // it("Muestra un número", () => {
  //   vm.inputNumber("7");
  //   expect(getDisplay()).toBe("7");
  // });

  // it("Añade más números", () => {
  //   vm.inputNumber("7");
  //   vm.inputNumber("8");
  //   expect(getDisplay()).toBe("78");
  // });

  // it("Muestra números decimales", () => {
  //   vm.inputNumber("1");
  //   vm.inputDecimal();
  //   vm.inputNumber("5");
  //   expect(getDisplay()).toBe("1.5");
  // });

  // it("Previene mostrar numeros decimales dos veces", () => {
  //   vm.inputNumber("1");
  //   vm.inputDecimal();
  //   vm.inputDecimal();
  //   expect(getDisplay()).toBe("1.");
  // });

  // // Operaciones con dos dígitos
  // describe("Operaciones binarias: Conjunto de operaciones con dos números", () => {
  //   it("Suma dos números", () => {
  //     vm.inputNumber("7");
  //     vm.inputOperator("add");
  //     vm.inputNumber("3");
  //     vm.calculate();
  //     expect(getDisplay()).toBe("10");
  //   });
  //   it('Suma de decimales con precisión mayor a 1e-3', () => {
  //       vm.inputNumber('1.2345');
  //       vm.inputOperator('add');
  //       vm.inputNumber('2.3456');
  //       vm.calculate();
  //       expect(displayValue()).toBeCloseTo(3.5801, 4)
  //   });


  //   it("Resta dos números", () => {
  //     vm.inputNumber("9");
  //     vm.inputOperator("sub");
  //     vm.inputNumber("4");
  //     vm.calculate();
  //     expect(getDisplay()).toBe("5");
  //   });

  //   it('Resta de decimales con precisión mayor a 1e-3', () => {
  //       vm.inputNumber('5.6789')
  //       vm.inputOperator('subtract')
  //       vm.inputNumber('1.2345')
  //       vm.calculate()
  //       expect(displayValue()).toBeCloseTo(4.4444, 4)
  //   })

  //   it("Multiplica dos números", () => {
  //     vm.inputNumber("6");
  //     vm.inputOperator("mult");
  //     vm.inputNumber("5");
  //     vm.calculate();
  //     expect(getDisplay()).toBe("30");
  //   });

  //   it('Multiplicación de decimales con precisión mayor a 1e-3', () => {
  //       vm.inputNumber('2.5')
  //       vm.inputOperator('multiply')
  //       vm.inputNumber('0.4')
  //       vm.calculate()
  //       expect(displayValue()).toBeCloseTo(1.0, 4)
  //   });

  //   it("Divide dos números", () => {
  //     vm.inputNumber("8");
  //     vm.inputOperator("div");
  //     vm.inputNumber("4");
  //     vm.calculate();
  //     expect(getDisplay()).toBe("2");
  //   });

  //   it('Divide decimales con precisión mayor a 1e-3', () => {
  //       vm.inputNumber('1')
  //       vm.inputOperator('divide')
  //       vm.inputNumber('3')
  //       vm.calculate()
  //       expect(displayValue()).toBeCloseTo(0.3333, 4)
  //   });

  //   it("Muestra un error al dividir por cero", () => {
  //     console.error = jest.fn();
  //     vm.inputNumber("8");
  //     vm.inputOperator("div");
  //     vm.inputNumber("0");
  //     vm.calculate();
  //     expect(console.error).toHaveBeenCalledWith(
  //       "¡No se puede dividir por cero!"
  //     );
  //     expect(getDisplay()).toBe("0");
  //   });

  //   it("Calcula potencia", () => {
  //     vm.inputNumber("2");
  //     vm.inputOperator("pow");
  //     vm.inputNumber("3");
  //     vm.calculate();
  //     expect(getDisplay()).toBe("8");
  //   });
  //   it('Calcula la potencia con precisión mayor a 1e-3', () => {
  //       vm.inputNumber('9')
  //       vm.inputOperator('pow')
  //       vm.inputNumber('0.5')
  //       vm.calculate()
  //       expect(displayValue()).toBeCloseTo(3, 4)
  //   })
  // });

  // describe("Operaciones unarias: con un solo dígito", () => {
  //   it("Convierte numero positivo a negativo", () => {
  //     vm.inputNumber("5");
  //     vm.inputOperator("negate");
  //     expect(getDisplay()).toBe("-5");
  //   });
  //   it('Conversión de signo funciona para decimales también', () => {
  //       vm.inputNumber('5.1234')
  //       vm.inputOperator('+/-')
  //       expect(displayValue()).toBeCloseTo(-5.1234, 4)
  //   });
  //   it("Calcula la raíz cuadrada de un número", () => {
  //     vm.inputNumber("9");
  //     vm.inputOperator("sqrt");
  //     expect(parseFloat(getDisplay())).toBeCloseTo(3);
  //   });

  //   it('Calcula la raíz cuadrada con precisión mayor a 1e-3', () => {
  //       vm.inputNumber('2')
  //       vm.inputOperator('sqrt')
  //       expect(displayValue()).toBeCloseTo(Math.SQRT2, 4)
  //   });

  //   it("Muestra un console.error para una raíz cuadrada de número negativo", () => {
  //     console.error = jest.fn();
  //     vm.inputNumber("5");
  //     vm.inputOperator("negate");
  //     vm.inputOperator("sqrt");
  //     expect(console.error).toHaveBeenCalledWith(
  //       "¡No se puede calcular la raíz cuadrada de un número! negativo"
  //     );
  //     expect(getDisplay()).toBe("NaN");
  //   });
  // });

  // it("Limpia la calculadora", () => {
  //   vm.inputNumber("7");
  //   vm.inputOperator("add");
  //   vm.inputNumber("2");
  //   vm.clear();
  //   expect(getDisplay()).toBe("0");
  //   expect(vm.previousValue).toBeNull();
  //   expect(vm.currentOperation).toBeNull();
  // });
});
