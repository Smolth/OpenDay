import React, { createContext, useState, useContext, useEffect } from 'react';

const QuestContext = createContext();

export const useQuest = () => {
    const context = useContext(QuestContext);
    if (!context) {
        throw new Error('useQuest must be used within QuestProvider');
    }
    return context;
};

export const QuestProvider = ({ children }) => {
    const [completedQuests, setCompletedQuests] = useState({
        question1: false,
        question2: false,
        question3: false,
        question4: false,
        question5: false,
        question6: false,
        question7: false,
        typeText: false,
        findSecret: false,
        centerDiv: false,
        alchemy: false,
        findBug1: false,
        findBug2: false,
        findBug3: false,
        findBug4: false,
        boss: false,
        battle: false
    });

    const updateQuestStatus = (questName, isCompleted) => {
        setCompletedQuests(prev => ({
            ...prev,
            [questName]: isCompleted
        }));
    };

    const resetProgress = () => {
        setCompletedQuests({
            question1: false,
            question2: false,
            question3: false,
            question4: false,
            question5: false,
            question6: false,
            question7: false,
            typeText: false,
            findSecret: false,
            centerDiv: false,
            alchemy: false,
            findBug1: false,
            findBug2: false,
            findBug3: false,
            findBug4: false,
            boss: false
        });
    };

const value = useMemo(() => ({
    completedQuests,
    updateQuestStatus,
    resetProgress
  }), [completedQuests]);

  return (
    <QuestContext.Provider value={value}>
      {children}
    </QuestContext.Provider>
  );
};
