var mongoose = require("mongoose");

var EntitySchema = new mongoose.Schema({
  /***
   * Corresponde ao nome da entidade
   */
  name: {
    type: String,
    require: true,
    default: "none",
  },
  /***
   * Corresponde ao email da entidade
   */
  email: {
    type: String,
    require: true,
    default: "none",
  },
   /**
     * Corresponde à palavra-passe do utilizador
     */
   password: {
    type: String,
    require: true,
    default: "none",
  },
  /**
   * correspode a descrição da entidade
   */
    description: {
        type: String,
        require: true,
        default: "none",
    },
    /**
     * corresponde a imagem da entidade
     */
    image: {
        type: String,
        require: true,
        default: "logo.png",
    },
  /***
   * Corresponde ao contacto da entidade
   */
  contact: {
    type: Number,
    require: true,
    default: null,
  },
  /***
   * Corresponde ao endereço da entidade
   */
  address: {
    type: String,
    require: true,
    default: "none",
  },
  /***
   * Corresponde ao concelho/distrito da entidade
   */
  location: {
    type: String,
    require: true,
    default: "none",
  },
  /***
   * Corresponde ao nif da entidade
   */
  nif: {
    type: Number,
    require: true,
    default: null,
  },

  update_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Entity", EntitySchema);
