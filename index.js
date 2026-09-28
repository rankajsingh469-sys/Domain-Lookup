const tldParams = ".com"

const inputForm = document.querySelector("#inputForm");
const seachBtn = document.querySelector("#seachBtn");
const domainResult = document.querySelector("#domainResult")
const warning = document.querySelector("#warning");
const loading = document.querySelector("#loading");

async function searchDomain(query) {
    const response = await fetch(`https://api.domainee.dev/v1/tools/domain-availability-checker?name=${encodeURIComponent(query)}`);
    const data = await response.json();
    displyDomain(data)
    loading.classList.add("hidden") 
    console.log(data);

}

function displyDomain(data) {
    
    domainResult.innerHTML = "";

    if (!data.ok) {
        
        domainResult.innerHTML = `
            <p class="text-red-500">
                Unable to check domains.
            </p>
        `;
        return;
    }

    const results = data.data.results;
    
    domainResult.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            ${results.map(domain => `

                <div class="p-5 bg-white border rounded-2xl shadow-sm">

                    <div class="flex justify-between items-center gap-4">

                        <h2 class="text-lg font-semibold">
                            ${domain.fqdn}
                        </h2>

                        <span class="
                            px-3 py-1
                            text-sm
                            rounded-full
                            ${domain.available
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                        ">
                            ${domain.available ? "Available" : "Taken"}
                        </span>

                    </div>

                    <div class="mt-4 text-sm text-gray-600">

                        <p>
                            <span class="font-medium">TLD:</span>
                            .${domain.tld}
                        </p>

                        <p>
                            <span class="font-medium">Method:</span>
                            ${domain.method}
                        </p>

                    </div>

                    ${
                        domain.registrarHint
                            ? `
                                <p class="mt-3 text-xs text-gray-500">
                                    ${domain.registrarHint}
                                </p>
                            `
                            : ""
                    }

                </div>

            `).join("")}

        </div>
    `;
}




seachBtn.addEventListener('click', function (e) {

    e.preventDefault()
    const query = inputForm.value.trim();
    if (query) {
        loading.classList.remove("hidden")
        searchDomain(query)
        warning.classList.add("hidden")
        
    } else {
        warning.classList.remove("hidden")
        
    }

})


