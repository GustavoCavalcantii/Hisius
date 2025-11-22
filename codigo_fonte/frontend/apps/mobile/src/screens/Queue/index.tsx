import React, { useEffect, useState } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createStyles } from "./style";
import { GlobalText as Text } from "../../components/globalText";
import { Patient } from "@hisius/services";
import { IQueuedInfo } from "@hisius/interfaces/src";
import { RootStackParamList } from "apps/mobile/navigation/types";
import Header from "../../components/header";

export function QueueScreen() {
  const [patient, setPatient] = useState<IQueuedInfo | null>(null);
  const [estimatedWaitingTime, setEstimatedWaitingTime] = useState<number>(0);

  const patientInstance = new Patient();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleProfile = () => navigation.navigate("Profile");

  const handleLeaveQueue = async () => {
    await patientInstance.leaveQueue();
    navigation.navigate("Home");
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const info = await patientInstance.getQueueInfo();
        setPatient(info);
        setEstimatedWaitingTime(info.estimatedWaitMinutes ?? 0);
      } catch (err) {
        const message =
          err?.response?.data?.message || err?.message || "Erro desconhecido";
        console.error("Erro ao buscar paciente:", message);
      }
    };

    fetchPatient();
  }, []);

  if (!patient) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Carregando informações...</Text>
      </SafeAreaView>
    );
  }

  const styles = createStyles(patient.classification);

  if (patient.roomCalled) {
    return (
      <ScrollView style={styles.container}>
        <Header softwareName="Hisius" onProfilePress={handleProfile} />

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.titleText}>Chamado para Atendimento</Text>
            <Text
              style={[
                styles.infoValue,
                { textAlign: "center", marginVertical: 20 },
              ]}
            >
              Sala {patient.roomCalled}
            </Text>
            <Text style={styles.instructionsItem}>
              Dirija-se imediatamente à sala indicada para seu atendimento.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.leaveButton}
            onPress={handleLeaveQueue}
          >
            <Text style={styles.leaveButtonText}>Sair da fila</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Header softwareName="Hisius" onProfilePress={handleProfile} />

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.infoSection}>
            <View style={styles.titleRow}>
              <Text style={styles.titleText}>
                Fila para{" "}
                <Text style={styles.titleHighlight}>
                  {patient.classification ? "atendimento" : "triagem"}
                </Text>
              </Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Tempo estimado de espera</Text>
              <View style={styles.timeRow}>
                <Text style={styles.timeValue}>
                  {estimatedWaitingTime.toString().padStart(2, "0")}
                </Text>
                <Text style={styles.timeUnit}>minutos</Text>
              </View>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Identificação</Text>
              <Text style={styles.infoValue}>#{patient.id}</Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Classificação de risco</Text>
              <Text style={styles.riskValue}>
                {patient.classification || "Aguardando classificação"}
              </Text>
            </View>
          </View>

          <View style={styles.instructionsSection}>
            <Text style={styles.instructionsTitle}>Orientações</Text>
            <Text style={styles.instructionsItem}>
              • Mantenha-se no local indicado
            </Text>
            <Text style={styles.instructionsItem}>
              • Fique atento ao chamado do médico
            </Text>
            <Text style={styles.instructionsItem}>
              • Em caso de piora, procure a recepção
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveQueue}>
          <Text style={styles.leaveButtonText}>Sair da fila</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
