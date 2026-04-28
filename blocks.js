// Konfigurasi Blok Bangun
Blockly.Blocks['base_shape'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Bangun:")
        .appendField(new Blockly.FieldDropdown([["Kubus","CUBE"], ["Tetrahedron","TETRA"], ["Oktahedron","OCTA"]]), "SHAPE");
    this.setOutput(true, "Shape");
    this.setColour(230);
  }
};

// Blok Pancung (Truncate)
Blockly.Blocks['truncate_shape'] = {
  init: function() {
    this.appendValueInput("INPUT").setCheck("Shape").appendField("Pancung (Truncate)");
    this.appendDummyInput().appendField("Kedalaman:").appendField(new Blockly.FieldNumber(0.3, 0.1, 0.5), "DEPTH");
    this.setOutput(true, "Shape");
    this.setColour(290);
  }
};

// Blok Rectification
Blockly.Blocks['rectify_shape'] = {
  init: function() {
    this.appendValueInput("INPUT").setCheck("Shape").appendField("Rectification");
    this.setOutput(true, "Shape");
    this.setColour(290);
  }
};

// Generator JavaScript menggunakan format JSON aman
Blockly.JavaScript = new Blockly.Generator('JavaScript');
Blockly.JavaScript.ORDER_ATOMIC = 0;

Blockly.JavaScript['base_shape'] = function(block) {
  var code = block.getFieldValue('SHAPE');
  // Mengembalikan string tipe dasar
  return ["\"" + code + "\"", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['truncate_shape'] = function(block) {
  var input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC) || "\"NONE\"";
  // Menghapus tanda kutip ganda ekstra dari input nested
  input = input.replace(/^\"|\"$/g, '');
  return ["\"TRUNCATED_" + input + "\"", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['rectify_shape'] = function(block) {
  var input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC) || "\"NONE\"";
  // Menghapus tanda kutip ganda ekstra dari input nested
  input = input.replace(/^\"|\"$/g, '');
  return ["\"RECTIFIED_" + input + "\"", Blockly.JavaScript.ORDER_ATOMIC];
};
