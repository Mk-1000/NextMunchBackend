const mongoose = require("mongoose");


const platSchema = mongoose.Schema({

  nameP: { type: String , required: true},  
  descriptionP: { type: String  , required: true},
  imgP: { type: String , required: true},  
  categoryP: [{ type: mongoose.Schema.Types.ObjectId , required: true,ref:"categorie"}],
  priceP: { type: String  , required: true},
  
  
}
,{ timestamps: true }
);



module.exports = mongoose.model("Plat", platSchema);