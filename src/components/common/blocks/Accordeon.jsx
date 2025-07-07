import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export const Accordeon = ({ myData }) => {
  const { data, id } = myData;
  const [expanded, setExpanded] = React.useState(`${id}panel0`);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="faq__accordion">
      {data.items.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `${id}panel${index}`}
          onChange={handleChange(`${id}panel${index}`)}
          className="accordion"
        >
          <AccordionSummary
            expandIcon={
              expanded === `${id}panel${index}` ? (
                <span className="accordion__icon">-</span>
              ) : (
                <span className="accordion__icon">+</span>
              )
            }
          >
            <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
          </AccordionSummary>
          <AccordionDetails>
            <p
              className="accordion__text"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Accordeon;
