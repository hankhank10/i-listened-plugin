🚩plugin-template

# logseq-plugin-template-js
 - Logseq plugins are mostly written in Typescript. It's not easy for beginners to learn, so I think it's better to learn **Javascript** in the beginning. Customize Logseq using `@logseq/libs`.

## Required environment
1. GitHub desktop client https://desktop.github.com/
1. Visual Studio Code https://azure.microsoft.com/ja-jp/products/visual-studio-code/
1. pnpm https://pnpm.io/ja/installation
1. node.js https://pnpm.io/ja/cli/env


## How to use
 1. Select [Use this template] → [Create a new repository]
 1. Clone the repository on GitHub desktop client
 1. Edit few items `LICENSE.md` and `package.json` on Visual Studio Code
 1. Launch a terminal by contextmenu from the same folder as the repository. Run `pnpm install`
 1. Modules is installed and the development environment is ready.
 1. Edit the main script `src/index.js`
 1. switch to Electron Developer Tools on Logseq (⌨️: Windows`Ctrl+Shift+I` or Mac`Cmd+Alt+I`)
 1. Build the plugin. Run `pnpm build`
 1. Have Logseq load the plugin in developer mode.
 1. Commit to the Github repo on GitHub desktop client.
 1. Release with a tag like v.1.0.0 on your repository on Github. It takes about a minute for Github CI to finish working. Then two are added to the asset.

## How to publish
 - Once the plugin is complete, publish it to Logseq marketplace.
 1. Fork logseq/marketplace repository. https://github.com/logseq/marketplace
 1. In your forked repository, upload the required folders to `package` directory. 
    - `manifest.json` https://github.com/logseq/marketplace/blob/master/packages/logseq-dev-theme/manifest.json
    - `icon.png` or other `icon.svg`
 1. Make a pull request. After posting, wait a few days for a response. They are checked, merged and published.

## Imported SDK
 - @logseq/libs https://logseq.github.io/plugins/
 - logseq-dateutils https://github.com/hkgnp/logseq-dateutils

## Credit
 - https://github.com/hkgnp/logseqplugin-basic-template
 - https://github.com/YU000jp/logseq-plugin-templete-js
