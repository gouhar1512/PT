function addSubTopic() {
  let subTopicsContainer = document.getElementsByClassName(
    "sub-topics-container"
  )[0];
  let subTopicName = document.getElementById("sub-topic-name").value;

  //Creating elements
  let subTopic = document.createElement("DIV");
  let headingLg = document.createElement("DIV");
  let textNode = document.createTextNode(subTopicName);
  let done = document.createElement("DIV");
  let headingSm = document.createElement("SPAN");

  //Adding classname
  subTopic.classList.add("sub-topic");
  headingLg.classList.add("heading-lg");

  //Appending elements
  headingLg.appendChild(textNode);
  subTopic.appendChild(headingLg);
  subTopicsContainer.appendChild(subTopic);
}

/*
 <div class="sub-topic">
   
   <div class="done progress-container"><span class="heading-sm">Done :</span> </div>
   <div class="todo progress-container"><span class="heading-sm">To Do :</span> </div>
   <div class="optionals progress-container"><span class="heading-sm">Optionals : </span></div>
   <div class="doubts progress-container"><span class="heading-sm">Doubts</span></div>
   <div class="all-questions">
      <span class="heading-sm">All questions</span>
      <div class="prev-questions">

      </div>
      <div class="new-questions">
         <textarea class="questions-link"></textarea>
         <button>Add</button>
      </div>
   </div>
</div>
 */
