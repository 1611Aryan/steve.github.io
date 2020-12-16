const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
import person from './person.js';
export default class block extends person {
    constructor(blockColor = 'green', disFromCenter = 1 / 4) {
        super();
        this.draw = () => {
            c.beginPath();
            c.rect(this.x2, this.y2, this.size, this.size);
            c.fillStyle = this.#blockColor;
            c.fill();
        };
        this.base = () => {
            // if (this.feet === this.y2 && (this.x >= this.x2 || this.x <= this.x2 + this.size)) {
            //     alert('yup')
            //     this.fall = false;
            // }
            console.log(this.feet, this.y2, this.y + this.height * 3 / 2);
            if (this.feet == Math.floor(this.y2)) {
                console.log('yo');
            }
            else {
                this.fall = true;
            }
            //console.log('child', this.fall)
        };
        this.#blockColor = blockColor;
        this.#distanceFromCenter = disFromCenter;
        this.x2 = innerWidth * (1 / 2 + this.#distanceFromCenter);
        this.y2 = innerHeight / 2 + this.height - this.jumpValue * 3 / 4;
        this.size = this.jumpValue * 3 / 4;
    }
    #blockColor;
    #distanceFromCenter;
}
