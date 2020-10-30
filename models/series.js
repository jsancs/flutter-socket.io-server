const Serie = require("./serie");



class Series {

    constructor() {
        this.series = [];
    }

    addSerie(serie = new Serie()) {
        this.series.push(serie);
    }

    getSeries() {
        return this.series;
    }

    deleteSerie(id = '') {
        this.series = this.series.filter(serie => serie.id != id);
    }

    voteSerie(id = '') {
        this.series = this.series.map(serie => {
            if (serie.id === id) {
                serie.votes++;
                return serie;
            } else {
                return serie;
            }
        });
    }

}

module.exports = Series;