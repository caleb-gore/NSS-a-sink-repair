import {
  deleteRequest,
  fetchCompletions,
  fetchPlumbers,
  fetchRequests,
} from "./dataAccess.js";
import { SinkRepair } from "./SinkRepair.js";
// --- ^^ import functions from other modules ^^ --- //


// --- query selector (main container) --- //
const mainContainer = document.querySelector("#container");


// --- function (DOM rendering) --- //
const render = () => {
  fetchRequests()
    .then(() => fetchPlumbers())
    .then(() => fetchCompletions())
    .then(() => {
      mainContainer.innerHTML = SinkRepair();
    });
};

// --- function Call (DOM Rendering) //
render();


/* ===>  ===> EVENT LISTENERS ===>  ===> */


// --- (state changed) --- //
mainContainer.addEventListener(
  "stateChanged", 
  (customEvent) => {
    render(); 
  }
);


// --- (delete buttons) --- //
mainContainer.addEventListener("click", (clickEvent) => {
  const clickedItem = clickEvent.target;
  if (clickedItem.id.startsWith("request--")) {
    const [, requestId] = clickedItem.id.split("--");

    deleteRequest(parseInt(requestId));
  }
});
/* END */
