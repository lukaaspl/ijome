import Tippy, { useSingleton } from "@tippyjs/react";
import { commonVariants } from "consts";
import { PreviewEmoji } from "domains";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface FavEmojisProps {
  emojis: PreviewEmoji[];
  onEmojiClick: (emoji: PreviewEmoji) => void;
  onEmojiRightClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    emoji: PreviewEmoji
  ) => void;
}

const FavEmojis: React.FC<FavEmojisProps> = ({
  emojis,
  onEmojiClick,
  onEmojiRightClick,
}) => {
  const [source, target] = useSingleton();

  return (
    <div className="favs">
      <div className="favs__emoji-list">
        <Tippy
          singleton={source}
          placement="top"
          animation="scale-subtle"
          moveTransition="transform 0.2s ease-out"
          duration={200}
          delay={[600, 0]}
        />
        <AnimatePresence initial={false}>
          {emojis.map((emoji) => {
            const tooltipContent = (
              <div className="favs__emoji-tooltip">
                <h4 className="favs__emoji-tooltip-title">{emoji.text}</h4>
                <span className="favs__emoji-tooltip-details">
                  <b>LMB</b> - append
                </span>
                <span className="favs__emoji-tooltip-details">
                  <b>RMB</b> - remove
                </span>
              </div>
            );

            return (
              <Tippy
                key={emoji.text}
                singleton={target}
                content={tooltipContent}
              >
                <motion.button
                  variants={commonVariants}
                  initial="enter"
                  animate="visible"
                  exit="leave"
                  className="favs__button"
                  onClick={() => onEmojiClick(emoji)}
                  onContextMenu={(event) => onEmojiRightClick(event, emoji)}
                >
                  <span className="favs__emoji">{emoji.emoji}</span>
                </motion.button>
              </Tippy>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FavEmojis;
