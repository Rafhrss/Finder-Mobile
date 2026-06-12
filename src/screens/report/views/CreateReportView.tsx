import React from "react";
import { ReportForm } from "../components/form/ReportForm";
import { useCreateReport } from "../hooks/useCreateReport";

const CreateReportView = () => {
  const { createReport, isSubmitting } = useCreateReport();

  return (
    <ReportForm
      onSubmit={createReport}
      isSubmitting={isSubmitting}
      submitLabel="Kirim Laporan"
    />
  );
};

export default CreateReportView;
