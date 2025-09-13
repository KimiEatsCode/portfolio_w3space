
let currIndex = 0;

document.body.style.backgroundColor ="#D5006D";

const colors = ["#C51162", "#AA00B6", "#F48FB1", "#eb7063", "#4CAF50", "#2196F3"];

const categories = ["home","print", "web", "code", "marketing", "genAI"];

const tags = ["graphic design","digital marketing","web design","web development","branding"];

const apps = ["Adobe Photoshop", "Adobe Illustrator","Canva Design","Front-End Development"];

const category_html_content = ["home.html", "print.html", "web.html", "code.html", "marketing.html", "genAI.html"];

const project_html_content = ["brand-refresh.html", "core-values.html", "career-banner.html"];


function getNextIndex(array) {
  currIndex = (currIndex + 1) % array.length; // Increment index and wrap around using modulo
  // console.log(`currIndex ${currIndex}`)
  return currIndex;
}

function getNextFileName() {
  const nextIndex = getNextIndex(categories);
  console.log(`nextIndex ${nextIndex}`)
  console.log(categories[nextIndex]);
  return categories[nextIndex];
}

function getPrevIndex(array) {
  currIndex = (currIndex - 1 + array.length) % array.length; // Decrement index and wrap around using modulo
  return currIndex;
}

function getPrevFileName() {
  const prevIndex = getPrevIndex(categories);
  console.log(`prevIndex ${prevIndex}`);
  console.log(categories[prevIndex]);
  return categories[prevIndex];
}

//fetch the HTML file in html content folder based on the current index
//parse the html
//innerHTML equals parsed html

async function getCurrentHtmlFileName(setFileNameIndex) {

   let currentHtmlFileName = category_html_content[currIndex];

  currentHtmlFileName = category_html_content[setFileNameIndex ?? currIndex];

  console.log(`Current category HTML file name: ${currentHtmlFileName}`);
  try {
    const response = await fetch(`../../category-html-content/${currentHtmlFileName}`);
    const html = await response.text();

    // Initialize the DOM parser
    const parser = new DOMParser();

    // Parse the text
    const doc = parser.parseFromString(html, "text/html");
    console.log('doc -- ' + doc);

    // You can now even select part of that html as you would in the regular DOM
    // Example:
    // Use the current file name (without extension) as the selector
    const sectionId = currentHtmlFileName.replace('.html', '');
    const docArticle = doc.querySelector(`#${sectionId}`);

    console.log(docArticle);

    if (docArticle) {
      document.getElementById("htmlFile").innerHTML = docArticle.innerHTML;
    } else {
      document.getElementById("htmlFile").innerHTML = "<p>html content not found.</p>";
    }
  } catch (error) {
    console.error('Failed to fetch page: ', error);
  }
}

//fetch project html content

async function getProjectHtmlContent(setFileNameIndex) {

  let projectHtmlFile = project_html_content[setFileNameIndex];

  console.log(`Get project HTML file: ${projectHtmlFile}`);

  try {
    const response = await fetch(`../../project-html-content/${projectHtmlFile}`);
    const html = await response.text();

    // Initialize the DOM parser
    const parser = new DOMParser();

    // Parse the text
    const doc = parser.parseFromString(html, "text/html");
    console.log('doc -- ' + doc);

    // You can now even select part of that html as you would in the regular DOM
    // Example:
    // Use the current file name (without extension) as the selector
    const sectionId = projectHtmlFile.replace('.html', '');
    console.log('section id: ' + sectionId);
    const docArticle = doc.querySelector(`#${sectionId}`);

    console.log(docArticle);

    if (docArticle) {
      document.getElementById(sectionId + '-content').innerHTML = docArticle.innerHTML;
    } else {
      document.getElementById(sectionId + '-content').innerHTML = "<p>html content not found.</p>";
    }
  } catch (error) {
    console.error('Failed to fetch project page: ', error);
  }
}

//fetch the HTML file name based on the current index
async function getPrevHtmlFileName(setFileNameIndex) {
   let prevHtmlFileName = category_html_content[setFileNameIndex ?? currIndex];

  try {
    const response = await fetch(`../../category-html-content/${prevHtmlFileName}`);
    const html = await response.text();

    // Initialize the DOM parser
    const parser = new DOMParser();

    // Parse the text
    const doc = parser.parseFromString(html, "text/html");
    console.log('doc -- ' + doc);

    // You can now even select part of that html as you would in the regular DOM
    // Example:
    // Use the current file name (without extension) as the selector
    const sectionId = prevHtmlFileName.replace('.html', '');
    const docArticle = doc.querySelector(`#${sectionId}`);

    console.log(docArticle);

    if (docArticle) {
      document.getElementById("htmlFile").innerHTML = docArticle.innerHTML;
    } else {
      document.getElementById("htmlFile").innerHTML = "<p>Section not found.</p>";
    }
  } catch (error) {
    console.error('Failed to fetch page: ', error);
  }
}

function scrollRight() {
  let nextIndex = getNextFileName();
  // document.getElementById(nextIndex).scrollIntoView();
  getCurrentHtmlFileName();
  document.body.style.backgroundColor = colors[categories.indexOf(nextIndex)];
  colors[categories.indexOf(nextIndex)];
}

function scrollLeft() {
  let prevIndex = getPrevFileName();
  // document.getElementById(prevIndex).scrollIntoView();
  getPrevHtmlFileName();
  document.body.style.backgroundColor = colors[categories.indexOf(prevIndex)];
}

/* right mouse events listener to DOM elements for nav*/
const rightArrowContainer = document.getElementById("right-arrow-container");

rightArrowContainer.addEventListener("click", function(event) {
  // event.preventDefault();
  scrollRight();
});


/* left mouse events listener to DOM elements for nav*/
const leftArrowContainer = document.getElementById("left-arrow-container");

leftArrowContainer.addEventListener("click", function(event) {
 
  scrollLeft();
});


/*adding click event listener to DOM elements for nav*/
// document.querySelector('#left-arrow').addEventListener('click', scrollLeft, function(event) {
//   event.preventDefault(); 
//   console.log('left arrow button clicked');
// });

/**** Important to note: javascript to load project html content is actually in-line with html so it will load when the project html file loads - DomParser does not bring over script tag content****
document.querySelector('#project-button-core-values').addEventListener('click', function(event) {
  event.preventDefault();
  getProjectHtmlContent(3);
  console.log('Button clicked core values project should pop up');
});
*/
