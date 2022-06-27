import React, {useEffect, useState} from 'react';
import axios from "axios";
import './App.scss';

function App() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState('')
    const [message, setMessage] = useState('')
    const [nameError, setNameError] = useState('Имя и Фамилия не могут быть пустыми!')
    const [emailError, setEmailError] = useState('Email не может быть пустым!')
    const [phoneError, setPhoneError] = useState('Номер не может быть пустым!')
    const [dateError, setDateError] = useState('Дата не может быть пустой!')
    const [messageError, setMessageError] = useState('Сообщение не может быть пустым!')
    const [formValid, setFormValid] = useState(true)
    const [serverError, setServerError] = useState('')
    const [serverSuccess, setServerSuccess] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (nameError || emailError || phoneError || dateError || messageError || loading){
            setFormValid(false)
        } else{
            setFormValid(true)
        }
    }, [nameError, emailError, phoneError, dateError, messageError, loading])

    const i = axios.create({
        // baseURL: "http://localhost:3001",
        baseURL: "https://my-json-server.typicode.com/mrSnail04/json_server_seobility",
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const submit = async (name, email, phone, date, message) => {
        setServerSuccess('');
        setServerError('');
        setLoading(true)
        return i.post('/data/', {
                id: 1,
                name: name,
                email: email,
                phone: phone,
                date: date,
                message: message,
        })
            .then((response) => {
                if (response?.data){
                    setLoading(false)
                    // Ответ от сервера с полем 'success'
                    // setServerSuccess(response.data.success)
                    setServerSuccess("Успешно отправленно")
                    resetForms()
                }
                return response;
            }, (error) => {
                setLoading(false)
                setServerError(error.response.data.error)
            });
    };

    const nameHandler = (e) => {
        setName(e.target.value.toUpperCase())
        const re = /^([A-Za-z]{3,30}\s[A-Za-z]{3,30})$/
        if (!re.test(String(e.target.value))) {
            setNameError('Некорректные Имя и Фамилия!')
        } else{
            setNameError('')
        }
    };

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный Email!')
        } else{
            setEmailError('')
        }
    };

    const dateHandler = (e) => {
        setDate(e.target.value)
        if (e.target.value.length < 1){
            setDateError('Некорректная Дата!')
        } else{
            setDateError('')
        }
    };

    const messageHandler = (e) => {
        setMessage(e.target.value)
        if (e.target.value.length < 10 || e.target.value.length > 300){
            setMessageError('Допустимое количество символов от 10 до 300!')
        } else {
            setMessageError('')
        }
    };

    const phoneHandler = (e) => {

        let inputNumbersValue = e.target.value.replace(/\D/g, ''),
            selectionStart = e.target.selectionStart,
            formattedInputValue = "";
        ///Валидация номера
        const re =/^([+7][0-9]{10}|[8][0-9]{10})$/
        if(e.target.value.length > 1 && !re.test(String(e.target.value.replace(/\D/g, ''))) ) {
            setPhoneError('Недопустимый номер!')
        }else {
            setPhoneError('')
        }
        if (!inputNumbersValue) {
            return e.target.value = "";
        }
        if (e.target.value.length !== selectionStart) {
            if (e.target.value && /\D/g.test(e.target.value)) {
                setPhone(e.target.value)
            }
            return ;
        }
        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] === "9") {
                inputNumbersValue = "7" + inputNumbersValue;
            }
            let firstSymbols = (inputNumbersValue[0] === "8") ? "8" : "+7";
            formattedInputValue = e.target.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            setPhoneError('Недопустимый символ!')
        }
        setPhone(formattedInputValue)
    };
    // Удаление первого символа в номере.
    const onPhoneKeyDown = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode === 8 && inputValue.length === 1) {
            setPhone('');
        }
    }
    // Увеличение поля ввода сообщения в зависимости от текста.
    const textArea = document.querySelector('textarea');
    const textRowCount = textArea ? textArea.value.split("\n").length : 0;
    const rows = textRowCount + 1;

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };
    // Сброс формы.
    const resetForms = () => {
        setName('')
        setEmail('')
        setPhone('')
        setDate('')
        setMessage('')
    };

  return (
      <div className="App">
        <form onSubmit={handleFormSubmit}>
            <h1>Обратная связь</h1>
            <input
                onChange={e => nameHandler(e)}
                value={name}
                type="text"
                name="name"
                placeholder="Имя и Фамилия"
            />
            {(nameError.length > 1) && <div className="error">{nameError}</div>}

            <input
                onChange={e => emailHandler(e)}
                value={email}
                type="email"
                name="email"
                placeholder="E-mail"
            />
            {(emailError.length > 1) && <div className="error">{emailError}</div>}

            <input
                onChange={e => phoneHandler(e)}
                onKeyDown={e => onPhoneKeyDown(e)}
                value={phone}
                type="tel"
                name="phone"
                placeholder="Телефон"
                maxLength={18}
            />
            {(phoneError.length > 1) && <div className="error">{phoneError}</div>}

            <input
                onChange={e => dateHandler(e)}
                value={date}
                type="date"
                name="date"
                placeholder="Дата"
            />
            {(dateError.length > 1) && <div className="error">{dateError}</div>}

            <textarea
                rows={rows}
                onChange={e => messageHandler(e)}
                value={message}
                name="message"
                placeholder="Сообщение"
            />
            {(messageError.length > 1) && <div className="error">{messageError}</div>}
          <div>
            <button disabled={!formValid} type='submit' onClick={() => submit(name, email, phone, date, message)}>
              <span>
                  Отправить
              </span>
            </button>
          </div>
        </form>
          {(serverError.length > 0) && <div className="error">{serverError}</div> }
          {(serverSuccess.length > 0) && <div className="success">{serverSuccess}</div> }
      </div>
  );
}

export default App;
