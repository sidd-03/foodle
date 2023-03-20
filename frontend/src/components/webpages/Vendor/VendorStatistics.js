import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { user_is_authenticated, user_type } from '../../../lib/auth';


const VendorStatistics = () => {
    const [unit, set_unit] = useState({
        orders: [],
        items: [],
        vendor: {},
        buyers: [],
    });


    useEffect(() => {
        if (user_type() === 'vendor') {
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
                const vendors_data = await axios.get('http://localhost:5000/api/vendors/details', {
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
                    vendor: vendors_data.data,
                    buyers: buyers_data.data,
                })
            }

            fetchData();
        }
    }, []);

    const completedOrders = () => {
        let count = 0;
        unit.orders.forEach(order => {
            if (order.state === 'COMPLETED') {
                count++;
            }
        });

        return count;
    }

    const pendingOrders = () => {
        let count = 0;
        unit.orders.forEach(order => {
            if (order.state !== 'REJECTED' && order.state !== 'COMPLETED') {
                count++;
            }
        });

        return count;
    }
    

    const top5SoldItems = () => {
        let itemCount = {};
        unit.orders.forEach(order => {
            if (order.state === 'COMPLETED') {
                const item = unit.items.find(item => item._id === order.item_id);
                if (itemCount[item.name]) {
                    itemCount[item.name] += order.quantity;
                } else {
                    itemCount[item.name] = order.quantity;
                }
            }
        });

        let top5 = [];
        for (let item in itemCount) {
            top5.push({
                item_name: item,
                count: itemCount[item]
            });
        }

        top5.sort((a, b) => {
            return b.count - a.count;
        });

        return top5.slice(0, 5);
    }


    return (
        user_type() === 'vendor' ?
            <div className="vendor-statistics">
                <Grid container direction="column" spacing={4} alignItems="center">
                    <Grid item xs={12}>
                        {
                            <Typography className="registration-heading" variant="h3" component="h1">
                                {unit.vendor.shop_name}'s Statistics
                            </Typography>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h1">
                            ORDER STATISTICS
                        </Typography>
                        <TableContainer component={Paper} style={{ marginTop: '1.5rem' }}>
                            <Table aria-label="simple table">
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Orders Placed
                                        </TableCell>
                                        <TableCell align="right">
                                            {unit.orders.length}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Pending Orders
                                        </TableCell>
                                        <TableCell align="right">
                                            {pendingOrders()}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Completed Orders
                                        </TableCell>
                                        <TableCell align="right">
                                            {completedOrders()}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h1">
                            TOP 5 ITEMS SOLD
                        </Typography>
                        <TableContainer component={Paper} style={{ marginTop: '1.5rem' }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }} align="right">Number Sold</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {top5SoldItems().map((row) => (
                                        <TableRow
                                            key={row.item_name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.item_name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.count}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
            :
                user_is_authenticated() ?
                    <div className="welcome-page">
                        <Typography className="welcome-heading" variant="h2" component="h1">
                            This route is not accessible by buyers
                        </Typography>
                        <Typography variant="h6" component="h1">
                            Please login through a vendor account to continue
                        </Typography>
                    </div>
                    :
                    <div className="welcome-page">
                        <Typography className="welcome-heading" variant="h2" component="h1">
                            You are not logged in
                        </Typography>
                        <Typography variant="h6" component="h1">
                            Please login or register to continue
                        </Typography>
                    </div>
    );
};

export default VendorStatistics;
