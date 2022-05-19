import {
  getCompletions,
  getPlumbers,
  getRequests,
  saveCompletions,
} from "./dataAccess.js";
/* ^^ import function from other module ^^ */

/* export HTML to other module */
export const Requests = () => {
  const requests = isCompleted(); /* assign getter function to variable */
  const plumbers = getPlumbers();

  /* build HTML */

  let html = `
        <ul>
            ${requests
              .map((request) => {
                if (request.isCompleted === false) {
                  return `
                    <li>
                        ${request.description}
                        ${plumberSelect(request, plumbers)}  
                    </li>`;
                } else {
                  return `
                    <li style="background: #FF7F7F">
                        ${request.description}
                        ${plumberSelect(request, plumbers)}  
                    </li>`;
                }
              })
              .join("")}
        </ul>`;

  return html;
};

/* assign main container to variable (same as on main.js) */
const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("change", (event) => {
  if (event.target.id === "plumbers") {
    const [requestId, plumberId] = event.target.value.split("--");

    /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
    const completion = {
      requestId: parseInt(requestId),
      plumberId: parseInt(plumberId),
      date_created: Date.now(),
    };

    saveCompletions(completion);
    /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
  }
});

const isCompleted = () => {
  const requests = getRequests();
  const completions = getCompletions();

  requests.forEach((request) => {
    const foundCompletion = completions.find(
      (completion) => completion.requestId === request.id
    );
    if (foundCompletion) {
      request.isCompleted = true;
    }
  });

  requests.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

  return requests;
};

const plumberSelect = (request, plumbers) => {
  if (request.isCompleted === false) {
    return `<select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${plumbers
          .map((plumber) => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`;
          })
          .join("")}
    </select>
    
    <button class="request__delete" 
                                id="request--${request.id}">
                            Delete
                        </button>`;
  } else {
    const completions = getCompletions();
    const completedRequest = completions.find(
      (completion) => completion.requestId === request.id
    );
    const servicingPlumber = plumbers.find(
      (plumber) => completedRequest.plumberId === plumber.id
    );

    return `completed by ${servicingPlumber.name}`;
  }
};
