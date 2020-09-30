import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import TextBoxWithUnit from '../../primitives/text-box-with-unit';
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";
import SingleSelect from '../../primitives/select';
import { Flex } from 'rebass';
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
  BackgroundRepeat: "background-repeat",
  BackgroundPosition: "background-position"
};

// 从background-image属性中获取图片链接
function getUrlFromBackgroundImage(value: string) {
  if (value) {
    return value.slice(4, value.length - 1).replace(/['|"]/g, '');
  }
  return '';
  // let str = value.slice(4, value.length - 1);
};

function positionStr2percent(position: string) {
  let result = '';
  switch(position) {
    case 'top':
      result= '0%';
      break;
    case 'bottom':
      result= '100%';
      break;
    case 'left':
      result= '0%';
      break;
    case 'right':
      result= '100%';
      break;
    case 'center':
      result= '50%';
      break;
    default:
      result = position;
  }
  return result;
}


function convertSinglePosition2Arr(val: string) {
  switch(val) {
    case 'center':
      return ['50%', '50%'];
    case 'top':
      return ['0%', '50%'];
    case 'bottom':
      return ['100%', '50%'];
    case 'left':
      return ['50%', '0%'];
    case 'right':
      return ['100%', '0%'];
    default:
      return [val, '50%'];
  }
}

export default function Background({
  declarations,
  updateProp,
  removeProp
}: Props) {
  let [positionX, positionY] = ['', ''];
  let initPosition = declarations[Properties.BackgroundPosition];

  let positionStr = initPosition || '';
  if (positionStr !== '') {
    let positionArr = positionStr.split(' ');
    if (positionArr.length >= 2) {
      positionX = positionStr2percent(positionArr[0]);
      positionY = positionStr2percent(positionArr[1]);
    } else {
      // 只有一个值的情况 另外一个自动设置为50%
      [positionX, positionY] = convertSinglePosition2Arr(positionArr[0]);
    }
  }

  function updateBackgroundPosition(positionX: string, positionY: string) {
    let x = positionX, y = positionY; 
    if (!x) x = '50%';
    if (!y) y = '50%';
    updateProp(Properties.BackgroundPosition, `${x} ${y}`);
  }

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
      <RowPropertyPanel label="Background position" onClear={() => {
          removeProp(Properties.BackgroundPosition)
        }}>
        <Flex>
          <TextBoxWithUnit
            value={positionX || ""}
            onChange={value => {
              // positionX = value;

              updateBackgroundPosition(value, positionY);
            }}
          />
        </Flex>
        <div style={{width:'20px'}}></div>
        <Flex>
          <TextBoxWithUnit
            value={positionY || ""}
            onChange={value => {
              // positionY = value;

              updateBackgroundPosition(positionX, value);
            }}
          />
        </Flex>
      </RowPropertyPanel>
    </Container>
  );
}
