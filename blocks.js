// 1. Definisi Visual Blok
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
    this.appendDummyInput().appendField("Kedalaman:").appendField(new Blockly.FieldNumber(0.3, 0.1, 0.5), "DEPTH");
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

// 2. Definisi Generator (Solusi Error JavaScript Generator)
const generator = javascript.javascriptGenerator;

generator.forBlock['base_shape'] = function(block) {
  const shape = block.getFieldValue('SHAPE');
  return ["'" + shape + "'", generator.ORDER_ATOMIC];
};

generator.forBlock['truncate_shape'] = function(block) {
  const input = generator.valueToCode(block, 'INPUT', generator.ORDER_ATOMIC) || "'NONE'";
  return ["'TRUNCATED_' + " + input, generator.ORDER_ATOMIC];
};

generator.forBlock['rectify_shape'] = function(block) {
  const input = generator.valueToCode(block, 'INPUT', generator.ORDER_ATOMIC) || "'NONE'";
  return ["'RECTIFIED_' + " + input, generator.ORDER_ATOMIC];
};
