
const EmojiButton = ({ content, handleClick, style }) => {
  return (
    <button
      className={style}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default EmojiButton;
