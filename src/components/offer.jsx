import React from "react";

const Offer = props => {
    const { price, offeron, bigger, model } = props;

    //console.log('Offer Props', props, " ", offeron)

    if ( offeron && model === 'FBAX50-YWL'){
      const saving = Math.round(price * .03);
  
      const newprice = price - saving;

      return (
<React.Fragment>
      <div>
        3% Saving : £{saving}<br />
        Offer Price : £{newprice}
      </div>
    </React.Fragment>


      );

    }




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