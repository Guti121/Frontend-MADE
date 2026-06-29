import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FormulaTable from "../../components/formulas/FormulaTable";
import Pagination from "../../components/ui/Pagination";
import DashboardLayout from "../../layouts/DashboardLayout";
import Button from "../../components/ui/Button";

import { getFormulas } from "../../services/formula.service";

export default function FormulaList() {
  const navigate = useNavigate();

  const [formulas, setFormulas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadFormulas();
  }, [page]);

  const loadFormulas = async () => {
    try {
      const result = await getFormulas({
        page,
        limit: 10,
      });

      setFormulas(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Formulas
        </h1>

        <Button
          onClick={() =>
            navigate("/formulas/create")
          }
        >
          Create Formula
        </Button>
      </div>

      <FormulaTable
        formulas={formulas}
        onDelete={loadFormulas}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </DashboardLayout>
  );
}