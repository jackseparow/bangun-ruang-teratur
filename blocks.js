// 1. Blok Bangun Dasar (Output: Shape)
Blockly.Blocks['base_shape'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Bangun:")
        .appendField(new Blockly.FieldDropdown([["Kubus","CUBE"], ["Tetrahedron","TETRA"], ["Oktahedron","OCTA"]]), "SHAPE");
    this.setOutput(true, "Shape");
    this.setColour(230);
  }
};

// 2. Blok Truncate (Nested + Input Kedalaman)
Blockly.Blocks['truncate_shape'] = {
  init: function() {
    this.appendValueInput("INPUT")
        .setCheck("Shape")
        .appendField("Pancung (Truncate)");
    this.appendDummyInput()
        .appendField("Kedalaman:")
        .appendField(new Blockly.FieldNumber(0.3, 0, 0.5), "DEPTH");
    this.setOutput(true, "Shape");
    this.setColour(290);
  }
};

// 3. Blok Rectify (Nested)
Blockly.Blocks['rectify_shape'] = {
  init: function() {
    this.appendValueInput("INPUT")
        .setCheck("Shape")
        .appendField("Rectify");
    this.setOutput(true, "Shape");
    this.setColour(290);
  }
};

// Generator JavaScript
Blockly.JavaScript = new Blockly.Generator('JavaScript');
Blockly.JavaScript['base_shape'] = function(block) {
  return [block.getFieldValue('SHAPE'), 0];
};
Blockly.JavaScript['truncate_shape'] = function(block) {
  var input = Blockly.JavaScript.valueToCode(block, 'INPUT', 0) || 'NONE';
  var depth = block.getFieldValue('DEPTH');
  return ["TRUNCATED_" + input + "_DEPTH_" + depth, 0];
};
Blockly.JavaScript['rectify_shape'] = function(block) {
  var input = Blockly.JavaScript.valueToCode(block, 'INPUT', 0) || 'NONE';
  return ["RECTIFIED_" + input, 0];
};
