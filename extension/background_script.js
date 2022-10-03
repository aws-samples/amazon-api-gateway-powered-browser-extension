function get_translation(tab) {

  // Request selection text from content_script
  browser.tabs.sendMessage(
    tab.id,
    {request: "text_to_translate"}
  ).then(response => {
    // Get the text to translate from content_script reply
    text_to_translate = response.text_to_translate

    var xhr = new XMLHttpRequest();

    const formData = new FormData();
    formData.append('text_to_translate', text_to_translate);

    // Replace this part of the URL by your API Gateway URL
    //                vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    xhr.open("POST", "https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/translate", true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // Send translation back to content_script for display
        browser.tabs.sendMessage(
          tab.id,
          {translated_text: JSON.parse(xhr.responseText).translated_text}
        )
      }
    }

    xhr.send(formData)

  })
}

// Create the context menu option for translation
browser.menus.create({
  id: "get-translation"
  , title: "Translate selected text"
  , contexts: ["all"]
});

// Code to run when context menu option for translation is selected
browser.menus.onClicked.addListener(function(info, tab) {
  if ( info.menuItemId == "get-translation" ) {
    get_translation(tab);
  }
});
