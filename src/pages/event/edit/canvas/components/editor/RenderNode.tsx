import { useNode, useEditor } from "@craftjs/core";
import { ROOT_NODE } from "@craftjs/utils";
import React, { useEffect, useRef, useCallback, useLayoutEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ReactDOM from "react-dom";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export const RenderNode = ({ render }: any) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add("component-selected");
      else dom.classList.remove("component-selected");
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    if (!dom) return { top: "0px", left: "0px" };

    const { top, left } = dom.getBoundingClientRect();
    const offsetTop = 40; // Height of the overlay to avoid overlapping.
    return {
      top: `${top - offsetTop > 0 ? top - offsetTop : 0}px`, // Adjusted to avoid negative values
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;
    if (!currentDOM || !dom) return;

    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useLayoutEffect(() => {
    const pageContainer = document.querySelector(".page-container");
    if (pageContainer) {
      pageContainer.addEventListener("scroll", scroll);
    }

    return () => {
      if (pageContainer) {
        pageContainer.removeEventListener("scroll", scroll);
      }
    };
  }, [scroll]);

  return (
    <>
      {(isHover || isActive) &&
        ReactDOM.createPortal(
          <Box
            ref={currentRef}
            sx={{
              px: 2,
              py: 2,
              height: 40,
              color: "white",
              bgcolor: "primary.main",
              position: "fixed",
              display: "flex",
              alignItems: "center",
              left: dom ? getPos(dom).left : 0,
              top: dom ? getPos(dom).top : 0,
              zIndex: 9999,
            }}
          >
            <Box component="h2" sx={{ flex: 1, mr: 4 }}>
              {name}
            </Box>
            {moveable ? (
              <IconButton
                className="cursor-move"
                ref={drag as any}
                onMouseDown={(e: React.MouseEvent) => {
                  e.stopPropagation(); // Prevent event from propagating further
                  // Potentially other logic to initiate drag
                }}
              >
                <DragIndicatorIcon />
              </IconButton>
            ) : null}
            {id !== ROOT_NODE && parent && (
              <IconButton
                onClick={() => {
                  actions.selectNode(parent);
                }}
              >
                <ArrowUpwardIcon />
              </IconButton>
            )}
            {deletable ? (
              <IconButton
                onMouseDown={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  actions.delete(id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            ) : null}
          </Box>,
          (document.querySelector(".page-container") as HTMLElement) ||
            document.createDocumentFragment()
        )}
      {render}
    </>
  );
};
