const { io } = require('../index');
const Serie = require('../models/serie');
const Series = require('../models/series');

const series = new Series();

series.addSerie(new Serie('Friends'));
series.addSerie(new Serie('GOT'));
series.addSerie(new Serie('Suits'));
series.addSerie(new Serie('The100'));



// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-series', series.getSeries());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    client.on('vote-serie', (payload) => {
        series.voteSerie(payload.id);
        io.emit('active-series', series.getSeries());
    });

    client.on('add-serie', (payload) => {
        const newSerie = new Serie(payload.name);
        series.addSerie(newSerie);
        io.emit('active-series', series.getSeries());
    });

    client.on('delete-serie', (payload) => {
        series.deleteSerie(payload.id);
        io.emit('active-series', series.getSeries());
    });

});