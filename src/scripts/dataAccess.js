//--- applicatino state --- //
const applicationState = {
  requests: [],
};

// --- query selector (main container) --- //
const mainContainer = document.querySelector("#container");

// --- get API --- //
const API = "http://localhost:8088";

/* ===>  ===> FUNCTIONS (FETCH) ===> ===> */

// --- function (fetch requests from API => export) --- //
export const fetchRequests = () => {
  return fetch(`${API}/requests`) // fetch requests
    .then((response) => response.json())
    .then((serviceRequests) => {
      // Store the external state in application state
      applicationState.requests = serviceRequests;
    });
};

// --- function (fetch plumbers from API => export) --- //
export const fetchPlumbers = () => {
  return fetch(`${API}/plumbers`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.plumbers = data;
    });
};

// --- function (fetch completions from API => export) --- //
export const fetchCompletions = () => {
  return fetch(`${API}/completions`)
    .then((resource) => resource.json())
    .then((completions) => {
      applicationState.completions = completions;
    });
};
/* END */

/* ===>  ===>  FUNCTIONS (GET) ===>  ===> */

// --- function (get requests from application state => export) --- //
export const getRequests = () => {
  return applicationState.requests.map((request) => ({ ...request }));
};

// --- function (get plumbers from application state => export) --- //
export const getPlumbers = () => {
  return applicationState.plumbers.map((plumber) => ({ ...plumber }));
};

// --- function (get completions from application state => export) --- //
export const getCompletions = () => {
  return applicationState.completions.map((completion) => ({ ...completion }));
};
/* END */

/* ===>  ===>  FUNCTIONS (SEND/POST)  ===>  ===> */

// --- function (send request to API => export) --- //
export const sendRequest = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userServiceRequest),
  };

  return fetch(`${API}/requests`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

// --- function (send completion to API => export) --- //
export const saveCompletions = (completionObj) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completionObj),
  };

  return fetch(`${API}/completions`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};
/* END */

/* ===>  ===>  FUNCTIONS (DELETE) ===>  ===> */

// --- function (delete request from API => export) --- //
export const deleteRequest = (id) => {
  return fetch(`${API}/requests/${id}`, { method: "DELETE" }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};
/* END */