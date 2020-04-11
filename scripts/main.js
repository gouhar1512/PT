function addSubTopic() {
  if (typeof addSubTopic.index == "undefined") {
    addSubTopic.index = 0;
  }

  let subTopicsContainer = $(".sub-topics-container")[0];
  let subTopicName = $("#sub-topic-name").val();

  let templateForSubTopic = document.getElementById("templateForSubtopic");
  var clon = templateForSubTopic.content.cloneNode(true);
  subTopicsContainer.appendChild(clon);

  let headingLg = $(".heading-lg");
  let index = addSubTopic.index;

  headingLg[index].innerText = subTopicName;
  addSubTopic.index++;
}
addSubTopic();
////////////////////////////////////////////////
///////   String utility functions   //////////
function toTitleCase(arr) {
  let upperCase = true;
  for (let i = 0; i < arr.length; i++) {
    if (upperCase) {
      arr[i] = arr[i].toUpperCase();
      upperCase = false;
    }
    if (arr[i] == " ") {
      upperCase = true;
    }
  }
  return arr;
}

function toStringForm(arr) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += arr[i];
  }
  return str;
}
////////////////////////////////////////////////
////////////////////////////////////////////////

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
  topicName = toTitleCase(topicName);
  topicName = toStringForm(topicName);
  return topicName;
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

// function getLinks() {
//   let linksContainer = document.getElementsByClassName("Introduction")[0];
//   let links = linksContainer.getElementsByTagName("a");
//   let linksArr = [];
//   for (let i = 0; i < links.length; i++) {
//     linksArr.push(links[i].href);
//     document.write(links[i] + "<br>");
//   }
// }
// getLinks();
