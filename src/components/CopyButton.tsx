import Tippy from "@tippyjs/react";
import copy from "copy-to-clipboard";
import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

interface CopyButtonProps {
  source: string;
  sourceName: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ source, sourceName }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleCopy = () => {
    setTooltipVisible(true);
    copy(source);
  };

  return (
    <div className="copy-button">
      <Tippy
        content={
          <span>
            <b>{sourceName}</b> in your clipboard!
          </span>
        }
        className="copy-button__tooltip"
        visible={isTooltipVisible}
        onClickOutside={() => setTooltipVisible(false)}
        animation="scale-subtle"
        duration={200}
      >
        <button onClick={handleCopy}>
          <MdContentCopy />
          Copy
        </button>
      </Tippy>
    </div>
  );
};

export default CopyButton;
