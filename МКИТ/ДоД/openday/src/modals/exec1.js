import React, { useEffect, useState } from 'react';
import '../App.css';

const Exec1 = ({ isOpen, onClose }) => {
    const [text, setText] = useState('');
    const [start, setStart] = useState(false);
    const [result, setResult] = useState("");
    const [timer, setTimer] = useState(15);
    const [timeInterval, setTimeInterval] = useState(null);
    const [success, setSuccess] = useState(false);

    const textToType = "Настройка маршрутизации пакета: 1) Включить IP forwarding: sysctl -w net.ipv4.ip_forward=1. 2) Добавить статический маршрут: ip route add 192.168.2.0/24 via 192.168.1.1 dev eth1. 3) Для NAT: iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE. 4) Сохранить правила: service iptables save. 5) Проверить: ip route show, traceroute 192.168.2.10. Готово — пакет маршрутизируется через указанный шлюз!";

    const wordCount = textToType.split(" ").length;

    useEffect(() => {
        if (timer === 0) {
            clearInterval(timeInterval);
            setStart(false);
            setTimeInterval(null);

            const typedWords = text.split(" ").filter(word => word !== "").length;
            const words = typedWords;
            if (words < 60) {
                setResult(`Результат: ${words} слов из ${wordCount}. Пакет застрял в пути(`);
            } else {
                setResult(`Результат: ${words} слов из ${wordCount}. "Ура! Пакет нашёл новый путь и продолжает движение"}`);
                setSuccess(true)
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

        setTimer(15);

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
        setStart(false);
        setTimer(15);
        setText('');
        setResult('');
        onClose();
    };

    const handleStart = () => {
        setStart(true);
        startTimer();
    };

    return (
        <div className="modal-overlay" >
            <div className="modal-content">
                {!start && <button className="modal-close" onClick={handleClose}>×</button>}

                <h2 className="modal-title">Задание</h2>

                <div className="modal-question" onCopy={(e) => e.preventDefault()}>
                    <p>Пакет попал не к тому адресату! Нужно срочно настроить новый маршрут, пока никто не заметил. У вас есть 30 секунд для перенастройки маршрутизации!</p>
                    <p>Нажмите кнопку старта и введите в поле следующий текст: "{textToType}"</p>
                </div>

                <section>
                    {start ? (
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

                {!start && !success && (
                    <button
                        className="submit-button"
                        onClick={handleStart}
                    >
                        Старт
                    </button>
                )}
            </div>
        </div>
    );
};

export default Exec1;