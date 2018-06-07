$(function() {

let questionNumber = 1;
let userScore = 0;
let feedbackCheck = "incorrect";

$(function startTheQuiz(){
  // sends you from the start page to the first question
  $("#begin").on("click", function() {
    $('#startPage').hide('slow');
    $("#questionPage").show('slow');
    $(".questionProgress").show();
    buttonSelection();
  });
})

function setQuestion() {
// places the current question into form
  let currentQuestion = questionNumber-1;
  $(".legendQuestion").text(QUIZQUESTIONS[currentQuestion].question);
  $(".question").text(QUIZQUESTIONS[currentQuestion].question);
  }

// places the current answer options into form
function setOptions() {
  let currentQuestion = questionNumber-1;
  $("label[for=questionOne]").html(QUIZQUESTIONS[currentQuestion].answers[0]);
  $("label[for=questionTwo]").html(QUIZQUESTIONS[currentQuestion].answers[1]);
  $("label[for=questionThree]").html(QUIZQUESTIONS[currentQuestion].answers[2]);
  $("label[for=questionFour]").html(QUIZQUESTIONS[currentQuestion].answers[3]);
}

function displayQuestionNumber() {
  // changes question # based on the current questionNumber value
  $("#begin").on("click", function() {
    $( "p.questionValue" ).text(`Question ${questionNumber}:`);
    $( ".questionProgress" ).text(`Question: ${questionNumber}/${QUIZQUESTIONS.length}`);
    $( ".answerProgress" ).text(`Correct: 0/${QUIZQUESTIONS.length}`);
    setQuestion();
    setOptions();
  });

  $(".answerEntry").on("click", function() {
    if ($('input:radio').is(':checked')){
    questionNumber++;
    correctTally();
    }
  });
}


function buttonSelection(){
  $(".buttonDesign").on("click", function() {
    const selectButton = $(this).find('input[type=radio]');
    $(selectButton).prop("checked", true);
    $(selectButton).parent("div").addClass("highlight").siblings().removeClass("highlight");
  });
}

//$("#radio_1").prop("checked", true);

$(function submitAnswers(){
 
    $('.answers').submit(event => {
    event.preventDefault();

    $(':radio').each(function () {
        $(this).removeAttr('checked');
        $(this).parent().removeClass('highlight');
        $('input[type="radio"]').prop('checked', false);
    });
  });
})

function correctTally() {
  // checks if answer was correct and adds to tally accordingly
  if ($('input[name="options"]:checked').val() === QUIZQUESTIONS[questionNumber-2].answerCorrect){
    feedbackCheck = "correct";
  } else {
    feedbackCheck = "incorrect";
  }
  feedback();
}

function feedback() {
  //sends you to the feedbackPage
  $( ".nextQuestion" ).text(`Continue`);
  if (feedbackCheck === "correct"){
    userScore++;
    $( ".answerProgress" ).text(`Correct: ${userScore}/${QUIZQUESTIONS.length}`);
    $(".congrats").text(`Well done!
    `);
    $(".info").text(`Did you know? ${QUIZQUESTIONS[questionNumber-2].funFact}`);
  } else {
    $(".congrats").text(`That is incorrect!`);
    $(".info").text(`The correct answer was:
    ${QUIZQUESTIONS[questionNumber-2].correctText}.`);
  }
  $('#questionPage').hide('slow');
  $("#feedbackPage").show('slow');
  nextQuestion();

}


function nextQuestion() {
  //  Sends you to the next question from the feedbackPage
  $(".nextQuestion").on("click", function() {
    if (questionNumber <= QUIZQUESTIONS.length) {
    $('#feedbackPage').hide('slow');
    $("#questionPage").show('slow');
    $( "p.questionValue" ).text(`Question ${questionNumber}:`);
    userFeedback();
    setQuestion();
    setOptions();
    }
    else {
    showResults();
    $('#feedbackPage').hide('slow');
    $("#resultsPage").show('slow'); 
    }
  });
}

function userFeedback() {
  // adds the results to the resultsPage section so it displays the user's results as well as a summary of how they did
  $( ".questionProgress" ).text(`Question: ${questionNumber}/${QUIZQUESTIONS.length}`); 
}


function showResults() {
  // after all questions are answered, hides the questionPage section and reveals the resultsPage section
  $( ".results" ).text(`You got ${userScore}/${QUIZQUESTIONS.length} correct!`);
  retakeQuiz()
  console.log('`showResults` ran');
}

function retakeQuiz() {
  // click to start over and reset the counter
  $(".restartQuiz").on("click", function() {
  questionNumber = 1;
  userScore = 0;
  currentQuestion = 1
  feedbackCheck = "incorrect";
  setQuestion();
  $( ".questionProgress" ).text(``);
  $( ".answerProgress" ).text(``);
  $('#resultsPage').hide('slow');
  $("#startPage").show('slow');
  })
}

function handleQuizApp() {
  displayQuestionNumber();
}

handleQuizApp();

})