"use strict";

module.exports = {
  ignores: [ "node_modules/", "LICENSE.md", ".github/" ],

  globs: [ "**/*.md" ],

  config: {
    // Enable all markdownlint rules
    default: true,

    MD004: {
      "style": "dash"
    },

    // Set list indent level to 2
    MD007: { "indent": 2 },

    // Enable line length check but exclude tables and code blocks
    MD013: {
      line_length: 120,
      tables: false,
      code_blocks: false
    },

    // Allow multiple subheadings with the same content
    // across different section (#1 ##A ##B #2 ##A ##B)
    MD024: {
      allow_different_nesting: true
    },

    // Set Ordered list item prefix to "ordered" (use 1. 2. 3. not 1. 1. 1.)
    MD029: { "style": "ordered" },

    // Allow inline HTML
    MD033: false,
  }
};
