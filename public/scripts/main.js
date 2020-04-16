let activeTopic = "Linked List";
let doneColor = "lightgreen";
let todoColor = "skyblue";
let optionalColor = "rgb(209, 104, 209)";
let doubtColor = "rgb(252, 119, 119)";
let impColor = "yellow";
var jsonData;
$(document).ready(() => {
  initializeLocalStorage();
  showTopicButtons();
  showActiveTopic();
  setButtonsColor();
});

function initializeLocalStorage() {
  if (localStorage.getItem("myJsonData") == null) {
    jsonData = {};
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

function addTopic(topicName) {
  getJsonData();
  if (jsonData[topicName] != null) {
    alert(topicName + " is already present!");
    return;
  }
  jsonData[topicName] = {};
  saveJsonData();
  showTopicButtons();
}

function addEventListenerToAll() {
  let topicBtns = $(".topic-btn");
  topicBtns.click(() => {
    highlightActiveTopicBtn(topicBtns);
    setActiveTopic();
    showActiveTopic();
    setButtonsColor();
  });

  let newTopicInput = $(".new-topic-input");
  newTopicInput.keydown(e => {
    if (e.keyCode == 13) {
      addTopic(newTopicInput.val());
    }
  });

  $(".btn-remove").click(() => {
    if (confirm("Do you want to remove " + activeTopic)) {
      getJsonData();
      delete jsonData[activeTopic];
      saveJsonData();
      showTopicButtons();
    }
  });

  let inputRemarks = $(".input-remarks");
  inputRemarks.keydown(e => {
    if (e.keyCode == 13) {
      addRemarks(event.target.value);
    }
  });
}

function showTopicButtons() {
  getJsonData();
  let topicsContainer = $(".topics-container")[0];
  topicsContainer.innerHTML = "";
  for (let topic in jsonData) {
    topicsContainer.innerHTML += `<button class="topic-btn">${topic}</button>`;
  }
  topicsContainer.innerHTML += `
  <br><input placeholder="Add Topic...." class="new-topic-input">
  <button class="btn-remove">Remove this topic</button>
  `;
}

function setActiveTopic() {
  let currBtn = event.target;
  activeTopic = currBtn.innerText;
}

function showActiveTopic() {
  let data = localStorage.getItem("myJsonData");
  jsonData = JSON.parse(data);
  for (var topicName in jsonData) {
    if (topicName == activeTopic) {
      showAllSubTopics(topicName);
    }
  }

  addEventListenerToAll();
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
    Doubt: [],
    Important: []
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

function clearSubTopicsContainer() {
  let subTopicsContainer = $(".sub-topics-container")[0];
  subTopicsContainer.innerHTML = "";
}

function showAllSubTopics(topicName) {
  clearSubTopicsContainer();
  let index = 0;
  for (var subTopicName in jsonData[topicName]) {
    showSubTopic(topicName, subTopicName, index);
    index++;
  }
  showRemarks();
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
  let doneQuestions,
    todoQuestions,
    optionalQuestions,
    doubtQuestions,
    impQuestions;
  doneQuestions = jsonData[topicName][subTopicName]["Done"];
  todoQuestions = jsonData[topicName][subTopicName]["Todo"];
  optionalQuestions = jsonData[topicName][subTopicName]["Optional"];
  doubtQuestions = jsonData[topicName][subTopicName]["Doubt"];
  impQuestions = jsonData[topicName][subTopicName]["Important"];

  let allHeadings = document.querySelectorAll(".heading-lg");
  let doneContainer,
    todoContainer,
    optionalContainer,
    doubtContainer,
    impContainer;
  for (let i in allHeadings) {
    if (subTopicName == allHeadings[i].innerText) {
      doneContainer = allHeadings[i].parentNode.querySelector(".done");
      todoContainer = allHeadings[i].parentNode.querySelector(".todo");
      optionalContainer = allHeadings[i].parentNode.querySelector(".optional");
      doubtContainer = allHeadings[i].parentNode.querySelector(".doubt");
      impContainer = allHeadings[i].parentNode.querySelector(".important");
      break;
    }
  }
  doneContainer.innerHTML =
    "<span class='heading-done heading-status'>Done : </span>";
  todoContainer.innerHTML =
    "<span class='heading-todo heading-status'>Todo : </span>";
  optionalContainer.innerHTML =
    "<span class='heading-optional heading-status'>Optional : </span>";
  doubtContainer.innerHTML =
    "<span class='heading-doubt heading-status'>Doubt : </span>";
  impContainer.innerHTML =
    "<span class='heading-imp heading-status'>Important : </span>";

  doneQuestions.sort();
  todoQuestions.sort();
  optionalQuestions.sort();
  doubtQuestions.sort();
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
  for (let i in impQuestions) {
    impContainer.innerHTML = impContainer.innerHTML + impQuestions[i] + " / ";
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
    questionLink.innerHTML = `<qno>${i +
      1}</qno>.<a href="${questionURL}" target="_blank">${questionName}</a>`;
  }
}

function showRemarks() {
  getJsonData();
  let allHeadings = document.querySelectorAll(".heading-lg");

  for (topic in jsonData) {
    for (subTopic in jsonData[topic]) {
      for (let i = 0; i < allHeadings.length; i++) {
        if (allHeadings[i].innerText == subTopic) {
          let inputRemarks = allHeadings[i].parentNode.querySelectorAll(
            ".input-remarks"
          );
          let remark = jsonData[topic][subTopic]["Remarks"];
          for (let i in remark) {
            inputRemarks[i - 1].value = remark[i];
          }
        }
      }
    }
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
  let questionLink = allHeadings.parentNode.querySelectorAll(".question-link");
  let questions = jsonData[activeTopic][subTopic][status];
  for (let j in questions) {
    btns[questions[j] - 1].style.backgroundColor = btnColor;
    questionLink[questions[j] - 1].style.backgroundColor = "silver";
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

        setSpecificButtonsColors(
          allHeadings[i],
          ".btn-imp",
          subTopic,
          "Fav",
          impColor
        );

        break;
      }
    }
  }
}

function addSubTopic() {
  subTopicName = $("#sub-topic-name").val();

  getJsonData();
  if (jsonData[activeTopic][subTopicName] != null) {
    alert(subTopicName + " in " + activeTopic + " is already present ");
    return;
  }
  updateJsonData("sub-topic", subTopicName);
  showAllSubTopics(activeTopic);
  setButtonsColor();
  $("#sub-topic-name").val("");
}

function removeSubTopic() {
  let node = $(event.target);
  let subTopic;
  while (true) {
    if (node.find(".heading-lg").length == 0) {
      node = node.parent();
    } else {
      subTopic = node.find(".heading-lg")[0].innerText;
      break;
    }
  }
  if (confirm("Do you want to delete '" + subTopic + "' in " + activeTopic)) {
    getJsonData();
    delete jsonData[activeTopic][subTopic];
    saveJsonData();
    showAllSubTopics(activeTopic);
    setButtonsColor();
  }
}

function addRemarks(remark) {
  let inputRemarks = event.target;
  let node = inputRemarks.parentNode;
  while (node.querySelectorAll(".heading-lg").length == 0) {
    node = node.parentNode;
  }
  let subTopicName = node.querySelector(".heading-lg").innerText;

  node = inputRemarks.parentNode;
  while (node.querySelectorAll(".question-link").length == 0) {
    node = node.parentNode;
  }
  let qno = node.querySelector("qno").innerText;
  getJsonData();
  jsonData[activeTopic][subTopicName]["Remarks"][qno] = remark;
  saveJsonData();
  showQuestionsStatus(activeTopic, subTopicName);
}

function toTitleCase(str) {
  return str.replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  });
}

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

  let subTopic = $(".heading-lg")[index].innerText;

  let questionsLinksContainer = $(".questions-links-container")[index]; //corresponds to textbox
  let questionsLinks = questionsLinksContainer.value.split("\n"); //getting each question link from textbox into an array
  if (questionsLinks == "") {
    return;
  }

  for (let i in questionsLinks) {
    jsonData[activeTopic][subTopic]["All"].push(questionsLinks[i]);
  }
  $("#json-viewer").val(JSON.stringify(jsonData));
  updateJsonData();
  showQuestions(activeTopic, subTopic, index);
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
  maintainUniqueStatusOfQuestion(subTopicName, qno);
  jsonData[activeTopic][subTopicName][status].push(qno);
  saveJsonData();
  showQuestionsStatus(activeTopic, subTopicName);
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

function addToImportant() {
  let btn = event.target;
  let node = btn.parentNode;
  while (node.querySelectorAll(".heading-lg").length == 0) {
    node = node.parentNode;
  }
  let subTopicName = node.querySelector(".heading-lg").innerText;
  let qno = btn.parentNode.parentNode.querySelector("qno").innerText;
  getJsonData();
  jsonData[activeTopic][subTopicName]["Important"].push(qno);
  saveJsonData();
  showQuestionsStatus(activeTopic, subTopicName);
}

function maintainUniqueStatusOfQuestion(subTopicName, qno) {
  let doneQuestions = jsonData[activeTopic][subTopicName]["Done"];
  let todoQuestions = jsonData[activeTopic][subTopicName]["Todo"];
  let optionalQuestions = jsonData[activeTopic][subTopicName]["Optional"];
  let doubtQuestions = jsonData[activeTopic][subTopicName]["Doubt"];
  jsonData[activeTopic][subTopicName]["Done"] = doneQuestions.filter(
    e => e != qno
  );
  jsonData[activeTopic][subTopicName]["Todo"] = todoQuestions.filter(
    e => e != qno
  );
  jsonData[activeTopic][subTopicName]["Optional"] = optionalQuestions.filter(
    e => e != qno
  );
  jsonData[activeTopic][subTopicName]["Doubt"] = doubtQuestions.filter(
    e => e != qno
  );
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
