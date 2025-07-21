"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomIcon } from "@/components/custom-icon";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    label: "Produtos vendidos",
    value: 24,
    icon: "🏷️",
    bg: "bg-blue-100",
    text: "text-blue-500",
  },
  {
    label: "Produtos anunciados",
    value: 56,
    icon: "🏪",
    bg: "bg-blue-100",
    text: "text-blue-500",
  },
  {
    label: "Pessoas visitantes",
    value: 1238,
    icon: "👥",
    bg: "bg-blue-100",
    text: "text-blue-500",
  },
];

const chartData = Array.from({ length: 30 }, (_, i) => ({
  date: String(i + 26).padStart(2, "0"),
  visitors: Math.floor(Math.random() * 150) + 50,
}));

export default function Dashboard() {
  return (
    <main className="flex flex-col gap-2.5 px-10 py-4 lg:gap-10 xl:px-[168px] lg:py-16">
      <section className="col-span-12 w-full">
        <h1 className="title-md text-gray-500">Últimos 30 dias</h1>
        <p className="body-sm text-gray-300">
          Confira as estatísticas da sua loja no último mês
        </p>
      </section>

      <div className="flex flex-row gap-6 w-full">
        <div className="flex flex-col gap-3.5 flex-1/4">
          {/* Card */}
          <div className="bg-white rounded-[20px] pl-3 pr-6 py-3 flex items-center gap-4">
            <div className="bg-blue-light rounded-[12px] flex justify-center items-center w-[80px] h-[86px]">
              <CustomIcon
                size={40}
                className="text-blue-dark"
                icon="sale-tag"
              />
            </div>
            <div className="flex-col flex flex-1 gap-2">
              <h2 className="title-lg text-gray-400">24</h2>
              <h3 className="text-gray-300 body-xs">Produtos vendidos</h3>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-[20px] pl-3 pr-6 py-3 flex items-center gap-4">
            <div className="bg-blue-light rounded-[12px] flex justify-center items-center w-[80px] h-[86px]">
              <CustomIcon size={40} className="text-blue-dark" icon="store" />
            </div>
            <div className="flex-col flex flex-1 gap-2">
              <h2 className="title-lg text-gray-400">56</h2>
              <h3 className="text-gray-300 body-xs">Produtos anunciados</h3>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-[20px] pl-3 pr-6 py-3 flex items-center gap-4">
            <div className="bg-blue-light rounded-[12px] flex justify-center items-center w-[80px] h-[86px]">
              <CustomIcon
                size={40}
                className="text-blue-dark"
                icon="user-multiple"
              />
            </div>
            <div className="flex-col flex flex-1 gap-2">
              <h2 className="title-lg text-gray-400">1.238</h2>
              <h3 className="text-gray-300 body-xs">Pessoas visitantes</h3>
            </div>
          </div>
        </div>

        {/* Lado direito - Gráfico */}
        <Card className="flex flex-col w-full">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-gray-500 title-sm">
                Visitantes
              </CardTitle>
            </div>
            <p className="label-sm text-gray-300 flex items-center gap-2">
              <CustomIcon
                icon="calendar"
                size={16}
                className="text-blue-dark"
              />{" "}
              26 de Junho - 25 de Julho
            </p>
          </CardHeader>
          <CardContent className="flex-1">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" tickFormatter={(v) => v} stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    background: "white",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  }}
                  labelFormatter={(label) => `${label} de Julho`}
                  formatter={(value) => [`${value} visitantes`]}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#5ec5fd"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
