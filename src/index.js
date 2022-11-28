import '@logseq/libs';
import { logseq as PL } from "../package.json";
import { settingUI } from './setting';
const pluginId = PL.id;


async function loadSpotifyData() {
  const appURL = 'https://logspot.top';
  const userID = logseq.settings["LogSpotToken"];
  const endpoint = appURL + '/getsongs/';

  const object_to_send = {
    'user_id': userID
  }

  console.log(object_to_send)

  let results_array = [];

  console.log("OK GO!")
  try {
    const {data: {children}} = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(object_to_send),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(res => res.json())

  } catch (e) {
    results_array.push("There was a problem fetching your data from Spotify.");
    results_array.push("In order to use this plugin, you must first authenticate with Spotify by visiting https://logspot.top/");
    results_array.push("Once you have authenticated, you will be given a token. Enter that token in the LogSpot plugin settings.");
    return results_array;
  }

  children.forEach(function (item, index) {
    results_array.push(item['track_name'] + " by [[" + item['artist'] + "]]");
  });

  return results_array;
}


/* main */
function main () {

  settingUI(); /* -setting */
  console.info(`#${pluginId}: main`); /* -plugin-id */

  logseq.Editor.registerSlashCommand('💿 Recently played from Spotify!', async () => {

    const { content, uuid } = await logseq.Editor.getCurrentBlock();

    logseq.UI.showMsg(`
        [:div.p-2
          [:h1 "Fetching from Spotify..."]
        ]
    `);
    console.log(`#${pluginId}: fetching`);
    //logseq.Editor.insertAtEditingCursor (await loadSpotifyData())

    // Get the current block
    let targetBlock = await logseq.Editor.getCurrentBlock();
    let targetBlockUuid = targetBlock.uuid;

    console.log(`#${pluginId}: ` + targetBlockUuid);

    // Set the current block content
    logseq.Editor.updateBlock(targetBlockUuid, "🎺 Today on [[spotify]]:");

    // Get the data from Spotify
    let data = await loadSpotifyData();

    // Iterate through the data and insert each item into the current block
    data.forEach(function (item, index) {
      logseq.Editor.insertBlock(targetBlockUuid, item);
    });

  }
  );

  logseq.Editor.registerBlockContextMenuItem('🎺 Spotify integration',
    ({ blockId }) => { logseq.UI.showMsg('🎺 Spotify integration') }
  );



  console.info(`#${pluginId}: loaded`);
}/* end_main */


logseq.ready(main).catch(console.error);