import { Avatar } from "antd";

const ColorsPartial = ({ items }: { items: string[] }) => {
  const unique = Array.from(new Set(items));
  return (
    <Avatar.Group>
      {unique.map((i) => (
        <Avatar key={i} style={{ backgroundColor: i }} />
      ))}
    </Avatar.Group>
  );
};

export default ColorsPartial;
