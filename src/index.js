import '@logseq/libs';
import { logseq as PL } from "../package.json";
import { settingUI } from './setting';

const pluginId = PL.id;
const pluginName = "Spotify plugin: "

/* function to fetch data from logspot */
async function loadSpotifyData() {
  const spotifyToken = logseq.settings["SpotifyAccessToken"];
  const spotifyUserId = logseq.settings["SpotifyUserId"];

  let results_array = [];

  if (spotifyToken === "" || spotifyUserId === "") {
    results_array.push("This plugin has not yet been initialised.")
    results_array.push("In order to use this plugin, you must first authenticate with Spotify by visiting the settings of this plugin.");
    return results_array
  }

  const endpoint = `https://api.spotify.com/v1/me/player/recently-played?limit=10`;

  console.log(pluginName, "fetching data from ", endpoint)

  let response = await fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${spotifyToken}`
    }
  })

  let data = await response.json();
  let status = await response.status;

  console.log(pluginName, "returned status code", status)

  if (status === 200) {
    let items = data.items;
    items.forEach(function (item, index) {
      const track = item.track;
      const artist = track.artists.map(artist => artist.name).join(", ");
      results_array.push(track.name + " by " + artist);
    });
  } else {
    results_array.push("There was an error fetching your data from logspot. Error code was " + status +".");
    results_array.push(data.message)
    console.log(data);
  }

  return results_array;
}

/* main */
function main () {
  settingUI(); /* -setting */
  console.info(`#${pluginId}: main`); /* -plugin-id */

  logseq.Editor.registerSlashCommand('💿 Recently played from Spotify!', async () => {
    let SpotifyHeading = logseq.settings["SpotifyHeading"]
    if (SpotifyHeading === "") {
      SpotifyHeading = "🎺 Today on [[spotify]]:"
    }

    const { content, uuid } = await logseq.Editor.getCurrentBlock();

    // Display the toast
    logseq.UI.showMsg(`
        [:div.p-2
          [:h1 "Fetching from Spotify..."]
        ]
    `);
    console.log(`#${pluginId}: fetching`);

    // Get the current block
    let targetBlock = await logseq.Editor.getCurrentBlock();
    let targetBlockUuid = targetBlock.uuid;

    console.log(`#${pluginId}: ` + targetBlockUuid);

    // Set the current block content
    logseq.Editor.updateBlock(targetBlockUuid, SpotifyHeading);

    // Get the data from Spotify
    let data = await loadSpotifyData();

    // Iterate through the data and insert each item into the current block
    data.forEach(function (item, index) {
      logseq.Editor.insertBlock(targetBlockUuid, item);
    });

  });

  logseq.Editor.registerBlockContextMenuItem('🎺 Spotify integration',
    ({ blockId }) => { logseq.UI.showMsg('🎺 Spotify integration') }
  );

  console.info(`#${pluginId}: loaded`);
}

logseq.ready(main).catch(console.error);
