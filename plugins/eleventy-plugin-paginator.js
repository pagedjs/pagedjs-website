module.exports = (collection, page, modifier=0) =>{
    let currentIndex;
    for (let index = 0; index < collection.length; index++) {
      const item = collection[index + modifier];
      if (
        item.inputPath === page.inputPath &&
        item.outputPath === page.outputPath
      ) {
        currentIndex = index;
        break;
      }
    }
    let previousItem = collection[currentIndex - 1], nextItem = collection[currentIndex + 1]
    console.log(`page: ${page}, currentIndex: ${currentIndex}`)
    if(previousItem !== undefined && nextItem !== undefined)
      return  `<aside class="paginator both">
                <a class="previous" href="${previousItem.url}">${previousItem.data.title}</a>
              <a class="next" href=${nextItem.url}>${nextItem.data.title}</a></aside>`;
    if(previousItem !== undefined) 
      return `<aside class="paginator">
                <a class="previous" href="${previousItem.url}">${previousItem.data.title}</a></aside>`;
    if(nextItem !== undefined)
    return `<aside class="paginator">
    <a class="next" href=${nextItem.url}>${nextItem.data.title}</a>    </aside>`;
}


