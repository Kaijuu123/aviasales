import {
    getAutocompliteInstance,
    getDatePickerInstance,
} from "../plugins/materialize";

class FormUi {
    constructor(autocompliteInstance, datePickerInstance) {
        this._form = document.forms["locationControls"];
        this.origin = document.getElementById("autocomplete-origin");
        this.destination = document.getElementById("autocomplete-destination");
        this.depart = document.querySelector("#datepicker-depart");
        this.return = document.querySelector("#datepicker-return");
        this.originAutocomplite = autocompliteInstance(this.origin);
        this.destinationAutocomplite = autocompliteInstance(this.destination);
        this.departDatepicker = datePickerInstance(this.depart);
        this.returnDatepicker = datePickerInstance(this.return);
    }

    get form() {
        return this._form;
    }

    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get departDateValue() {
        return this.departDatepicker.toString();
    }

    get returnDateValue() {
        return this.returnDatepicker.toString();
    }

    setAutocompliteData(data) {
        this.originAutocomplite.updateData(data);
        this.destinationAutocomplite.updateData(data);
    }
}

const formUi = new FormUi(getAutocompliteInstance, getDatePickerInstance);

export default formUi;
