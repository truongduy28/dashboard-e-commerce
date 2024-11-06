import { Typography } from "antd";
import { rangeValue } from "../../../../utils/formater";

const { Text } = Typography;
const PricesPartial = ({ items }: { items: number[] | string[] }) => {
  const values: string[] = items.map((i) => i.toString());
  return <Text>{rangeValue(values)}</Text>;
};

export default PricesPartial;
