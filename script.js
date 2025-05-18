const n = 19;
const rots = [
    { ry: 270, a: 0.5 },
    { ry: 0,   a: 0.85 },
    { ry: 90,  a: 0.4 },
    { ry: 180, a: 0.0 }
];

gsap.set(".face", {
    z: 200,
    rotateY: i => rots[i].ry,
    transformOrigin: "50% 50% -201px"
});

for (let i = 0; i < n; i++) {
    let die = document.querySelector('.die');
    let cube = die.querySelector('.cube');
    
    if (i > 0) {    
        let clone = document.querySelector('.die').cloneNode(true);
        document.querySelector('.tray').append(clone);
        cube = clone.querySelector('.cube');
    }
    
    gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power3.inOut', duration: 1 } })
        .fromTo(cube, {
            rotateY: -90
        }, {
            rotateY: 90,
            ease: 'power1.inOut',
            duration: 2
        })
        .fromTo(cube.querySelectorAll('.face'), {
            color: (j) => `hsl(${210}, 100%, ${70 * [rots[3].a, rots[0].a, rots[1].a][j]}%)` // Light blue
        }, {
            color: (j) => `hsl(${210}, 100%, ${70 * [rots[0].a, rots[1].a, rots[2].a][j]}%)`
        }, 0)
        .to(cube.querySelectorAll('.face'), {
            color: (j) => `hsl(${250}, 100%, ${50 + 20 * [rots[1].a, rots[2].a, rots[3].a][j]}%)` // Light purple
        }, 1)
        .progress(i / n);
}

gsap.timeline()
    .from('.tray', { yPercent: -3, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: -1 }, 0)
    .fromTo('.tray', { rotate: -15 }, { rotate: 15, duration: 4, ease: 'power1.inOut', yoyo: true, repeat: -1 }, 0)
    .from('.die', { duration: 0.01, opacity: 0, stagger: { each: -0.05, ease: 'power1.in' } }, 0)
    .to('.tray', { scale: 1.2, duration: 2, ease: 'power3.inOut', yoyo: true, repeat: -1 }, 0);

window.onload = window.onresize = () => {
    const h = n * 56;
    gsap.set('.tray', { height: h });
    gsap.set('.pov', { scale: innerHeight / h });
};

// Open picture container
document.getElementById('open-picture').addEventListener('click', () => {
    const pictureContainer = document.getElementById('picture-container');
    pictureContainer.classList.toggle('hidden');
});

// Close picture container
document.getElementById('close-picture').addEventListener('click', () => {
    const pictureContainer = document.getElementById('picture-container');
    pictureContainer.classList.add('hidden');
});
