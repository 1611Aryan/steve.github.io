const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const Pi = Math.PI;
export default class person {
    constructor(torso = 'coral', legs = 'navy', head = '#e5c298') {
        this.torso = () => {
            c.beginPath();
            c.rect(this.#x, this.#y, this.#width, this.#height);
            c.fillStyle = this.#torsoColor;
            c.fill();
            c.closePath();
        };
        this.legs = () => {
            //?Left leg
            c.beginPath();
            c.rect(this.#x, this.#y + this.#height, this.#width / 6, this.#height / 2);
            c.fillStyle = this.#legsColor;
            c.fill();
            c.closePath();
            //?Right leg
            c.beginPath();
            c.rect(this.#x + this.#width * 5 / 6, this.#y + this.#height, this.#width / 6, this.#height / 2);
            c.fillStyle = this.#legsColor;
            c.fill();
            c.closePath();
        };
        this.face = () => {
            c.beginPath();
            c.rect(this.#x, this.#y - this.#height / 2, this.#width, this.#height / 2);
            c.fillStyle = this.#headColor;
            c.fill();
            c.closePath();
        };
        this.iris = (irisColor) => {
            if (this.#rotate) {
                c.beginPath();
                c.arc(this.#x + this.#width * 1 / 6, this.#y - this.#height / 3, 10, 0, Pi * 2, false);
                c.fillStyle = irisColor;
                c.fill();
                c.closePath();
            }
            else {
                c.beginPath();
                c.arc(this.#x + this.#width * 5 / 6, this.#y - this.#height / 3, 10, 0, Pi * 2, false);
                c.fillStyle = irisColor;
                c.fill();
                c.closePath();
            }
        };
        this.pupil = (pupilColor) => {
            if (this.#rotate) {
                c.beginPath();
                c.arc(this.#x + this.#width * 1 / 6 - 2, this.#y - this.#height / 3, 4, 0, Pi * 2, false);
                c.fillStyle = pupilColor;
                c.fill();
                c.closePath();
            }
            else {
                c.beginPath();
                c.arc(this.#x + this.#width * 5 / 6 + 2, this.#y - this.#height / 3, 4, 0, Pi * 2, false);
                c.fillStyle = pupilColor;
                c.fill();
                c.closePath();
            }
        };
        this.eyelid = (eyelidColor) => {
            if (this.#blink) {
                if (this.#rotate) {
                    c.beginPath();
                    c.arc(this.#x + this.#width * 1 / 6, this.#y - this.#height / 3, 10, 0, Pi * 2, false);
                    c.fillStyle = eyelidColor;
                    c.fill();
                    c.closePath();
                }
                else {
                    c.beginPath();
                    c.arc(this.#x + this.#width * 5 / 6, this.#y - this.#height / 3, 10, 0, Pi * 2, false);
                    c.fillStyle = eyelidColor;
                    c.fill();
                    c.closePath();
                }
            }
        };
        this.smile = (smileColor) => {
            if (this.#rotate) {
                c.beginPath();
                c.moveTo(this.#x, this.#y - this.#height / 10);
                c.lineTo(this.#x + this.#width * 1 / 6 + 5, this.#y - this.#height / 10);
                c.lineWidth = 2;
                c.strokeStyle = smileColor;
                c.stroke();
                c.closePath();
            }
            else {
                c.beginPath();
                c.moveTo(this.#x + this.#width * 5 / 6 - 5, this.#y - this.#height / 10);
                c.lineTo(this.#x + this.#width, this.#y - this.#height / 10);
                c.lineWidth = 2;
                c.strokeStyle = smileColor;
                c.stroke();
                c.closePath();
            }
        };
        this.head = (pupilColor = 'black', irisColor = 'white', eyelidColor = '#d4b48d', smileColor = "red") => {
            //?Face
            this.face();
            //?Iris
            this.iris(irisColor);
            //?Pupil
            this.pupil(pupilColor);
            //?ClosedEye
            this.eyelid(eyelidColor);
            //?Smile
            this.smile(smileColor);
        };
        this.road = () => {
            c.beginPath();
            //?y:initial y + height of torso(this.#height) + height of legs(this.#height / 2)
            c.moveTo(0, innerHeight / 2 - this.#height / 2 + this.#height + this.#height / 2);
            c.lineTo(innerWidth, innerHeight / 2 - this.#height / 2 + this.#height + this.#height / 2);
            c.lineWidth = 3;
            c.strokeStyle = 'black';
            c.stroke();
        };
        this.render = () => {
            this.head();
            this.torso();
            this.legs();
            this.road();
        };
        this.gravity = () => {
            if (this.#y === innerHeight / 2 - this.#height / 2) {
                return false;
            }
            else {
                this.#y += this.#g;
            }
            console.log('gravity running');
        };
        this.bound = () => {
            if (this.#x < 0) {
                this.#x = innerWidth - this.#width;
            }
            else if (this.#x > innerWidth - this.#width) {
                this.#x = 0;
            }
        };
        this.move = () => {
            window.addEventListener('keydown', e => {
                if (e.key == 'ArrowLeft') {
                    this.#rotate = true;
                    if (this.#velocity <= this.#displacement) {
                        this.#velocity += 0.05;
                    }
                    else {
                        this.#velocity = this.#displacement;
                    }
                    this.#x -= this.#displacement + this.#velocity;
                    this.bound();
                    e.stopImmediatePropagation();
                }
                if (e.key == 'ArrowRight') {
                    this.#rotate = false;
                    if (this.#velocity <= this.#displacement) {
                        this.#velocity += 0.05;
                    }
                    else {
                        this.#velocity = this.#displacement;
                    }
                    this.#x += this.#displacement + this.#velocity;
                    this.bound();
                    e.stopImmediatePropagation();
                }
                if (e.key == 'ArrowUp') {
                    if (this.#y === innerHeight / 2 - this.#height / 2) {
                        this.#y -= this.#jumpValue;
                    }
                }
            });
            window.addEventListener('keyup', () => {
                this.#velocity = 0;
            });
            this.gravity();
            this.render();
        };
        this.#width = innerWidth / 25;
        this.#height = innerHeight / 8;
        this.#x = innerWidth / 2 - this.#width / 2;
        this.#y = innerHeight / 2 - this.#height / 2;
        this.#torsoColor = torso;
        this.#legsColor = legs;
        this.#headColor = head;
        this.#rotate = false;
        this.#displacement = 5;
        this.#g = 4;
        this.#jumpValue = 100;
        this.#velocity = 0;
        this.#blink = false;
        this.#blinkInterval = 600;
        setInterval(() => {
            this.#blink = !this.#blink;
        }, this.#blinkInterval);
    }
    #x;
    #y;
    #width;
    #height;
    #torsoColor;
    #legsColor;
    #headColor;
    #rotate;
    #velocity;
    #displacement;
    #g;
    #jumpValue;
    #blink;
    #blinkInterval;
}
