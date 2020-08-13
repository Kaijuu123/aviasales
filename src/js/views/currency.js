class CurrensyUi {
    constructor() {
        this.currency = document.getElementById("currency");
        this.dictionary = {
            USD: "$",
            EUR: "€",
        };
    }

    get currencyValue() {
        return this.currency.value;
    }

    getCurrencySymbol() {
        return this.dictionary[this.currencyValue];
    }
}

const currencyUi = new CurrensyUi();

export default currencyUi;
