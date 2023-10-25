let quizQuestions = {
    Sports: [
      { id: 0, question: "Q.1 | Which is the most successful Men's Hockey team at the Olympics?", option1: "Australia", option2: "India", option3: "Pakistan", option4: "Germany", correctAns: "ans2" },
      { id: 1, question: "Q.2 | The Olympics Games are normally held every how many years?", option1: " 2 Years", option2: " 4 Years", option3: " 6 Years", option4: " 8 Years", correctAns: "ans2" },
      { id: 2, question: "Q.3 | When was the first Common Wealth Games held?", option1: "1930", option2: "1934", option3: "1938", option4: "1940", correctAns: "ans1" },
      { id: 3, question: "Q.4 |  The term 'Butterfly Stroke' is referred to in which sport?", option1: "Wrestling", option2: "Volleyball", option3: "Tennis", option4: "SwimmingComment", correctAns: "ans4" },
      { id: 4, question: "Q.5 | Who holds the record for the highest individual score in a One Day International (ODI) cricket match?", option1: " Sachin Tendulkar", option2: "Ricky Ponting", option3: "Rohit Sharma", option4: "Virat Kohli", correctAns: "ans3" },
    ],
    Research: [
      { id: 0, question: "Q.1 | What astronomer suggested that the Sun was at the center of the solar system?", option1: "Ptolemy", option2: "Theon of Alexandria", option3: "Copernicus", option4: "Hypatia", correctAns: "ans3" },
      { id: 1, question: "Q.2 | Which astronomer wrote the Aryabhatiya?", option1: "Aryabhata I", option2: "Galileo", option3: "Brahmagupta", option4: "Bhaskara I", correctAns: "ans1" },
      { id: 2, question: "Q.3 | Which of the following is the India's first lunar probe launched by the Indian Space Research Organisation?", option1: "Chandrayaan Program", option2: "Mangalyaan Program", option3: "Both A and B", option4: "Discovery program", correctAns: "ans1" },
      { id: 3, question: "Q.4 | How often, approximately, is Halley's Comet visible from Earth (in years)?", option1: "25", option2: "300", option3: "75", option4: "None of the above", correctAns: "ans3" },
      { id: 4, question: "Q.5 | What is the term for a statement that can be tested through experimentation or observation in research", option1: "Theory", option2: "Hypothesis", option3: "Conclusion", option4: "Assumption", correctAns: "ans2" },
    ],
    Movie: [
      { id: 0, question: "Q.1 |In the movie 'Baahubali: The Beginning', who played the role of Baahubali?", option1: "Rana Daggubati", option2: "Prabhas", option3: "Allu Arjun", option4: "Ram Charan", correctAns: "ans2" },
      { id: 1, question: "Q.2 | In the Tamil film industry, who is popularly known as Thalapathy and has acted in movies like Mersal and Master?", option1: "Suriya", option2: "Rajinikanth", option3: "Dhanush", option4: "Vijay", correctAns: "ans4" },
      { id: 2, question: "Q.3 | Which Indian filmmaker is known for his work in movies like 3 Idiots, PK, and Lagaan?", option1: "Rajkumar Hirani", option2: " Karan Johar", option3: "Anurag Kashyap", option4: "Imtiaz Ali", correctAns: "ans1" },
      { id: 3, question: "Q.4 |  Who played the lead role in the Bollywood movie Dilwale Dulhania Le Jayenge (DDLJ)?", option1: " Shah Rukh Khan", option2: "Aamir Khan", option3: " Salman Khan", option4: "Hrithik Roshan", correctAns: "ans1" },
      { id: 4, question: "Q.5 | In which Indian state is the famous Bollywood film Lagaan primarily set?", option1: "Rajasthan", option2: "Punjab", option3: " Gujarat", option4: "Maharashtra", correctAns: "ans1" },
    ],
  };
  
  let userResults = JSON.parse(localStorage.getItem("userResults")) || [];
  
  let stream;
  let totalTime = 0;
  let score = 0;
  let questionCount = 0;
  let timer;
  
  document.getElementById("startSection").style.display = "block";
  document.getElementById("quizSection").style.display = "none";
  document.getElementById("formSection").style.display = "none";
  document.querySelector(".scoreSection").style.visibility = "hidden";
  
  function showForm() {
    document.getElementById("startSection").style.display = "none";
    document.getElementById("quizSection").style.display = "none";
    document.getElementById("formSection").style.display = "block";
  }
  
  function startQuiz() {
    const usernameInput = document.getElementById("username").value.trim();
    stream = document.getElementById("quizStream").value;
  
    if (usernameInput === "") {
      alert("Please enter your username before starting the quiz.");
      return;
    }
  
    localStorage.setItem("username", usernameInput);
    localStorage.setItem("stream", stream);
  
    const startTime = new Date().getTime();
  
    document.getElementById("startSection").style.display = "none";
    document.getElementById("quizSection").style.display = "block";
    document.getElementById("formSection").style.display = "none";
  
    displayQues(stream);
  
    totalTime = 0;
  }
  
  function displayQues(stream) {
    const quiz = quizQuestions[stream][questionCount];
    document.querySelector(".ques").innerHTML = quiz.question;
    document.querySelector("#option1").innerHTML = quiz.option1;
    document.querySelector("#option2").innerHTML = quiz.option2;
    document.querySelector("#option3").innerHTML = quiz.option3;
    document.querySelector("#option4").innerHTML = quiz.option4;
  
    document.querySelectorAll(".option").forEach((curAnsElem) => {
      curAnsElem.checked = false;
    });
  
    resetTimer();
    displayTimer(15, document.getElementById('timer'), nextQuestion);
  }
  
  function displayTimer(seconds, timerElement, callback) {
    let startTime;
    let time = seconds;
    timerElement.innerHTML = "Time Left: " + time + " seconds";
  
    timer = setInterval(() => {
      time--;
      timerElement.innerHTML = "Time Left: " + time + " seconds";
  
      if (time <= 0) {
        clearInterval(timer);
        timerElement.innerHTML = "Time's up!";
        callback();
      }
    }, 1000);
  
    startTime = new Date().getTime();
    timerElement.dataset.startTime = startTime;
  }
  
  function resetTimer() {
    clearInterval(timer);
    document.getElementById('timer').innerHTML = '';
  }
  
  const checkAnswer = () => {
    let correctAns;
    document.querySelectorAll(".option").forEach((curAnsElem) => {
      if (curAnsElem.checked) {
        correctAns = curAnsElem.id;
      }
    });
    return correctAns;
  };
  
  function deselect() {
    document.querySelectorAll(".option").forEach((curAnsElem) => {
      curAnsElem.checked = false;
      const answerId = curAnsElem.id;
      const label = document.querySelector(`label[for=${answerId}]`);
      label.style.backgroundColor = '';
    });
  }
  
  document.querySelector(".btn").addEventListener("click", () => {
    stopTimer();
    const checkedAnswer = checkAnswer();
    const correctAnswer = quizQuestions[stream][questionCount].correctAns;
  
    document.querySelectorAll(".option").forEach((curAnsElem) => {
      const answerId = curAnsElem.id;
      const label = document.querySelector(`label[for=${answerId}]`);
      const listItem = label.closest("li");
  
      if (answerId === correctAnswer) {
        listItem.style.backgroundColor = 'lightgreen';
      } else if (answerId === checkedAnswer) {
        listItem.style.backgroundColor = 'lightcoral';
      }
    });
  
    setTimeout(() => {
      document.querySelectorAll(".option").forEach((curAnsElem) => {
        const answerId = curAnsElem.id;
        const label = document.querySelector(`label[for=${answerId}]`);
        const listItem = label.closest("li");
        listItem.style.backgroundColor = '';
      });
  
      if (checkedAnswer === correctAnswer) {
        score++;
      }
  
      questionCount++;
      if (questionCount < quizQuestions[stream].length) {
        displayQues(stream);
      } else {
        storeUserResult();
        displayScoreboard();
      }
    }, 2000);
  });
  
  document.querySelector(".btn2").addEventListener("click", () => {
    location.reload();
  });
  
  function stopTimer() {
    clearInterval(timer);
    const endTime = new Date().getTime();
    const startTime = parseInt(document.getElementById('timer').dataset.startTime, 10);
    const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
    totalTime += elapsedSeconds;
  }
  
  function nextQuestion() {
    questionCount++;
    if (questionCount < quizQuestions[stream].length) {
      displayQues(stream);
    } else {
      storeUserResult();
      displayScoreboard();
    }
  }
  
  function storeUserResult() {
    const username = localStorage.getItem("username");
    stream = localStorage.getItem("stream");
  
    const userResult = {
      username: username,
      stream: stream,
      score: score,
      timeTaken: totalTime,
    };
  
    userResults.push(userResult);
  
    localStorage.setItem("userResults", JSON.stringify(userResults));
  }
  
  function displayScoreboard() {
    const username = localStorage.getItem("username");
    const stream = localStorage.getItem("stream");
  
    document.querySelector(".scoreSection").style.visibility = "visible";
    document.querySelector(".QuestionBox").style.visibility = "hidden";
    document.querySelector(".scoreTxt").innerHTML = `Hey ${username}! Your Score is ${score}/${quizQuestions[stream].length} ✌️.<br>Stream : ${stream}<br>Time Taken : ${totalTime} seconds.`;
  }
  
  function showLeaderboard() {
    const leaderboardSection = document.getElementById("leaderboardSection");
    const leaderboardTable = document.createElement("table");
    leaderboardTable.innerHTML = "<tr><th>Name</th><th>Stream</th><th>Score</th><th>Time Taken</th></tr>";
  
    const userResults = JSON.parse(localStorage.getItem("userResults")) || [];
  
    userResults.sort((a, b) => {
      if (a.score === b.score) {
        return a.timeTaken - b.timeTaken;
      }
      return b.score - a.score;
    });
  
    userResults.forEach((result) => {
      const row = leaderboardTable.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
  
      cell1.textContent = result.username;
      cell2.textContent = result.stream;
      cell3.textContent = result.score;
      cell4.textContent = result.timeTaken + " seconds";
    });
  
    leaderboardSection.innerHTML = "";
  
    const leaderboardTitle = document.createElement("h2");
    leaderboardTitle.textContent = "QuickIQ Leaderboard";
    leaderboardSection.appendChild(leaderboardTitle);
  
    leaderboardSection.appendChild(leaderboardTable);
  
    const homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.addEventListener("click", () => {
      location.reload();
    });
  
    leaderboardSection.appendChild(homeButton);
  
    leaderboardSection.style.display = "block";
  
    document.getElementById("startSection").style.display = "none";
    document.getElementById("quizSection").style.display = "none";
    document.getElementById("formSection").style.display = "none";
    document.querySelector(".scoreSection").style.visibility = "hidden";
  }
  
  // Get the "Clear Leaderboard" button by its ID
const clearLeaderboardButton = document.getElementById('clearLeaderboardBtn');

// Add a click event listener to clear the leaderboard when the button is clicked
clearLeaderboardButton.addEventListener('click', function() {
    if (confirm("Are you sure you want to clear the leaderboard?")) {
        // Clear the leaderboard data from localStorage
        localStorage.removeItem("userResults");
        // Reload the page to reflect the cleared leaderboard
        location.reload();
    }
});

// ... The rest of your code ...

  
  
  function refreshPage() {
    location.reload();
  }