import { Editor, Frame, Element } from "@craftjs/core";
import { createTheme, makeStyles, styled } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import React from "react";

import { Viewport, RenderNode } from "../components/editor";
import { Container, Text } from "../components/selectors";
import { Button } from "../components/selectors/Button";
import { Custom1, OnlyButtons } from "../components/selectors/Custom1";
import { Custom2, Custom2VideoDrop } from "../components/selectors/Custom2";
import { Custom3, Custom3BtnDrop } from "../components/selectors/Custom3";
import { Video } from "../components/selectors/Video";
import "../styles/app.css";

const theme = createTheme({
  typography: {
    fontFamily: [
      "acumin-pro",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function Canvas() {
  return (
    <ThemeProvider theme={theme}>
      <div className="h-full h-screen">
        <Editor
          resolver={{
            Container,
            Text,
            Custom1,
            Custom2,
            Custom2VideoDrop,
            Custom3,
            Custom3BtnDrop,
            OnlyButtons,
            Button,
            Video,
          }}
          enabled={false}
          onRender={RenderNode}
        >
          <Viewport>
            <Frame>
              <Element
                canvas
                is={Container}
                width="95%"
                height="auto"
                background={{ r: 255, g: 255, b: 255, a: 1 }}
                padding={["40", "40", "40", "40"]}
                custom={{ displayName: "App" }}
              >
                <Element
                  canvas
                  is={Container}
                  flexDirection="row"
                  width="100%"
                  height="auto"
                  padding={["40", "40", "40", "40"]}
                  margin={["0", "0", "40", "0"]}
                  custom={{ displayName: "Introduction" }}
                >
                  <Element
                    canvas
                    is={Container}
                    width="40%"
                    height="100%"
                    padding={["0", "20", "0", "20"]}
                    custom={{ displayName: "Heading" }}
                  >
                    <Text
                      fontSize="23"
                      fontWeight="400"
                      text="Craft.js is a React framework for building powerful &amp; feature-rich drag-n-drop page editors."
                    ></Text>
                  </Element>
                  <Element
                    canvas
                    is={Container}
                    width="60%"
                    height="100%"
                    padding={["0", "20", "0", "20"]}
                    custom={{ displayName: "Description" }}
                  >
                    <Text
                      fontSize="14"
                      fontWeight="400"
                      text="Everything you see here, including the editor, itself is made of React components. Craft.js comes only with the building blocks for a page editor; it provides a drag-n-drop system and handles the way user components should be rendered, updated and moved, among other things. <br /> <br /> You control the way your editor looks and behave."
                    ></Text>
                  </Element>
                </Element>

                <Element
                  canvas
                  is={Container}
                  background={{ r: 39, g: 41, b: 41, a: 1 }}
                  flexDirection="column"
                  width="100%"
                  height="auto"
                  padding={["40", "40", "40", "40"]}
                  margin={["0", "0", "40", "0"]}
                  custom={{ displayName: "ComplexSection" }}
                >
                  <Element
                    canvas
                    background={{
                      r: 76,
                      g: 78,
                      b: 78,
                      a: 0,
                    }}
                    is={Container}
                    flexDirection="row"
                    margin={["0", "0", "0", "0"]}
                    width="100%"
                    height="auto"
                    alignItems="center"
                    custom={{ displayName: "Wrapper" }}
                  >
                    <Element
                      canvas
                      background={{
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0,
                      }}
                      is={Container}
                      alignItems="center"
                      padding={["0", "0", "0", "0"]}
                      flexDirection="row"
                      width="350px"
                      height="250px"
                      custom={{ displayName: "Square" }}
                    >
                      <Element
                        canvas
                        is={Container}
                        justifyContent="center"
                        alignItems="center"
                        background={{
                          r: 76,
                          g: 78,
                          b: 78,
                          a: 1,
                        }}
                        shadow={25}
                        width="90%"
                        height="90%"
                        padding={["10", "20", "10", "20"]}
                        custom={{ displayName: "Outer" }}
                      >
                        <Element
                          canvas
                          is={Container}
                          justifyContent="center"
                          alignItems="center"
                          background={{
                            r: 76,
                            g: 78,
                            b: 78,
                            a: 1,
                          }}
                          shadow={50}
                          width="80%"
                          height="80%"
                          padding={["10", "20", "10", "20"]}
                          custom={{ displayName: "Middle" }}
                        >
                          <Element
                            canvas
                            is={Container}
                            justifyContent="center"
                            alignItems="center"
                            background={{
                              r: 76,
                              g: 78,
                              b: 78,
                              a: 1,
                            }}
                            shadow={50}
                            width="60%"
                            height="60%"
                            padding={["10", "20", "10", "20"]}
                            custom={{ displayName: "Inner" }}
                          />
                        </Element>
                      </Element>
                    </Element>
                    <Element
                      canvas
                      background={{
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0,
                      }}
                      is={Container}
                      padding={["0", "0", "0", "20"]}
                      flexDirection="column"
                      width="55%"
                      height="100%"
                      fillSpace="yes"
                      custom={{ displayName: "Content" }}
                    >
                      <Text
                        color={{
                          r: "255",
                          g: "255",
                          b: "255",
                          a: "1",
                        }}
                        margin={["0", "0", "18", "0"]}
                        fontSize="20"
                        text="Design complex components"
                      ></Text>
                      <Text
                        color={{
                          r: "255",
                          g: "255",
                          b: "255",
                          a: "0.8",
                        }}
                        fontSize="14"
                        fontWeight="400"
                        text="You can define areas within your React component which users can drop other components into. <br/><br />You can even design how the component should be edited — content editable, drag to resize, have inputs on toolbars — anything really."
                      ></Text>
                    </Element>
                  </Element>
                </Element>
              </Element>
            </Frame>
          </Viewport>
        </Editor>
      </div>
    </ThemeProvider>
  );
}

export default Canvas;
