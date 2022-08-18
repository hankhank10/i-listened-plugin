async function loadSpotifyData () {
    const app_url = 'https://logspot.top'
    const user_id = '6bd78d5a03364c44e5f620545b56eae63b49b9e2f595efa14ac26262cf3f4737fea5730678312963'
    const endpoint = app_url + '/getsongs/?user_id=' + user_id

    console.log(endpoint)

    const { data: { children } } = await fetch(endpoint).then(res => res.json())

    let results_array = []

    children.forEach(function (item, index) {
        results_array.push(item['track_name'] + " by [[" + item['artist'] + "]]")
    });

    return results_array
}

function main () {
  logseq.Editor.registerSlashCommand(
    '💿 Recently played from Spotify',
    async () => {
        const { content, uuid } = await logseq.Editor.getCurrentBlock()

        logseq.App.showMsg(`
            [:div.p-2
              [:h1 "Fetching from Spotify..."]
            ]
        `)

        //logseq.Editor.insertAtEditingCursor (await loadSpotifyData())

        // Get the current block
        let targetBlock = await logseq.Editor.getCurrentBlock()
        let targetBlockUuid = targetBlock.uuid

        console.log(targetBlockUuid)

        // Set the current block content
        logseq.Editor.updateBlock (targetBlockUuid, "🎺 Today on [[spotify]]:")

        // Get the data from Spotify
        let data = await loadSpotifyData()

        //let newBlock = logseq.Editor.insertBlock(targetBlockUuid, "Hello World!")
        //let newBlock2 = logseq.Editor.insertBlock(targetBlockUuid, "Hello World Again!")

        // Iterate through the data and insert each item into the current block
        data.forEach(function (item, index) {
            logseq.Editor.insertBlock(targetBlockUuid, item)
        });

    },
  )

  logseq.Editor.registerBlockContextMenuItem('🎺 Spotify integration',
    ({ blockId }) => {
      logseq.App.showMsg(
        '🎺 Spotify integration'
      )
  })

}

// bootstrap
logseq.ready(main).catch(console.error)
