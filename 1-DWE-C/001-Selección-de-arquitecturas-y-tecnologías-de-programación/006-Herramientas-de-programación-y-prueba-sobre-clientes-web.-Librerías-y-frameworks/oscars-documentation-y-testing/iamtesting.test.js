const {
    sumar,
    restar,
    calcularPrecio
} = require("./operaciones");


test("2 + 3 debe ser 5", function () {

    expect(sumar(2, 3)).toBe(5);

});