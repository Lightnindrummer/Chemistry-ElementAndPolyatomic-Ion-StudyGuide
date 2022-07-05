"use strict";
var elements = [
  ["Aluminum", "Al"],
  ["Barium", "Ba"],
  ["Cadmium", "Cd"],
  ["Fluorine", "F"],
  ["Helium", "He"],
  ["Iron", "Fe"],
  ["Magnesium", "Mg"],
  ["Nickel", "Ni"],
  ["Potassium", "K"],
  ["Sulfur", "S"],
  ["Argon", "Ar"],
  ["Boron", "B"],
  ["Carbon", "C"],
  ["Cobalt", "Co"],
  ["Copper", "Cu"],
  ["Lead", "Pb"],
  ["Manganese", "Mn"],
  ["Neon", "Ne"],
  ["Oxygen", "O"],
  ["Silicon", "Si"],
  ["Arsenic", "As"],
  ["Bromine", "Br"],
  ["Chlorine", "Cl"],
  ["Chromium", "Cr"],
  ["Gold", "Au"],
  ["Hydrogen", "H"],
  ["Iodine", "I"],
  ["Lithium", "Li"],
  ["Nitrogen", "N"],
  ["Phosphorus", "P"],
  ["Beryllium", "Be"],
  ["Calcium", "Ca"],
  ["Cesium", "Cs"],
  ["Mercury", "Hg"],
  ["Platinum", "Pt"],
  ["Silver", "Ag"],
  ["Sodium", "Na"],
  ["Strontium", "Sr"],
  ["Tin", "Sn"],
  ["Zinc", "Zn"],
];
var ions = [
  ["Ammonium", "NH4 +1"],
  ["Acetate", "C2H3O2 -1"],
  ["Bicarbonate", "HCO3 -1"],
  ["Bromate", "BrO3 -1"],
  ["Chlorate", "ClO3 -1"],
  ["Cyanide", "CN -1"],
  ["Hydroxide", "OH -1"],
  ["Iodate", "IO3 -1"],
  ["Nitrate", "NO3 -1"],
  ["Permanganate", "MnO4 -1"],
  ["Carbonate", "CO3 -2"],
  ["Chromate", "CrO4 -2"],
  ["Dichromate", "Cr2O7 -2"],
  ["Oxalate", "C2O4 -2"],
  ["Sulfate", "SO4 -2"],
  ["Phosphate", "PO4 -3"],
];
var numberOfIonQuestions = Number(document.getElementsByClassName("questionInput")[1].value);
var numberOfElementQuestions = Number(document.getElementsByClassName("questionInput")[0].value);
var option = document.getElementById("optionIcon");
var questionDisplay = document.getElementById("numOfQuestions");
var answerKey = [];
questionDisplay.innerHTML =
  "Questions: " +
  numberOfElementQuestions +
  " Element Questions, " +
  numberOfIonQuestions +
  " Ion Questions";
const randomNum = function getRandomNum(max) {
  return Math.floor(Math.random() * max);
};
var startbutton = document.getElementById("startbutton");
var elementQuestions = document.getElementsByClassName("chemQuestions");
var navBarElement = document.querySelectorAll(".navElement");

[...document.getElementsByClassName("questionInput")].forEach((elements) => {
  elements.addEventListener("change", function () {
    numberOfIonQuestions = Number(document.getElementsByClassName("questionInput")[1].value);
    numberOfElementQuestions = Number(document.getElementsByClassName("questionInput")[0].value);
    questionDisplay.innerHTML =
      "Questions: " +
      numberOfElementQuestions +
      " Element Questions, " +
      numberOfIonQuestions +
      " Ion Questions";
  });
});

function ifClicked(element) {
  if (element.classList.contains("clicked")) {
    element.classList.remove("clicked");
  } else {
    element.classList.add("clicked");
  }
}

function addClickEvents() {
  option.addEventListener("click", function () {
    ifClicked(document.getElementById("navBar"));
  });
  navBarElement.forEach((element) => {
    var arrayOfNavBarElements = [...navBarElement];
    var i = arrayOfNavBarElements.indexOf(element);
    element.getElementsByTagName("p")[0].addEventListener("click", function () {
      var arrow = document.getElementsByClassName("arrow")[i];
      ifClicked(arrow);
      ifClicked(element.getElementsByTagName("div")[0]);
    });
  });
  document.getElementById("checkAnswerButton").addEventListener("click", getAndCheckAnswers);
  document.getElementById("retry-button").addEventListener("click", retry);
}
addClickEvents();

startbutton.addEventListener("click", function () {
  document.getElementById("mainFirst").style.display = "none";
  startbutton.style.display = "none";
  document.getElementById("question-page").style.display = "flex";
  getRandomQuestions();
});

function getRandomQuestions(elementQuestions, ionQuestions, elementArr, ionArr) {
  if (Array.isArray(elementQuestions) == false && Array.isArray(ionQuestions) == false) {
    elementQuestions = [];
    ionQuestions = [];
    elementArr = elements;
    ionArr = ions;
  }
  while (
    elementQuestions.length !== numberOfElementQuestions ||
    ionQuestions.length !== numberOfIonQuestions
  ) {
    var element = elementArr[randomNum(elementArr.length - 1)];
    var ion = ionArr[randomNum(ionArr.length - 1)];
    if (element !== undefined && elementQuestions.length !== numberOfElementQuestions) {
      elementQuestions.push(element);
    }
    if (ion !== undefined && ionQuestions.length !== numberOfIonQuestions) {
      ionQuestions.push(ion);
    }
  }
  checkDuplicateQuestions(elementQuestions, ionQuestions);
}

function checkDuplicateQuestions(elementQuestions, ionQuestions) {
  elementQuestions = [...new Set(elementQuestions)];
  ionQuestions = [...new Set(ionQuestions)];
  if (
    elementQuestions.length !== numberOfElementQuestions ||
    ionQuestions.length !== numberOfIonQuestions
  ) {
    var newElementArr = elements.filter((x) => !elementQuestions.includes(x));
    var newIonArr = ions.filter((x) => !ionQuestions.includes(x));
    getRandomQuestions(elementQuestions, ionQuestions, newElementArr, newIonArr);
  } else {
    addQuestionsToPage(elementQuestions, ionQuestions);
  }
}

function addQuestionsToPage(element, ion) {
  for (var i = 0; i < element.length; i++) {
    var parent = document.createElement("div");
    var question = document.createElement("div");
    var answer = document.createElement("input");
    parent.classList.add("parent");
    question.classList.add("question");
    answer.classList.add("answer");
    answer.type = "text";
    document.getElementById("question-container").appendChild(parent);
    parent.appendChild(question);
    parent.appendChild(answer);
    if (i > Math.floor(element.length / 2 - 1)) {
      question.innerHTML = i + 1 + ". " + element[i][1];
      answerKey.push(element[i][0]);
    } else {
      question.innerHTML = i + 1 + ". " + element[i][0];
      answerKey.push(element[i][1]);
    }
  }
  for (var i = 0; i < ion.length; i++) {
    var parent = document.createElement("div");
    var question = document.createElement("div");
    var answer = document.createElement("input");
    parent.classList.add("parent");
    question.classList.add("question");
    answer.classList.add("answer");
    answer.type = "text";
    document.getElementById("question-container").appendChild(parent);
    parent.appendChild(question);
    parent.appendChild(answer);
    if (i > Math.floor(ion.length / 2 - 1)) {
      question.innerHTML = i + 1 + element.length + ". " + ion[i][1];
      answerKey.push(ion[i][0]);
    } else {
      question.innerHTML = i + 1 + element.length + ". " + ion[i][0];
      answerKey.push(ion[i][1]);
    }
  }
  return console.log(element, ion, answerKey);
}

function getAndCheckAnswers() {
  var answers = Array.from(document.getElementsByClassName("answer"));
  answers.forEach((element) => (element.readOnly = true));
  var correct = 0;
  for (var i = 0; i < answerKey.length; i++) {
    if (answerKey[i] == answers[i].value) {
      correct++;
    } else {
      answers[i].classList.add("wrong");
      document.getElementsByClassName("question")[i].classList.add("wrong");
    }
  }
  document.getElementById("retry-button").style.display = "block";
  document.getElementById("score").style.display = "inline";
  document.getElementById("score").innerHTML =
    "Score: " + Math.floor((correct / answerKey.length) * 100) + "%";
}
function test() {
  var answers = Array.from(document.getElementsByClassName("answer"));
  for (var i = 0; i < answerKey.length; i++) {
    answers[i].value = answerKey[i];
  }
}
function retry() {
  document.getElementById("question-container").innerHTML = ""; 
  answerKey = []
  document.getElementById("retry-button").style.display = "none";
  document.getElementById("score").style.display = "none";
  getRandomQuestions();
}
