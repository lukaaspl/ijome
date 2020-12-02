import Editor from "components/Editor";
import FavEmojis from "components/FavEmojis";
import Preview from "components/Preview";
import { PreviewEmoji } from "domains";
import { motion } from "framer-motion";
import { emojify } from "node-emoji";
import React, { useCallback, useEffect, useRef } from "react";
import useLocalStorageState from "use-local-storage-state";
import { getDefaultFavEmojis, useTitleAnimation } from "utils";

const FAV_EMOJIS_LS_KEY = "FAV_EMOJIS";
const EDITOR_CONTENT_LS_KEY = "EDITOR_CONTENT";
const DEFAULT_TEXT = "Enter y:o:ur text here...";

const App: React.FC = () => {
  const [rawText, setRawText] = useLocalStorageState(
    EDITOR_CONTENT_LS_KEY,
    DEFAULT_TEXT
  );

  const [favEmojis, setFavEmojis] = useLocalStorageState<PreviewEmoji[]>(
    FAV_EMOJIS_LS_KEY,
    getDefaultFavEmojis()
  );

  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const cursorPositionRef = useRef(rawText.length);
  const { animateTitle, controls } = useTitleAnimation();

  const focusEditor = useCallback(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const cursorPosition = cursorPositionRef.current;
    editor.setSelectionRange(cursorPosition, cursorPosition);
    editor.focus();
  }, []);

  const handleEditorChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.currentTarget;
    setRawText(value);
  };

  const isEmojiInFavs = (emoji: PreviewEmoji) => {
    return !!favEmojis.find(({ text }) => text === emoji.text);
  };

  const removeFavEmoji = (emoji: PreviewEmoji) =>
    setFavEmojis((favEmojis) =>
      favEmojis.filter(({ text }) => text !== emoji.text)
    );

  const handlePreviewEmojiClick = (emoji: PreviewEmoji) => {
    if (isEmojiInFavs(emoji)) {
      removeFavEmoji(emoji);
      return;
    }

    setFavEmojis((favEmojis) => [...favEmojis, emoji]);
  };

  const handleFavEmojiClick = (emoji: PreviewEmoji) => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const { selectionStart, selectionEnd } = editor;

    setFavEmojis(([...favEmojis]) => {
      const indexToRemove = favEmojis.findIndex(
        ({ text }) => text === emoji.text
      );

      favEmojis.splice(indexToRemove, 1);
      favEmojis.unshift(emoji);
      return favEmojis;
    });

    setRawText((value) => {
      const newValue =
        value.substring(0, selectionStart) +
        emoji.text +
        value.substr(selectionEnd, value.length);

      const lengthDiff = newValue.length - value.length;

      cursorPositionRef.current = selectionEnd + lengthDiff;
      return newValue;
    });

    setTimeout(focusEditor, 0);
  };

  const handleFavEmojiRightClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    emoji: PreviewEmoji
  ) => {
    event.preventDefault();
    removeFavEmoji(emoji);
  };

  useEffect(focusEditor, [focusEditor]);

  useEffect(() => {
    animateTitle();
  }, [animateTitle]);

  return (
    <motion.div animate={controls.container}>
      <motion.h1 className="title" animate={controls.title}>
        Ij
        <motion.span className="title__emoji" animate={controls.emoji}>
          {emojify(":ok_hand:")}
        </motion.span>
        me
      </motion.h1>
      <motion.div animate={controls.editor}>
        <FavEmojis
          emojis={favEmojis}
          onEmojiClick={handleFavEmojiClick}
          onEmojiRightClick={handleFavEmojiRightClick}
        />
        <div className="container">
          <Editor
            ref={editorRef}
            value={rawText}
            onChange={handleEditorChange}
          />
          <Preview
            content={rawText}
            onEmojiClick={handlePreviewEmojiClick}
            isEmojiInFavs={isEmojiInFavs}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default App;
