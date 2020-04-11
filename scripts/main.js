let activeTopic = "Linked List";
let activeSubtopic = "";
$(document).ready(() => {
  initializeLocalStorage();

  let topicBtns = $(".topic-btn");
  topicBtns.click(() => {
    highlightActiveTopicBtn(topicBtns);
    setActiveTopic();
    showActiveTopic();
  });
});

function initializeLocalStorage() {
  if (localStorage.getItem("myJsonData") == null) {
    let jsonData = {
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
  for (var topicName in jsonData) {
    if (topicName == activeTopic) {
      showAllSubtopics(topicName);
    }
  }
}

function updateJsonData(type, key) {
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
    addSubTopic(subTopicName, index);
    index++;
  }
}

function addSubTopic(subTopicName, index) {
  let subTopicsContainer = $(".sub-topics-container")[0];

  if (subTopicName == undefined) {
    subTopicName = $("#sub-topic-name").val();
    index = subTopicsContainer.querySelectorAll(".sub-topic").length;
  }
  let templateForSubTopic = document.getElementById("templateForSubtopic");
  var clon = templateForSubTopic.content.cloneNode(true);
  subTopicsContainer.appendChild(clon);

  let headingLg = $(".heading-lg");

  headingLg[index].innerText = subTopicName;

  updateJsonData("sub-topic", subTopicName);
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
  let currBtn = $(".add-btn")[index];
  if (currBtn.innerText == "Add Questions") {
    currTextBox.style.display = "block";
    currBtn.innerText = "Add";
  } else {
    currTextBox.style.display = "none";
    currBtn.innerText = "Add Questions";
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

  let questionsLinksContainer = $(".questions-links-container")[index]; //corresponds to textbox
  let questionsLinks = questionsLinksContainer.value.split("\n"); //getting each question link from textbox into an array
  if (questionsLinks == "") {
    return;
  }

  let prevQuestions = $(".prev-questions")[index];
  //div which contains questions already present and new questions can be appended to it

  for (let i = 0; i < questionsLinks.length; i++) {
    let templateForQuestion = document.getElementById("templateForQuestion");
    let clon = templateForQuestion.content.cloneNode(true);
    prevQuestions.appendChild(clon);

    let questionName = getTopicNameFromUrl(questionsLinks[i]);
    let questionLink = $(".question-link"); //correspond to span in templateForQuestion
    let questionNum = $(".prev-questions")[index].querySelectorAll(".question")
      .length;

    questionLink[
      totalQuestions + i
    ].innerHTML = ` ${questionNum}. <a href="${questionsLinks[index]}" target="_blank">${questionName}</a>`;
  }
  questionsLinksContainer.value = "";
}
////////////////////////////////////////////////////////////////////////////////////////////////

/*function getLinks() {
  let linksContainer = document.getElementsByClassName("Introduction")[0];
  let links = linksContainer.getElementsByTagName("a");
  let linksArr = [];
  for (let i = 0; i < links.length; i++) {
    linksArr.push(links[i].href);
    document.write(links[i] + "<br>");
  }
}
getLinks();
*/
