import mongoose from "mongoose";
import User from "../models/users.model.js";
import bcrypt from "bcrypt";



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

    
    const imagePath = req.file 
      ? `/uploads/users/${req.file.filename}` 
      : "/uploads/users/default.png";

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = new User({
      name,
      email,
      password: hashedPassword,
      birthdate,
      province,
      image: imagePath 
    });

    const newUser = await usuario.save();
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
    
    
    let updateData = { ...req.body };

    
    if (req.file) {
      updateData.image = `/uploads/users/${req.file.filename}`;
    }

    const userUpdated = await User.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
    ).select("-password -__v");

    if (!userUpdated) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.status(200).send("Usuario actualizado correctamente");

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