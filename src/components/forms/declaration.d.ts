declare module "react-markdown-editor-lite" {
  export interface MdEditorEvent {
    text: string;
    html: string;
  }
  const MdEditor: React.FC<{
    value: string;
    style?: React.CSSProperties;
    renderHTML: (text: string) => string;
    onChange: (event: MdEditorEvent) => void;
  }>;
  export default MdEditor;
}
