module.exports = (sequelize, Sequelize) => {

    const Cliente = sequelize.define("cliente", {
        id_cliente: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        nit: {
            type: Sequelize.STRING
        },
        direccion:{
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        fecha_ingreso:{
            type: Sequelize.DATE
        },
        estatus:{
            type: Sequelize.INTEGER
        }
    });
    return Cliente;
};