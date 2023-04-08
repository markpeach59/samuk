import React from "react";

const Offer = props => {
    const { price, offeron, bigger } = props;

    console.log('Offer Props', props, " ", offeron)

    if (offeron && bigger){

        const saving = Math.round(price * .15);
  
        const newprice = price - saving;
  
        return (
  <React.Fragment>
        <div>
          15% Saving : £{saving}<br />
          Offer Price : £{newprice}
        </div>
      </React.Fragment>
  
  
        );
  
  
      }



    if (offeron){

      const saving = Math.round(price * .1);

      const newprice = price - saving;

      return (
        <React.Fragment>
      <div>
        10% Saving : £{saving}<br />
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