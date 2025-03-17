import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import '../PieChart/piechart.css';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/spent"); // Atualize a URL conforme necessário
        const data = await response.json();

        // Agrupar os valores por categoria
        const categoryTotals = {};
        data.forEach(({ category, value }) => {
          const numericValue = parseFloat(value);
          if (!isNaN(numericValue)) {
            categoryTotals[category] = (categoryTotals[category] || 0) + numericValue;
          }
        });

        // Preparar os dados para o gráfico
        setChartData({
          labels: Object.keys(categoryTotals),
          datasets: [
            {
              data: Object.values(categoryTotals),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#C9CBCF",
                "#2E86C1"
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar os dados: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ChartContainer">
      <h2>Despesas por Categoria</h2>
      <div className="ChartWrapper" style={{width: "100%", height: "50vh" }}>
        {chartData ? <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} /> : <p>Carregando...</p>}
      </div>
    </div>
  );
};

export default PieChart;


