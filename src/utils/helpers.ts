import { EmojiData } from "../App";

// function to get random emojis from the data
export function getRandomEmojisFromData(data: EmojiData[], limit: number = 5) {
  const randomEmojiData: EmojiData[] = [];
  for (let i = 0; i < limit; i++) {
    const randomIndex = Math.floor(Math.random() * data.length); // generates random number [0,data.length)
    if (!randomEmojiData.includes(data[randomIndex])) {
      randomEmojiData.push(data[randomIndex]);
    } else {
      i--;
    }
  }
  return randomEmojiData;
}

// function to duplicate the array (we can also use lodash to make deep copy)
export function createArrayDuplicate(data: EmojiData[]) {
  return [...data, ...data.map((item) => ({ ...item }))];
}

// There is a Fisher-Yates shuffle algorithm that you can use to shuffle the array.
export function randomize(arr: EmojiData[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}
