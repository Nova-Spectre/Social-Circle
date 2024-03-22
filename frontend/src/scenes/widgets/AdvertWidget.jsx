import { Typography,useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween"
import WidgetWrapper from "../../components/WidgetWrapper"

const AdvertWidget = ()=>{
    const {palette} =useTheme();
    const dark=palette.neutral.dark;
    const medium=palette.neutral.medium;
    const main=palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsered
                </Typography>
                <Typography color={medium}>Create Ad</Typography>
            </FlexBetween>
            <img
            width="100%"
            height="auto"
            alt="advert"
            src="https://social-circle-api.vercel.app/assets/info4.jpeg"
            style={{borderRadius:"0.75rem",margin:"0.75rem 0"}}/>
            <FlexBetween>
            <Typography color={main}>
                    MikaCosmetics
                </Typography>
                <Typography color={medium}>MikaCosmetics.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">Your Pathway to Stunning and immaculate beauty and sure your skin</Typography>
        </WidgetWrapper>
    )

}

export default AdvertWidget;