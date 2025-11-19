import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../routers/appNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "TriageQueue">;

const PRIMARY_TEXT = "#101322";
const LIGHT_BG = "#F3F4F7";
const CARD_BG = "#FFFFFF";
const RED = "#E1524C";
const LIGHT_BORDER = "#C7D2E1";

export function TriageQueueScreen({ route }: Props) {
  const { patient, estimatedWaitingTimeInMinutes } = route.params;

  const riskLabel =
    patient.classification !== null
      ? String(patient.classification)
      : "Não classificado";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>HISIUS</Text>

        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileButtonText}>Perfil 👤</Text>
        </TouchableOpacity>
      </View>

      {/* Card principal */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <View style={styles.cardSideAccent} />

          <View style={styles.cardContent}>
            {/* Título */}
            <View style={styles.titleRow}>
              <Text style={styles.titleText}>
                Fila para <Text style={styles.titleHighlight}>triagem</Text>
              </Text>

              <View style={styles.refreshCircle}>
                <Text style={styles.refreshIcon}>⟳</Text>
              </View>
            </View>

            {/* Estimativa de espera */}
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Estimativa de espera</Text>
              <View style={styles.timeRow}>
                <Text style={styles.timeValue}>
                  {estimatedWaitingTimeInMinutes.toString().padStart(2, "0")}
                </Text>
                <Text style={styles.timeUnit}>MIN</Text>
              </View>
            </View>

            {/* Identificação */}
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Identificação</Text>
              <Text style={styles.infoValue}>#{patient.id ?? patient.position}</Text>
            </View>

            {/* Risco */}
            <View style={styles.infoBlockLeft}>
              <Text style={styles.infoLabel}>Risco:</Text>
              <Text style={styles.riskValue}>{riskLabel}</Text>
            </View>

            {/* Instruções */}
            <View style={styles.instructionsBlock}>
              <Text style={styles.instructionsTitle}>
                Enquanto está na fila:
              </Text>
              <Text style={styles.instructionsItem}>
                • Se possível, fique onde está
              </Text>
              <Text style={styles.instructionsItem}>
                • Preste atenção ao chamado do médico
              </Text>
              <Text style={styles.instructionsItem}>
                • Se sentir complicações, procure ajuda
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Botão Sair da fila */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.leaveButton}>
          <Text style={styles.leaveButtonText}>Sair da fila</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 4,
    color: PRIMARY_TEXT,
  },
  profileButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: CARD_BG,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  profileButtonText: {
    fontSize: 14,
    color: PRIMARY_TEXT,
  },
  cardWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 4,
    overflow: "hidden",
  },
  cardSideAccent: {
    width: 5,
    backgroundColor: RED,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "500",
    color: PRIMARY_TEXT,
  },
  titleHighlight: {
    fontWeight: "700",
  },
  refreshCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D0D6E5",
    alignItems: "center",
    justifyContent: "center",
  },
  refreshIcon: {
    fontSize: 14,
    color: "#69707D",
  },
  infoBlock: {
    alignItems: "flex-start",
    marginBottom: 20,
  },
  infoBlockLeft: {
    alignItems: "flex-start",
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 14,
    color: "#8B90A0",
  },
  infoValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "700",
    color: PRIMARY_TEXT,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 4,
  },
  timeValue: {
    fontSize: 32,
    fontWeight: "700",
    color: PRIMARY_TEXT,
    marginRight: 6,
  },
  timeUnit: {
    fontSize: 14,
    fontWeight: "600",
    color: PRIMARY_TEXT,
    marginBottom: 4,
  },
  riskValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "700",
    color: RED,
  },
  instructionsBlock: {
    marginTop: 8,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: PRIMARY_TEXT,
    marginBottom: 4,
  },
  instructionsItem: {
    fontSize: 13,
    color: "#707787",
    lineHeight: 18,
  },
  footer: {
    paddingBottom: 24,
    alignItems: "center",
  },
  leaveButton: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
    backgroundColor: "#F8FAFF",
  },
  leaveButtonText: {
    fontSize: 14,
    color: "#7A8AA0",
    fontWeight: "500",
  },
});
