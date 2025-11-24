import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createStyles } from "./style";
import { GlobalText as Text } from "../../components/globalText";
import { Patient } from "@hisius/services";
import { IQueuedInfo } from "@hisius/interfaces/src";
import { RootStackParamList } from "apps/mobile/navigation/types";
import Header from "../../components/header";
import { Feather } from "@expo/vector-icons";
import { color } from "@hisius/ui/theme/colors";
import { useNotification } from "../../components/notification/context";

export function QueueScreen() {
  const [patient, setPatient] = useState<IQueuedInfo | null>(null);
  const [estimatedWaitingTime, setEstimatedWaitingTime] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const lastRequestTime = useRef(0);
  const patientInstance = new Patient();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const MIN_REQUEST_DELAY = 5000;
  const AUTO_UPDATE_INTERVAL = 300000;

  const { addNotification } = useNotification();

  const handleProfile = () => navigation.navigate("Profile");
  const handleLeaveQueue = async () => {
    await patientInstance.leaveQueue();
    navigation.navigate("Home");
  };

  const canMakeRequest = () =>
    Date.now() - lastRequestTime.current >= MIN_REQUEST_DELAY;

  const fetchPatient = async () => {
    if (isLoading || !canMakeRequest()) return;

    try {
      setIsLoading(true);
      setRefreshing(true);
      lastRequestTime.current = Date.now();
      setRefreshFlag((prev) => !prev);

      const info = await patientInstance.getQueueInfo();
      setPatient(info);
      setEstimatedWaitingTime(info.estimatedWaitMinutes ?? 0);
      setLastUpdate(new Date());
    } catch (err) {
      addNotification("Erro ao buscar informações", "error");
      navigation.navigate("Home");
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPatient();
    const interval = setInterval(fetchPatient, AUTO_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!canMakeRequest()) {
      const timer = setTimeout(
        () => setRefreshFlag((prev) => !prev),
        MIN_REQUEST_DELAY
      );
      return () => clearTimeout(timer);
    }
  }, [refreshFlag]);

  if (!patient)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando informações...</Text>
      </View>
    );

  const styles = createStyles(patient.classification);
  const canRefresh = canMakeRequest();
  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={fetchPatient}
      enabled={canRefresh}
    />
  );

  if (patient.roomCalled)
    return (
      <ScrollView style={styles.container} refreshControl={refreshControl}>
        <Header softwareName="Hisius" onProfilePress={handleProfile} />

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.calledRoomSection}>
              <View style={styles.titleRow}>
                <Text style={styles.titleText}>Você foi chamado!</Text>
                <TouchableOpacity
                  style={[
                    styles.refreshButton,
                    (!canRefresh || isLoading) && { opacity: 0.5 },
                    { marginLeft: 20 },
                  ]}
                  onPress={fetchPatient}
                  disabled={!canRefresh || isLoading}
                >
                  <Feather name="refresh-cw" size={20} color={color.front} />
                </TouchableOpacity>
              </View>

              <Text style={styles.calledRoomText}>
                {patient.roomCalled.toLowerCase().includes("sala")
                  ? patient.roomCalled
                  : "Sala " + patient.roomCalled}
              </Text>

              <Text style={[styles.instructionsItem]}>
                Dirija-se imediatamente à sala indicada.
              </Text>

              <Text style={styles.lastUpdateText}>
                Última atualização: {lastUpdate.toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Botão de ação */}
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

  return (
    <ScrollView style={styles.container} refreshControl={refreshControl}>
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
              <TouchableOpacity
                style={[
                  styles.refreshButton,
                  (!canRefresh || isLoading) && { opacity: 0.5 },
                ]}
                onPress={fetchPatient}
                disabled={!canRefresh || isLoading}
              >
                <Feather name="refresh-cw" size={20} color={color.front} />
              </TouchableOpacity>
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
              <Text style={styles.lastUpdateText}>
                Última atualização: {lastUpdate.toLocaleTimeString()}
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
