import { Button, Space, Typography } from "antd";
import { titleFromPath } from "../../../../utils/formater";
import PromotionForms from "./PromotionForms";
const { Title } = Typography;

interface Props {
  promotionId?: string;
  openForms: boolean;
  toggleForms: () => void;
}
const TitleOfTable = ({ promotionId, openForms, toggleForms }: Props) => {
  const titleText = titleFromPath();
  return (
    <>
      <div className="row">
        <div className="col">
          <Title className="m-0">{titleText}</Title>
        </div>
        <div className="col text-right my-auto">
          <Space>
            <Button type="primary" onClick={toggleForms}>
              Add Promotion
            </Button>
          </Space>
        </div>
      </div>
      <PromotionForms
        open={openForms}
        onClose={toggleForms}
        promotionId={promotionId}
      />
    </>
  );
};

export default TitleOfTable;
