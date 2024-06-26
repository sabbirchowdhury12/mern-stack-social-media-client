import { Typography, useTheme } from "@mui/material";
import Flex from "../../components/flex";
import WidgetWrapper from "../../components/widgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <Flex>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </Flex>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={"#"}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <Flex>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </Flex>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
