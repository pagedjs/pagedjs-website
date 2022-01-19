const searchInput = document.querySelector('#searchInput')
const ul_searchResults = document.querySelector('#results')
const template = document.querySelector('.content')
const annotator = new TextAnnotator({content: document.querySelector('.content').innerHTML})

searchInput.addEventListener('change', () => {
  showFound(searchInput.value);
})

function showFound(items) {

  let highlightIndexes = annotator.searchAll(items)
  if (highlightIndexes.length) {
    template.innerHTML = annotator.highlightAll(highlightIndexes, {highlightTagName: 'mark'});
    
  }
}
