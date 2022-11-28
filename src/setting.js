export const settingUI = () => {
    /* https://logseq.github.io/plugins/types/SettingSchemaDesc.html */
    const settingsTemplate = [
        {
            key: "CommaSeparatedOptions",
            type: "string",
            title: "Options for Workflow 1",
            description: "Enter your desired workflow options, separated by commas. i.e. 'TODO, DOING, WAITING, CANCELED'",
            default: "TODO, CANCELLED, WAITING, DONE"
        }
    ];
    logseq.useSettingsSchema(settingsTemplate);
};