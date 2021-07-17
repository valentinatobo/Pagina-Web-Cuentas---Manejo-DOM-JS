class Ingresos extends Dato{
    static contIngresos = 0;

    constructor(tipo, valor){
        super(tipo,valor);
        this._idIngresos = ++ Ingresos.contIngresos;
    }

    get idIngresos(){
        return this.idIngresos;
    }
}