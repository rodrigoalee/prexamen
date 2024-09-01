const db = require('../config/db.config.js');
const Cliente = db.Cliente;

// Crear un nuevo cliente
exports.create = (req, res) => {
    let cliente = {};

    try {
        // Asignar valores del cuerpo de la solicitud al objeto cliente
        cliente.nombre = req.body.nombre;
        cliente.apellido = req.body.apellido;
        cliente.nit = req.body.nit;
        cliente.direccion = req.body.direccion;
        cliente.telefono = req.body.telefono;
        cliente.email = req.body.email;
        cliente.estatus = req.body.estatus;
    
        Cliente.create(cliente)
            .then(result => {
                res.status(200).json({
                    message: "Cliente creado exitosamente con id = " + result.id_cliente,
                    cliente: result,
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: "¡Error al crear el cliente!",
                    error: error.message
                });
            });
    } catch (error) {
        res.status(500).json({
            message: "¡Error al crear el cliente!",
            error: error.message
        });
    }
};

// Recuperar todos los clientes
exports.retrieveAllClientes = (req, res) => {
    Cliente.findAll()
        .then(clienteInfos => {
            res.status(200).json({
                message: "Información de todos los clientes obtenida exitosamente",
                clientes: clienteInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los clientes!",
                error: error
            });
        });
};

// Recuperar un cliente por ID
exports.getClienteById = (req, res) => {
    let clienteId = req.params.id;
    Cliente.findByPk(clienteId)
        .then(cliente => {
            if (cliente) {
                res.status(200).json({
                    message: "Cliente obtenido exitosamente con id = " + clienteId,
                    cliente: cliente
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el cliente con id = " + clienteId,
                    cliente: null
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener el cliente!",
                error: error
            });
        });
};

// Actualizar un cliente por ID
exports.updateById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No se encontró el cliente con id = " + clienteId,
                cliente: null,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nit: req.body.nit,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                fechaingreso: req.body.fechaingreso, // Añadido si también se desea actualizar la fecha de ingreso
                estatus: req.body.estatus
            };

            let result = await Cliente.update(updatedObject, { returning: true, where: { id_cliente: clienteId } });

            if (result[0] === 0) {
                res.status(500).json({
                    message: "¡Error! No se pudo actualizar el cliente con id = " + clienteId,
                    error: "No se pudo actualizar",
                });
            } else {
                res.status(200).json({
                    message: "Cliente actualizado exitosamente con id = " + clienteId,
                    cliente: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "¡Error! No se pudo actualizar el cliente con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un cliente por ID
exports.deleteById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No existe un cliente con id = " + clienteId,
                error: "404",
            });
        } else {
            await cliente.destroy();
            res.status(200).json({
                message: "Cliente eliminado exitosamente con id = " + clienteId,
                cliente: cliente,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "¡Error! No se pudo eliminar el cliente con id = " + req.params.id,
            error: error.message,
        });
    }
};
