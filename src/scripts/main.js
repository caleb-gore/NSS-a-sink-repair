import { deleteRequest, fetchCompletions, fetchPlumbers, fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"

/* ^^ import functions from other modules ^^ */

/* asign main element to a variable */

const mainContainer = document.querySelector("#container")

/* renders all HTML to the DOM */
const render = () => {
    fetchRequests()
    .then(() => fetchPlumbers())
    .then(() => fetchCompletions())
    .then(       // call this function, then...
        () => {
            mainContainer.innerHTML = SinkRepair()      // ...render HTML from this function
        }
    )
}


render()        // function call

/* main element event listener (render HTML again)*/
mainContainer.addEventListener(
    "stateChanged",     // custum event (look in dataAccess.js)
    customEvent => {
        render()        //re-calls function
    }
)

/* click event listener (deletes request from database on click) */
mainContainer.addEventListener(
    'click',
    (clickEvent) => {
        const clickedItem = clickEvent.target
        if (clickedItem.id.startsWith('request--')) {
           const [, requestId] = clickedItem.id.split("--")

           deleteRequest(parseInt(requestId))
        }
    }
)