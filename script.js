const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    scrollbars: true,
    trashcan: true,
    zoom: { controls: true, wheel: true }
});

// Listener untuk mendeteksi perubahan blok
workspace.addChangeListener(() => {
    const log = document.getElementById('log');
    // Di sini kamu bisa menambahkan logika JavaScript 
    // untuk mengubah data tersebut menjadi model 3D (seperti Three.js)
    log.innerHTML = "Logika diproses... Menghitung titik vertex baru.";
});

// Supaya area kerja menyesuaikan ukuran layar saat browser di-resize
window.addEventListener('resize', () => {
    Blockly.svgResize(workspace);
}, false);
