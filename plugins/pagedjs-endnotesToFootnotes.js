// script for pagedjs
//
// get the object you wanna create a note from
//
//

const endNoteCalloutsQuery = ".footnote-ref";

// the hook
class endToFootNotes extends Paged.Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
  }

  beforeParsed(content) {
    console.log("parsef");
    let callouts = content.querySelectorAll(endNoteCalloutsQuery);
    callouts.forEach((callout) => {
      console.log(callout.hash)
      // console.log(callout.href)
      // console.log(`#${callout.href.callout.href.hash}`)
      let note = content.querySelector(callout.hash);
      console.log(note)
      if(!note) {return console.warn(`there is no note with the id of ${callout.hash}`)}
      let noteContent = `<span class="pagedjs-end-to-footnote">${note.innerHTML}</span>`;
      callout.insertAdjacentHTML("afterend", noteContent);
      callout.remove();
      note.remove();
    });
  }
}
Paged.registerHandlers(endToFootNotes);
