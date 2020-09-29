import React, { useReducer, useEffect, Fragment } from "react";
import {
  Layout as LayoutIcon,
  Maximize,
  Square,
  Droplet,
  Edit,
  Edit2,
  Grid,
  Crosshair,
  Sun,
  Disc
} from "react-feather";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import TextStyles from "./knobs/text";
import theme from "./theme";
import Section from "./primitives/section";
import Border from "./knobs/border";
import Space from "./knobs/space";
import Dimension from "./knobs/dimension";
import Apperance from "./knobs/apperance";
import { Flex } from "rebass";
import Layout from "./knobs/layout";
import Theme from "./theme";
import Position from "./knobs/position";
import Background from "./knobs/background";
import BorderRadius from "./knobs/border-radius";
import { reducer } from "./store";
import "react-tippy/dist/tippy.css";
import Empty from "./Empty";


import editor from '../tools/Manager';
// declare var acquireVsCodeApi: any;
// const vscode = acquireVsCodeApi();

const GlobalStyles = createGlobalStyle`
body {
  background-color: ${Theme.colors.background};
  color: ${Theme.colors.textColor};
  height: 100vh;
  padding: 0px;
}
`;

// const InitialState = {
//   declarations: null
// };
const InitialState = {
    declarations: null
  }

export default function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const updateProperty = (prop: string, value: any) => {
    dispatch({
      type: "addProperty",
      payload: {
        prop,
        value
      }
    });

    // vscode.postMessage({
    //   prop,
    //   value,
    //   type: "add"
    // });
    editor.postCSSChange({
      prop,
      value,
      type: "add"
    })
  };

  const removeProperty = (prop: string) => {
    dispatch({
      type: "removeProperty",
      payload: {
        prop
      }
    });

    // vscode.postMessage({
    //   prop,
    //   type: "remove"
    // });
    editor.postCSSChange({
      prop,
      type: "delete"
    })
  };

  useEffect(() => {
    // window.addEventListener("message", ({ data }) => {
    //   if (data.type === "activeBlock") {
    //     dispatch({
    //       type: "resetReclarations",
    //       payload: data.payload
    //     });
    //   }
    // });
    editor.onReceiveCSS(data => {
      const dt = {
        type: "activeBlock",
        payload: data
      }
      dispatch({
        type: "resetReclarations",
        payload: dt.payload
      });

    })
  }, []);

  const declarations = state.declarations || {};
  // console.log(state.declarations);
  if (state.declarations === null) {
    return (
      <Fragment>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Empty />
        </ThemeProvider>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Flex minWidth="150px" p="3" flexDirection="column" backgroundColor="background">
          <Section CategoryIcon={LayoutIcon} label="布局">
            <Layout
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Maximize} label="间隔">
            <Space
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Grid} label="大小">
            <Dimension
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Crosshair} label="位置">
            <Position
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Edit2} label="文字">
            <TextStyles
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Droplet} label="背景">
            <Background
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Square} label="边框">
            <Border
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Disc} label="边框圆角">
            <BorderRadius
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Sun} label="外观">
            <Apperance
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
        </Flex>
      </ThemeProvider>
    </Fragment>
  );
}
