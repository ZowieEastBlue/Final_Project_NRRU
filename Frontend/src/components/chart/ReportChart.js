import React, { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "../admin/chart/configs/lineChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

//function
import { getModsGroupByMonth } from "../../functions/mods";
import { getUserGroupByMonth } from "../../functions/users";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportChart = () => {
  const { Title, Paragraph } = Typography;
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState([]);
  const [modsData, setModsData] = useState([]);

  // loop ข้อมูลสำหรับใส่ลงในกราฟ------------
  const labelData = [];
  const ModDataArr = [];
  const UserDataArr = [];
  for (const dataObj of modsData) {
    labelData.push(dataObj.Month);
    ModDataArr.push(dataObj.Total);
  }
  for (const dataObj of userData) {
    UserDataArr.push(dataObj.Total);
  }

  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const test = labelData.map((labelData) => ({
    labelData,
    name: monthNames[labelData - 1],
  }));

  const month = [];
  for (const dataObj of test) {
    month.push(dataObj.name);
  }
  // จบ loop ข้อมูลสำหรับใส่ลงในกราฟ------------

  useEffect(() => {
    getModsGroupByMonth()
      .then((res) => {
        setModsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getUserGroupByMonth()
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const data = {
    labels: month,
    datasets: [
      {
        label: "จำนวนMODที่อัปโหลด",
        data: ModDataArr,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "จำนวนUserใหม่",
        data: UserDataArr,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <>
        <div className="linechart">
          <div>
            <Title level={5}>
              จำนวนMODที่ถูกอัปโหลดและจำนวนสมาชิกใหม่ในแต่ละเดือน
            </Title>
            {/* <Paragraph className="lastweek">
              than last week <span className="bnb2">+30%</span>
            </Paragraph> */}
          </div>
          {/* <div className="sales">
            <ul>
              <li>{<MinusOutlined />} Traffic</li>
              <li>{<MinusOutlined />} Sales</li>
            </ul>
          </div> */}
        </div>

        <Bar options={options} data={data} />
      </>
    </>
  );
};

export default ReportChart;
