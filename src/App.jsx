import { useState, useEffect } from "react";
function App() {
  const hiragana = [
    { romaji: "a", hiragana: "あ" },
    { romaji: "i", hiragana: "い" },
    { romaji: "u", hiragana: "う" },
    { romaji: "e", hiragana: "え" },
    { romaji: "o", hiragana: "お" },
    { romaji: "ka", hiragana: "か" },
    { romaji: "ki", hiragana: "き" },
    { romaji: "ku", hiragana: "く" },
    { romaji: "ke", hiragana: "け" },
    { romaji: "ko", hiragana: "こ" },
    { romaji: "sa", hiragana: "さ" },
    { romaji: "shi", hiragana: "し" },
    { romaji: "su", hiragana: "す" },
    { romaji: "se", hiragana: "せ" },
    { romaji: "so", hiragana: "そ" },
    { romaji: "ta", hiragana: "た" },
    { romaji: "chi", hiragana: "ち" },
    { romaji: "tsu", hiragana: "つ" },
    { romaji: "te", hiragana: "て" },
    { romaji: "to", hiragana: "と" },
    { romaji: "na", hiragana: "な" },
    { romaji: "ni", hiragana: "に" },
    { romaji: "nu", hiragana: "ぬ" },
    { romaji: "ne", hiragana: "ね" },
    { romaji: "no", hiragana: "の" },
    { romaji: "ha", hiragana: "は" },
    { romaji: "hi", hiragana: "ひ" },
    { romaji: "fu", hiragana: "ふ" },
    { romaji: "he", hiragana: "へ" },
    { romaji: "ho", hiragana: "ほ" },
    { romaji: "ma", hiragana: "ま" },
    { romaji: "mi", hiragana: "み" },
    { romaji: "mu", hiragana: "む" },
    { romaji: "me", hiragana: "め" },
    { romaji: "mo", hiragana: "も" },
    { romaji: "ya", hiragana: "や" },
    { romaji: "yu", hiragana: "ゆ" },
    { romaji: "yo", hiragana: "よ" },
    { romaji: "ra", hiragana: "ら" },
    { romaji: "ri", hiragana: "り" },
    { romaji: "ru", hiragana: "る" },
    { romaji: "re", hiragana: "れ" },
    { romaji: "ro", hiragana: "ろ" },
    { romaji: "wa", hiragana: "わ" },
    { romaji: "wo", hiragana: "を" },
    { romaji: "n", hiragana: "ん" },
  ];

  const [input, setInput] = useState("");
  const [currentHirigana, setCurrentHirigana] = useState(0);

  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [ansStatus, setAnsStatus] = useState();

  const setRandomHirigana = () => {
    const randomIndex = Math.floor(Math.random() * hiragana.length);
    setCurrentHirigana(randomIndex);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.toLocaleLowerCase() === hiragana[currentHirigana].romaji) {
      setStreak(streak + 1);
      setMaxStreak(streak + 1 > maxStreak ? streak + 1 : maxStreak);
      setAnsStatus(true);

      localStorage.setItem("streak", streak + 1);
      localStorage.setItem(
        "maxStreak",
        streak + 1 > maxStreak ? streak + 1 : maxStreak
      );
    } else {
      setStreak(0);
      setAnsStatus(false);

      localStorage.setItem("streak", 0);
    }

    setInput("");
    setRandomHirigana();
  };

  useEffect(() => {
    setRandomHirigana();
    setStreak(parseInt(localStorage.getItem("streak") || 0));
    setMaxStreak(parseInt(localStorage.getItem("maxStreak") || 0));
  }, []); //[] means run once

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white text-center">
      <header className="p-6 mb-8">
        <h1 className="text-5xl font-extrabold uppercase mb-7 font-playfair-display ">
          The Hiragana Test
        </h1>
        <div className="my-4">
          <p className="space-x-2 sm:space-x-5">
            <span className="text-4xl font-bold ">🔥</span>
            <span>
              Streak : <span className="text-4xl font-bold">{streak}</span>
            </span>{" "}
            <span className="text-5xl ">||</span>{" "}
            <span>
              MaxStreak :{" "}
              <span className="text-4xl font-bold ">{maxStreak}</span>
            </span>{" "}
            <span className="text-4xl font-bold">🔥</span>
          </p>
        </div>
      </header>

      <div className="text-[12rem] font-bold mb-8">
        {hiragana[currentHirigana].hiragana}
      </div>

      <div className="mb-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="block w-28 mx-auto pb-2 bg-transparent border-b-2 border-b-purple-600 outline-none text-center text-6xl"
            autoFocus
          />
        </form>
      </div>

      {ansStatus != null && (
        <p className={ansStatus ? "text-green-500" : "text-red-500"}>
          {ansStatus
            ? `Correct! ✅`
            : `❌ The correct answer for ${hiragana[currentHirigana].hiragana} is ${hiragana[currentHirigana].romaji}.`}
        </p>
      )}
    </div>
  );
}

export default App;
