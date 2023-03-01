function loadPhoneData(searchText, limit) {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => phonesData(data.data, limit))
}
const phonesData = (phones, limit) => {
    // const phonesDetails = phones.data;
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerHTML = '';
    const showAll = document.getElementById('show-all');
    if (limit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    const noPhone = document.getElementById('no-phone');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    for (const phone of phones) {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                    </div>
                    <input onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary m-4" id="show-details-btn" type="button" value=" Show Full Details" data-bs-toggle="modal" data-bs-target="#exampleModal">
        </div>`;
        phoneContainer.appendChild(phoneDiv);
    }
    toggleSpinner(false);
}

function processData(limit) {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    loadPhoneData(inputValue, limit);
}

document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processData(10);
    }
});

document.getElementById('show-all').addEventListener('click', function () {
    processData();
});

const loadPhoneDetails =async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    phoneDetails(data.data);
}

const phoneDetails = phone => {
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <p>Main feature:<br>
    Storage:${phone.mainFeatures.storage}</p>
    <p>Display:${phone.mainFeatures.displaySize}</p>
    <p>Chipset:${phone.mainFeatures.chipSet}</p>
    <p>Memory:${phone.mainFeatures.memory}</p>
    <p>Others features:<br>
    WLAN:${phone.others.WLAN}</p>
    <p>Bluetooth:${phone.others.Bluetooth}
    </p>
    `
}

document.getElementById('input-btn').addEventListener('click', function () {
    processData(10);
    toggleSpinner(true);
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}