import User from "../models/users.model.js";

import bcrypt from "bcryptjs";

const saltRounds = 1
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
async function createUser (req, res) {
      try {
        // console.log( "body", req.body) // esto es para verificar que estamos recibiendo los datos en el cuerpo de la peticion, en la consola del servidor deberiamos ver el objeto con los datos del nuevo usuario que queremos crear

        const usuario = new User(req.body);
        // el modelo de usuario es una clase que nos permite crear instancias de usuario con los datos que recibimos en el cuerpo de la peticion, al crear una nueva instancia de User con los datos de req.body, estamos creando un nuevo usuario que luego podemos guardar en la base de datos usando el metodo save()

        console.log (usuario) // esto es para verificar que hemos creado correctamente la instancia de usuario con los datos recibidos, en la consola del servidor deberiamos ver un objeto de usuario con los campos definidos en el esquema de usuario y los valores que hemos enviado en la peticion

       const newUser = await usuario.save() // esto es para guardar el nuevo usuario en la base de datos, el metodo save() es asincrono y devuelve una promesa que se resuelve con el usuario guardado, que incluye un id generado por MongoDB y cualquier otro campo que se haya definido en el esquema de usuario

       newUser.password = undefined; // esto es para ocultar el campo de password en la respuesta, al establecerlo como undefined, el campo no se incluirá en el objeto que se envía al cliente, esto es una medida de seguridad para evitar exponer la contraseña del usuario en la respuesta

         res.send (newUser);
        //  res.send("creando un nuevo usuario") // esta respuesta se envia antes de guardar el usuario en la base de datos, lo que no es correcto, por eso es importante usar el await para esperar a que se guarde el usuario antes de enviar la respuesta al cliente, de esta forma nos aseguramos de que el usuario se ha guardado correctamente antes de responder al cliente con los datos del nuevo usuario creado
   } catch (error) {
 res.send("algo fallo")
 console.log (error)
   }
}

async function updateUser(req, res) {
    res.send("actualizando un usuario existente")
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