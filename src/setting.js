export const settingUI = () => {
    /* https://logseq.github.io/plugins/types/SettingSchemaDesc.html */
    const settingsTemplate = [
        {
            key: "LogSpotToken",
            type: "string",
            title: "Your LogSpot Token",
            description: "To link with Spotify, visit https://logspot.top. Once you authenticate with Spotify, the site will generate a token. Enter it below.",
            default: "6bd78d5a03364c44e5f620545b56eae63b49b9e2f595efa14ac26262cf3f4737fea5730678312963"
        }
    ];
    logseq.useSettingsSchema(settingsTemplate);
};