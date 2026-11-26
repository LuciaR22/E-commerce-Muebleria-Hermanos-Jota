const mongoose = require ('mongoose');

const  EsquemaOrden =  new moongose.Schema(
    {
        Usuario:{
            type: moongose.Schema.type.ObjectId,
            ref: 'usuarios',
            required: true
        },
        items: [
            {
                products:{
                    type: mongoose.Schema.type.ObjectId,
                    ref: 'products',
                    required: true,
                },
                nombre: {type:String,  required:true},
                precio: {type:Number, required:true},
                cantidad: { type: Number, required: true }
            }
        ],
        total: {
            type:Number,
            required:true
        }
    },
    {timestamps:true}
);
module.exports = mongoose.model('Order', orderSchema);