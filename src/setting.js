export const settingUI = () => {
    /* https://logseq.github.io/plugins/types/SettingSchemaDesc.html */
    const settingsTemplate = [
        {
            key: "LogSpotToken",
            type: "string",
            title: "Your LogSpot Token",
            description: "To link with Spotify, visit https://logspot.top. Once you authenticate with Spotify, the site will generate a token. Enter it below.",
            default: "6bd78d5a03364c44e5f620545b56eae63b49b9e2f595efa14ac26262cf3f4737fea5730678312963"
        },
        {
            key: "LogSpotHeading",
            type: "string",
            title: "Text to insert before Spotify song list",
            description: "This text will be inserted before the list of songs. You can use Markdown formatting here.",
            default: "🎺 Today on [[spotify]]:"
        },
        {
            key: "LogSpotLinkArtist",
            type: "boolean",
            title: "Include [[Artist name]] as link",
            description: "If this is checked, the artist name will be included as a [[link]] in Markdown",
            default: true
        }
    ];
    logseq.useSettingsSchema(settingsTemplate);
};