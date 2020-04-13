let activeTopic = "Linked List";
let doneColor = "lightgreen";
let todoColor = "skyblue";
let optionalColor = "rgb(209, 104, 209)";
let doubtColor = "rgb(252, 119, 119)";
var jsonData;
$(document).ready(() => {
  initializeLocalStorage();

  let topicBtns = $(".topic-btn");
  topicBtns.click(() => {
    highlightActiveTopicBtn(topicBtns);
    setActiveTopic();
    showActiveTopic();
    setButtonsColor();
  });

  showActiveTopic();
  setButtonsColor();
});

function initializeLocalStorage() {
  if (localStorage.getItem("myJsonData") == null) {
    jsonData = {
      "Linked List": {},
      "Binary Trees": {},
      "Binary Search Trees": {}
    };
    localStorage.setItem("myJsonData", JSON.stringify(jsonData));
  }
}

function getJsonData() {
  let data = localStorage.getItem("myJsonData");
  jsonData = JSON.parse(data);
}

function saveJsonData() {
  localStorage.setItem("myJsonData", JSON.stringify(jsonData));
}

function highlightActiveTopicBtn(topicBtns) {
  let currBtn = event.target;
  for (let i = 0; i < topicBtns.length; i++) {
    if (currBtn == topicBtns[i]) {
      topicBtns[i].style.backgroundColor = "yellow";
    } else {
      topicBtns[i].style.backgroundColor = "wheat";
    }
  }
}

function setActiveTopic() {
  let currBtn = event.target;
  activeTopic = currBtn.innerText;
}

function showActiveTopic() {
  let data = localStorage.getItem("myJsonData");
  jsonData = JSON.parse(data);
  a = 10;
  for (var topicName in jsonData) {
    if (topicName == activeTopic) {
      showAllSubtopics(topicName);
    }
  }
}

function updateJsonData(type, key) {
  if (type == undefined) {
    localStorage.setItem("myJsonData", JSON.stringify(jsonData));
    return;
  }

  let data = localStorage.getItem("myJsonData");
  jsonData = JSON.parse(data);
  let statusObj = {
    All: [],
    Done: [],
    Todo: [],
    Optional: [],
    Doubt: []
  };

  switch (type) {
    case "sub-topic":
      if (jsonData[activeTopic][key] == null) {
        jsonData[activeTopic][key] = {};
        jsonData[activeTopic][key] = statusObj;
      }
      break;
  }
  document.getElementById("json-viewer").value = JSON.stringify(jsonData);
  localStorage.setItem("myJsonData", JSON.stringify(jsonData));
}

////////////////////////////////////////////////////////////////////////////////////////////////

function clearSubTopicsContainer() {
  let subTopicsContainer = $(".sub-topics-container")[0];
  subTopicsContainer.innerHTML = "";
}

function showAllSubtopics(topicName) {
  clearSubTopicsContainer();
  let index = 0;
  for (var subTopicName in jsonData[topicName]) {
    showSubTopic(topicName, subTopicName, index);
    index++;
  }
}

function showSubTopic(topicName, subTopicName, index) {
  let subTopicsContainer = $(".sub-topics-container")[0];

  let templateForSubTopic = document.getElementById("templateForSubtopic");
  var clon = templateForSubTopic.content.cloneNode(true);
  subTopicsContainer.appendChild(clon);

  let headingLg = $(".heading-lg");
  headingLg[index].innerText = subTopicName;

  showQuestionsStatus(topicName, subTopicName);
  showQuestions(topicName, subTopicName, index);
}

function showQuestionsStatus(topicName, subTopicName) {
  let doneQuestions, todoQuestions, optionalQuestions, doubtQuestions;
  doneQuestions = jsonData[topicName][subTopicName]["Done"];
  todoQuestions = jsonData[topicName][subTopicName]["Todo"];
  optionalQuestions = jsonData[topicName][subTopicName]["Optional"];
  doubtQuestions = jsonData[topicName][subTopicName]["Doubt"];

  let allHeadings = document.querySelectorAll(".heading-lg");
  let doneContainer, todoContainer, optionalContainer, doubtContainer;
  for (let i in allHeadings) {
    if (subTopicName == allHeadings[i].innerText) {
      doneContainer = allHeadings[i].parentNode.querySelector(".done");
      todoContainer = allHeadings[i].parentNode.querySelector(".todo");
      optionalContainer = allHeadings[i].parentNode.querySelector(".optional");
      doubtContainer = allHeadings[i].parentNode.querySelector(".doubt");
      break;
    }
  }
  for (let i in doneQuestions) {
    doneContainer.innerHTML =
      doneContainer.innerHTML + doneQuestions[i] + " / ";
  }
  for (let i in todoQuestions) {
    todoContainer.innerHTML =
      todoContainer.innerHTML + todoQuestions[i] + " / ";
  }
  for (let i in optionalQuestions) {
    optionalContainer.innerHTML =
      optionalContainer.innerHTML + optionalQuestions[i] + " / ";
  }
  for (let i in doubtQuestions) {
    doubtContainer.innerHTML =
      doubtContainer.innerHTML + doubtQuestions[i] + " / ";
  }
}

function showQuestions(topicName, subTopic, index) {
  let prevQuestions = $(".prev-questions")[index];
  prevQuestions.innerHTML = "";
  //div which contains questions already present and new questions can be appended to it

  let questionsLinks = jsonData[topicName][subTopic]["All"];

  for (let i = 0; i < questionsLinks.length; i++) {
    let templateForQuestion = document.getElementById("templateForQuestion");
    let clon = templateForQuestion.content.cloneNode(true);
    prevQuestions.appendChild(clon);

    let questionName = getTopicNameFromUrl(questionsLinks[i]);
    let questionURL = questionsLinks[i];
    let questionLink = prevQuestions.querySelectorAll(".question-link")[i];
    // console.log(questionLink);
    questionLink.innerHTML = `<qno>${i +
      1}</qno>.<a href="${questionURL}" target="_blank">${questionName}</a>`;
  }
}

function setSpecificButtonsColors(
  allHeadings,
  btnType,
  subTopic,
  status,
  btnColor
) {
  let btns = allHeadings.parentNode.querySelectorAll(btnType);
  let questions = jsonData[activeTopic][subTopic][status];
  for (let j in questions) {
    btns[questions[j] - 1].style.backgroundColor = btnColor;
  }
}
function setButtonsColor() {
  let allHeadings = document.querySelectorAll(".heading-lg");

  let data = localStorage.getItem("myJsonData");
  jsonData = JSON.parse(data);

  for (let subTopic in jsonData[activeTopic]) {
    for (let i = 0; i < allHeadings.length; i++) {
      if (allHeadings[i].innerText == subTopic) {
        setSpecificButtonsColors(
          allHeadings[i],
          ".btn-done",
          subTopic,
          "Done",
          doneColor
        );

        setSpecificButtonsColors(
          allHeadings[i],
          ".btn-todo",
          subTopic,
          "Todo",
          todoColor
        );

        setSpecificButtonsColors(
          allHeadings[i],
          ".btn-optional",
          subTopic,
          "Optional",
          optionalColor
        );

        setSpecificButtonsColors(
          allHeadings[i],
          ".btn-doubt",
          subTopic,
          "Doubt",
          doubtColor
        );

        break;
      }
    }
  }
}

function addSubTopic() {
  subTopicName = $("#sub-topic-name").val();
  updateJsonData("sub-topic", subTopicName);
  showAllSubtopics(activeTopic);
}

///////////////////////////////   String utility functions   ///////////////////////////////////

function toTitleCase(str) {
  return str.replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////

function getTopicNameFromUrl(url) {
  let lastIndex = url.length - 1;
  let topicName = [];
  for (let i = lastIndex - 1; i >= 0; i--) {
    if (url[i] == "/") {
      break;
    }
    if (url[i] == "-") {
      topicName.push(" ");
    } else {
      topicName.push(url[i]);
    }
  }
  topicName = topicName.reverse();
  topicName = topicName.join().replace(new RegExp(",", "g"), "");
  topicName = toTitleCase(topicName);
  return topicName;
}

////////////////////////////////////////////////////////////////////////////////////////////////

function toggleQuestionLinkContainer(index) {
  let currTextBox = $(".questions-links-container")[index];
  let addBtn = $(".add-btn")[index];
  let cancelBtn = $(".cancel-btn")[index];
  if (addBtn.innerText == "Add Questions") {
    currTextBox.style.display = "block";
    addBtn.innerText = "Add";
    cancelBtn.style.display = "inline";
  } else {
    currTextBox.style.display = "none";
    addBtn.innerText = "Add Questions";
    cancelBtn.style.display = "none";
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////

function addQuestions() {
  let currBtn = event.target;
  let index;
  let totalQuestions = 0;
  for (let i = 0; i < $(".add-btn").length; i++) {
    totalQuestions += $(".prev-questions")[i].querySelectorAll(".question")
      .length;
    if (currBtn == $(".add-btn")[i]) {
      index = i;
      break;
    }
  }

  toggleQuestionLinkContainer(index);

  if (currBtn.innerText == "Add") {
    return;
  }

  let activeSubtopic = $(".heading-lg")[index].innerText;

  let questionsLinksContainer = $(".questions-links-container")[index]; //corresponds to textbox
  let questionsLinks = questionsLinksContainer.value.split("\n"); //getting each question link from textbox into an array
  if (questionsLinks == "") {
    return;
  }

  for (let i in questionsLinks) {
    jsonData[activeTopic][activeSubtopic]["All"].push(questionsLinks[i]);
  }
  $("#json-viewer").val(JSON.stringify(jsonData));
  updateJsonData();
  // showQuestions(activeSubtopic, index);
}

function cancelAddingQuestions() {
  let currBtn = event.target;
  let index;
  for (let i = 0; i < $(".cancel-btn").length; i++) {
    if (currBtn == $(".cancel-btn")[i]) {
      index = i;
      break;
    }
  }
  toggleQuestionLinkContainer(index);
}

function resetRestButtonColors(currBtn, btnColor) {
  let parentDIV = event.target.parentNode;
  parentDIV.querySelectorAll("button").forEach(btn => {
    if (btn != currBtn) {
      btn.style.backgroundColor = "wheat";
    }
  });
  currBtn.style.backgroundColor = btnColor;
}

function setStatusOfQuestion(status, btnColor) {
  let btn = event.target;
  resetRestButtonColors(btn, btnColor);

  let node = btn.parentNode;
  while (node.querySelectorAll(".heading-lg").length == 0) {
    node = node.parentNode;
  }
  let subTopicName = node.querySelector(".heading-lg").innerText;
  let qno = btn.parentNode.parentNode.querySelector("qno").innerText;

  getJsonData();
  jsonData[activeTopic][subTopicName][status].push(qno);
  saveJsonData();
}

function markQuestion() {
  let status = event.target.name;
  switch (status) {
    case "done":
      setStatusOfQuestion("Done", doneColor);
      break;
    case "todo":
      setStatusOfQuestion("Todo", todoColor);
      break;
    case "optional":
      setStatusOfQuestion("Optional", optionalColor);
      break;
    case "doubt":
      setStatusOfQuestion("Doubt", doubtColor);
  }
}

function viewJson() {
  jsonData = localStorage.getItem("myJsonData");
  $("#json-viewer").val(jsonData);
}
////////////////////////////////////////////////////////////////////////////////////////////////

/*
function getLinks() {
  let linksContainer = document.getElementsByTagName("ol")[1];
  let links = linksContainer.getElementsByTagName("a");
  let linksArr = [];
  for (let i = 0; i < links.length; i++) {
    linksArr.push(links[i].href);
    document.write(links[i] + "<br>");
  }
}
getLinks();
*/
