import { Card, Space, Typography } from "antd";
import { IStatistical } from "../../interfaces/statistical";
import { FormatCurrency } from "../../utils/formater";

const { Title, Text } = Typography;

interface Props {
  title: string;
  data: IStatistical[];
}

const Statistical = ({ data = [], title }: Props) => {
  return (
    <Card className="mt-2 mb-4">
      <Title>{title}</Title>
      <div className="row">
        {data.map((item, index) => (
          <div
            className="col"
            style={
              index + 1 === data.length
                ? { borderRight: "none" }
                : { borderRight: "1px solid #f0f0f0" }
            }
            key={index}
          >
            <div
              className="mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <div
                  className="icon-wapper"
                  style={{
                    backgroundColor: item.color,
                  }}
                >
                  {item.icon}
                </div>
              </div>
            </div>
            {!item.direction || item.direction === "horizontal" ? (
              <Space
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                {renderDescriptionData(item)}
              </Space>
            ) : (
              <div className="text-center">{renderDescriptionData(item)}</div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Statistical;

const renderDescriptionData = (item: IStatistical) => (
  <>
    <Title
      style={{ fontWeight: 600 }}
      type="secondary"
      className="m-0"
      level={5}
    >
      {item.valueType === "number"
        ? item.value.toLocaleString()
        : FormatCurrency.USD.format(item.value)}
    </Title>
    <Text style={{ fontWeight: 500 }} type="secondary">
      {item.description}
    </Text>
  </>
);
