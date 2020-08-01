namespace General
{
    export class Cliente extends Persona
    {
        public edad:number;
        public sexo:eTipo;
        

        constructor(id:number,nombre:string,apellido:string,edad:number,sexo:eTipo)
        {
            super(id,nombre,apellido);
            this.edad=edad;
            this.sexo=sexo;
        }

        public getSexo():eTipo
    {
        return this.sexo;
    }
    
        public setSexo(sexo:eTipo):void
        {
            this.sexo = sexo;
        }
    }

    
}