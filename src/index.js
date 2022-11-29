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

  let response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(object_to_send),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })

  let data = await response.json();
  let status = await response.status;

  console.log(status);

  let results_array = [];

  if (status === 200) {
    let children = data.data.children;
    children.forEach(function (item, index) {
      results_array.push(item['track_name'] + " by [[" + item['artist'] + "]]");
      console.log(item['track_name'] + " by [[" + item['artist'] + "]]");
    });
  } else {
    results_array.push("There was an error fetching your data from logspot. Error code was " + status);
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