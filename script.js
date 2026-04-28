// Inisialisasi Workspace
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    scrollbars: true, trashcan: true,
    zoom: { controls: true, wheel: true }
});

// Setup Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
// Alpha: true agar background canvas transparan mengikuti CSS container
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const visualDiv = document.getElementById('visualization');

// Lampu
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x606060));
camera.position.z = 2.5;

let currentMesh;

// Fungsi untuk update geometri
function updateMesh() {
    // Ambil kode dari Blockly (format string JSON)
    let code = Blockly.JavaScript.workspaceToCode(workspace);
    let resultType;

    try {
        // Menghapus titik koma di akhir dan mengevaluasi string
        resultType = JSON.parse(code.trim().replace(/;$/, ''));
    } catch(e) {
        // Default jika error atau blok belum lengkap
        resultType = 'CUBE';
    }

    if (currentMesh) scene.remove(currentMesh);
    
    let geometry;
    const material = new THREE.MeshPhongMaterial({ color: 0x3498db, flatShading: true });

    // Logika pemilihan Geometri presisi
    if (resultType === 'TRUNCATED_CUBE') {
        geometry = new THREE.IcosahedronGeometry(1, 0); // Simulasi visual Archimedean
        material.color.setHex(0xe67e22); // Orange
    } else if (resultType === 'RECTIFIED_CUBE') {
        geometry = new THREE.OctahedronGeometry(1, 0); // Presisi secara geometri
        material.color.setHex(0xf1c40f); // Kuning
    } else if (resultType === 'TETRA') {
        geometry = new THREE.TetrahedronGeometry(1, 0);
    } else if (resultType === 'OCTA') {
        geometry = new THREE.OctahedronGeometry(1, 0);
    } else {
        // Default: Kubus
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    currentMesh = new THREE.Mesh(geometry, material);
    
    // Outline Hitam agar sisi terlihat jelas saat DIAM
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
    currentMesh.add(line);

    // Set posisi miring DIAM agar perspektif terlihat
    currentMesh.rotation.set(0.6, 0.7, 0);
    scene.add(currentMesh);
}

// Tombol Trigger
document.getElementById('runBtn').addEventListener('click', updateMesh);

// Loop Render
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

// Resize Handler yang presisi
function onWindowResize() {
    const width = visualDiv.offsetWidth;
    const height = visualDiv.offsetHeight;
    if (width === 0 || height === 0) return; // Cegah error jika container belum siap

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    Blockly.svgResize(workspace);
}

window.addEventListener('resize', onWindowResize);

// Inisialisasi awal (diberi jeda agar CSS load sepenuhnya)
setTimeout(() => {
    onWindowResize(); // Set ukuran renderer pertama kali
    visualDiv.appendChild(renderer.domElement); // Masukkan canvas ke DOM
    updateMesh(); // Gambar bangun pertama
}, 100);
