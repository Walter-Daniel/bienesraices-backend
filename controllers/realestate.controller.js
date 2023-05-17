const Estate =  require('../schemas/Estate.schema')
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const getImages = async( req, res ) => {
   res.json({
    msg: 'Hola desde el get'
   })
}


const uploadImagesCloudinary = async(req, res ) => {

    const { id } = req.params;
    const realEstate = await Estate.findByPk(id);

    //Validar que la propiedad exista
    if( !realEstate ) {
        return res.json({
            ok: false,
            msg:'No existe una propiedad con ese id'
        })
    }

    //Validar que la propiedad pertenece a quien a iniciado sesión
    if( req.user.id.toString() !== realEstate.userId.toString() ) {
        return res.json({
            ok:false,
            msg: 'El usuario actual no coincide con el creador de la propiedad.'
        })
    };

    //Almacenar Imagen en cloudinary
    const promises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(file.path, (error, { public_id, secure_url  }) => {

            if (error) reject(error);
            const info = {
                title : public_id,
                url: secure_url,
                estate : id 
            }   
            resolve(info);

          });
        });
      });

      //Almacenar Imagen en tabla
      try {
        const imageUrls = await Promise.all(promises);
        const images = imageUrls.map(url => new Image( url ));
        propiedad.image = images

        return res.json({
            ok:true,
            msg: 'Imagenes subidas exitosamente',
            result
        });
      } catch (error) {
        res.status(500).send('Error al subir las imagenes');
      }
};

const deleteImagesCloudinary = async(req, res ) => {

    const id = req.params.id;
    try {
        const imageToDelete = await Estate.findByPk( id );
        if ( !imageToDelete ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró una imagen con ese id'
            })
        };

        await cloudinary.uploader.destroy( imageToDelete.title );
        await Image.findByIdAndDelete( imageToDelete );

        res.json({
            ok: true,
            msg: 'Imagen borrada',
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });    
    }; 
};

const estate = ( req, res ) => {
    res.json({
        msg: 'Hola'
    })
}


module.exports = {
    uploadImagesCloudinary,
    deleteImagesCloudinary,
    estate
}