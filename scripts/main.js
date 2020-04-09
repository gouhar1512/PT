function addSubTopic() {
  let subTopicsContainer = document.getElementsByClassName(
    "sub-topics-container"
  )[0];
  let subTopicName = "Introduction"; //document.getElementById("sub-topic-name").value;

  var temp = document.getElementById("templateForSubtopic");
  var clon = temp.content.cloneNode(true);
  subTopicsContainer.appendChild(clon);
  let headingLg = document.getElementsByClassName("heading-lg");
  let lastIndex = headingLg.length - 1;
  headingLg[lastIndex].innerText = subTopicName;
}
addSubTopic();

///////   String utility functions   //////////
function toCamelCase(str) {
  let upperCase = true;
  for (let i = 0; i < str.length; i++) {
    if (upperCase) {
      str[i] = str[i].toUpperCase();
      upperCase = false;
    }
    if (str[i] == " ") {
      upperCase = true;
    }
  }
  return str;
}

function toStringForm(arr) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += arr[i];
  }
  return str;
}
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
  topicName = toCamelCase(topicName);
  topicName = toStringForm(topicName);
  return topicName;
}

function addLinks() {
  let questionsLinksContainer = document.getElementsByClassName(
    "questions-links-container"
  )[0];
  let questionsLinks = questionsLinksContainer.value.split("\n");
  if (questionsLinks == "") {
    return;
  }
  let prevQuestions = document.getElementsByClassName("prev-questions")[0];
  for (let i = 0; i < questionsLinks.length; i++) {
    let heading = getTopicNameFromUrl(questionsLinks[i]);
    prevQuestions.innerText += heading + "\n";
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
