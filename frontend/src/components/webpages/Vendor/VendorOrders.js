import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from "@mui/material/Grid";
import OrderCard from "../../templates/OrderCard";
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';


const VendorOrders = () => {
    const [unit, set_unit] = useState({
        orders: [],
        items: [],
        buyers: [],
    });

    const matches = useMediaQuery('(min-width:480px)');

    useEffect(() => {
        async function fetchData() {
            const vendor_orders_data = await axios.get('http://localhost:5000/api/orders/vendor', {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            });
            const items_data = await axios.get('http://localhost:5000/api/items', {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            });
            const buyers_data = await axios.get('http://localhost:5000/api/buyers', {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            });

            set_unit({
                orders: vendor_orders_data.data,
                items: items_data.data,
                buyers: buyers_data.data,
            })
        }

        fetchData();
    }, []);

    return (
        <div>
            {matches ?
                <Typography className="dashboard-heading" variant="h3" component="h1">
                    Your Orders
                </Typography>
                :
                <Typography className="dashboard-heading" variant="h4" component="h1">
                    Your Orders
                </Typography>
            }
            {unit.orders.length > 0 ?
                <Grid container style={{ marginTop: "5rem" }} align="center">
                    {unit.orders.map(order => (
                        <Grid item xs={12} key={order._id}>
                            <OrderCard
                                key={order._id}
                                order={order}
                                item={unit.items.find(item => item._id === order.item_id)}
                                vendor={false}
                                buyer={unit.buyers.find(buyer => buyer._id === order.buyer_id)}
                                unit={unit}
                                set_unit={set_unit}
                            />
                        </Grid>
                    ))}
                </Grid>
                :
                <Typography variant="h5" component="h1">
                    You have no orders yet, any orders placed will be displayed here.
                </Typography>
            }
        </div>
    );
};

export default VendorOrders;
