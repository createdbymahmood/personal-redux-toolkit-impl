import { Result } from "antd";

export const DefaultNotFound: React.FC = () => {
  return (
    <div>
      <Result
        status={404}
        title="Not found"
        subTitle="Please double check the entered URL."
      />
    </div>
  );
};
