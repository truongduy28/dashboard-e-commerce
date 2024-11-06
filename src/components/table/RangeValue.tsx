import { Button, Card, Slider, Space, Typography } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { useState } from "react";
import { FormatCurrency } from "../../utils/formater";

const { Title } = Typography;

interface Props {
  props: FilterDropdownProps;
  max: number;
  min: number;
  defaultValue: [number | null, number | null];
  onChange: ({
    start,
    end,
  }: {
    start: number | null;
    end: number | null;
  }) => void;
  width?: number;
}

const RangeValue = ({
  max = 0,
  min = 0,
  onChange,
  width = 500,
  defaultValue,
  props,
}: Props) => {
  const [currentRange, setCurrentRange] = useState<[number, number]>([
    defaultValue[0] || min,
    defaultValue[1] || max,
  ]);

  const toggleVisible = () => {
    props.close();
  };

  const onOk = () => {
    if (currentRange) {
      onChange({ start: currentRange[0], end: currentRange[1] });
    }
    toggleVisible();
  };

  const onReset = () => {
    setCurrentRange([min, max]);
    onChange({ start: null, end: null });
    toggleVisible();
  };

  const onChangeV2 = (value: number | number[]) => {
    setCurrentRange(value as [number, number]);
  };

  return (
    <Card style={{ maxWidth: width, width: "max-content" }}>
      <div>
        <Title level={4}>Range Prices</Title>
        <Title level={4} className="m-0">
          {FormatCurrency.VND.format(currentRange[0])} -{" "}
          {FormatCurrency.VND.format(currentRange[1])}
        </Title>
        <Slider
          range
          min={min}
          max={max}
          step={1000}
          value={currentRange}
          onChange={onChangeV2}
          marks={{
            [min]: `${FormatCurrency.VND.format(min)}`,
            [max]: `${FormatCurrency.VND.format(max)}`,
          }}
          style={{ width: `${width - 100}px` }}
        />
      </div>
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

export default RangeValue;
