import { data } from "./data";
import gsap from "gsap";

// This is the data we will be using to create our articles. Look at it, then proceed to line 93.
// OPTIONAL: if you're feeling adventurous, try to make this data an export from a different module, and import it here.
// You can read about ES6 modules here: https://exploringjs.com/es6/ch_modules.html#sec_basics-of-es6-modules

/*
  Step 1: Write a component called 'articleMaker' to create an article.
  Your component is a function that takes an article object as its only argument,
  and returns a DOM node looking like the one below:




  
  <div class="article">
    <h2>{title of the article}</h2>
    <p class="date">{date of the article}</p>

    {three separate paragraph elements}

    <span class="expandButton">+</span>
  </div>

  Step 2: Still inside `articleMaker`, add an event listener to the span.expandButton.
  This listener should toggle the class 'article-open' on div.article.

  Step 3: Don't forget to return something from your function!

  Step 4: Outside your function now, loop over the data. At each iteration you'll use your component
  to create a div.article element and append it to the DOM inside div.articles (see index.html).

  Step 5: Try adding new article object to the data array. Make sure it is in the same format as the others.
  Refresh the page to see the new article.
*/

function articleMaker(article) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("article");
  const newTitle = document.createElement("h2");
  newTitle.textContent = article.title;
  newDiv.appendChild(newTitle);
  const newP = document.createElement("p");
  newP.classList.add("date");
  newP.textContent =
    article.date +
    "\n" +
    article.firstParagraph +
    "\n" +
    article.secondParagraph +
    "\n" +
    article.thirdParagraph +
    "\n";
  newDiv.appendChild(newP);
  const newSp = document.createElement("span");
  newSp.classList.add("expandButton");
  newSp.textContent = "Click to Open";
  newDiv.appendChild(newSp);
  newSp.addEventListener("click", (e) => {
    // Toggle 'article open' class below
    if (!newDiv.classList.contains("article-open")) {
      newDiv.classList.add("article-open");
      newSp.textContent = "Click to Close, Closer";
    } else if (newDiv.classList.contains("article-open")) {
      newDiv.classList.remove("article-open");
      newDiv.classList.add("article-close");
      newSp.textContent = "Click to Open";
    }
    // animation for opening and closing below
    if (newDiv.classList.contains("article-open")) {
      gsap.to(".article-open", 2, { height: "+= 300px" });
    } else if (!newDiv.classList.contains("article-open")) {
      e.path[1].style.height = "50px";
    }
  });
  // New span and functionality to delete element when done
  const newSpre = document.createElement("span");
  newSpre.classList.add("removeButton");
  newSpre.textContent = "I'm done with this ish";
  newDiv.appendChild(newSpre);
  newSpre.addEventListener("click", () => {
    newDiv.style.display = "none";
  });
  return newDiv;
}

console.log(articleMaker(data[0]));

let openMen = false;

document.querySelector("body").addEventListener("click", function (e) {
  if (openMen === false && e.target.nodeName === "IMG") {
    gsap.to(".menu", 2.5, { left: "+=350", ease: "bounce" });
    return (openMen = true);
  } else if (openMen === true) {
    gsap.to(".menu", 2.5, { left: "-=350", ease: "bounce" });
    return (openMen = false);
  }
});

function addData(arr, input1, input2, input3, input4, input5) {
  let newObj = {
    title: input1,
    date: input2,
    firstParagraph: input3,

    secondParagraph: input4,

    thirdParagraph: input5,
  };
  arr.push(newObj);
}

addData(
  data,
  "A new Article!!!",
  "Nov 5th 1944",
  "THis is the damn first paragraph",
  "second para",
  "third para"
);

console.log(data);

data.forEach((elem) => {
  let curArt = articleMaker(elem);
  // console.log(curArt)
  document.querySelector(".articles").appendChild(curArt);
});
