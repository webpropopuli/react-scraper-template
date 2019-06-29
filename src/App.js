import React, { useEffect, useState } from "react";
import cheerio from "cheerio";
import axios from "axios";

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

  return (
    <div>
      <ol>
        {data.names.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
