import { useEffect, useState } from "react";
import { QueueHeader } from "../../../../components/navbar";
import { Sidebar } from "../../components/sidebar";
import { Admin } from "@hisius/services/src";
import type { LogData } from "packages/interfaces/src";
import { useNotification } from "../../../../components/notification/context";
import Pagination from "../../../../components/pagination";
import {
  Container,
  HeaderRow,
  SheetValue,
  Row,
  RowValues,
  LoadingText,
  NoDataText,
} from "./styles";
import { usePageTitle } from "../../../../hooks/PageTitle";

export default function LogsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [logs, setLogs] = useState<LogData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(12);
  const [loading, setLoading] = useState<boolean>(true);

  const adminService = new Admin();
  const { addNotification } = useNotification();

  usePageTitle("Atividades - Hisius");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const apiPage = currentPage - 1;

        const searchAction =
          debouncedSearchTerm.length >= 3 ? debouncedSearchTerm : undefined;

        const logsResponse = await adminService.getLogs(
          apiPage,
          itemsPerPage,
          undefined,
          searchAction
        );

        setLogs(logsResponse.logs);

        logsResponse.pagination
          ? setTotalItems(logsResponse.pagination.totalItems)
          : setTotalItems(logsResponse.logs.length);
      } catch (error) {
        addNotification("Erro ao buscar logs", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [currentPage, debouncedSearchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  return (
    <>
      <Sidebar />

      <div className="containerSide">
        <QueueHeader
          queueTitle="Atividades recentes"
          queueSubtitle="Veja as atividades recentes"
          searhTerm={searchTerm}
          onChange={setSearchTerm}
          canSearch
          placeholder="Pesquisar atividades..."
        />

        <Container>
          <HeaderRow>
            <SheetValue>Ação</SheetValue>
            <SheetValue>ID Usuário</SheetValue>
            <SheetValue>Módulo</SheetValue>
            <SheetValue>Data</SheetValue>
          </HeaderRow>

          {loading ? (
            <LoadingText>Carregando logs...</LoadingText>
          ) : logs.length === 0 ? (
            <NoDataText>
              {debouncedSearchTerm.length >= 3
                ? "Nenhum log encontrado para a pesquisa"
                : "Nenhum log disponível"}
            </NoDataText>
          ) : (
            <>
              {logs.map((log) => (
                <Row key={log.id}>
                  <RowValues>{log.action}</RowValues>
                  <RowValues>{log.userId}</RowValues>
                  <RowValues>{log.module}</RowValues>
                  <RowValues>{formatDate(log.createdAt)}</RowValues>
                </Row>
              ))}

              <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                maxVisibleButtons={5}
              />
            </>
          )}
        </Container>
      </div>
    </>
  );
}
