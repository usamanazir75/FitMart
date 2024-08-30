const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req,res){
    try{
        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("You don't have permission to upload product")
        }


        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message: 'Product uploaded successfully',
            error : false,
            success : true,
            data : saveProduct
        })
    }catch(err){
        res.json({
            message : err.message || err,
            success : false,
            error : true,
            data : []
        })
    }
} 

module.exports = UploadProductController