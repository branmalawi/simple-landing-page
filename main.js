const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
const par = document.querySelector("p");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let spot = [];
let hue = 0;

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("mousemove", event => {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 5; i++) {
        spot.push(new Particle())
    }
    console.log(spot)
})
canvas.addEventListener("touchmove", event => {
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
    for (let i = 0; i < 5; i++) {
        spot.push(new Particle())
    }
    console.log(event.touches[0].clientX)
})

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${hue}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size -= 0.04;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticle() {
    for (let i = 0; i < spot.length; i++) {
        spot[i].update();
        spot[i].draw();
        for (let j = i; j < spot.length; j++) {
            const dx = spot[i].x - spot[j].x;
            const dy = spot[i].y - spot[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 90) {
                ctx.beginPath();
                ctx.strokeStyle = spot[i].color;
                ctx.lineWidth = spot[i].size / 10;
                ctx.moveTo(spot[i].x, spot[i].y);
                ctx.lineTo(spot[j].x, spot[j].y);
                ctx.stroke();
            }
        }
        if (spot[i].size <= 0.3) {
            spot.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue++;
    par.style.color= `hsl(${hue}, 40%, 60%)`
    requestAnimationFrame(animate)
}

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

})

window.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;
})
animate()


