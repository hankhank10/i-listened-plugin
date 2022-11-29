} catch (e) {

    console.log(e)

    if (logseq.settings["LogSpotToken"] === "") {
      results_array.push("This plugin has not yet been initialised.")
      results_array.push("In order to use this plugin, you must first authenticate with Spotify by visiting https://logspot.top/");
      results_array.push("Once you have authenticated, you will be given a token. Enter that token in the LogSpot plugin settings.");
    } else {
      results_array.push("There was a problem fetching your data from Spotify.");
      results_array.push("This may be resolved by refreshing your token at https://logspot.top/");
      results_array.push("Your current token is: " + logseq.settings["LogSpotToken"]);
    }
    return results_array;
  }