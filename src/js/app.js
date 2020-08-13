import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUi from "./views/form";
import currencyUi from "./views/currency";
import ticketsUi from "./views/tickets";
import favoritesUi from "./views/favorites";

document.addEventListener("DOMContentLoaded", () => {
    initApp();
    const form = formUi.form;
    let favorites = {};
    let showFavorites = document.querySelector(".show-favorites");
    let favoritesContent = document.querySelector(".favorite-content");
    const ticketsContainer = document.querySelector(".tickets-sections");
    const addBtn = document.querySelectorAll(".add-favorite");

    //обработка кнопки добавления в избранное на сайте и в локалсторэдж

    showFavorites.addEventListener("click", (e) => {
        let localFavorites = getFromLocalStorage("favorites");
        favoritesContent.style.display = "block";
        favoritesContent.style.opacity = "1";

        renderFavoritesTemplate(localFavorites);

        const deleteFromFavBtn = document.querySelectorAll(".delete-favorite");

        deleteFromFavBtn.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const deleteId = e.target.dataset.id;
                e.target.closest(".favorite-item").remove();
                delete localFavorites[deleteId];
                toLocalStorage("favorites", localFavorites);
            });
        });
    });

    //events
    form.addEventListener("submit", (e) => {
        //чтобы форма не перезагружала страницу
        e.preventDefault();
        onFormSubmit();
    });

    function getFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    function toLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function scrollTo(elem) {
        elem.scrollIntoView({ behavior: "smooth" });
    }

    function renderFavoritesTemplate(tickets) {
        let fragment = "";
        const currency = ticketsUi.getCurrencySymbol();

        for (let key in tickets) {
            const template = favoritesTemplate(tickets[key], currency);
            fragment += template;
        }

        favoritesContent.insertAdjacentHTML("afterbegin", fragment);
    }

    function favoritesTemplate(ticket, currency) {
        return `<div class="favorite-item d-flex align-items-start">
                    <img
                        src="${ticket.airline_logo}"
                        class="favorite-item-airline-img"
                    />
                    <div class="favorite-item-info d-flex flex-column">
                        <div
                            class="favorite-item-destination d-flex align-items-center"
                        >
                            <div class="d-flex align-items-center mr-auto">
                                <span class="favorite-item-city">${ticket.origin_name}</span>
                                <i class="medium material-icons"
                                    >flight_takeoff</i
                                >
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="medium material-icons">flight_land</i>
                                <span class="favorite-item-city">${ticket.destination_name}</span>
                            </div>
                        </div>
                        <div
                            class="ticket-time-price d-flex align-items-center"
                        >
                            <span class="ticket-time-departure"
                                >${ticket.departure_at}</span
                            >
                            <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
                        </div>
                        <div class="ticket-additional-info">
                            <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                            <span class="ticket-flight-number"
                                >Номер рейса: ${ticket.flight_number}</span
                            >
                        </div>
                        <a
                            class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" data-id="${ticket.id}"
                            >Delete</a
                        >
                    </div>
                </div>`;
    }

    //handlers
    async function initApp() {
        await locations.init();
        formUi.setAutocompliteData(locations.shortCitiesList);
    }

    async function onFormSubmit() {
        //собрать все даннные из инпутов
        const origin = locations.getCityCodeByKey(formUi.originValue);
        const destination = locations.getCityCodeByKey(formUi.destinationValue);
        const depart_date = formUi.departDateValue;
        const return_date = formUi.returnDateValue;
        const currency = currencyUi.currencyValue;

        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });

        ticketsUi.renderTickets(locations.lastSearch);
        scrollTo(ticketsContainer);

        const addBtn = document.querySelectorAll(".add-favorite");

        //обработка кнопки добавления в избранное на сайте и в локалсторэдж
        addBtn.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const ticketId = e.target.dataset.id;
                favorites[ticketId] = locations.idSearch[ticketId];
                toLocalStorage("favorites", favorites);
            });
        });
    }
});

/**
 *
 * 1) При клике на кнопку - получить id кликнутого билета
 * 1.1 привязать id объекта к аттрибуту кнопки
 * 1.2 собрать новый массиа, где ключом будет id билета
 * 1.3 создать id
 * 2) Получаем объект билета по id
 * 3) Создаем новый массив favorites
 * 4) Добавляем в него билет
 * ---------------------
 * РАБОТА С LOCALSTORAGE
 * 1)Отправка нового массива в локалсторадж
 * 1.1 проверяем наличие билетов
 * ---------------------
 * РЕНДЕРИНГ ИЗБРАННОГО
 * 1) При клике на кнопку "избранные" получить выбранные билеты из локал сторедж
 * 2) Обработка массива - на каждый элемент создаем новый  HTML
 * 2.1 привязать эелемнты объекта к хтмл
 *
 * *Добавить автоскролл к билетам
 *
 *
 *
 *
 */
