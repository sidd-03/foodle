import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import validator from "validator";
import Swal from "sweetalert2";
import axios from "axios";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const ItemBuy = ({ item, vendor }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    // To handle number change
    const handleNumberChange = event => {
        setQuantity(event.target.value);
        setError(validator.isEmpty(event.target.value) || !validator.isNumeric(event.target.value) || event.target.value < 0);
    }

    // to calculate total price
    const totalPrice = () => {
        let total = quantity * item.price;
        return total;
    }

    // Verify whether the vendor is open or closed
    const ifVendorOpen = () => {
        let openingTime = vendor.opening_time.split(":");
        openingTime = new Date(0, 0, 0, openingTime[0], openingTime[1], 0).getTime();
        let closingTime = vendor.closing_time.split(":");
        closingTime = new Date(0, 0, 0, closingTime[0], closingTime[1], 0).getTime();
        const currentTime = new Date(0, 0, 0, new Date().getHours(), new Date().getMinutes(), 0).getTime();

        if (currentTime < openingTime || currentTime > closingTime)
            return false;
        else
            return true;
    }

    // to handle purchase
    const handlePurchase = item => {
        if (quantity === "" || error) {
            Swal.fire({
                title: "Error",
                text: "Please enter a valid quantity!",
                icon: "error",
                confirmButtonText: "OK"
            });
        } else {
            setDialogOpen(false);


            // Make POST request to backend
            axios.post("http://localhost:5000/api/orders/add", {
                item_id: item._id,
                vendor_id: vendor._id,
                quantity: quantity,
                cost: totalPrice()
            }, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
                .then(res => {
                    Swal.fire({
                        title: "Success",
                        text: `${item.name} has been purchased!`,
                        icon: "success",
                        confirmButtonText: "OK"
                    })
                    .then(() => {
                        window.location.reload();
                    });

                    // Reset state
                    setQuantity(1);
                    setError(null);
                })
                .catch(err => {
                    Swal.fire({
                        title: "Sorry!",
                        text: "Something went wrong!",
                        icon: "error",
                        confirmButtonText: "OK",
                        footer: err.response.data.error
                    });
                });
        }
    }

    return (
        <div>
            {ifVendorOpen() ? (
                <Button
                    className='item-card-button'
                    variant="contained"
                    color="primary"
                    onClick={handleDialogOpen}
                >
                    <AddShoppingCartIcon style={{ marginRight: "0.5rem" }} />Buy Item
                </Button>
            ) : (
                <Button
                    className='item-card-button'
                    variant="contained"
                    color="primary"
                    disabled
                >
                    Vendor Closed
                </Button>
            )}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Buy Item</DialogTitle>
                <DialogContent>
                    <Card
                        className='item-card'
                        style={{
                            width: "100%",
                            height: "100%",
                            marginTop: "1rem",
                            marginBottom: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div className='item-card-content'>
                            <Typography variant="h5" component="h2" marginTop="1rem" marginBottom="0.5rem">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" component="p" marginTop="0.5rem" marginBottom="0.5rem" align="center">
                                {vendor.shop_name}
                            </Typography>
                            <Typography variant="body2" component="p" marginBottom="1rem" align="center">
                                Rs. {item.price}
                            </Typography>
                        </div>
                    </Card>

                    {/* Quantity */}
                    <DialogContentText>
                        Enter the quantity you wish to buy
                    </DialogContentText>
                    {error ?
                        <TextField
                            autoFocus
                            id="name"
                            label="Quantity"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={quantity}
                            onChange={handleNumberChange}
                            error
                        />
                        :
                        <TextField
                            autoFocus
                            id="name"
                            label="Quantity"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={quantity}
                            onChange={handleNumberChange}
                        />
                    }
                  
                    {/* Total Price */}
                    <DialogContentText marginTop="1rem">
                       Your Total Price comes out to be : Rs. {totalPrice()}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handlePurchase(item)}>Place Order</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ItemBuy;