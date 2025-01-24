// app.js
import { auth, db, serverTimestamp, collection, getDocs, doc, setDoc } from "./firebase-config.js";

const quizContainer = document.getElementById("quiz-container");

let currentQuestionIndex = 0;
let questions = [];

// Charge les questions depuis Firestore
    async function loadQuestions() {
  
    const qCol = collection(db, "questions");
    const querySnapshot = await getDocs(qCol);
    questions = querySnapshot.docs.map(doc => doc.data());
    displayQuestion(currentQuestionIndex);
}

// Affiche une question
function displayQuestion(index) {
  const question = questions[index];
  if(question.type == "QCM"){
    quizContainer.innerHTML = `
    <h2>${question.text}</h2>
    <ul>
      ${question.answers
        .map(
          (answer, i) => `
        <li>
          <button onclick="selectAnswer(${i})">${answer}</button>
        </li>
      `
        )
        .join("")}
    </ul>
  `;
  }else{
    quizContainer.innerHTML = `
    <textarea name="answer" id="${question.id}"></textarea>
    `
  }

}

// Sélectionne une réponse
window.selectAnswer = async function (answerIndex) {
  /*const user = auth.currentUser;
  if (user) {
    collection(db, "responses").add({
      userId: user.uid,
      questionId: questions[currentQuestionIndex].id,
      answerIndex: answerIndex,
      timestamp: serverTimestamp(),
    });
  }*/
    await setDoc(doc(db, "reponses", 'hello'), {
        repondant: 'Romain',
        reponses: ["test", "blabla", answerIndex]
    });


  // Passe à la question suivante
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    quizContainer.innerHTML = "<h2>Merci d'avoir répondu au questionnaire !</h2>";
  }
};

// Charge les questions au démarrage
loadQuestions();