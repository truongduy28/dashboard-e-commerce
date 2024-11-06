import { Flex } from "antd";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { formatSlug } from "../../../../utils/formater";

const TitlePartial = ({
  value,
  onchange,
}: {
  value: string;
  onchange: (value: string) => void;
}) => {
  const [text, setText] = useState<string>(value);
  const debounceText = useDebounce(text, 500);

  useEffect(() => {
    onchange(formatSlug(debounceText));
  }, [debounceText]);

  return (
    <Flex justify={"space-between"} align={"center"}>
      <Title level={2}>Inventories</Title>
      <div style={{ width: "300px" }}>
        <Search
          allowClear
          onChange={(e) => setText(e.target.value)}
          placeholder="Title of products..."
        />
      </div>
    </Flex>
  );
};

export default TitlePartial;
