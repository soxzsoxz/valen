let scene, camera, renderer, sunflower;
let targetRotationX = 0, targetRotationY = 0;
let currentRotationX = 0, currentRotationY = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xe0f7fa, 1);
    document.body.appendChild(renderer.domElement);
    
    let light = new THREE.PointLight(0xffffff, 1.2, 100);
    light.position.set(5, 5, 5);
    scene.add(light);
    
    let ambientLight = new THREE.AmbientLight(0xffe0b2, 0.7);
    scene.add(ambientLight);
    
    let petalsGeometry = new THREE.ConeGeometry(0.5, 1.1, 6);
    let petalsMaterial = new THREE.MeshStandardMaterial({ color: 0xffc107, transparent: true });
    let petals = new THREE.Group();
    for (let i = 0; i < 12; i++) {
        let petal = new THREE.Mesh(petalsGeometry, petalsMaterial);
        petal.position.set(Math.cos(i * Math.PI / 6) * 0.9, Math.sin(i * Math.PI / 6) * 0.9, 0);
        petal.rotation.z = i * Math.PI / 6;
        petals.add(petal);
    }
    
    let centerGeometry = new THREE.SphereGeometry(0.75, 32, 32);
    let centerMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, transparent: true });
    let center = new THREE.Mesh(centerGeometry, centerMaterial);
    
    let stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 5, 32);
    let stemMaterial = new THREE.MeshStandardMaterial({ color: 0x388E3C, transparent: true });
    let stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = -2.8;
    
    let leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.quadraticCurveTo(0.5, 1, 0, 2);
    leafShape.quadraticCurveTo(-0.5, 1, 0, 0);
    
    let leafGeometry = new THREE.ExtrudeGeometry(leafShape, { depth: 0.1, bevelEnabled: false });
    let leafMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22, transparent: true });
    
    function createLeaf(yOffset, rotationZ) {
        let leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.scale.set(1.2, 1.2, 1);
        leaf.position.set(0, yOffset + 0.5, 0);
        leaf.rotation.z = rotationZ;
        return leaf;
    }
    
    let leaf1 = createLeaf(-1, -Math.PI / 4);
    let leaf2 = createLeaf(-1, Math.PI / 4);
    
    sunflower = new THREE.Group();
    sunflower.add(petals);
    sunflower.add(center);
    sunflower.add(stem);
    stem.add(leaf1);
    stem.add(leaf2);
    
    scene.add(sunflower);
    camera.position.z = 5;
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.clear();
    currentRotationX += (targetRotationX - currentRotationX) * 0.1;
    currentRotationY += (targetRotationY - currentRotationY) * 0.1;
    sunflower.rotation.y = currentRotationY;
    sunflower.rotation.x = currentRotationX;
    renderer.render(scene, camera);
}

document.addEventListener('mousemove', (event) => {
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = -(event.clientY / window.innerHeight) * 2 + 1;
    targetRotationY = x * Math.PI * 0.5;
    targetRotationX = y * Math.PI * 0.25;
});

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// เอฟเฟกต์หัวใจเมื่อคลิก
document.addEventListener('click', (event) => {
    const heart = document.createElement('div');
    heart.innerHTML = '🤍';
    heart.classList.add('heart');
    document.body.appendChild(heart);

    let size = Math.random() * 0.5 + 1; 
    heart.style.transform = `scale(${size})`;
    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;

    setTimeout(() => {
        heart.remove();
    }, 2000);
});

init();
