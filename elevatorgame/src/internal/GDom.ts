export interface GDomStructure {
  dom?: string,
  classes?: string | string[],
  attr?: {
    [key: string]: string | number | Object
  },
  childs?: (GDomStructure | string | number)[] | {
    structures: (GDomStructure | string | number)[];
    factory?: (structure: GDomStructure | string) => GDomStructure | string;
    common?: GDomStructure;
  };
  events?: {
    [key: string]: Function | Function[]
  }
}

export function GDom(structure: GDomStructure | string): HTMLElement {
  if(typeof structure === "string") {
    const dom = document.createTextNode(structure);

    return dom;
  }

  const dom = document.createElement(structure.dom || "div");

  if ("classes" in structure) {
    const classes = Array.isArray(structure.classes) 
      ? structure.classes 
      : [structure.classes];

    for (const className of classes) {
      const classValue = typeof className === "number"
        ? className.toString() 
        : className;

      if (classValue.trim() === "" || typeof classValue !== "string") { 
        continue; 
      }

      dom.classList.add(classValue);
    }
  }

  if ("attr" in structure && typeof structure.attr === "object") {
    for (const attr of Object.keys(structure.attr)) {
      const realValue = structure.attr[attr];

      if (
        typeof realValue !== "string" &&
        typeof realValue !== "number" &&
        typeof realValue !== "object"
      ) continue;

      const value = typeof realValue === "object" ? JSON.stringify(realValue) : realValue;

      dom.setAttribute(attr, value);
    }
  }

  if ("childs" in structure) {
    const realChildsValue = structure.childs;
    const hasExtra = typeof realChildsValue === "object" && !Array.isArray(realChildsValue);

    const childsValue = hasExtra 
      ? realChildsValue.structures 
      : realChildsValue;

    const common = hasExtra ? realChildsValue.common || {} : {};
    const factory = hasExtra ? realChildsValue.factory || ((a) => a) : (a) => a;

    for (let child of childsValue) {
      if (typeof child === "number") child = child.toString();

      if (typeof child !== "string" && typeof child !== "object") 
        continue;

      const factored = factory(child);
      const value = typeof factored === "object" 
        ? { ...common, ...factored } 
        : factored;

      const domChild = GDom(value);

      dom.appendChild(domChild);
    }
  }

  if ("events" in structure) {
    for (const eventName of Object.keys(structure.events)) {
      const eventValue = structure.events[eventName];

      if(typeof eventValue !== "function" && !Array.isArray(eventValue)) 
        continue;

      const eventValues = Array.isArray(eventValue) ? eventValue : [eventValue];

      eventValues.forEach((event) => {
        dom.addEventListener(eventName, event);
      });
    }
  }

  return dom;
}
