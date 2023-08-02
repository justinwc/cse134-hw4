/* dom.js */

function init() {
  let element = document.getElementById("walkBtn");
  element.addEventListener("click", function () {
    walk();
  });

  element = document.getElementById("advWalk");
  element.addEventListener("click", function () {
    advWalk();
  });

  element = document.getElementById("modifyBtn");
  element.addEventListener("click", function () {
    modify();
  });

  element = document.getElementById("advModify");
  element.addEventListener("click", function () {
    advModify();
  });

  element = document.getElementById("addBtn");
  element.addEventListener("click", function () {
    add();
  });

  element = document.getElementById("menuBtn");
  element.addEventListener("click", function () {
    menuAdd();
  });

  element = document.getElementById("removeBtn");
  element.addEventListener("click", function () {
    remove();
  });

  element = document.getElementById("safeRm");
  element.addEventListener("click", function () {
    safeRemove();
  });

  element = document.getElementById("delSec");
  element.addEventListener("click", function () {
    delBySelector();
  });

  element = document.getElementById("basicClone");
  element.addEventListener("click", function () {
    basicClone();
  });

  element = document.getElementById("advClone");
  element.addEventListener("click", function () {
    advClone();
  });
}

function walk() {
  let el;

  el = document.getElementById("p1");
  showNode(el);

  el = el.firstChild;
  showNode(el);

  el = el.nextSibling;
  showNode(el);

  el = el.lastChild;
  showNode(el);

  el = el.parentNode.parentNode.parentNode;
  showNode(el);

  el = el.querySelector("section > *");
  showNode(el);
}

function advWalk() {
  let textArea = document.getElementById("textArea");

  let root = document.documentElement;
  advWalkRecur(root, "", textArea);
}

function advWalkRecur(node, spacer, textArea) {
  let nodeName = node.nodeName;
  if (nodeName.charAt(0) != "#") {
    let newText = `${spacer} ${nodeName}\n`;
    textArea.value += newText;
  }

  let childNodes = node.childNodes;
  for (let childNode of childNodes) {
    advWalkRecur(childNode, spacer + "|--", textArea);
  }
}

function showNode(el) {
  let textArea = document.getElementById("textArea");

  let nodeType = el.nodeType;
  let nodeName = el.nodeName;
  let nodeValue = el.nodeValue;

  let newText = `Node type: ${nodeType} Node name: ${nodeName} Node value: ${nodeValue}\n`;
  textArea.value += newText;
}

function modify() {
  let el = document.getElementById("p1");

  // You can do all the properties one by one if you know them in HTML
  el.title = "I was changed by JS";

  // you can update the style as a string
  // el.style = 'color: blue; font-size: 1em;';

  // you also may prefer to update on the CSS object.  This is the same as above
  // el.style.color = 'blue';
  // el.style.fontSize = '1em';
  // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

  // you can also update the class list
  el.classList.add("fancy");

  // you can also update the dataset which change data-* attributes
  el.dataset.cool = "true"; // data-cool="true"
  el.dataset.coolFactor = "9000"; //data-cool-factor="9000"
}

function advModify() {
  let el = document.getElementById("h1");
  el.textContent = "DOM Manipulation is Fun!";

  let colors = [
    "--darkcolor1",
    "--darkcolor2",
    "--darkcolor3",
    "--darkcolor4",
    "--darkcolor5",
    "--darkcolor6",
  ];
  let randomColor = colors[Math.floor(Math.random() * colors.length)];
  el.style.color = `var(${randomColor})`;

  let p = document.getElementById("p1");
  p.classList.toggle("shmancy");
}

function add() {
  let p, em, txt1, txt2, txt3;

  // first we do things the long old-fashioned standard DOM way
  p = document.createElement("p"); // <p></p>
  em = document.createElement("em"); // <em></em>
  txt1 = document.createTextNode("This is a "); // "This is a"
  txt2 = document.createTextNode("test"); // "test"
  txt3 = document.createTextNode(" of the DOM"); // " of the DOM"

  p.appendChild(txt1); // <p>This is a</p>
  em.appendChild(txt2); // <em>test</em>
  p.appendChild(em); // <p>This is a<em>test</em></p>
  p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

  // go an insert this new copy below the old one
  let oldP = document.getElementById("p1");
  oldP.parentNode.insertBefore(p, oldP.nextSibling);

  // Alternative method using innerHTML and insertAdjacentHTML
  // let oldP = document.getElementById('p1');
  // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
  // clearly short hands are pretty easy!
}

function menuAdd() {
  let userChoice = document.getElementById("type").value;
  let content = document.getElementById("content").value;
  let tagName = document.getElementById("tagName").value;
  let output = document.getElementById("out");

  let result;

  if (content == "") {
    if (userChoice == "textNode") {
      result = document.createTextNode(
        `New Text Node ${new Date().toLocaleString()}\n`
      );
    } else if (userChoice == "comment") {
      result = document.createComment(
        `New Comment ${new Date().toLocaleString()}`
      );
    } else if (userChoice == "element") {
      result = document.createElement(tagName);
      result.textContent = `New Element ${new Date().toLocaleString()}\n`;
    }
  } else {
    if (userChoice == "textNode") {
      result = document.createTextNode(
        `${content} ${new Date().toLocaleString()}\n`
      );
    } else if (userChoice == "comment") {
      result = document.createComment(
        `${content} ${new Date().toLocaleString()}`
      );
    } else if (userChoice == "element") {
      result = document.createElement(tagName);
      result.textContent = `${content} ${new Date().toLocaleString()}\n`;
    }
  }

  output.appendChild(result);
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeRemove() {
  let protected = document.getElementById("controls");
  let pageElements = document.body.children;

  //from the bottom up
  for (let i = pageElements.length - 1; i >= 0; i--) {
    let element = pageElements[i];
    if (element !== protected) document.body.removeChild(element);
  }
}

function delBySelector() {
  let selector = document.getElementById("selector").value;
  let selected = document.querySelectorAll(selector);

  selected.forEach((element) => {
    element.remove();
  });
}

function basicClone() {
  let p1 = document.getElementById("p1");
  let clone = p1.cloneNode(true);
  p1.parentNode.insertBefore(clone, p1.nextSibling);
}

function advClone() {
  let cardTemplate = document.getElementById("cardTemplate");
  let cards = document.getElementById("cards");

  let clone = cardTemplate.content.cloneNode(true);
  let cardTitle = `Card ${Math.floor(Math.random() * 100) + 1}`;
  let cardText = "This is card text";

  let cloneImg = clone.querySelector("img");
  cloneImg.src = `https://source.unsplash.com/random/300x200?`;

  let cloneTitle = clone.querySelector("h2");
  cloneTitle.textContent = cardTitle;

  let cloneText = clone.querySelector("p");
  cloneText.textContent = cardText;

  cards.appendChild(clone);
}

window.addEventListener("DOMContentLoaded", init);
