import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

//Init select

const select = document.querySelectorAll("select");
M.FormSelect.init(select);

function getSelectInstance(elem) {
    return M.FormSelect.getInstance(elem);
}

//Init Autocomplite

const autocomplite = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(autocomplite);

export function getAutocompliteInstance(elem) {
    return M.Autocomplete.getInstance(elem);
}

//Init datepickers

const datepicker = document.querySelectorAll(".datepicker");
M.Datepicker.init(datepicker, {
    showClearBtn: true,
    format: "yyyy-mm",
});

export function getDatePickerInstance(elem) {
    return M.Datepicker.getInstance(elem);
}
