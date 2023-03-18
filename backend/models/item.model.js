const mongoose = require("mongoose");

// Create schema
const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "default.jpg",
    },
    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        ratings: [{
            type: Number,
            required: true
        }],
        count: {
            type: Number,
            default: 0
        }
    },
    tags: {
        type: [String],
        default: []
    },
    number_sold: {
        type: Number,
        default: 0
    }
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;