const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    document.location.reload();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
import character from "./Assets/person.js";
import background from './Assets/background.js';
import block from './Assets/block.js';
let stop = false;
const Person = new character();
const Road = new background();
const Block = new block();
const animate = () => {
    const start = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    Person.move();
    Road.render();
    Block.draw();
    Block.base();
    if (stop) {
        cancelAnimationFrame(start);
    }
};
animate();
