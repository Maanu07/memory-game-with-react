import { FormEvent, useCallback, useEffect, useState } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import { data } from "./data/data";
import {
  createArrayDuplicate,
  getRandomEmojisFromData,
  randomize,
} from "./utils/helpers";

export interface EmojiData {
  name: string;
  hex: string;
}

export interface SelectedCard {
  name: string;
  index: number;
}

const EMOJI_DATA = data.emojis;

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState<EmojiData[]>([]);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [matchedCards, setMatchedCards] = useState<SelectedCard[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  console.log(selectedCards);

  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      setMatchedCards((prevMatchedCards) => [
        ...prevMatchedCards,
        ...selectedCards,
      ]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      alert("You won the game");
      setIsGameOver(true);
    }
  }, [matchedCards, emojisData]);

  const memoizedStartGame = useCallback(async function startGame(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    try {
      // TODO: GET SOME API TO FETCH EMOJIS
      const data = EMOJI_DATA;
      const randomDuplicateEmojis = createArrayDuplicate(
        getRandomEmojisFromData(data)
      );
      const finalShuffledEmojis = randomize(randomDuplicateEmojis);
      setEmojisData(finalShuffledEmojis);
      setIsGameOn(true);
    } catch (error: unknown) {
      console.error(error);
    }
  },
  []);

  const turnCard = (name: string, index: number) => {
    if (selectedCards.length < 2) {
      setSelectedCards((prev) => [...prev, { name, index }]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  };

  return (
    <main>
      <h1>Memory Game</h1>
      {isGameOn ? (
        <MemoryCard
          handleClick={turnCard}
          data={emojisData}
          selectedCards={selectedCards}
          matchedCards={matchedCards}
        />
      ) : (
        <Form handleSubmit={memoizedStartGame} />
      )}
    </main>
  );
}

export default App;
