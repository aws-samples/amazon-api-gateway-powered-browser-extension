"use strict";

browser.runtime.onMessage.addListener(request => {

  if (request.request) {
    return Promise.resolve({
      // Reply to background_script with selection text
      text_to_translate: getSelection().toString().trim()
    });

  } else if (request.translated_text) {
    // Delete the selected region
    getSelection().getRangeAt(0).deleteContents()

    // Replace with translation text
    getSelection().getRangeAt(0).insertNode(document.createTextNode(request.translated_text.toString()))
  }

});

document.body.style.border = "5px solid #FF9900"; // Orange border on page when Extension is loaded