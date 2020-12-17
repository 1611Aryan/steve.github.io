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
        this.base = ({ feet, x }) => {
            if ((feet <= this.y2 + this.g / 2 && feet >= this.y2 - this.g / 2) && (x + this.width >= this.x2 && x <= this.x2 + this.size)) {
                this.fall = false;
            }
            else {
                this.fall = true;
            }
            if ((Math.floor(x - 2.5) == Math.floor(this.x2 + this.size) || Math.floor(x + this.width + 2.5) == Math.floor(this.x2))) {
                console.log('Heck');
                this.allowMove = false;
            }
            else {
                this.allowMove = true;
                console.log(Math.floor(x + this.width + 2.5), Math.floor(this.x2));
            }
        };
        this.#blockColor = blockColor;
        this.x2 = innerWidth * (1 / 2 + disFromCenter);
        this.y2 = innerHeight / 2 + this.height - this.jumpValue * 3 / 5;
        this.size = this.jumpValue * 3 / 5;
        this.fall = true;
        this.allowMove = true;
    }
    #blockColor;
    #distanceFromCenter;
}
