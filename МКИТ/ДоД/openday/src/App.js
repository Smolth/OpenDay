
import './App.css';
import React, { useState } from 'react';
import QuestionModal from './modals/question';
import Exec1 from './modals/exec1';
import Boss from './modals/boss';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [isBossOpen, setIsBossOpen] = useState(false);

  const questionData = {
    question: "Какой язык используется для вёрстки веб-страниц в браузере?",
    options: ["CSS", "HTML", "JavaScript", "Python"],
    correctAnswer: "HTML"
  };

  return (
    <div className="App">
      <button onClick={() => setIsModalOpen(true)}>
        Открыть вопрос
      </button>

      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        question={questionData.question}
        options={questionData.options}
        correctAnswer={questionData.correctAnswer}
      />

      <button onClick={() => setIsTestOpen(true)}>
        Открыть задание
      </button>

      <Exec1
        isOpen={isTestOpen}
        onClose={() => setIsTestOpen(false)}
      />
      <button onClick={() => setIsBossOpen(true)}>
        Открыть босса
      </button>
      <Boss
        isOpen={isBossOpen}
        onClose={() => setIsBossOpen(false)}
      />
    </div>
  );
}

export default App;