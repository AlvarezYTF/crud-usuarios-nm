const User = require('../models/User');

const eliminarUsuario = async (req, res) => {
    try {
        const {id} = req.params;

        const usuarioEliminado = await User.findByIdAndDelete(id);

        if (!usuarioEliminado) {
            return res.status(404).json({error : 'Usuario no encontrado'});
        }

        res.status(200).json({message: 'Usuario eliminado correctamente'});
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el usuario'});
    }
};

module.exports = {
    eliminarUsuario,
};