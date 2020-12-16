const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    document.location.reload();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
import character from "./person.js";
let stop = false;
const Person = new character();
const animate = () => {
    const start = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    Person.move();
    if (stop) {
        cancelAnimationFrame(start);
    }
};
animate();
