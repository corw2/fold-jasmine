'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that folds the functions
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fold-jasmine:fold': () => this.fold()
    }));
  },

  deactivate() {
    // this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.foldJasmineView.destroy();
  },

  // serialize() {
  //   return {
  //     foldJasmineViewState: this.foldJasmineView.serialize()
  //   };
  // },

  fold() {
    let editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      let regExp = new RegExp(/\s[xf]?it\(["']/,['mg']);
      editor.scan(regExp,{},function(object){
        var row = object.range.start.row;
        if(editor.isFoldableAtBufferRow(row) && !editor.isFoldedAtBufferRow(row)){
          editor.foldBufferRow(row);
          // console.log("Folded it block at row ", editor.isFoldableAtBufferRow(row), object.range.start.row);
        }
      });

      regExp = new RegExp(/\sbeforeEach\(/,['mg']);
      editor.scan(regExp,{},function(object){
        var row = object.range.start.row;
        if(editor.isFoldableAtBufferRow(row) && !editor.isFoldedAtBufferRow(row)){
          editor.foldBufferRow(row);
          // console.log("Folded beforeEach block at row ", editor.isFoldableAtBufferRow(row), object.range.start.row);
        }
      });

      regExp = new RegExp(/\safterEach\(/,['mg']);
      editor.scan(regExp,{},function(object){
        var row = object.range.start.row;
        if(editor.isFoldableAtBufferRow(row) && !editor.isFoldedAtBufferRow(row)){
          editor.foldBufferRow(row);
          // console.log("Folded afterEach block at row ", editor.isFoldableAtBufferRow(row), object.range.start.row);
        }
      });
    }

  }

};
