import React from "react";

const Offer = props => {
    const { price, offeron } = props;

    console.log('Offer Props', props, " ", offeron)

    if (offeron){

      const saving = Math.round(price * .1);

      const newprice = price - saving;

      return (
<React.Fragment>
      <div>
        Saving : £{saving}<br />
        Offer Price : £{newprice}
      </div>
    </React.Fragment>


      );


    }

  return (
    null
  );
};

export default Offer;