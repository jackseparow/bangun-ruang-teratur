// Inisialisasi Workspace
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    scrollbars: true, trashcan: true,
    zoom: { controls: true, wheel: true }
});

// Setup Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const visualDiv = document.getElementById('visualization');

renderer.setSize(visualDiv.offsetWidth, visualDiv.offsetHeight);
visualDiv.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x606060));
camera.position.z = 2.5;

let currentMesh;

function updateMesh() {
    // Generate kode dari workspace
    const code = javascript.javascriptGenerator.workspaceToCode(workspace);
    let resultType = 'CUBE';

    try {
        // Karena kode kita menghasilkan string seperti 'TRUNCATED_' + 'CUBE'
        // Kita gunakan eval untuk mendapatkan hasil akhirnya
        resultType = eval(code);
    } catch(e) {
        resultType = 'CUBE';
    }

    if (currentMesh) scene.remove(currentMesh);
    
    let geometry;
    const material = new THREE.MeshPhongMaterial({ color: 0x3498db, flatShading: true });

    // Logika Pemilihan Visual Bangun
    if (resultType && resultType.includes('TRUNCATED_CUBE')) {
        geometry = new THREE.IcosahedronGeometry(1, 0); // Simulasi Archimedean
        material.color.setHex(0xe67e22);
    } else if (resultType && resultType.includes('RECTIFIED_CUBE')) {
        geometry = new THREE.OctahedronGeometry(1, 0);
        material.color.setHex(0xf1c40f);
    } else if (resultType && resultType.includes('TETRA')) {
        geometry = new THREE.TetrahedronGeometry(1, 0);
    } else if (resultType && resultType.includes('OCTA')) {
        geometry = new THREE.OctahedronGeometry(1, 0);
    } else {
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    currentMesh = new THREE.Mesh(geometry, material);
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
    currentMesh.add(line);

    // Posisi statis (Diam)
    currentMesh.rotation.set(0.6, 0.7, 0);
    scene.add(currentMesh);
}

// Tombol Event
document.getElementById('runBtn').addEventListener('click', updateMesh);

// Render Loop
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

// Resize Handler
window.addEventListener('resize', () => {
    const width = visualDiv.offsetWidth;
    const height = visualDiv.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    Blockly.svgResize(workspace);
});

// Jalankan update pertama kali agar ada bangun ruang yang muncul
setTimeout(updateMesh, 200);
