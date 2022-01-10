const searchInput = document.querySelector('#search-input')
const ul_searchResults = document.querySelector('#searchResults')
const template = document.querySelector('#template')
alert('hi')
searchInput.addEventListener('onInput', () => {
  // const results = search(searchInput.textContent)
  // displayResult(results)
  alert('hi')
  
  // clone = template.content.cloneNode(true);
  //   const span = clone.querySelector('span');
  //   const link = clone.querySelector('#result-link');
  //   span[0].textContent = "examples"
  //   span[1].textContent = "result.title"; 
  //   span[2].textContent = "result.intro"; 
  //   link.setAttribute("href", "/about.html");
})

// const search = input => {
//   //text annotator code
// }
// const displayResult = results =>{
//   results.forEach(result => {
//     clone = template.content.cloneNode(true);
//     const span = clone.querySelector('span');
//     const link = clone.querySelector('#result-link');
//     if('/examples/' in result.inputPath){
//       span[0].textContent = "examples"
//       link.setAttribute("href", "/made-with-paged.js.html")
//     }else{
//       if('/documentation/' in result.inputPath){
//         span[0].textContent = "documentation"
//       }else if('/journal/' in result.inputPath){
//         span[0].textContent = "journal"
//       }
//       link.setAttribute("href", result.url)
//     }
//     span[1].textContent = result.title; 
//     span[2].textContent = result.intro; 
//     ul_searchResults.appendChild(clone);
//   });
// }