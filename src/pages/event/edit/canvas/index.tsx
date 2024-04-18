import {
  Editor,
  Frame,
  Element,
  useNode,
  DefaultEventHandlers,
  NodeId,
} from "@craftjs/core";

const Hero = () => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref: HTMLElement | null) => ref && connect(drag(ref))}>
      <h1>I'm a Hero component</h1>
    </div>
  );
};

class CustomEventHandlers extends DefaultEventHandlers {
  handlers() {
    const defaultHandlers = super.handlers();

    return {
      ...defaultHandlers,
      // Customize the hover event handler
      hover: (el: HTMLElement, id: NodeId) => {
        const unbindDefaultHoverHandler = defaultHandlers.hover(el, id);

        // Track when the mouse leaves a node and remove the hovered state
        const unbindMouseleave = this.addCraftEventListener(
          el,
          "mouseleave",
          (e) => {
            e.craft.stopPropagation();
            this.options.store.actions.setNodeEvent("hovered", "");
            console.log(`mouseleave node ${id}`);
          }
        );

        return () => {
          unbindDefaultHoverHandler();
          unbindMouseleave();
        };
      },
    };
  }
}

const RenderNode = ({ render }: any) => {
  return <div style={{ background: "#000", padding: "5px" }}>{render}</div>;
};

const Container = ({ children }: any) => {
  return <div style={{ border: "1px solid #000" }}>{children}</div>;
};

const App = () => {
  return (
    <Editor resolver={{ Hero, Container }}>
      <h2>My Page Editor</h2>
      <Frame>
        <Element is={Container} canvas>
          <h2>Drag me around</h2>
          <Element is="div" style={{ background: "#333" }}>
            <p>Same here</p>
          </Element>
        </Element>
      </Frame>
    </Editor>
  );
};
export default App;
