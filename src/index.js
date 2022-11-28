import '@logseq/libs';
import { logseq as PL } from "../package.json";
import { settingUI } from './setting';
const pluginId = PL.id;


async function loadSpotifyData() {
  const appURL = 'https://logspot.top';
  const userID = '6bd78d5a03364c44e5f620545b56eae63b49b9e2f595efa14ac26262cf3f4737fea5730678312963';
  const endpoint = appURL + '/getsongs/';
  console.log(`#${pluginId}: ` + endpoint);

  const { data: { children } } = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

  console.log(`#${pluginId}: json ` + children);

  let results_array = [];
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