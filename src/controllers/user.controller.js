import mongoose from "mongoose";
import User from "../models/users.model.js";
import bcrypt from "bcrypt";


//import bcrypt from "bcryptjs";

//const saltRounds = 1
; // esto es para definir el numero de rondas de sal que se van a usar para encriptar las contraseñas, un valor mas alto significa una encriptacion mas fuerte pero tambien un proceso de encriptacion mas lento, por lo general se recomienda usar un valor entre 10 y 12 para un buen equilibrio entre seguridad y rendimientono 



// obtener usuarios 
async function getUsers(req, res) {
    try {

    const usuarios = await User.find()
                                // .select({ password: 0, __v: 0 }) // otra forma de excluir campos, con un objeto
                                .select("-password -__v") // no queremos mostrar e password en la respuesta

  // devuelve un  array de usuarios que tenemos en la base de datos
    res.send(usuarios);  
    

   } catch (error) {
       console.log (error)
       res.send("no se pudo obtener los usuarios")
   }
}

// obtener un usuario por id
async function getUserById(req, res) {
    
 try {
      const { id } = req.params; // esto es para obtener el id del usuario que queremos buscar, el id se pasa como parametro en la ruta, por ejemplo /users/123, en este caso el id seria 123, y lo obtenemos de req.params.id

      //buscar el usuario en la base de datos por su id
      const user = await User.findById(id).select("-password -__v"); // esto es para buscar el usuario en la base de datos por su id, el metodo findById es un metodo de mongoose que nos permite buscar un documento por su id, y el select es para excluir el campo de password y __v de la respuesta

      //si no existe el usuario, devolver un mensaje de error con un status 404 que indica que el recurso no fue encontrado
      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }
      // si existe el usuario, devolverlo en la respuesta 
      res.send(user)



} catch (error){
    console.log (error)
    res.status(500).send("no se pudo obtener el usuario por id");
}
}

// crear un nuevo usuario.
async function createUser(req, res) {
  try {
    const { name, email, password, birthdate, province } = req.body;

    // 1. Encriptamos la contraseña (10 rondas de "sal")
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Creamos el usuario con la contraseña ya encriptada
    const usuario = new User({
      name,
      email,
      password: hashedPassword,
      birthdate,
      province
    });

    const newUser = await usuario.save();

    // Ocultamos la contraseña en la respuesta por seguridad
    newUser.password = undefined;
    res.status(201).send(newUser);

  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error.message);
    }
    res.status(500).send("Algo falló al crear el usuario");
  }
} 

async function updateUser(req, res) {
  
try { 
        const { id } = req.params; 

        const updateUser = await User.findByIdAndUpdate(id, req.body, { new : true, runValidators: true }).select("-password -__v"); // esto es para buscar el usuario por su id y actualizarlo con los datos que recibimos en el cuerpo de la peticion, el metodo findByIdAndUpdate es un metodo de mongoose que nos permite buscar un documento por su id y actualizarlo con nuevos datos, el tercer parametro { new: true } es para indicar que queremos que la respuesta incluya el usuario actualizado en lugar del usuario original antes de la actualizacion, y runValidators: true es para asegurarnos de que se apliquen las validaciones definidas en el esquema de usuario al actualizar el usuario, esto es importante para mantener la integridad de los datos y evitar que se guarden datos invalidos en la base de datos, y el select es para excluir el campo de password y __v de la respuesta, de esta forma si el usuario se actualiza correctamente, la respuesta solo incluirá los campos del usuario sin mostrar la contraseña ni el campo __v que es un campo interno de mongoose

        if (!updateUser) {
            return res.status(404).send("Usuario no encontrado");
        }

        res.status(200).send("usuario actualizado correctamente")

    } catch (error) {
        console.log (error)
        res.status(500).send("no se pudo actualizar el usuario")
    }
}

async function deleteUser (req,res) {
    
    try {
        const {id} = req.params;

        const deletedUser = await User.findByIdAndDelete(id).select("-password -__v"); // esto es para buscar el usuario por su id y eliminarlo de la base de datos, el metodo findByIdAndDelete es un metodo de mongoose que nos permite buscar un documento por su id y eliminarlo, y el select es para excluir el campo de password y __v de la respuesta, de esta forma si el usuario se elimina correctamente, la respuesta solo incluirá los campos del usuario sin mostrar la contraseña ni el campo __v que es un campo interno de mongoose 
        if (!deletedUser) {
            return res.status(400).send("Usuario no encontrado o ya eliminado"); // esto es para manejar el caso en el que el usuario que queremos eliminar no existe en la base de datos, en este caso devolvemos un status 400 que indica que la solicitud no es válida, y un mensaje que indica que el usuario no fue encontrado o ya fue eliminado, esto es importante para informar al cliente sobre el resultado de su solicitud de eliminación, y evitar confusiones sobre si el usuario fue eliminado o si simplemente no existía en la base de datos
        }
        res.send("usuario eliminado correctamente")

    } catch (error) {
        console.log (error)
        res.status(500).send("no se pudo eliminar el usuario")
    }

}

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser   
}