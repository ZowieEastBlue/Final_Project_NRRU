import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "../admin/chart/configs/lineChart";

//function
import { getModsGroupByMonth } from "../../functions/mods";
import { getUserGroupByMonth } from "../../functions/users";

const ReportChart = () => {
  const { Title, Paragraph } = Typography;
  const [loading, setLoading] = useState(false);

  //   const [options, setOptions] = useState({
  //     chart: {
  //       width: "100%",
  //       height: 350,
  //       type: "bar",
  //       toolbar: {
  //         show: false,
  //       },
  //     },

  //     legend: {
  //       show: false,
  //     },

  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       curve: "smooth",
  //     },
  //     xaxis: {
  //       categories: [
  //         "Feb",
  //         "Mar",
  //         "Apr",
  //         "May",
  //         "Jun",
  //         "Jul",
  //         "Aug",
  //         "Sep",
  //         "Oct",
  //       ],
  //     },
  //   });

  //   const [series, setSeries] = useState([
  //     {
  //       name: "Mobile apps",
  //       data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
  //       offsetY: 0,
  //     },
  //     {
  //       name: "Websites",
  //       data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
  //       offsetY: 0,
  //     },
  //   ]);
  //   console.log(series);

  //   useEffect(() => {
  //     const user = [];
  //     const mods = [];
  //     const month = [];

  //     //เรียกข้อมูล MODs
  //     getModsGroupByMonth().then((res) => {
  //       res.data.map((item) => {
  //         mods.push(item.Total);
  //         month.push(item.Month);
  //       });
  //     });

  //     // เรียกข้อมูล User
  //     getUserGroupByMonth().then((res) => {
  //       res.data.map((item) => {
  //         user.push(item.Total);
  //       });
  //     });

  //     // setSeries([
  //     //   {
  //     //     name: "Mobile apps",
  //     //     data: user,
  //     //     offsetY: 0,
  //     //   },
  //     // ]);

  //     // setOptions({
  //     //   chart: {
  //     //     width: "100%",
  //     //     height: 350,
  //     //     type: "area",
  //     //     toolbar: {
  //     //       show: false,
  //     //     },
  //     //     xaxis: {
  //     //       categories: month,
  //     //     },
  //     //   },
  //     // });

  //     setLoading(true);
  //   }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="linechart">
            <div>
              <Title level={5}>Active Users</Title>
              <Paragraph className="lastweek">
                than last week <span className="bnb2">+30%</span>
              </Paragraph>
            </div>
            <div className="sales">
              <ul>
                <li>{<MinusOutlined />} Traffic</li>
                <li>{<MinusOutlined />} Sales</li>
              </ul>
            </div>
          </div>

          <ReactApexChart
            className="full-width"
            options={lineChart.options}
            series={lineChart.series}
            type="area"
            height={350}
            width={"100%"}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ReportChart;
