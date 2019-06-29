import React, { useEffect, useState } from "react";
import cheerio from "cheerio";
import axios from "axios";

// // this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
// /** @jsx jsx */
import { css, jsx } from "@emotion/core";
import "./App.css";

function App() {
  const [data, setData] = useState({ names: [] });

  const URL = "https://pokedex.org/";
  // use the request-promise library to fetch the HTML from pokemon.org
  useEffect(() => {
    (async () => {
      //# FETCH DATA HERE
      const result = await axios(URL);

      let names = [];

      //# EXTRACT THE RELEVANT DATA FROM HTML
      const html = result.data;
      let $ = cheerio.load(html); //# <- this is the raw html from the fetch
      try {
        //# LOOP THROUGH ALL FOUND
        $("#monsters-list li span").each(function(i, elem) {
          names.push({ id: i, name: $(this).text() });
        });
      } catch (err) {
        console.log("crawl failed", err);
      } finally {
        console.log(`Found ${names.length} pokemons`);
        //#UPDATE STATE
        setData({ names: [...names] });
      }
    })();
  }, []);

  const divCss = css`
    background-color: black;
    border-radius: 4px;
    margin: 20px;
    &:hover {
      background-color: #333;
    }
  `;
  const olCss = css`
    margin: 10px;

    font-size: 30px;
    color: silver;
    border-radius: 4px;
    &:hover {
      background-color: #222;
      color: white;
    }
  `;
  const liCss = css`
    padding: 4px;
    margin: 4px;
    background-color: darkgreen;
    font-size: 20px;
    border-radius: 4px;
    &:hover {
      color: yellow;
      background-color: green;
    }
  `;

  return (
    <div css={divCss}>
      <ol css={olCss}>
        A few of my friends...
        {data.names.map(item => (
          <li css={liCss} key={item.id}>
            {item.name}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
