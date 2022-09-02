class addLang extends Paged.Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
    this.lang = [];
  }
  onDeclaration(declaration, dItem, dList, rule) {
    // move the element to the next bit
    if (declaration.property == "--experimental-pagedjs-lang") {
      console.log(declaration);
      let sel = csstree.generate(rule.ruleNode.prelude);
      sel = sel.replace('[data-id="', "#");
      sel = sel.replace('"]', "");
      let itemsList = sel.split(",");
      console.log('itemlist', itemsList)
      itemsList.forEach((elId) => { 
        this.lang.push([elId, declaration.value.value.trim()]);
      });
    }
  }

  beforeParsed(parsed) {
    console.log(this.lang)
    if (this.lang.length > 0) {
      this.lang.forEach((elToLang) => {
        const elem = parsed.querySelector(elToLang[0]);
        if (!elem) {
          console.log("no elem to change the lang!");
          return;
        }
        elem.lang = elToLang[1];
      });
    }
  }
}

Paged.registerHandlers(addLang);

