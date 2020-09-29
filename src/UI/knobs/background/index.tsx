import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";
import SingleSelect from '../../primitives/select';
import { Declarations, UpdateProp, RemoveProp } from "../../store";

const Container = styled.div``;

interface Props {
  declarations: Declarations;
  updateProp: UpdateProp;
  removeProp: RemoveProp;
}

const Properties = {
  BackgroundColor: "background-color",
  BackgroundImage: "background-image",
  BackgroundRepeat: "background-repeat"
};

// 从background-image属性中获取图片链接
function getUrlFromBackgroundImage(value: string) {
  if (value) {
    return value.slice(4, value.length - 1).replace(/['|"]/g, '');
  }
  return '';
  // let str = value.slice(4, value.length - 1);
};


export default function Background({
  declarations,
  updateProp,
  removeProp
}: Props) {
  return (
    <Container>
      <RowPropertyPanel
        label="Background color"
        onClear={() => {
          removeProp(Properties.BackgroundColor);
        }}
      >
        <ColorPicker
          color={declarations[Properties.BackgroundColor] || ""}
          onChange={color => {
            updateProp(Properties.BackgroundColor, color);
          }}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Background image" onClear={() => {
          removeProp(Properties.BackgroundImage);
        }}
      >
        <TextBox
          value={getUrlFromBackgroundImage(declarations[Properties.BackgroundImage]) || ""}
          onChange={value => {
            if (value !== "") {
              updateProp(Properties.BackgroundImage, `url("${value}")`);
            } else {
              removeProp(Properties.BackgroundImage);
            }
          }}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Background repeat">
        {/* <TextBox
          value={declarations[Properties.BackgroundRepeat] || ""}
          onChange={value => {
            if (value !== "") {
              updateProp(Properties.BackgroundRepeat, value);
            } else {
              removeProp(Properties.BackgroundRepeat);
            }
          }}
        /> */}
        <SingleSelect
          onChange={value => {
            if (value === null) {
              removeProp(Properties.BackgroundRepeat);
            } else {
              updateProp(Properties.BackgroundRepeat, value);
            }
          }}
          value={declarations[Properties.BackgroundRepeat] || ''}
          options={[
            {
              value: 'repeat',
              label: 'repeat',
            },
            {
              value: 'no-repeat',
              label: 'no-repeat',
            }
          ]}
        />
      </RowPropertyPanel>
    </Container>
  );
}
