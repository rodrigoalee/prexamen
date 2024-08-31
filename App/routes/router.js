let express = require('express');
let router = express.Router();

const empleadoController = require('../controllers/empleado.controller.js');
const departamentoController = require('../controllers/departamento.controller.js');
const clienteController = require('../controllers/cliente.controller.js');

router.post('/api/empleados/create', empleadoController.create);
router.get('/api/empleados/all', empleadoController.retrieveAllEmpleados);
router.get('/api/empleados/onebyid/:id', empleadoController.getEmpleadoById);
router.put('/api/empleados/update/:id', empleadoController.updateById);
router.delete('/api/empleados/delete/:id', empleadoController.deleteById);


router.post('/api/departamentos/create', departamentoController.create);
router.get('/api/departamentos/all', departamentoController.retrieveAllDepartamentos);
router.get('/api/departamentos/onebyid/:id', departamentoController.getDepartamentoById);
router.put('/api/departamentos/update/:id', departamentoController.updateById);
router.delete('/api/departamentos/delete/:id', departamentoController.deleteById);

router.post('/api/clientes/create', clienteController.create);
router.get('/api/clientes/all', clienteController.retrieveAllClientes);
router.get('/api/clientes/onebyid/:id', clienteController.getClienteById);
router.put('/api/clientes/update/:id', clienteController.updateById);
router.delete('/api/clientes/delete/:id', clienteController.deleteById);

module.exports = router;