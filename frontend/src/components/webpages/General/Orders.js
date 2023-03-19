import BuyerOrders from "../Buyer/BuyerOrders";
import VendorOrders from "../Vendor/VendorOrders";
import Typography from '@mui/material/Typography';
import { user_is_authenticated, user_type } from '../../../lib/auth';


const Orders = () => {

    return (
        <div>
            {user_is_authenticated() ?
                <div>
                {user_type() === 'vendor' ?
                    <VendorOrders />
                    :
                    <BuyerOrders />                    
                }
                </div>
                :
                <div className="welcome-page">
                    <Typography className="welcome-heading" variant="h2" component="h1">
                        You are not logged in
                    </Typography>
                    <Typography variant="h5" component="h1">
                        Please login or register to continue
                    </Typography>
                </div>                
            }
        </div>
    );
};

export default Orders;
