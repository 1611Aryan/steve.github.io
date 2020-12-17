import character from "./Assets/person.js";
import background from './Assets/background.js';
import block from './Assets/block.js';
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    document.location.reload();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
let stop = false;
const noOfBlocks = 3;
const Person = new character();
const Road = new background();
const Blocks = [];
let j = 1 / 4;
for (let i = 0; i < noOfBlocks; i++) {
    let Block = new block('green', j);
    Blocks.push(Block);
    j -= 1 / 2;
}
let environmentVariables = {
    fall: true,
    move: true
};
// const updateEnvVar = (fall: boolean, move: boolean) => {
//     environmentVariables.fall = fall;
//     environmentVariables.move = move;
// }
const environment = () => {
    Road.render();
    for (let i = 0; i < noOfBlocks; i++) {
        Blocks[i].base(Person);
        if (!Blocks[i].allowMove) {
            environmentVariables.move = false;
            break;
        }
        else {
            environmentVariables.move = true;
        }
    }
    Person.move(environmentVariables);
    for (let i = 0; i < noOfBlocks; i++) {
        Blocks[i].base(Person);
        if (!Blocks[i].fall) {
            environmentVariables.fall = false;
            break;
        }
        else {
            environmentVariables.fall = true;
        }
    }
    for (let i = 0; i < noOfBlocks; i++) {
        Blocks[i].draw();
    }
    Person.gravity(environmentVariables);
};
const animate = () => {
    const start = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    environment();
    if (stop) {
        cancelAnimationFrame(start);
    }
};
animate();
