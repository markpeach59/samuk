import React from "react";

const OfferAAR = props => {
    const { price, modeldescription, chassis } = props;

    //console.log('Offer Props', props, " ", offeron)

    // AA Range
    if (modeldescription && modeldescription[0].description==='AA Series'){
      const saving = Math.round(price * .025);
      const newprice = price - saving;

      return (
<React.Fragment>
      <div>
        2.5% Saving : £{saving}<br />
        Offer Price : £{newprice}
      </div>
    </React.Fragment>


      );

    }

    // Reach Lithium

    if (chassis && chassis.label==='Lithium Version'){
        const saving = Math.round(price * .03);
        const newprice = price - saving;

      return (
<React.Fragment>
      <div>
        3% Saving : £{saving}<br />
        Offer Price : £{newprice}
      </div>
    </React.Fragment>
      )

}

  return (
    null
  );
};

export default OfferAAR;