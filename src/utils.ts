import { PreviewEmoji } from "domains";
import { AnimationControls, useAnimation } from "framer-motion";
import { emojify, unemojify } from "node-emoji";
import { isValidElement, useCallback } from "react";
import { toArray } from "react-emoji-render";

const DEFAULT_FAV_EMOJIS = [
  ":smiley:",
  ":wink:",
  ":smile:",
  ":stuck_out_tongue:",
  ":confused:",
  ":unamused:",
  ":cat:",
  ":thumbsup:",
  ":thumbsdown:",
  ":shrug:",
  ":heart:",
];

export const toEmojiString = (value: string): string => {
  return toArray(value)
    .map((node) => (isValidElement(node) ? node.props.children : node))
    .join("");
};

export const createPreviewEmoji = (emoji: string): PreviewEmoji => ({
  emoji,
  text: unemojify(emoji),
});

export const getDefaultFavEmojis = (): PreviewEmoji[] => {
  return DEFAULT_FAV_EMOJIS.map((text) => ({
    emoji: emojify(text),
    text,
  }));
};

type TitleAnimation = {
  animateTitle: () => Promise<void>;
  controls: {
    container: AnimationControls;
    title: AnimationControls;
    emoji: AnimationControls;
    editor: AnimationControls;
  };
};

export const useTitleAnimation = (): TitleAnimation => {
  const [container, title, emoji, editor] = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
  ];

  const animateTitle = useCallback(async () => {
    container.set({ y: "45%" });
    title.set({ scale: 2.5, x: -60, opacity: 0 });
    emoji.set({ rotate: -180 });
    editor.set({ opacity: 0, y: 60 });

    emoji.start({
      rotate: [-160, -200, -160, -200, -160, -200, 0],
      transition: { duration: 1.5 },
    });

    await title.start({
      x: 0,
      opacity: 1,
      transition: { duration: 1 },
    });

    await title.start({
      scale: 1,
      transition: { delay: 0.75, duration: 0.5 },
    });

    container.start({
      y: 0,
      transition: { duration: 0.2 },
    });

    editor.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    });
  }, [container, title, emoji, editor]);

  return {
    animateTitle,
    controls: {
      container,
      title,
      emoji,
      editor,
    },
  };
};
