import BuyerProfile from '../Buyer/BuyerProfile';
import VendorProfile from '../Vendor/VendorProfile';
import Typography from '@mui/material/Typography';
import { user_is_authenticated, user_type } from '../../../lib/auth';


const Profile = () => {

    return (
        <div>
            {user_is_authenticated() ?
                <div>
                {user_type() === 'buyer' ?
                    <BuyerProfile />
                    :
                    <VendorProfile />
                }
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
            }
        </div>
    );
};

export default Profile;
