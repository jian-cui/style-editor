import React, { useState } from "react";
import styled from "styled-components";
import { Tooltip } from "react-tippy";
import { borderColor, color } from "styled-system";
import { StyleProps } from "../../types";
import { Flex } from 'rebass'
import TextBox from '../text-box'
// import Select from "react-select";
import MiniSelect from './mini-select';
import Theme from "../../theme";
// import SingleSelect from '../select'


// type StyledTextProps = StyleProps & {
//   width?: string;
//   align?: "right" | "center";
//   topLeft?: string;
//   topRight?: string;
//   bottomLeft?: string;
//   bottomRight?: string;
// };

// const StyledText = styled.div<StyledTextProps>`
//   height: 18px;
//   border-radius: 3px;
//   padding: 3px;
//   color: white;
//   border: 1px solid gray;
//   width: ${props => props.width || "100%"};
//   text-align: ${props => props.align || "left"};
//   font-size: 12px;
//   border-top-left-radius: ${props => props.topLeft || 0};
//   border-top-right-radius: ${props => props.topRight || 0};
//   border-bottom-left-radius: ${props => props.bottomLeft || 0};
//   border-bottom-right-radius: ${props => props.bottomRight || 0};
//   ${borderColor}
//   ${color}
// `;

// type StyledTextProps = StyleProps & {
//   width?: string;
// };

// const StyledContainer = styled.div<StyledTextProps>`
//   width: ${props => props.width || "100%"};
// `

interface Props {
  value: string;
  placeholder?: string;
  tooltip?: string;
  align?: "right" | "center";
  width?: string;
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
  selectOptions?: {
    value: any;
    label: string;
  }[],
  onChange: (value: string) => void;
}

// TODO 将数据分开
// 11px => [11, 'px'];
function splitData(str: string): Array<string> {
  if (str) {
    const  regx = /^(\d*)(rem|em|px|pt|ex|pc|in|%){0,1}/i;
    const result = regx.exec(str);
    if (result) {
      return [result[1] ? result[1] : '', result[2] ? result[2] : 'px'];
    }
  }
  return ['', 'px'];
}

export default function TextBoxWithUnit({
  value,
  width,
  placeholder,
  align,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  tooltip,
  selectOptions,
  onChange
}: Props) {
  let [num, defaultUnit] = splitData(value);

  defaultUnit = defaultUnit ? defaultUnit : 'px';

  let [unit, setUnit] = useState(defaultUnit);
  // let unit = defaultUnit;

  // function setUnit(value: string) {
  //   unit = value;
  // }

  // let [num, unit] = splitData(value);

  const options = [
    {
      value: 'px',
      label: 'px'
    },
    {
      value: 'rem',
      label: 'rem'
    },
    {
      value: 'em',
      label: 'em'
    },
    {
      value: '%',
      label: '%'
    },
    {
      value: 'vh',
      label: 'vh'
    },
    {
      value: 'vw',
      label: 'vw'
    }
  ]

  const content = (
    <Flex
      // borderColor="textboxBorder"
      // backgroundColor="textboxBackground"
      width={width || "100%"}
      // placeholder={placeholder}
      // align={align}
      // topLeft={topLeft}
      // topRight={topRight}
      // bottomLeft={bottomLeft}
      // bottomRight={bottomRight}
    >
      <TextBox
        // type="number"
        value={num}
        // borderColor="textboxBackground"
        // backgroundColor="textboxBackground"
        // width="100%"
        placeholder={placeholder}
        // align={align}
        align="center"
        topLeft={topLeft}
        topRight={topRight}
        bottomLeft={bottomLeft}
        bottomRight={bottomRight}
        onChange={num => {
          if (num !== "") {
            let processedNum = num.replace(/[^\d]/g, ''); // 将中间的非数字去掉
            onChange(processedNum + unit);
          } else {
            onChange("")
          }
        }}
      />
      {/* <SingleSelect
        onChange={unit => {
          onChange(num + unit);
        }}
        value={ unit || 'px' }
        options={[
          {
            value: 'px',
            label: 'px'
          },
          {
            value: 'rem',
            label: 'rem'
          }
        ]}
      /> */}
      <MiniSelect
        value={unit}
        options={ selectOptions ? selectOptions : options }
        onChange={(value: any) => {
          if (value!== unit) {
            if (num) {
              onChange(num + value);
              setUnit(value);
            } else {
              setUnit(value);
            }
          }
        }}
      />
    </Flex>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} position="top" size="small">
        {content}
      </Tooltip>
    );
  }
  return content;
}
