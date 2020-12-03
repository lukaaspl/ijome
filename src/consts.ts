import { Variants } from "framer-motion";

export const DEFAULT_FAV_EMOJIS = [
  ":smiley:",
  ":wink:",
  ":smile:",
  ":stuck_out_tongue:",
  ":confused:",
  ":unamused:",
  ":cat:",
  ":thumbsup:",
  ":thumbsdown:",
  ":ok_hand:",
  ":shrug:",
  ":heart:",
];

export enum LSKey {
  FavEmojis = "FAV_EMOJIS",
  EditorContent = "EDITOR_CONTENT",
}

export const commonVariants: Variants = {
  enter: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
  leave: { opacity: 0, y: -5 },
};
