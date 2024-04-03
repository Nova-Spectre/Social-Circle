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
            src="https://firebasestorage.googleapis.com/v0/b/social-circle-4c9c3.appspot.com/o/Advert%2Finfo4.jpeg?alt=media&token=5a6b23b9-c1b5-478e-9ada-973d2a254e16"
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