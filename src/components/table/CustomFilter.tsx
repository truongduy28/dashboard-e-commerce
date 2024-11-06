import { Avatar, Button, Card, Space, Tag } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { Key, useState } from "react";
import { appColors } from "../../constants/antd";
import { colors } from "../../constants/appInfos";

export const CustomFilter = ({
  props,
  onSelected,
  selected = [],
  type = "tag",
}: {
  props: FilterDropdownProps;
  onSelected: (values: string[]) => void;
  selected: string[];
  type?: "tag" | "color";
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(selected);

  const onChange = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const onOk = () => {
    onSelected(selectedItems);
    props.confirm();
  };

  const onReset = () => {
    onSelected([]);
    setSelectedItems([]);
    props.setSelectedKeys([]);
    props.close();
  };

  return (
    <Card style={{ maxWidth: 450, width: "max-content" }}>
      <Space wrap size={"small"}>
        {(props.filters || [])?.map((i) => {
          if (type === "tag")
            return (
              <Tag
                style={{ cursor: "pointer" }}
                key={i.value as Key}
                color={
                  selectedItems.includes(i.value as string)
                    ? appColors.blue.blue5
                    : ""
                }
                onClick={() => onChange(i.value as string)}
              >
                {i.text}
              </Tag>
            );
          return (
            <div
              key={i.value as Key}
              style={{
                borderRadius: "100%",
                padding: "2px",
                ...(selectedItems.includes(i.value as string)
                  ? AvatarActiveStyle
                  : AvatarNonActiveStyle),
              }}
            >
              <Avatar
                style={{
                  backgroundColor: i.value as string,
                  cursor: "pointer",
                }}
                onClick={() => onChange(i.value as string)}
              />
            </div>
          );
        })}
      </Space>
      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Space>
          <Button onClick={onReset}>Reset</Button>
          <Button type="primary" onClick={onOk}>
            OK
          </Button>
        </Space>
      </div>
    </Card>
  );
};

const AvatarActiveStyle = {
  border: `3px solid ${colors.primary500}`,
};

const AvatarNonActiveStyle = {
  border: `3px solid transparent`,
};
