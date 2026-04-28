// Blok Bangun Dasar
Blockly.Blocks['base_shape'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Bangun:")
        .appendField(new Blockly.FieldDropdown([
            ["Kubus","CUBE"], 
            ["Tetrahedron","TETRA"], 
            ["Oktahedron","OCTA"]
        ]), "SHAPE");
    this.setOutput(true, "Shape");
    this.setColour(230);
  }
};

// Blok Truncate
Blockly.Blocks['truncate_shape'] = {
  init: function() {
    this.appendValueInput("INPUT")
        .setCheck("Shape")
        .appendField("Pancung (Truncate)");
    this.setOutput(true, "Shape");
    this.setColour(290);
  }
};

// Blok Rectify
Blockly.Blocks['rectify_shape'] = {
  init: function() {
    this.appendValueInput("INPUT")
        .setCheck("Shape")
        .appendField("Rectify (Tengah Rusuk)");
    this.setOutput(true, "Shape");
    this.setColour(290);
  }
};

// Generator JavaScript Sederhana
Blockly.JavaScript = new Blockly.Generator('JavaScript');
Blockly.JavaScript['base_shape'] = function(block) {
  return [block.getFieldValue('SHAPE'), Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['truncate_shape'] = function(block) {
  var input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
  return ["TRUNCATED_" + input, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['rectify_shape'] = function(block) {
  var input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
  return ["RECTIFIED_" + input, Blockly.JavaScript.ORDER_ATOMIC];
};
