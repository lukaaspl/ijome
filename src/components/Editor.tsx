import React, { forwardRef } from "react";
import CopyButton from "components/CopyButton";

interface EditorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(
  ({ value, onChange }, ref) => {
    return (
      <div className="editor">
        <textarea
          ref={ref}
          className="editor__textarea"
          value={value}
          onChange={onChange}
          spellCheck="false"
          data-gramm="false"
        />
        <CopyButton sourceName="Raw text" source={value} />
      </div>
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
