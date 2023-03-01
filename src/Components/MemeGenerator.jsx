import React, { useState, useEffect } from "react";

function MemeGenerator() {
  const [meme, setMeme] = useState({
    randomImage: "https://i.imgflip.com/30b1gx.jpg",
    topText: "",
    bottomText: ""
  });

  const [allMemeData, setAllMemeData] = useState([]);

  function getNewImage() {
    const randomNumber = Math.floor(Math.random() * allMemeData.length);
    console.log(randomNumber);
    const url = allMemeData[randomNumber].url;
    console.log(url);
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url
    }));
  }

  function updateText(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value
    }));
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeData(data.data.memes));
  }, []);

  return (
    <main>
      <div className="form">
        <input
          type="text"
          className="top-input"
          name="topText"
          placeholder="top   meme  Text"
          value={meme.topText}
          onChange={updateText}
        />
        <input
          type="text"
          className="bottom-input"
          name="bottomText"
          placeholder="bottom Text"
          value={meme.bottomText}
          onChange={updateText}
        />
        <button className="form--button " onClick={getNewImage}>
          Get a new button image{" "}
        </button>
      </div>
      <div>
        <img src={meme.randomImage} alt="meme" className="meme--image" />
        <h2 className="meme--text--top">{meme.topText}</h2>
        <h2 className="meme--text--bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default MemeGenerator;
