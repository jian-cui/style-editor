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
  Background: "background",
  BackgroundColor: "background-color",
  BackgroundImage: "background-image",
  BackgroundRepeat: "background-repeat",
  BackgroundPosition: "background-position",
  BackgroundAttachment: "background-attachment"
};

// 从background-image属性中获取图片链接
function getUrlFromBackgroundImage(value: string) {
  if (value) {
    if (value.startsWith('linear-gradient') || value.startsWith('radial-gradient')) {
      return value;
    }
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

function isColor(value: string): boolean {
  let clr = ['transparent', 'inherit', 'red', 'blue', 'gray', 'yellow'];
  const val = value.trim();
  return val.startsWith('#') || val.startsWith('rgb') || clr.includes(val);
}

function isImg(value: string): boolean {
  const val = value.trim();
  return val.startsWith('url(')
    || val.startsWith('linear-gradient')
    || val.startsWith('-webkit-linear-gradient')
    || val.startsWith('-moz-linear-gradient')
    || val.startsWith('-o-linear-gradient')
    || val.startsWith('-ms-linear-gradient')
    
    || val.startsWith('radial-gradient')
    || val.startsWith('-webkit-radial-gradient')
    || val.startsWith('-moz-radial-gradient')
    || val.startsWith('-o-radial-gradient')
    || val.startsWith('-ms-radial-gradient');
}

function isRepeat(value: string): boolean {
  const val = value.trim();
  return val === 'repeat' || val === 'no-repeat';
}

function isAttachment(value: string): boolean {
  const val = value.trim();
  return val === 'fixed' || val === 'scroll' || val === 'inherit';
}


export default function Background({
  declarations,
  updateProp,
  removeProp
}: Props) {
  // 记录background属性中都有哪几条属性合并进去
  const backgroundPropertyRecorder: {
    [propName: string]: boolean
  } = {
    'background-color': false,
    'background-image': false,
    'background-repeat': false,
    'background-position': false
  }

  // 拆分、获取属性值
  const getValuesForAllProperty = () => {
    let backgroundColor = declarations[Properties.BackgroundColor] || '',
        backgroundImage = declarations[Properties.BackgroundImage] || '',
        backgroundRepeat = declarations[Properties.BackgroundRepeat] || '',
        backgroundPosition = declarations[Properties.BackgroundPosition] || '',
        backgroundAttachment = declarations[Properties.BackgroundAttachment] || '';
    
    let valueForProperty = declarations[Properties.Background];

    if (valueForProperty) {
      const tokens: Array<string> = valueForProperty.trim().split(/\s+/);
      // const tokenLength = tokens.length;
      const restTokens = tokens.filter((token, index) => {
        if (isColor(token)) {
        // if (index === 0 && !isImg(token)) {
          // 第一项 并且不是图片
          backgroundPropertyRecorder[Properties.BackgroundColor] = true;
          backgroundColor = backgroundColor ||  token;
          return false;
        } else if (isImg(token)) {
          backgroundPropertyRecorder[Properties.BackgroundImage] = true;
          backgroundImage = backgroundImage || token;
          return false;
        } else if (isRepeat(token)) {
          backgroundPropertyRecorder[Properties.BackgroundRepeat] = true;
          backgroundRepeat = backgroundRepeat || token;
          return false;
        } else if (isAttachment(token)) {
          backgroundPropertyRecorder[Properties.BackgroundAttachment] = true;
          backgroundAttachment = backgroundAttachment || token;
          return false;
        }
        return true;
      })

      // 还余下的内容就是position 进行处理
      if (!backgroundPosition) {
        backgroundPropertyRecorder[Properties.BackgroundPosition] = true;
        if (restTokens.length == 1) {
          backgroundPosition = restTokens[0];
        } else if (restTokens.length == 2) {
          backgroundPosition = restTokens.join(' ');
        }
      }
    }

    return {
      backgroundColor,
      backgroundImage,
      backgroundRepeat,
      backgroundPosition,
      backgroundAttachment,
    }
  }

  // 拆分开position属性
  const getPositionValue = (positionArr: Array<string>) => {
    let positionX = '', positionY = '';
    if (positionArr.length >= 2) {
      positionX = positionStr2percent(positionArr[0]);
      positionY = positionStr2percent(positionArr[1]);
    } else {
      // 只有一个值的情况 另外一个自动设置为50%
      [positionX, positionY] = convertSinglePosition2Arr(positionArr[0]);
    }

    return [positionX, positionY];
  }

  let {
    backgroundColor,
    backgroundImage,
    backgroundRepeat,
    backgroundPosition,
    backgroundAttachment
  } = getValuesForAllProperty();

  // 处理position;
  let positionX = '', positionY = '';
  // let initPosition = declarations[Properties.BackgroundPosition];
  let initPosition = backgroundPosition;
  // let positionStr = initPosition || '';
  if (initPosition !== '') {
    let positionArr = initPosition.split(' ');

    [positionX, positionY] = getPositionValue(positionArr);
  }



  function updateBackgroundPosition(positionX: string, positionY: string) {
    let x = positionX, y = positionY; 
    if (!x) x = '50%';
    if (!y) y = '50%';
    // updateProp(Properties.BackgroundPosition, `${x} ${y}`);
    updatePropWrapper(Properties.BackgroundPosition, `${x} ${y}`);
  }

  // 将属性进行合并
  function updatePropWrapper(prop: string, value: string) {
    if (backgroundPropertyRecorder[prop]) {
      switch(prop) {
        case Properties.BackgroundColor:
          backgroundColor = value;
          break;
        case Properties.BackgroundImage:
          backgroundImage = value;
          break;
        case Properties.BackgroundPosition:
          backgroundPosition = value;
          break;
        case Properties.BackgroundRepeat:
          backgroundRepeat = value;
          break;
        default:
          return;
      }

      let result = `${backgroundColor} ${backgroundImage} ${backgroundPosition} ${backgroundRepeat}`;

      removeProp(prop);
      // updateProp(Properties.Background, result);
      result.trim() !== '' ? updateProp(Properties.Background, result) : removeProp(Properties.Background);
    } else {
      updateProp(prop, value);
    }
  }

  // 删除属性
  function removePropWrapper(prop: string) {
    if (backgroundPropertyRecorder[prop]) {
      switch(prop) {
        case Properties.BackgroundColor:
          backgroundColor = '';
          break;
        case Properties.BackgroundImage:
          backgroundImage = '';
          break;
        case Properties.BackgroundPosition:
          backgroundPosition = '';
          break;
        case Properties.BackgroundRepeat:
          backgroundRepeat = '';
          break;
        default:
          return ;
      }

      let result = `${backgroundColor} ${backgroundImage} ${backgroundPosition} ${backgroundRepeat}`;

      removeProp(prop);
      result.trim() !== '' ? updateProp(Properties.Background, result) : removeProp(Properties.Background);
    } else {
      removeProp(prop);
    }
  }

  return (
    <Container>
      <RowPropertyPanel
        label="Background color"
        onClear={() => {
          removePropWrapper(Properties.BackgroundColor);
        }}
      >
        <ColorPicker
          color={backgroundColor || ""}
          onChange={color => {
            updatePropWrapper(Properties.BackgroundColor, color);
          }}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Background image" onClear={() => {
          removePropWrapper(Properties.BackgroundImage);
        }}
      >
        <TextBox
          value={getUrlFromBackgroundImage(backgroundImage) || ""}
          onChange={value => {
            if (value !== "") {
              let result = `url("${value}")`;
              if (value.startsWith('linear-gradient') || value.startsWith('radial-gradient')) {
                result = value;
              }
              updatePropWrapper(Properties.BackgroundImage, result);
            } else {
              removePropWrapper(Properties.BackgroundImage);
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
              removePropWrapper(Properties.BackgroundRepeat);
            } else {
              updatePropWrapper(Properties.BackgroundRepeat, value);
            }
          }}
          value={backgroundRepeat || ''}
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
      <RowPropertyPanel
        label="Background position"
        onClear={() => {
          removePropWrapper(Properties.BackgroundPosition)
        }}
      >
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
      <RowPropertyPanel label="Background attachment">
        <SingleSelect
          onChange={value => {
            if (value === null) {
              removePropWrapper(Properties.BackgroundAttachment);
            } else {
              updatePropWrapper(Properties.BackgroundAttachment, value);
            }
          }}
          value={backgroundAttachment || ''}
          options={[
            {
              value: 'scroll',
              label: 'scroll',
            },
            {
              value: 'fixed',
              label: 'fixed',
            },
            {
              value: 'inherit',
              label: 'inherit'
            }
          ]}
        />
      </RowPropertyPanel>
    </Container>
  );
}
