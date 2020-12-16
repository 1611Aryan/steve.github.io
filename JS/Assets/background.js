const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
import person from './person.js';
export default class background extends person {
    constructor(roadColor = '#2c2c2c') {
        super();
        this.#road = () => {
            c.beginPath();
            //?y:initial y + height of torso(this.#height) + height of legs(this.#height / 2)
            c.rect(0, innerHeight / 2 + this.height, innerWidth, innerHeight / 2 - this.height);
            c.fillStyle = this.#roadColor;
            c.fill();
            c.closePath();
        };
        this.render = () => {
            this.#road();
        };
        this.#roadColor = roadColor;
    }
    #roadColor;
    #road;
}
