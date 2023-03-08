import React from "react";
import Button from "@material-ui/core/Button";

const QuoteSave = props => {
  const { onQuoteSave } = props;

  return (
    <React.Fragment>
      <div>
        <Button onClick={() => onQuoteSave()}>Save Quote</Button>
      </div>
    </React.Fragment>
  );
};

export default QuoteSave;
