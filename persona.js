var General;
(function (General) {
    var Persona = /** @class */ (function () {
        function Persona(id, nombre, apellido) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
        }
        return Persona;
    }());
    General.Persona = Persona;
})(General || (General = {}));
