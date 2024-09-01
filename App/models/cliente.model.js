module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('cliente', {
        idcliente: {
            type: Sequelize.INTEGER, autoincrement: true, primaryKey: true},
        nombre: {
            type: Sequelize.STRING},
        apellido: {
            type: Sequelize.STRING},
        nit: {
            type: Sequelize.STRING},
        direccion: {
            type: Sequelize.STRING},
        telefono: {
            type: Sequelize.STRING},
        email: {
            type: sequelize.STRING},
        Estatus: { 
            type: Sequelize.INTEGER}
        
    });

    return Departamento;
}