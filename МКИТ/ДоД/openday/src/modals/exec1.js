import React, { useEffect, useState } from 'react';
import '../App.css';

const Exec1 = ({ isOpen, onClose }) => {
    const [text, setText] = useState('');
    const [textToType, setTextToType] = useState(["Пакет попал не к тому адресату! Нужно срочно настроить новый маршрут, пока никто не заметил. У вас есть 35 секунд для перенастройки маршрутизации!", "Нажмите кнопку старта для начала настройки и введите нужную команду."]);
    const [start, setStart] = useState(0);
    const [result, setResult] = useState('');
    const [timer, setTimer] = useState(35);
    const [timeInterval, setTimeInterval] = useState(null);
    const [buttonText, setButtonText] = useState("Старт");


    const allText = [["1) Включите IP forwarding.", "sysctl -w net.ipv4.ip_forward=1"], ["2) Добавьте статический маршрут.", "ip route add 192.168.2.0/24 via 192.168.1.1 dev eth1"], ["3) Для добавления NAT.", "iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE"], ["4) Сохраните введённые правила.", "service iptables save"], ["5) Проверьте результат.", "ip route show, traceroute 192.168.2.10"]];

    useEffect(() => {
        if (timer === 0) {
            clearInterval(timeInterval);
            setTimeInterval(null);

            if (text === textToType[1]) {
                setResult("Ура! Пакет нашёл новый путь и продолжает движение");
                if (start === 5) {
                    setButtonText("Готово — пакет маршрутизируется через указанный шлюз!")
                } else {
                    setButtonText("Продолжить настройку")
                }
            } else {
                setResult(`Неверно. Пакет застрял в пути и придётся начать всё заново...`);
                setStart(0);
                setTextToType(["Нужно срочно настроить новый маршрут, пока никто не заметил. У вас есть 35 секунд для перенастройки маршрутизации!", "Нажмите кнопку старта для начала настройки и введите нужную команду."]);
                setButtonText("Начать снова")
            }
        }
    }, [timer, timeInterval]);

    useEffect(() => {
        return () => {
            if (timeInterval) {
                clearInterval(timeInterval);
            }
        };
    }, [timeInterval]);

    if (!isOpen) return null;

    const startTimer = () => {
        if (timeInterval) {
            clearInterval(timeInterval);
        }

        setText('');
        setStart(start + 1);
        setTextToType(allText[start]);
        setTimer(35);


        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        setTimeInterval(interval);
    };

    const handleClose = () => {
        if (timeInterval) {
            clearInterval(timeInterval);
            setTimeInterval(null);
        }
        setStart(0);
        setTimer(35);
        setText('');
        setTextToType(["Пакет попал не к тому адресату! Нужно срочно настроить новый маршрут, пока никто не заметил. У вас есть 35 секунд для перенастройки маршрутизации!", "Нажмите кнопку старта для начала настройки и введите нужную команду."]);
        setResult('');
        onClose();
        setButtonText("Старт")
    };

    return (
        <div className="modal-overlay" >
            <div className="modal-content">
                {!start && <button className="modal-close" onClick={handleClose}>×</button>}

                <h2 className="modal-title">Задание</h2>

                <div className="modal-question" onCopy={(e) => e.preventDefault()}>
                    <p>{textToType[0]}</p>
                    <p><span>{start !== 0 && "команда для ввода: "}</span>{textToType[1]}</p>
                </div>

                <section>
                    {start > 0 ? (
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={6}
                            style={{ width: '100%', padding: '10px', fontFamily: 'monospace' }}
                        />
                    ) : (
                        result && <p className="info-message">{result}</p>
                    )}
                </section>

                <span className="info-message">
                    Оставшееся время: {timer > 0 ? timer : 0}
                </span>

                {<button
                    className="submit-button"
                    onClick={startTimer}
                >
                    {buttonText}
                </button>}

            </div>
        </div>
    );
};

export default Exec1;