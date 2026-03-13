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
        boss: false         
    });

    const [currentPosition, setCurrentPosition] = useState(1);

    useEffect(() => {
        const allPreviousCompleted = 
            completedQuests.question1 && 
            completedQuests.typeText && 
            completedQuests.findSecret && 
            completedQuests.centerDiv;

        if (allPreviousCompleted && !completedQuests.boss) {
            setCurrentPosition(5);
        }
    }, [completedQuests]);

    const completeQuest = (questName) => {
        setCompletedQuests(prev => {
            const newState = { ...prev, [questName]: true };
            const questOrder = ['question1', 'typeText', 'findSecret', 'centerDiv', 'boss'];
            const completedCount = questOrder.filter(q => newState[q]).length;
            
            if (completedCount < questOrder.length) {
                const nextQuestIndex = questOrder.findIndex(q => !newState[q]);
                setCurrentPosition(nextQuestIndex + 1);
            }
            
            return newState;
        });
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
        setCurrentPosition(1);
    };

    const isQuestAvailable = (questNumber) => {
        const questOrder = ['question1', 'typeText', 'findSecret', 'centerDiv', 'boss'];
        for (let i = 0; i < questNumber - 1; i++) {
            if (!completedQuests[questOrder[i]]) {
                return false;
            }
        }
        return true;
    };

    return (
        <QuestContext.Provider value={{
            completedQuests,
            currentPosition,
            completeQuest,
            resetProgress,
            isQuestAvailable
        }}>
            {children}
        </QuestContext.Provider>
    );
};