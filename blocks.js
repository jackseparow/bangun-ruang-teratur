// Blok Bangun Dasar
Blockly.Blocks['base_shape'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Bangun:")
        .appendField(new Blockly.FieldDropdown([["Kubus","CUBE"], ["Tetrahedron","TETRA"], ["Oktahedron","OCTA"]]), "SHAPE");
    this.setOutput(true, "Shape");
    this.setColour(230);
  }
};

// Blok Teknik Pancung (Truncation)
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

// Blok Teknik Rectification
Blockly.Blocks['rectify_shape'] = {
  init: function() {
    this.appendValueInput("INPUT")
        .setCheck("Shape")
        .appendField("Rectification");
    this.setHelpUrl("https://en.wikipedia.org/wiki/Rectification_(geometry)");
    this.setOutput(true, "Shape");
    this.setColour(290);
  }
};
