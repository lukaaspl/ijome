import Tippy from "@tippyjs/react";
import CopyButton from "components/CopyButton";
import { PreviewEmoji } from "domains";
import React, { Fragment, isValidElement } from "react";
import { toArray } from "react-emoji-render";
import { createPreviewEmoji, toEmojiString } from "utils";

interface PreviewProps {
  content: string;
  onEmojiClick: (emoji: PreviewEmoji) => void;
  isEmojiInFavs: (emoji: PreviewEmoji) => boolean;
}

const Preview: React.FC<PreviewProps> = ({
  content,
  onEmojiClick,
  isEmojiInFavs,
}) => {
  const steroidText = toEmojiString(content);

  const interactiveText = toArray(content).flatMap((element, index) => {
    if (isValidElement<{ children: string }>(element)) {
      const emoji = element.props.children;
      const previewEmoji = createPreviewEmoji(emoji);

      return (
        <Tippy
          key={index}
          className="preview__emoji-tooltip"
          interactive
          placement="top"
          content={
            isEmojiInFavs(previewEmoji)
              ? "Remove from favorites"
              : "Add to favorites"
          }
          animation="scale-subtle"
          duration={200}
          delay={[200, 0]}
        >
          <span
            className="preview__emoji"
            onClick={() => onEmojiClick(previewEmoji)}
          >
            {emoji}
          </span>
        </Tippy>
      );
    }

    const strElement = element as string;

    if (strElement.includes("\n")) {
      return strElement.split("\n").map((substr, innerIndex, array) => (
        <Fragment key={`${index}-${innerIndex}`}>
          {substr}
          {innerIndex < array.length - 1 && <br />}
        </Fragment>
      ));
    }

    return <Fragment key={index}>{strElement}</Fragment>;
  });

  return (
    <div className="preview">
      <div className="preview__content">{interactiveText}</div>
      <CopyButton sourceName="Steroid text" source={steroidText} />
    </div>
  );
};

export default Preview;
