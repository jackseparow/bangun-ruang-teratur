const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    scrollbars: true, trashcan: true
});

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

function updateMesh(rawCode) {
    if (currentMesh) scene.remove(currentMesh);
    
    let geometry;
    const material = new THREE.MeshPhongMaterial({ color: 0x3498db, flatShading: true });

    // Sederhanakan string untuk deteksi logika
    if (rawCode.includes('TRUNCATED')) {
        geometry = new THREE.IcosahedronGeometry(1, 0); // Visualisasi hasil pancung
        material.color.setHex(0xe67e22);
    } else if (rawCode.includes('RECTIFIED')) {
        geometry = new THREE.OctahedronGeometry(1, 0);
        material.color.setHex(0xf1c40f);
    } else if (rawCode.includes('CUBE')) {
        geometry = new THREE.BoxGeometry(1, 1, 1);
    } else if (rawCode.includes('TETRA')) {
        geometry = new THREE.TetrahedronGeometry(1, 0);
    } else {
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    currentMesh = new THREE.Mesh(geometry, material);
    
    // Outline hitam agar sisi-sisinya terlihat jelas saat diam
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
    currentMesh.add(line);

    // Atur sedikit kemiringan awal agar sudutnya terlihat (tapi tidak mutar)
    currentMesh.rotation.set(0.5, 0.8, 0);
    scene.add(currentMesh);
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

workspace.addChangeListener(() => {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    updateMesh(code);
});

window.addEventListener('resize', () => {
    renderer.setSize(visualDiv.offsetWidth, visualDiv.offsetHeight);
    camera.aspect = visualDiv.offsetWidth / visualDiv.offsetHeight;
    camera.updateProjectionMatrix();
});

updateMesh('CUBE');
