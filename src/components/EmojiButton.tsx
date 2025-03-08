type EmojiButtonProps = {
  content: string;
  handleClick: () => void;
  selectedCardEntry: any;
  matchedCardEntry: any;
};

const EmojiButton = ({
  content,
  handleClick,
  selectedCardEntry,
  matchedCardEntry,
}: EmojiButtonProps) => {
  const btnContent = selectedCardEntry || matchedCardEntry ? content : "?";
  const btnStyle = matchedCardEntry
    ? "btn--emoji__back--matched"
    : selectedCardEntry
    ? "btn--emoji__back--selected"
    : "btn--emoji__front";

  return (
    <button
      className={`btn btn--emoji ${btnStyle}`}
      onClick={selectedCardEntry ? undefined : handleClick}
      disabled={matchedCardEntry}
    >
      {btnContent}
    </button>
  );
};

export default EmojiButton;
