const Url = {
  DATA: 'https://27.javascript.pages.academy/keksobooking/data',
  SERVER: 'https://27.javascript.pages.academy/keksobooking'
};

const getData = (onSuccess, OnError) => {
  fetch(Url.DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Ошибка загрузки информации с сервера');
    })
    .then((response) => onSuccess(response))
    .catch((error) => OnError(error.message));
};

const sendData = (onSuccess, OnError, body) => {
  fetch(
    Url.SERVER,
    {
      method: 'POST',
      body
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Ошибка размещения объявления');
      }
    })
    .catch((error) => OnError(error.message));
};

export { getData, sendData };
