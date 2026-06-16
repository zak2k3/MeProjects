// ── LOADER CANVAS — digital creatures ──
const canvas = document.getElementById('loaderCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const creatures = [];
const NUM = 14;

class Creature {
  constructor() { this.reset(true); }

  reset(init) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height : canvas.height + 20;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = -(0.4 + Math.random() * 0.8);
    this.size = 8 + Math.random() * 18;
    this.alpha = 0.1 + Math.random() * 0.35;
    this.type = Math.floor(Math.random() * 3);
    this.angle = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.02;
    this.pulse = Math.random() * Math.PI * 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.spin;
    this.pulse += 0.04;
    const s = 1 + 0.08 * Math.sin(this.pulse);
    this.displaySize = this.size * s;
    if (this.y < -40) this.reset(false);
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.alpha;
    const c = this.displaySize;
    ctx.strokeStyle = '#f5c842';
    ctx.fillStyle = 'rgba(245,200,66,0.08)';
    ctx.lineWidth = 1;

    if (this.type === 0) {
      ctx.beginPath();
      ctx.ellipse(0, c * 0.3, c * 0.7, c * 0.55, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, -c * 0.15, c * 0.45, c * 0.42, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-c * 0.35, -c * 0.35);
      ctx.lineTo(-c * 0.55, -c * 0.7);
      ctx.lineTo(-c * 0.1, -c * 0.45);
      ctx.closePath(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(c * 0.35, -c * 0.35);
      ctx.lineTo(c * 0.55, -c * 0.7);
      ctx.lineTo(c * 0.1, -c * 0.45);
      ctx.closePath(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(c * 0.65, c * 0.5);
      ctx.bezierCurveTo(c * 1.2, c * 0.5, c * 1.3, -c * 0.2, c * 0.8, -c * 0.3);
      ctx.stroke();
    } else if (this.type === 1) {
      ctx.beginPath();
      ctx.ellipse(0, c * 0.28, c * 0.62, c * 0.5, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, -c * 0.18, c * 0.42, c * 0.38, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-c * 0.3, -c * 0.38);
      ctx.lineTo(-c * 0.48, -c * 0.78);
      ctx.lineTo(-c * 0.08, -c * 0.42);
      ctx.closePath(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(c * 0.3, -c * 0.38);
      ctx.lineTo(c * 0.48, -c * 0.78);
      ctx.lineTo(c * 0.08, -c * 0.42);
      ctx.closePath(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(c * 0.62, c * 0.4);
      ctx.bezierCurveTo(c * 1.3, c * 0.6, c * 1.4, c * 0.0, c * 0.9, -c * 0.1);
      ctx.lineWidth = 2.5;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.ellipse(0, 0, c * 0.55, c * 0.5, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, c * 0.25, c * 0.28, c * 0.2, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-c * 0.4, -c * 0.3);
      ctx.lineTo(-c * 0.6, -c * 0.75);
      ctx.lineTo(-c * 0.12, -c * 0.4);
      ctx.closePath(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(c * 0.4, -c * 0.3);
      ctx.lineTo(c * 0.6, -c * 0.75);
      ctx.lineTo(c * 0.12, -c * 0.4);
      ctx.closePath(); ctx.stroke();
    }

    ctx.restore();
  }
}

for (let i = 0; i < NUM; i++) creatures.push(new Creature());

let loaderDone = false;
let frame = 0;

function loaderLoop() {
  if (loaderDone) return;
  frame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.strokeStyle = 'rgba(245,200,66,0.04)';
  ctx.lineWidth = 1;
  const gridSize = 60;
  for (let gx = 0; gx < canvas.width; gx += gridSize) {
    ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, canvas.height); ctx.stroke();
  }
  for (let gy = 0; gy < canvas.height; gy += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(canvas.width, gy); ctx.stroke();
  }
  ctx.restore();

  creatures.forEach(c => { c.update(); c.draw(); });
  requestAnimationFrame(loaderLoop);
}

loaderLoop();

// ── LOADER HIDE — real load + minimum 2.2s ──
let loadFired = false;
let minTimeFired = false;

function tryHideLoader() {
  if (loadFired && minTimeFired) {
    loaderDone = true;
    document.getElementById('loader').classList.add('done');
  }
}

window.addEventListener('load', () => {
  loadFired = true;
  tryHideLoader();
});

setTimeout(() => {
  minTimeFired = true;
  tryHideLoader();
}, 2200);

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
  }, 80);
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const idx = entry.target.dataset.index || 0;
      setTimeout(() => entry.target.classList.add('visible'), idx * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.project-card').forEach(card => observer.observe(card));

// ── CARD TILT ──
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(600px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg) translateY(-2px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
