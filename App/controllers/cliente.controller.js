const db = require('../config/db.config.js');
const Cliente = db.Cliente;

// Crear un nuevo cliente
exports.create = (req, res) => {
    let cliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        nit: req.body.nit,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        fechaingreso: req.body.fechaingreso,
        estatus: req.body.estatus
    };

    Cliente.create(cliente)
        .then(result => {
            res.status(201).json({
                message: "Cliente creado exitosamente con id = " + result.id_cliente,
                cliente: result,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al crear el cliente",
                error: error.message
            });
        });
};

// Recuperar todos los clientes
exports.retrieveAllClientes = (req, res) => {
    Cliente.findAll()
        .then(clientes => {
            res.status(200).json({
                message: "Información de los Clientes obtenida exitosamente",
                clientes: clientes
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los clientes",
                error: error.message
            });
        });
};

// Recuperar un cliente por ID
exports.getClienteById = (req, res) => {
    let clienteId = req.params.id;
    Cliente.findByPk(clienteId)
        .then(cliente => {
            if (!cliente) {
                return res.status(404).json({
                    message: "No se encontró el Cliente con id = " + clienteId
                });
            }
            res.status(200).json({
                message: "Cliente obtenido exitosamente",
                cliente: cliente
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener el cliente",
                error: error.message
            });
        });
};

// Actualizar un cliente por ID
exports.updateById = async (req, res) => {
    const clienteId = req.params.id;
    try {
        const [updated] = await Cliente.update(req.body, {
            where: { id_cliente: clienteId }
        });
        if (updated) {
            const updatedCliente = await Cliente.findByPk(clienteId);
            res.status(200).json({
                message: "Cliente actualizado exitosamente",
                cliente: updatedCliente,
            });
        } else {
            res.status(404).json({
                message: "No se encontró el Cliente con id = " + clienteId
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el cliente",
            error: error.message
        });
    }
};

// Eliminar un cliente por ID
exports.deleteById = async (req, res) => {
    const clienteId = req.params.id;
    try {
        const deleted = await Cliente.destroy({
            where: { id_cliente: clienteId }
        });
        if (deleted) {
            res.status(200).json({
                message: "Cliente eliminado exitosamente",
                id: clienteId
            });
        } else {
            res.status(404).json({
                message: "No se encontró el Cliente con id = " + clienteId
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el cliente",
            error: error.message
        });
    }
};