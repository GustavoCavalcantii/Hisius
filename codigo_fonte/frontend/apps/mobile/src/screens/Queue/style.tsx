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
const SECONDARY_TEXT = `${PRIMARY_TEXT}99`;

export const createStyles = (risk: ManchesterTriage) => {
  const riskColor = getRiskColor(risk);

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: scale(16),
      backgroundColor: LIGHT_BG,
    },
    header: {
      paddingHorizontal: scale(16),
      paddingTop: scale(12),
      paddingBottom: scale(8),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      fontSize: moderateScale(18),
      fontWeight: "800",
      letterSpacing: scale(2),
      color: PRIMARY_TEXT,
    },
    profileButton: {
      paddingHorizontal: scale(14),
      paddingVertical: scale(8),
      borderRadius: scale(10),
      backgroundColor: CARD_BG,
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 4,
      elevation: 2,
    },
    profileButtonText: {
      fontSize: moderateScale(12),
      fontWeight: "600",
      color: PRIMARY_TEXT,
    },
    card: {
      width: "100%",
      maxWidth: scale(320),
      minHeight: height * 0.65,
      borderLeftWidth: 5,
      borderLeftColor: riskColor,
      alignSelf: "center",
      marginVertical: scale(30),
      backgroundColor: CARD_BG,
      borderRadius: scale(12),
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 12,
      elevation: 4,
    },
    cardContent: {
      flex: 1,
      paddingHorizontal: scale(20),
      paddingVertical: scale(20),
      gap: scale(16),
    },
    infoSection: {
      marginBottom: scale(24),
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: scale(20),
      paddingBottom: scale(12),
      borderBottomWidth: 1,
      borderBottomColor: `${PRIMARY_TEXT}10`,
    },
    refreshButton: {
      backgroundColor: color.primary,
      padding: 12,
      aspectRatio: "1/1",
      borderRadius: "50%",
      alignItems: "center",
    },
    refreshButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    lastUpdateText: {
      fontSize: 12,
      color: color.text,
      textAlign: "center",
      marginTop: 8,
    },
    titleText: {
      fontSize: moderateScale(18),
      fontWeight: "600",
      color: PRIMARY_TEXT,
      lineHeight: moderateScale(24),
    },
    titleHighlight: {
      fontWeight: "700",
      color: riskColor,
    },
    infoBlock: {
      alignItems: "flex-start",
      marginBottom: scale(20),
    },
    infoLabel: {
      fontSize: moderateScale(11),
      color: SECONDARY_TEXT,
      fontWeight: "500",
      marginBottom: scale(4),
      textTransform: "uppercase",
      letterSpacing: scale(0.3),
    },
    infoValue: {
      fontSize: moderateScale(15),
      fontWeight: "700",
      color: PRIMARY_TEXT,
    },
    timeRow: {
      flexDirection: "row",
      alignItems: "flex-end",
    },
    timeValue: {
      fontSize: moderateScale(32),
      fontWeight: "800",
      color: PRIMARY_TEXT,
      marginRight: scale(6),
    },
    timeUnit: {
      fontSize: moderateScale(13),
      fontWeight: "600",
      color: SECONDARY_TEXT,
      marginBottom: scale(4),
    },
    riskValue: {
      fontSize: moderateScale(16),
      fontWeight: "800",
      color: riskColor,
      textTransform: "uppercase",
      letterSpacing: scale(0.3),
    },
    instructionsSection: {
      marginTop: scale(4),
      padding: scale(16),
      backgroundColor: `${PRIMARY_TEXT}05`,
      borderRadius: scale(8),
    },
    instructionsTitle: {
      fontSize: moderateScale(13),
      fontWeight: "700",
      color: PRIMARY_TEXT,
      marginBottom: scale(12),
    },
    instructionsItem: {
      fontSize: moderateScale(12),
      lineHeight: moderateScale(18),
      color: SECONDARY_TEXT,
      marginBottom: scale(6),
    },
    footer: {
      paddingBottom: scale(20),
      alignItems: "center",
    },
    leaveButton: {
      paddingHorizontal: scale(40),
      paddingVertical: scale(12),
      borderRadius: scale(8),
      borderWidth: 1.5,
      borderColor: BORDER_COLOR,
      backgroundColor: "transparent",
    },
    leaveButtonText: {
      fontSize: moderateScale(13),
      color: color.error.error,
      fontWeight: "700",
    },
    calledRoomSection: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    calledRoomText: {
      fontSize: moderateScale(26),
      fontWeight: "800",
      color: riskColor,
      textAlign: "center",
      marginVertical: scale(16),
    },
  });
};
