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
scene.add(new THREE.AmbientLight(0x404040));
camera.position.z = 2.5;

let currentMesh;

function updateMesh() {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    let resultType;
    try {
        resultType = eval(code); // Mengevaluasi string nested menjadi satu perintah
    } catch(e) {
        resultType = 'CUBE';
    }

    if (currentMesh) scene.remove(currentMesh);
    
    let geometry;
    const material = new THREE.MeshPhongMaterial({ color: 0x3498db, flatShading: true });

    // Logika Pemilihan Geometri Berdasarkan Hasil Blok
    if (resultType.includes('TRUNCATED_CUBE')) {
        geometry = new THREE.IcosahedronGeometry(1, 0); // Visualisasi Archimedean (Truncated)
        material.color.setHex(0xe67e22);
    } else if (resultType.includes('RECTIFIED_CUBE')) {
        geometry = new THREE.OctahedronGeometry(1, 0); // Visualisasi Rectified
        material.color.setHex(0xf1c40f);
    } else if (resultType.includes('TETRA')) {
        geometry = new THREE.TetrahedronGeometry(1, 0);
    } else if (resultType.includes('OCTA')) {
        geometry = new THREE.OctahedronGeometry(1, 0);
    } else {
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    currentMesh = new THREE.Mesh(geometry, material);
    
    // Outline Hitam (Wajib agar bangun ruang yang diam terlihat jelas sisinya)
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
    currentMesh.add(line);

    // Set posisi miring agar perspektif 3D terlihat jelas, tapi DIAM
    currentMesh.rotation.set(0.6, 0.7, 0);
    scene.add(currentMesh);
}

// Tombol Trigger
document.getElementById('runBtn').addEventListener('click', updateMesh);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

// Resize Handler
window.addEventListener('resize', () => {
    renderer.setSize(visualDiv.offsetWidth, visualDiv.offsetHeight);
    camera.aspect = visualDiv.offsetWidth / visualDiv.offsetHeight;
    camera.updateProjectionMatrix();
    Blockly.svgResize(workspace);
});

// Tampilan awal saat baru buka app
updateMesh();
