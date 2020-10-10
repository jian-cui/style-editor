import React from "react";
import styled from "styled-components";
// import TextBox from "../../primitives/text-box";
import TextBoxWithUnit from "../../primitives/text-box-with-unit";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";
import { Flex } from "rebass";
import SingleSelect from "../../primitives/select";
import { Declarations, UpdateProp, RemoveProp } from "../../store";

const Container = styled.div``;

interface Props {
  declarations: Declarations;
  updateProp: UpdateProp;
  removeProp: RemoveProp;
}

const Properties = {
  Position: "position",
  Left: "left",
  Right: "right",
  Top: "top",
  Bottom: "bottom"
};

export default function Position({
  declarations,
  updateProp,
  removeProp
}: Props) {
  return (
    // <Container>
    <Flex flexDirection="column">
      <RowPropertyPanel
        label="Position"
        minWidth="60px"
        // marginRight="10px"
      >
        <SingleSelect
          onChange={value => {
            if (value === null) {
              removeProp(Properties.Position);
            } else {
              updateProp(Properties.Position, value);
            }
          }}
          value={declarations[Properties.Position] || ""}
          options={[
            {
              value: "static",
              label: "static"
            },
            {
              value: "absolute",
              label: "absolute"
            },
            {
              value: "fixed",
              label: "fixed"
            },
            {
              value: "relative",
              label: "relative"
            },
            {
              value: "sticky",
              label: "sticky"
            },
            {
              value: "initial",
              label: "initial"
            },
            {
              value: "inherit",
              label: "inherit"
            }
          ]}
        />
      </RowPropertyPanel>
      <Flex>
        <RowPropertyPanel
          minWidth="60px"
          marginRight="10px"
          label="Left"
          onClear={() => {
            removeProp(Properties.Left);
          }}
        >
          <TextBoxWithUnit value={declarations[Properties.Left] || ''} onChange={value => updateProp(Properties.Left, value)} />
        </RowPropertyPanel>
        <RowPropertyPanel
          label="Right"
          minWidth="60px"
          marginRight="10px"
          onClear={() => {
            removeProp(Properties.Right);
          }}
        >
          <TextBoxWithUnit value={declarations[Properties.Right] || ''} onChange={value => updateProp(Properties.Right, value)} />
        </RowPropertyPanel>
      </Flex>
      <Flex>
        <RowPropertyPanel
          minWidth="60px"
          marginRight="10px"
          label="Top"
          onClear={() => {
            removeProp(Properties.Top);
          }}
        >
          <TextBoxWithUnit value={declarations[Properties.Top] || ''} onChange={value => updateProp(Properties.Top, value)} />
        </RowPropertyPanel>
        <RowPropertyPanel
          label="Bottom"
          minWidth="60px"
          marginRight="10px"
          onClear={() => {
            removeProp(Properties.Bottom);
          }}
        >
          <TextBoxWithUnit value={declarations[Properties.Bottom] || ''} onChange={value => updateProp(Properties.Bottom, value)} />
        </RowPropertyPanel>
      </Flex>
    {/* </Container> */}
    </Flex>
  );
}
