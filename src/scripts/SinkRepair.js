import { ServiceForm } from "./ServiceForm.js"
import { Requests } from "./Requests.js"
/* ^^ import functions from modules ^^ */

/* call imported functions and export HTML to main.js */
export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
            ${Requests()}
        </section>
    `
}