class Egresos extends Dato{
    static contEgreso=0;
    
    constructor(tipo, valor){
        super(tipo,valor);
        this._idEgresos = ++ Egresos.contEgreso;
    }

    get idEgresos(){
        return this._idEgresos;
    }
}