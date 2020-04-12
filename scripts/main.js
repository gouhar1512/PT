let activeTopic = "Linked List";
var jsonData;
$(document).ready(() => {
  initializeLocalStorage();

  let topicBtns = $(".topic-btn");
  topicBtns.click(() => {
    highlightActiveTopicBtn(topicBtns);
    setActiveTopic();
    showActiveTopic();
  });

  showActiveTopic();
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
    "To do": [],
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
  let doneQuestions = jsonData[topicName][subTopicName]["Done"];
  let allHeadings = document.querySelectorAll(".heading-lg");
  let doneContainer;
  for (let i in allHeadings) {
    if (subTopicName == allHeadings[i].innerText) {
      doneContainer = allHeadings[i].parentNode.querySelector(".done");
      break;
    }
  }
  for (let i in doneQuestions) {
    doneContainer.innerHTML += doneQuestions[i] + " /";
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
  showQuestions(activeSubtopic, index);
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

function resetRestButtonColors(currBtn) {
  let parentDIV = event.target.parentNode;
  parentDIV.querySelectorAll("button").forEach(btn => {
    if (btn != currBtn) {
      btn.style.backgroundColor = "wheat";
    }
  });
}
function markDone() {
  let btn = event.target;
  btn.style.backgroundColor = "lightgreen";
  resetRestButtonColors(btn);
  let node = btn.parentNode;
  while (node.querySelectorAll(".heading-lg").length == 0) {
    node = node.parentNode;
  }
  let subTopicName = node.querySelector(".heading-lg").innerText;

  let data = localStorage.getItem("myJsonData");
  jsonData = JSON.parse(data);
  let qno = btn.parentNode.parentNode.querySelector("qno").innerText;
  jsonData[activeTopic][subTopicName]["Done"].push(qno);
  localStorage.setItem("myJsonData", JSON.stringify(jsonData));
}
function markTodo() {
  let btn = event.target;
  btn.style.backgroundColor = "skyblue";
  resetRestButtonColors(btn);
}
function markOptional() {
  let btn = event.target;
  btn.style.backgroundColor = "rgb(209, 104, 209)";
  resetRestButtonColors(btn);
}
function markDoubt() {
  let btn = event.target;
  btn.style.backgroundColor = "rgb(252, 119, 119)";
  resetRestButtonColors(btn);
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
