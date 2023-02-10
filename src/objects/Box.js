import BoxCreator from "./BoxCreator";
import generateColors from '../helpers/generateColors'

class Box extends BoxCreator {
    constructor({width, height, last}){
        super({width, height, color:generateColors()});
        this.last = last;

        this.position.y = last.position.y + last.geometry.parameters.height / 2 +this.geometry.parameters.height / 2; //  El numero me indica la posicion Y  entre menos sea el numero se posiciona hacia arriba y si es mayor se posiciona hacia abajo

        //funcion del movimiento box
        this.max_position = 360; //Posicion maxima que alcanza 
        this.is_stopped = false; //Indicamos que si se hace click se detenga 
        this.direction = 1; // en positivo porque va a favor de los ejes
        this.velocity = 4;
        this.actual_axis = (Math.random() >= 0.5) ? 'x' : 'z'; //eje actual
        this.contrary_axis = (this.actual_axis === 'x') ? 'z' : 'x'; // eje contrario si sale X quiero que me devuelva la Z

        this.position[this.actual_axis] -= this.max_position * this.direction;
    }

    update (){
        if(!this.is_stopped){
            this.position[this.actual_axis] += this.direction * this.velocity;
            if(Math.abs(this.position[this.actual_axis]) >= this.max_position){
                this.direction *= -1
            }
        }
    }
}

export default Box; 