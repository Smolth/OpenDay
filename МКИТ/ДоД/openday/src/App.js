
import './App.css';
import React, { useState } from 'react';
import QuestionModal from './modals/question';
import TypeText from './modals/exec1';
import Boss from './modals/boss';
import FindSecretModal from './modals/exec2';
import CenterDivModal from './modals/exec3';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [isTest2Open, setIsTest2Open] = useState(false);
  const [isTest3Open, setIsTest3Open] = useState(false);
  const [isBossOpen, setIsBossOpen] = useState(false);

  const questionData = [{
    question: "Какой язык используется для вёрстки веб-страниц в браузере?",
    options: ["CSS", "HTML", "JavaScript", "Python"],
    correctAnswer: "HTML"
  }, {
    question: "Что из перечисленного является IP-адресом?",
    options: ["IP75912", "109345.1336.00.11", "https://yandex.ru/", "172.16.13.11"],
    correctAnswer: "172.16.13.11"
  }, {
    question: "Что такое переменная в коде?",
    options: ["Неизвестное, которое необходимо найти",
      "Ячейка для хранения и управления данными, которые могут в процессе выполнения программы изменяться",
      "Тип данных",
      "Оператор, который служит для повторения набора операций, пока заданное условие не будет выполнено"],
    correctAnswer: "Ячейка для хранения и управления данными, которые могут в процессе выполнения программы изменяться"
  }, {
    question: "Как называется сетевое устройство, принимающее интернет от провайдера и распределяющее его (по кабелю или Wi-Fi) между домашними/офисными устройствами?",
    options: ["Маршрутизатор", "Фаерволл", "Сетевщик", "Интернет"],
    correctAnswer: "Маршрутизатор"
  }, {
    question: "Что из перечисленного не является операционной системой?",
    options: ["Linux", "Microsoft", "MacOs", "Kerny"],
    correctAnswer: "Kerny"
  }, {
    question: "",
    options: ["Маршрутизатор", "Фаерволл", "Сетевщик", "Интернет"],
    correctAnswer: "Маршрутизатор"
  }, {
    question: "",
    options: ["Linux", "Microsoft", "MacOs", "Kerny"],
    correctAnswer: "Kerny"
  }];

  return (
    <div className="App">
      <button onClick={() => setIsModalOpen(true)}>
        Открыть вопрос
      </button>

      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        question={questionData[0].question}
        options={questionData[0].options}
        correctAnswer={questionData[0].correctAnswer}
      />

      <button onClick={() => setIsTestOpen(true)}>
        Открыть задание
      </button>

      <TypeText
        isOpen={isTestOpen}
        onClose={() => setIsTestOpen(false)}
      />

      <button onClick={() => setIsTest2Open(true)}>
        Открыть 2 задание
      </button>

      <FindSecretModal
        isOpen={isTest2Open}
        onClose={() => setIsTest3Open(false)}
      />
      <button onClick={() => setIsTest3Open(true)}>
        Открыть 3 задание
      </button>

      <CenterDivModal
        isOpen={isTest3Open}
        onClose={() => setIsTest3Open(false)}
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