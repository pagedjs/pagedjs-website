// check if the element has a break after avoid and move it on next page
//
class avoidBreakAfter extends Paged.Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
  }

  afterPageLayout(pageFragment, page, breakToken) {
    // get the latest element
    // check if there is a element with break after avoid
    // console.log(page)
    // debugger

    const elementToKeep = [
      ...page.area.querySelectorAll(`[data-break-after=avoid]`),
    ].filter((element) => {
      if (element.nextElementSibling) {
        return element;
      }
      let breakTokenPoint = getFirstOf(element);
      return breakTokenPoint;
    });

    let breakTokenPoint = elementToKeep[0];

    if (!breakTokenPoint) return;

    const elementFromSource = this.chunker.source.querySelector(
      `[data-ref="${breakTokenPoint.dataset.ref}"]`
    );

    breakToken.node = elementFromSource;
    breakToken.offset = 0;

    // remove the oldest
    console.log(breakTokenPoint);
    while (breakTokenPoint.nextElementSibling) {
      breakTokenPoint.nextElementSibling.remove();
    }
    breakTokenPoint.remove();
  }
}
Paged.registerHandlers(avoidBreakAfter);

function getFirstOf(element) {
  let firstElement = element;
  while (firstElement && firstElement.dataset.breakAfter == "avoid") {
    console.log(firstElement);
    firstElement = firstElement.previousElementSibling;
  }

  return firstElement;
}
