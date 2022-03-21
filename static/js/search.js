const searchInput = document.querySelector("#searchInput");
// const searchIcon = document.querySelector("#searchIcon");
let content;

if (document.querySelector("template")) {
content = document.querySelector("template").innerHTML
} else {
    const template = document.createElement('template');
    template.innerHTML = document.querySelector('main').innerHTML;
}
const resultSpace = document.querySelector(".results");
let queryList = new Set();
searchInput.addEventListener("change", search);
// searchIcon.addEventListener("click", search);

let result = document.createElement("div");

// button used to store previous queries
document
  .querySelector(".previousSearch")
  .addEventListener("click", function (event) {
    if (event.target.className.includes("previousQuery")) {
      searchInput.value = event.target.textContent;

      search();
    }
    if (event.target.className == "clearPrevious") {
      queryList.clear();
      this.innerHTML = `<button class="clearPrevious">clear previous queries</button>`;
      resultSpace.innerHTML = `<p>Please fill the input to search (2 letters min)</p>`;
    }
  });

// if one expression word search
function search() {
  if (searchInput.value.length < 2) {
    return;
  }
  result.innerHTML = "";
  //   empty  resultSpace
  resultSpace.innerHTML = "";

  //   split search with ,
  let searches = searchInput.value.trim().split(/\s?,\s?/);

  //select the radio button group andor
  const andor = document.querySelectorAll('input[name = "andor"]')
  let andorResult = "";
  //for each radio button in andor 
  andor.forEach(radioButton => {
    //find the checked radioButton
    if(radioButton.checked){
      //assign the id of the checked radio button to andorResult
      andorResult = radioButton.value;      
    }
  });

  // changed foreach to every => reason: stop iterating when you get valid result for or, finish all iterations for and
  //   for each experssion search
  searches.every((query, index) => {
    let regex = new RegExp(`(${query})`, "gis");
    // update list of previous searches
    if (queryList.has(query)) {
      document.querySelectorAll(`.previousQuery`).forEach((previous) => {
        if (previous.textContent == query) {
          previous.classList.add("multiple");

          previous.dataset.searched
            ? (previous.dataset.searched =
                parseInt(previous.dataset.searched, 10) + 1)
            : (previous.dataset.searched = 2);
        }
      });
    } else {
      document
        .querySelector(".previousSearch")
        .insertAdjacentHTML(
          "afterbegin",
          `<button class="previousQuery">${query}</button>`
        );
      queryList.add(query);
    }
    //mark results
    if (!result.innerHTML.length > 0) {
      result.innerHTML = content.replace(
        regex,
        `<mark class=query-${index}>$1</mark>`
      );
    } else {
      result.innerHTML = result.innerHTML.replace(
        regex,
        `<mark class=query-${index}>$1</mark>`
      );
    }
    //check for valid result
    let validResult = result.getElementsByTagName('mark')

    //if result is valid and 'or' is checked return false (since every stops iteration at first false return)
    if(validResult.length > 0 && andorResult == "or") return false;
    // every keeps iterating on true returns
    else return true;
  });

  result.querySelectorAll("section").forEach((section, index) => {
    if (section.querySelector("mark")) {
      
      
      resultSpace.insertAdjacentHTML(
        "beforeend",
        `<h3 class="search-title"><span>in</span> component ${index} — ${
          section.querySelector("h1").innerHTML
        }</h3>`
      );

      section.querySelectorAll("mark").forEach((mark) => {
        let markParent = mark.closest("p, figure, table, blockquote, h2, h3, h1, li");
        console.log(section); 
        console.log(markParent); 
        if (markParent && markParent.dataset.done != "true") { 
            let markparentID = markParent.id.replace(/<mark class=\query-\d+\>/, '')
            markparentID = markparentID.replace('</mark>', "");
            console.log(markparentID);
            
          markParent.insertAdjacentHTML(
            "beforeend", 
            `<a target="_blank" href="../chap${minTwoDigits(index + 1)}/index.html${markParent.id ? '#' + markparentID : ""}"><span class="icon">→</span>Check the element in context</a>`
          );
          markParent.dataset.done = "true";
        }
        //commented to show result for both 'and' and 'or'
        // if (document.querySelector("#or").checked) {
        //   console.log(mark.closest("p, figure, table, blockquote, h2, h3"));
        // } else 
        if(markParent) {
          console.log(markParent)
          resultSpace.insertAdjacentElement("beforeend", markParent);
        }
      });
    }
  });
}


function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }
  
// this is old
// const searchInput = document.querySelector('#searchInput')
// const ul_searchResults = document.querySelector('#results')
// const template = document.querySelector('.content')
// const annotator = new TextAnnotator({content: document.querySelector('.content').innerHTML})

// searchInput.addEventListener('change', () => {
//   showFound(searchInput.value);
// })

function showFound(items) {

  let highlightIndexes = annotator.searchAll(items)
  if (highlightIndexes.length) {
    template.innerHTML = annotator.highlightAll(highlightIndexes, {highlightTagName: 'mark'});
    
  }
}