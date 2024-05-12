import { Editor } from "grapesjs";

export function _editorCustomCSS(editor: Editor) {
    var pfx = editor.getConfig().stylePrefix;
    var modal = editor.Modal;
    var cmdm = editor.Commands;
    var codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
    var pnm = editor.Panels;
    var container = document.createElement('div');
    var btnEdit = document.createElement('button');

    codeViewer.set({
        codeName: 'css',
        readOnly: 0,
        theme: 'hopscotch',
        autoBeautify: true,
        autoCloseBrackets: true,
        lineWrapping: true,
        styleActiveLine: true,
        smartIndent: true,
        indentWithTabs: true
    });

    btnEdit.innerHTML = 'Edit CSS';
    btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import';
    btnEdit.onclick = function () {
        var code = codeViewer.editor.getValue();
        editor.setStyle(code.trim());
        modal.close();
    };

    cmdm.add('css-edit', {
        run: function (editor, sender) {
            sender && sender.set('active', 0);
            var viewer = codeViewer.editor;
            modal.setTitle('Edit CSS');
            if (!viewer) {
                var txtarea = document.createElement('textarea');
                container.appendChild(txtarea);
                container.appendChild(btnEdit);
                codeViewer.init(txtarea);
                viewer = codeViewer.editor;
            }
            var Css = editor.getCss();
            modal.setContent('');
            modal.setContent(container);
            codeViewer.setContent(Css);
            modal.open();
            viewer.refresh();
        }
    });

    pnm.addButton('options', {
        id: 'edit-css',
        className: 'fa fa-edit',
        command: 'css-edit',
        attributes: {
            title: 'Edit CSS'
        }
    });
}