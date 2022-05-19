import {
  getCompletions,
  getPlumbers,
  getRequests,
  saveCompletions,
} from "./dataAccess.js";
// --- ^^ import function from other module ^^ --- //

/* ===> ===> FUNCTIONS ===> ===> */

// --- function (build 'Service Requests' HTML => export to main.js) --- //
export const Requests = () => {
  // --- get data from application state --- //
  const requests = isCompleted();
  const plumbers = getPlumbers();

  // --- build HTML --- //

  let html = `
        <ul>
            ${requests
              .map((request) => {
                // --- iterate requests --- //
                if (request.isCompleted === false) {
                  // --- check if completed --- //
                  return `
                    <li>
                        ${request.description}
                        ${plumberSelect(request, plumbers)}  
                    </li>`; // --- ^^ if not completed ^^ --- //
                } else {
                  return `
                    <li style="background: #FF7F7F">
                        ${request.description}
                        ${plumberSelect(request, plumbers)}  
                    </li>`; // --- ^^ if completed ^^ --- //
                }
              })
              .join("")}
        </ul>`;

  return html;
};

// --- funtion (sorts request by completion status) --- //
const isCompleted = () => {
  // --- get data from application state --- //
  const requests = getRequests();
  const completions = getCompletions();

  // --- change 'isCompleted' property of requests --- //
  requests.forEach((request) => {
    const foundCompletion = completions.find(
      (completion) => completion.requestId === request.id
    );
    if (foundCompletion) {
      request.isCompleted = true;
    }
  });

  // --- sort requests by completion status --- //
  requests.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

  return requests;
};

// --- function (creates plumber selection and delete button based on completion status) --- //
const plumberSelect = (request, plumbers) => {
  if (request.isCompleted === false) {
    // --- create plumber selection for outstanding requests --- //
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
    // ---  show completing plumber's name for completed request --- //
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
/* END */

// --- query selector (main container) --- //
const mainContainer = document.querySelector("#container");

// --- event listener (plumber selection) --- //
mainContainer.addEventListener("change", (event) => {
  if (event.target.id === "plumbers") {
    // --- split id into two variables --- //
    const [requestId, plumberId] = event.target.value.split("--");

    // --- save variables in new object --- //
    const completion = {
      requestId: parseInt(requestId),
      plumberId: parseInt(plumberId),
      date_created: Date.now(),
    };

    // --- send object to API --- //
    saveCompletions(completion);
  }
});
