import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale } from "../../utils/scale";
import { getRiskColor } from "../../utils/riskColor";
import { ManchesterTriage } from "@hisius/enums";
import { color } from "@hisius/ui/theme/colors";

const { height } = Dimensions.get("window");

const PRIMARY_TEXT = color.text;
const LIGHT_BG = color.background;
const CARD_BG = color.card;
const BORDER_COLOR = color.error.error;

export const createStyles = (risk: ManchesterTriage) => {
  const riskColor = getRiskColor(risk);

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: scale(24),
      backgroundColor: LIGHT_BG,
    },
    header: {
      paddingHorizontal: scale(24),
      paddingTop: scale(16),
      paddingBottom: scale(8),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      fontSize: moderateScale(24),
      fontWeight: "700",
      letterSpacing: scale(4),
      color: PRIMARY_TEXT,
    },
    profileButton: {
      paddingHorizontal: scale(16),
      paddingVertical: scale(8),
      borderRadius: scale(999),
      backgroundColor: CARD_BG,
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    profileButtonText: {
      fontSize: moderateScale(14),
      color: PRIMARY_TEXT,
    },
    card: {
      width: "95%",
      maxWidth: scale(360),
      minHeight: height * 0.7,
      borderLeftWidth: 5,
      borderLeftColor: riskColor,
      alignSelf: "center",
      marginVertical: scale(50),
      backgroundColor: CARD_BG,
      borderRadius: scale(12),
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 16,
      elevation: 4,
    },
    cardContent: {
      flex: 1,
      paddingHorizontal: scale(24),
      paddingVertical: scale(24),
      gap: scale(16),
    },
    infoSection: {
      marginBottom: scale(40),
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: scale(28),
    },
    titleText: {
      fontSize: moderateScale(26),
      fontWeight: "500",
      color: PRIMARY_TEXT,
    },
    titleHighlight: {
      fontWeight: "700",
    },
    infoBlock: {
      alignItems: "flex-start",
      marginBottom: scale(24),
    },
    infoLabel: {
      fontSize: moderateScale(14),
      color: PRIMARY_TEXT,
      opacity: 0.8,
      marginBottom: scale(6),
    },
    infoValue: {
      fontSize: moderateScale(18),
      fontWeight: "700",
      color: PRIMARY_TEXT,
    },
    timeRow: {
      flexDirection: "row",
      alignItems: "flex-end",
    },
    timeValue: {
      fontSize: moderateScale(36),
      fontWeight: "700",
      color: PRIMARY_TEXT,
      marginRight: scale(6),
    },
    timeUnit: {
      fontSize: moderateScale(14),
      fontWeight: "600",
      color: PRIMARY_TEXT,
      marginBottom: scale(6),
    },
    riskValue: {
      fontSize: moderateScale(18),
      fontWeight: "700",
      color: riskColor,
    },
    instructionsSection: {
      marginTop: scale(16),
    },
    instructionsTitle: {
      fontSize: moderateScale(14),
      fontWeight: "600",
      color: PRIMARY_TEXT,
      marginBottom: scale(12),
    },
    instructionsItem: {
      fontSize: moderateScale(13),
      lineHeight: moderateScale(20),
      color: PRIMARY_TEXT,
      opacity: 0.9,
      marginBottom: scale(6),
    },
    footer: {
      paddingBottom: scale(24),
      alignItems: "center",
    },
    leaveButton: {
      paddingHorizontal: scale(48),
      paddingVertical: scale(12),
      borderRadius: scale(8),
      borderWidth: 1.5,
      borderColor: BORDER_COLOR,
      backgroundColor: "transparent",
    },
    leaveButtonText: {
      fontSize: moderateScale(14),
      color: color.error.error,
      fontWeight: "600",
    },
  });
};
