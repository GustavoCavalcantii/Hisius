import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale } from "../../utils/scale";
import { getRiskColor } from "../../utils/riskColor";
import { ManchesterTriage } from "@hisius/enums";
import { color } from "@hisius/ui/theme/colors";

const PRIMARY_TEXT = color.text;
const LIGHT_BG = color.background;
const CARD_BG = color.card;
const LIGHT_BORDER = color.gray;

const { height } = Dimensions.get("window");

export const createStyles = (risk: ManchesterTriage) => {
  const riskColor = getRiskColor(risk);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: LIGHT_BG,
      overflow: "scroll",
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

      flexDirection: "row",
      justifyContent: "flex-start",

      alignSelf: "center",
      marginVertical: scale(50),

      backgroundColor: CARD_BG,
      borderRadius: scale(6),
      overflow: "hidden",

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
      gap: 10,
    },

    infoBT: {
      marginBottom: 50,
    },

    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: scale(24),
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
      marginBottom: scale(20),
    },

    infoBlockLeft: {
      alignItems: "flex-start",
      marginBottom: scale(24),
    },

    infoLabel: {
      fontSize: moderateScale(14),
      color: "#8B90A0",
    },

    infoValue: {
      marginTop: scale(4),
      fontSize: moderateScale(18),
      fontWeight: "700",
      color: PRIMARY_TEXT,
    },

    timeRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginTop: scale(4),
    },

    timeValue: {
      fontSize: moderateScale(32),
      fontWeight: "700",
      color: PRIMARY_TEXT,
      marginRight: scale(6),
    },

    timeUnit: {
      fontSize: moderateScale(14),
      fontWeight: "600",
      color: PRIMARY_TEXT,
      marginBottom: scale(4),
    },

    riskValue: {
      marginTop: scale(4),
      fontSize: moderateScale(18),
      fontWeight: "700",
      color: riskColor,
    },

    instructionsBlock: {
      marginTop: scale(8),
    },

    instructionsTitle: {
      fontSize: moderateScale(14),
      fontWeight: "600",
      color: PRIMARY_TEXT,
      marginBottom: scale(4),
    },

    instructionsItem: {
      fontSize: moderateScale(13),
      color: "#707787",
      lineHeight: moderateScale(18),
    },

    footer: {
      paddingBottom: scale(24),
      alignItems: "center",
    },

    leaveButton: {
      paddingHorizontal: scale(40),
      paddingVertical: scale(10),
      borderRadius: scale(5),
      borderWidth: 1,
      borderColor: LIGHT_BORDER,
      backgroundColor: "#F8FAFF",
    },

    leaveButtonText: {
      fontSize: moderateScale(14),
      color: "#7A8AA0",
      fontWeight: "500",
    },
  });
};
