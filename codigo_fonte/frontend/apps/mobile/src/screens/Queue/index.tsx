import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { createStyles } from "./style";
import { GlobalText as Text } from "../../components/globalText";
import { Patient } from "@hisius/services";
import { IQueuedInfo } from "@hisius/interfaces/src";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "apps/mobile/navigation/types";
import Header from "../../components/header";

export function QueueScreen() {
  const [patient, setPatient] = useState<IQueuedInfo | null>(null);
  const patientInstance = new Patient();
  const [estimatedWaitingTimeInMinutes, setEstimatedWaitingTimeInMinutes] =
    useState<number>(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handleLeaveQueue = async () => {
    await patientInstance.leaveQueue();
    navigation.navigate("Home");
  };

  useEffect(() => {
    async function fetchPatient() {
      try {
        const info = await patientInstance.getQueueInfo();
        setPatient(info);
        setEstimatedWaitingTimeInMinutes(info.estimatedWaitMinutes ?? 0);
      } catch (err) {
        const message =
          err?.response?.data?.message || err?.message || "Erro desconhecido";

        if (message === "Paciente não está em nenhuma fila") {
          //TODO: Navegar para a tela de inserir o código
        }

        console.error("Erro ao buscar paciente:", message);
      }
    }

    fetchPatient();
  }, []);

  //TODO: Tela de loading
  if (!patient) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  const styles = createStyles(patient.classification);

  const riskLabel = patient.classification ?? "Não classificado";

  return (
    <ScrollView style={styles.container}>
      <Header softwareName="Hisius" onProfilePress={handleProfile} />
      {/* Card principal */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.infoBT}>
            {/* Título */}
            <View style={styles.titleRow}>
              <Text style={styles.titleText}>
                Fila para{" "}
                <Text style={styles.titleHighlight}>
                  {patient.classification ? "atendimento" : "triagem"}
                </Text>
              </Text>
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
              <Text style={styles.infoValue}>#{patient.id}</Text>
            </View>

            {/* Risco */}
            <View style={styles.infoBlockLeft}>
              <Text style={styles.infoLabel}>Risco:</Text>
              <Text style={styles.riskValue}>
                {" "}
                {riskLabel.charAt(0).toUpperCase() + riskLabel.slice(1)}
              </Text>
            </View>
          </View>

          {/* Instruções */}
          <View style={styles.instructionsBlock}>
            <Text style={styles.instructionsTitle}>Enquanto está na fila:</Text>
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

      {/* Botão Sair da fila */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveQueue}>
          <Text style={styles.leaveButtonText}>Sair da fila</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
