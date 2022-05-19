import { sendRequest } from "./dataAccess.js";
// --- ^^ import function from other module ^^ --- //

// --- function (build form HTML => export to main.js) --- //
export const ServiceForm = () => {
  let html = `
        <div class="field"> 
            <label class="label" for="serviceDescription">Description</label>
            <input type="text" name="serviceDescription" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" name="serviceAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Budget</label>
            <input type="number" name="serviceBudget" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date needed</label>
            <input type="date" name="serviceDate" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
    `;
  return html;
};

// --- query selector (main container) --- //
const mainContainer = document.querySelector("#container");

// --- event listener ('Submit Request' button) --- //
mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "submitRequest") {
    // --- get form input values --- //
    const userDescription = document.querySelector(
      "input[name='serviceDescription']"
    ).value;
    const userAddress = document.querySelector(
      "input[name='serviceAddress']"
    ).value;
    const userBudget = document.querySelector(
      "input[name='serviceBudget']"
    ).value;
    const userDate = document.querySelector("input[name='serviceDate']").value;

    // --- save values to new object --- //
    const dataToSendToAPI = {
      description: userDescription,
      address: userAddress,
      budget: userBudget,
      neededBy: userDate,
      isCompleted: false,
    };

    // --- send values to API --- //
    sendRequest(dataToSendToAPI);
  }
});
