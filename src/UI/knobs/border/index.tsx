import React, { useState, useContext } from "react";
import styled from "styled-components";
import BorderItem from "./border-side";
import { Flex } from "rebass";
import BorderToggle from "./toggle";
import BorderIcon from "./icons/generic";

// import { getThemeColors } from "../../theme";
import { ThemeContext } from "styled-components";

import { Declarations, UpdateProp, RemoveProp } from "../../store";
import Clear from "../../primitives/clear-icon";

const Sides = {
  Top: "BorderTop",
  Left: "BorderLeft",
  Bottom: "BorderBottom",
  Right: "BorderRight",
  All: "Border"
};

const Properties = {
  Border: "border",
  BorderTop: "border-top",
  BorderRight: "border-right",
  BorderBottom: "border-bottom",
  BorderLeft: "border-left"
};

interface Props {
  declarations: Declarations;
  updateProp: UpdateProp;
  removeProp: RemoveProp;
}

export default function Border({
  declarations,
  updateProp,
  removeProp
}: Props) {
  // const colors = getThemeColors();
  const colors = useContext(ThemeContext).colors;
  const [activeSide, setActiveSide] = useState(Sides.All);

  const activeSidePropertyName = (Properties as any)[activeSide];
  const borderCSSValue = declarations[activeSidePropertyName] || "";
  const [width = "", style = "", color = ""] = borderCSSValue.split(" ");

  return (
    <Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mr="10px"
      >
        <BorderToggle
          tooltip="Border top"
          isActive={activeSide === Sides.Top}
          onClick={() => {
            setActiveSide(Sides.Top);
          }}
        >
          <BorderIcon top={colors.iconActive} />
        </BorderToggle>
        <Flex>
          <BorderToggle
            tooltip="Border right"
            isActive={activeSide === Sides.Right}
            onClick={() => {
              setActiveSide(Sides.Right);
            }}
          >
            <BorderIcon right={colors.iconActive} />
          </BorderToggle>
          <BorderToggle
            tooltip="Border all sides"
            isActive={activeSide === Sides.All}
            onClick={() => {
              setActiveSide(Sides.All);
            }}
          >
            <BorderIcon
              top={colors.iconActive}
              right={colors.iconActive}
              bottom={colors.iconActive}
              left={colors.iconActive}
            />
          </BorderToggle>
          <BorderToggle
            tooltip="Border left"
            isActive={activeSide === Sides.Left}
            onClick={() => {
              setActiveSide(Sides.Left);
            }}
          >
            <BorderIcon left={colors.iconActive} />
          </BorderToggle>
        </Flex>
        <BorderToggle
          tooltip="Border bottom"
          isActive={activeSide === Sides.Bottom}
          onClick={() => {
            setActiveSide(Sides.Bottom);
          }}
        >
          <BorderIcon bottom={colors.iconActive} />
        </BorderToggle>
      </Flex>
      <BorderItem
        width={width}
        style={style}
        color={color}
        onColorChange={newColor => {
          updateProp(activeSidePropertyName, `${width} ${style} ${newColor}`);
        }}
        onStyleChange={newStyle => {
          updateProp(activeSidePropertyName, `${width} ${newStyle} ${color}`);
        }}
        onWidthChange={newWidth => {
          updateProp(activeSidePropertyName, `${newWidth} ${style} ${color}`);
        }}
      />
      <Flex flexDirection="row-reverse" width="20px">
        <Clear
          tooltip="Clear border"
          onClear={() => {
            removeProp(activeSidePropertyName);
          }}
        />
      </Flex>
    </Flex>
  );
}
