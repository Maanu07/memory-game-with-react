import { decode } from "html-entities";

import { EmojiData, SelectedCard } from "../App";
import EmojiButton from "./EmojiButton";

type MemoryCardProps = {
  readonly handleClick: (name: string, index: number) => void;
  readonly data: EmojiData[];
  readonly selectedCards: SelectedCard[];
  readonly matchedCards: SelectedCard[];
};

export default function MemoryCard({
  handleClick,
  data,
  selectedCards,
  matchedCards,
}: MemoryCardProps) {
  const cardElements = data.map((emoji, index) => {
    const selectedCardEntry = selectedCards.find(
      (card) => card.index === index
    );
    const matchedCardEntry = matchedCards.find((card) => card.index === index);

    const cardStyle = matchedCardEntry
      ? "card-item--matched"
      : selectedCardEntry
      ? "card-item--selected"
      : "";

    return (
      <li key={emoji.name + index} className={`card-item ${cardStyle}`}>
        <EmojiButton
          content={decode(emoji.hex)}
          handleClick={() => handleClick(emoji.name, index)}
          selectedCardEntry={selectedCardEntry}
          matchedCardEntry={matchedCardEntry}
        />
      </li>
    );
  });

  return <ul className='card-container'>{cardElements}</ul>;
}
