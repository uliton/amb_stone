import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getTranslation, Language } from '../../context/Language';
import { Modal } from '../Modal/Modal';

export const Intro = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const lang = useContext(Language);
  const MOCK = getTranslation(lang);
  const TOKEN = '6116137615:AAFPkZMhlxYR5LMcl1QtdlT8GqH36uy-k4k';
  const CHAT_ID = '-1001247322645';
  const URL_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage?`;

  // handler
  const handlerSendMessage = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, 0);
    const minuts = date.getMinutes().toString().padStart(2, 0)
    const seconds = date.getSeconds().toString().padStart(2, 0)
    const day = date.getDay().toString().padStart(2, 0);
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const year = date.getFullYear().toString().padStart(2, 0);
    const actualTime = `${hours}:${minuts}:${seconds} - ${day}.${month}.${year}`;

    let message = '<b>На сайте кто-то нажал на кнопку</b>\n';
    message += `<b>В ${actualTime}</b>\n`
    // message += `<b>С страны </b>\n`

    axios.post(URL_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message
    }).then(() => {
      console.log('procesing');
    }).catch(() => {
      console.log('nop');
    }).finally(() => {
      console.log('message sent');
    })








  }

  return (
    <div className='intro container'>
      <div className="intro__title">
        {MOCK.intro_title}
      </div>

      <div className="intro__description">
        {MOCK.intro_description}
      </div>

      <div className="intro__configurator configurator">
        {/* first button */}
        <button
          type='button'
          className='configurator__button'
          onClick={handlerSendMessage}
        >
          {MOCK.intro_searchButton1}
        </button>
        
        {/* second button */}
        <button
          type='button'
          className='configurator__button'
          onClick={handlerSendMessage}
        >
          {MOCK.intro_searchButton2}
        </button>

        {/* third button */}
        <button
          type='button'
          className='configurator__button'
          onClick={() => {
            setModalStatus(true);
          }}
        >
          {MOCK.intro_searchButton3}
        </button>

        {/* <Link
          to='/'
          className='configurator__link'
        >
          {MOCK.intro_configurator}
        </Link> */}

        {modalStatus && (
          <Modal 
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
          />
        )}
      </div>
    </div>
  );
};
