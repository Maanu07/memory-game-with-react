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

    return (
      <li key={emoji.name + index} className='card-item'>
        <EmojiButton
          content={
            selectedCardEntry || matchedCardEntry ? decode(emoji.hex) : "❓"
          }
          handleClick={() => handleClick(emoji.name, index)}
          style='btn btn--emoji'
        />
      </li>
    );
  });

  return <ul className='card-container'>{cardElements}</ul>;
}
