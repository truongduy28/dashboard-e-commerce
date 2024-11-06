import { Space, Tag } from "antd";

const SizesPartial = ({ items }: { items: string[] }) => {
  const unique = Array.from(new Set(items));
  return (
    <Space size={"small"} wrap>
      {unique.map((i) => (
        <Tag key={i}>{i}</Tag>
      ))}
    </Space>
  );
};

export default SizesPartial;
