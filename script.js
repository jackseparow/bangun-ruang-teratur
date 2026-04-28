// 1. Inisialisasi Blockly
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    scrollbars: true,
    trashcan: true
});

// 2. Inisialisasi Three.js (Visualisasi)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const visualDiv = document.getElementById('visualization');

renderer.setSize(visualDiv.offsetWidth, visualDiv.offsetHeight);
visualDiv.appendChild(renderer.domElement);

// Pencahayaan
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

camera.position.z = 3;

let currentMesh;

function updateMesh(type) {
    if (currentMesh) scene.remove(currentMesh);
    
    let geometry;
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x3498db, 
        flatShading: true,
        shininess: 100
    });

    // Logika pemilihan geometri berdasarkan kode dari Blockly
    switch(type) {
        case 'CUBE':
            geometry = new THREE.BoxGeometry(1, 1, 1);
            break;
        case 'TRUNCATED_CUBE':
            // Simulasi: Menggunakan silinder bersisi banyak atau pre-defined geometry
            geometry = new THREE.IcosahedronGeometry(1, 0); 
            material.color.setHex(0xe74c3c);
            break;
        case 'RECTIFIED_CUBE':
            geometry = new THREE.OctahedronGeometry(1, 0);
            material.color.setHex(0xf1c40f);
            break;
        case 'TETRA':
            geometry = new THREE.TetrahedronGeometry(1, 0);
            break;
        default:
            geometry = new THREE.SphereGeometry(0.7, 32, 32);
    }

    currentMesh = new THREE.Mesh(geometry, material);
    
    // Tambahkan Outline agar bentuknya jelas
    const wireframe = new THREE.WireframeGeometry(geometry);
    const line = new THREE.LineSegments(wireframe);
    line.material.color.setHex(0x000000);
    line.material.transparent = true;
    line.material.opacity = 0.3;
    currentMesh.add(line);

    scene.add(currentMesh);
}

// Loop Animasi
function animate() {
    requestAnimationFrame(animate);
    if (currentMesh) {
        currentMesh.rotation.x += 0.01;
        currentMesh.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}
animate();

// Deteksi Perubahan Blockly
workspace.addChangeListener(() => {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    const cleanCode = code.replace(/['";()]/g, '').trim(); // Bersihkan string
    if (cleanCode) updateMesh(cleanCode);
});

// Resize Handler
window.addEventListener('resize', () => {
    const width = visualDiv.offsetWidth;
    const height = visualDiv.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    Blockly.svgResize(workspace);
});

// Load awal
updateMesh('CUBE');
