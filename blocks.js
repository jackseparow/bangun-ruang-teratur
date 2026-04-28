Blockly.Blocks['base_shape'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Bangun:")
        .appendField(new Blockly.FieldDropdown([["Kubus","CUBE"], ["Tetrahedron","TETRA"], ["Oktahedron","OCTA"]]), "SHAPE");
    this.setOutput(true, "Shape");
    this.setColour(230);
  }
};

Blockly.Blocks['truncate_shape'] = {
  init: function() {
    this.appendValueInput("INPUT").setCheck("Shape").appendField("Pancung (Truncate)");
    this.appendDummyInput().appendField("Kedalaman:").appendField(new Blockly.FieldNumber(0.3, 0, 0.5), "DEPTH");
    this.setOutput(true, "Shape");
    this.setColour(290);
  }
};

Blockly.Blocks['rectify_shape'] = {
  init: function() {
    this.appendValueInput("INPUT").setCheck("Shape").appendField("Rectification");
    this.setOutput(true, "Shape");
    this.setColour(290);
  }
};

// Generator Logika
Blockly.JavaScript = new Blockly.Generator('JavaScript');
Blockly.JavaScript['base_shape'] = function(block) {
  return ["'" + block.getFieldValue('SHAPE') + "'", 0];
};

Blockly.JavaScript['truncate_shape'] = function(block) {
  var input = Blockly.JavaScript.valueToCode(block, 'INPUT', 0) || "'NONE'";
  return ["'TRUNCATED_' + " + input, 0];
};

Blockly.JavaScript['rectify_shape'] = function(block) {
  var input = Blockly.JavaScript.valueToCode(block, 'INPUT', 0) || "'NONE'";
  return ["'RECTIFIED_' + " + input, 0];
};
