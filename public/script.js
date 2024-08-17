const btnHandler = function (event) {
  fetch("/create-payment", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      items: [
        { id: 1, amount: 3 },
        { id: 2, amount: 1 },
      ],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((e) => console.error(e.error));
};
