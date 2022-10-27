const Url = {
  GET: 'https://27.javascript.pages.academy/keksobooking/data',
  POST: 'https://27.javascript.pages.academy/keksobooking'
};

const getData = (onSuccess, onError) => {
  fetch(Url.GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Ошибка загрузки информации с сервера');
    })
    .then((response) => onSuccess(response))
    .catch((error) => onError(error.message));
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    Url.POST,
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
    .catch((error) => onError(error.message));
};

export { getData, sendData };
