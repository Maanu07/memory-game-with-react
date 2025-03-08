import { FormEvent, useCallback, useEffect, useState } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";

export interface EmojiData {
  name: string;
  hex: string;
  // category: string;
  // group: string;
  // htmlCode: string[];
  // unicode: string[];
  // isStale?: 0 | 1;
  // isActive?: boolean;
}

const EMOJI_LIMIT = 5;

const EMOJI_DATA = [
  { emoji: "😀", name: "Grinning Face", hex: "&#x1F600;" },
  { emoji: "😂", name: "Face with Tears of Joy", hex: "&#x1F602;" },
  { emoji: "😍", name: "Smiling Face with Heart-Eyes", hex: "&#x1F60D;" },
  { emoji: "🤔", name: "Thinking Face", hex: "&#x1F914;" },
  { emoji: "😢", name: "Crying Face", hex: "&#x1F622;" },
  { emoji: "🐶", name: "Dog Face", hex: "&#x1F436;" },
  { emoji: "🐱", name: "Cat Face", hex: "&#x1F431;" },
  { emoji: "🙊", name: "Speak-No-Evil Monkey", hex: "&#x1F64A;" },
  { emoji: "🌻", name: "Sunflower", hex: "&#x1F33B;" },
  { emoji: "🌳", name: "Deciduous Tree", hex: "&#x1F333;" },
  { emoji: "🍕", name: "Pizza", hex: "&#x1F355;" },
  { emoji: "🍔", name: "Hamburger", hex: "&#x1F354;" },
  { emoji: "🍦", name: "Soft Ice Cream", hex: "&#x1F366;" },
  { emoji: "🍏", name: "Green Apple", hex: "&#x1F34F;" },
  { emoji: "☕", name: "Hot Beverage", hex: "&#x2615;" },
  { emoji: "✈️", name: "Airplane", hex: "&#x2708;" },
  { emoji: "🚗", name: "Automobile", hex: "&#x1F697;" },
  { emoji: "🏖️", name: "Beach with Umbrella", hex: "&#x1F3D6;" },
  { emoji: "💡", name: "Light Bulb", hex: "&#x1F4A1;" },
  { emoji: "📱", name: "Mobile Phone", hex: "&#x1F4F1;" },
];

// function to get random emojis from the data
function getRandomEmojisFromData(data: EmojiData[]) {
  const randomEmojiData: EmojiData[] = [];
  for (let i = 0; i < EMOJI_LIMIT; i++) {
    const randomIndex = Math.floor(Math.random() * data.length); // generates random number [0,data.length)
    if (!randomEmojiData.includes(data[randomIndex])) {
      randomEmojiData.push(data[randomIndex]);
    } else {
      i--;
    }
  }
  return randomEmojiData;
}

// function to duplicate the array
function createArrayDuplicate(data: EmojiData[]) {
  return [...data, ...JSON.parse(JSON.stringify(data))];
}

// function to shuffle the elements in an array
function shuffleArray(data: EmojiData[]) {
  const indexTaken: number[] = [];
  const shuffledArray: EmojiData[] = [];
  for (const element of data) {
    let randomNumber = Math.floor(Math.random() * data.length);
    while (indexTaken.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * data.length);
    }
    indexTaken.push(randomNumber);
    shuffledArray[randomNumber] = element;
  }
  return shuffledArray;
}

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState<EmojiData[]>([]);
  const [selectedCards, setSelectedCards] = useState<
    { name: string; index: number }[]
  >([]);
  const [matchedCards, setMatchedCards] = useState<
    { name: string; index: number }[]
  >([]);
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
      const finalShuffledEmojis = shuffleArray(randomDuplicateEmojis);
      setEmojisData(finalShuffledEmojis);
      setIsGameOn(true);
    } catch (error: unknown) {
      console.error(error);
    }
  },
  []);

  const turnCard = (name: string, index: number) => {
    const selectedCardEntry = selectedCards.find(
      (card) => card.index === index
    );

    const matchedCardEntry = matchedCards.find(
      (card) => card.index === index
    );

    // don't do anything if the card is already  selected or matched
    if(selectedCardEntry || matchedCardEntry) return;


    if (!selectedCardEntry && selectedCards.length < 2) {
      setSelectedCards((prev) => [...prev, { name, index }]);
    } else if (!selectedCardEntry && selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  };

  return (
    <main>
      <h1>Memory Game</h1>
      {isGameOn ? (
        <MemoryCard handleClick={turnCard} data={emojisData} selectedCards={selectedCards} matchedCards={matchedCards} />
      ) : (
        <Form handleSubmit={memoizedStartGame} />
      )}
    </main>
  );
}

// There is a Fisher-Yates shuffle algorithm that you can use to shuffle the array.
function randomize(arr: number[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  console.log(arr);
}

// randomize([1, 2, 3, 4, 5]);
