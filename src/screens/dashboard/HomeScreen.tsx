import { LiaCoinsSolid } from "react-icons/lia";
import Statistical from "../../components/cards/Statistical";
import { colors } from "../../constants/appInfos";
import { IStatistical } from "../../interfaces/statistical";

const HomeScreen = () => {
  const salesData: IStatistical[] = [
    {
      key: `sales`,
      description: "Sales",
      color: `${colors.primary500}36`,
      icon: <LiaCoinsSolid size={30} color={colors.primary500} />,
      value: Math.floor(Math.random() * 1000000),
      valueType: "curency",
    },
    {
      key: `revenue`,
      description: "Revenue",
      color: `${colors.primary500}36`,
      icon: <LiaCoinsSolid size={30} color={colors.primary500} />,
      value: Math.floor(Math.random() * 1000000),
      valueType: "number",
    },
    {
      key: `profit`,
      description: "Profit",
      color: `${colors.primary500}36`,
      icon: <LiaCoinsSolid size={30} color={colors.primary500} />,
      value: Math.floor(Math.random() * 1000000),
      valueType: "curency",
    },
    {
      key: `cost`,
      description: "Cost",
      color: `${colors.primary500}36`,
      icon: <LiaCoinsSolid size={30} color={colors.primary500} />,
      value: Math.floor(Math.random() * 1000000),
      valueType: "number",
    },
  ];

  return (
    <div className="row">
      <div className="col-md-8">
        <Statistical title="Sales Overview" data={salesData} />
      </div>
      <div className="col-md-4">b</div>
    </div>
  );
};

export default HomeScreen;
