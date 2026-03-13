
import './App.css';
import { useState } from 'react';
import { QuestProvider, useQuest } from './context/QuestContext';
import QuestionModal from './modals/question';
import TypeText from './modals/exec1';
import Boss from './modals/boss';
import FindSecretModal from './modals/exec2';
import CenterDivModal from './modals/exec3';
import FindBug from './modals/exec4';
import FindBug2 from './modals/exec5';
import FindBug3 from './modals/exec6';
import FindBug4 from './modals/exec7';

function MapWithQuest() {
  const { completedQuests, currentPosition } = useQuest();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [isTest2Open, setIsTest2Open] = useState(false);
  const [isTest3Open, setIsTest3Open] = useState(false);
  const [isTest4Open, setIsTest4Open] = useState(false);
  const [isTest5Open, setIsTest5Open] = useState(false);
  const [isTest6Open, setIsTest6Open] = useState(false);
  const [isTest7Open, setIsTest7Open] = useState(false);
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
    question: "Он строит цифровые крепости и отражает кибератаки. Кто это?",
    options: ["Веб-разработчик", "Разработчик программного обеспечения в сфере кибербезопасности", "Специалист по работе с базами данных", "Системный администратор"],
    correctAnswer: "Разработчик программного обеспечения в сфере кибербезопасности"
  }, {
    question: "Как называется специалист, который создает интерфейсы, с которыми приятно работать?",
    options: ["UX/UI-дизайнер", "Мастер интерфейсов", "Frontend-разработчик", "Пентестер"],
    correctAnswer: "UX/UI-дизайнер"
  }];

  const initBoss = () => {

  }

  // Позиции кнопок на карте (примерные координаты)
  const buttonPositions = [
    { top: '240px', left: '1031px' },  // bt-1
    { top: '375px', left: '1031px' },  // bt-2
    { top: '506px', left: '1031px' },  // bt-3
    { top: '635px', left: '1031px' },  // bt-4
    { top: '768px', left: '950px' },   // bt-5
    { top: '100px', left: '1100px' },  // bt-6
    { top: '200px', left: '1100px' },  // bt-7
    { top: '150px', left: '1100px' },   // bt-8
    { top: '50px', left: '1100px' }   // bt-9
  ];

  return (
    <div className="Map">
      {/* Квадрат, который двигается по карте */}
      <div
        className={`quest-marker ${currentPosition === 5 ? 'boss-position' : ''}`}
        style={{
          top: buttonPositions[currentPosition - 1]?.top || '10%',
          left: buttonPositions[currentPosition - 1]?.left || '10%',
        }}
      >
        <div className="marker-square">

        </div>
      </div>
      <div className='instructions'>
        <h1 style={{color: "rgb(235, 205, 98)"}}>Инструкция</h1>
        <p>Приветствуем тебя!</p>
        <p>Сегодня мы предлагаем сыграть в небольшую игру, которая поверхностно погружает в повседневные суету из задач и проблем разработчика.</p>
        <p>Вы знаете, что такое сетевой пакет? Это набор данных, передаваемый по сети, от одной точки в другую - от соседа к соседа и от компютера к смартфону.</p>
        <p>Для того, чтобы переача данных прошла успешно от отправителя к адресату, нужно правильно настроить для него маршрут. Перед вами карта. Сопроводите пакет от точки "А" к точке "Б", пройдя все заботы и проблемы.</p>
      </div>
      {/* Кнопки с галочками */}
      <button
        className='bt-1'
        onClick={() => setIsModalOpen(true)}
        style={{ position: 'absolute', ...buttonPositions[0] }}
      >
        Открыть вопрос
        {completedQuests.question1 && <span className="button-check">✓</span>}
      </button>

      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        question={questionData[0].question}
        options={questionData[0].options}
        correctAnswer={questionData[0].correctAnswer}
      />

      <button
        className='bt-2'
        onClick={() => setIsTestOpen(true)}
        style={{ position: 'absolute', ...buttonPositions[1] }}
      >
        Открыть задание
        {completedQuests.typeText && <span className="button-check">✓</span>}
      </button>

      <TypeText
        isOpen={isTestOpen}
        onClose={() => setIsTestOpen(false)}
      />

      <button
        className='bt-3'
        onClick={() => setIsTest2Open(true)}
        style={{ position: 'absolute', ...buttonPositions[2] }}
      >
        Открыть 2 задание
        {completedQuests.findSecret && <span className="button-check">✓</span>}
      </button>

      <FindSecretModal
        isOpen={isTest2Open}
        onClose={() => setIsTest2Open(false)}
      />

      <button
        className='bt-4'
        onClick={() => setIsTest3Open(true)}
        style={{ position: 'absolute', ...buttonPositions[3] }}
      >
        Открыть 3 задание
        {completedQuests.centerDiv && <span className="button-check">✓</span>}
      </button>

      <CenterDivModal
        isOpen={isTest3Open}
        onClose={() => setIsTest3Open(false)}
      />

      <button
        className='bt-5'
        onClick={() => setIsBossOpen(true)}
        style={{ position: 'absolute', ...buttonPositions[4] }}
      >
        Открыть босса
        {completedQuests.boss && <span className="button-check">✓</span>}
      </button>

      <Boss
        isOpen={isBossOpen}
        onClose={() => setIsBossOpen(false)}
      />
      <button onClick={() => setIsTest4Open(true)}
            style={{ position: 'absolute', ...buttonPositions[5] }}>
        Открыть 4 задание
      </button>

      <FindBug
        isOpen={isTest4Open}
        onClose={() => setIsTest4Open(false)}
      />

      <button onClick={() => setIsTest5Open(true)}
            style={{ position: 'absolute', ...buttonPositions[6] }}>
        Открыть 5 задание
      </button>

      <FindBug2
        isOpen={isTest5Open}
        onClose={() => setIsTest5Open(false)}
      />

      <button onClick={() => setIsTest6Open(true)}
            style={{ position: 'absolute', ...buttonPositions[7] }}>
        Открыть 6 задание
      </button>

      <FindBug3
        isOpen={isTest6Open}
        onClose={() => setIsTest6Open(false)}
      />

      <button onClick={() => setIsTest7Open(true)}
            style={{ position: 'absolute', ...buttonPositions[8] }}>
        Открыть 7 задание
      </button>
      <FindBug4
        isOpen={isTest7Open}
        onClose={() => setIsTest7Open(false)}
      />
    </div>
  );
}
function App() {
  return (
    <QuestProvider>
      <div className="App">
        <MapWithQuest />
      </div>
    </QuestProvider>
  );
}

export default App;