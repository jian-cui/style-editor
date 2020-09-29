export interface Declarations {
  [prop: string]: any;
}

export interface State {
  declarations: Declarations;
}

export interface Action {
  type: string;
  payload: {
    prop: string;
    value?: any;
  } | Declarations;
}

export type UpdateProp = (prop: string, value: any) => void;
export type RemoveProp = (prop: string) => void;

function removeProperties(state: State, { type, payload }: Action) {
  const declarations = Object.entries(state.declarations)
  .filter(([prop]) => {
    return prop !== payload.prop;
  })
  .reduce((prev: any, [prop, value]) => {
    prev[prop] = value;
    return prev;
  }, {});

  return {
    ...state,
    declarations
  }
}

export function reducer(state: State, { type, payload }: Action) {
  switch (type) {
    case "addProperty":
      if (payload.value === "") {
        const prop = removeProperties(state, { type, payload });
        return prop;
      }
      return {
        ...state,
        declarations: {
          ...state.declarations,
          [payload.prop]: payload.value
        }
      };
    case "removeProperty": {
      return removeProperties(state, { type, payload });
      // const declarations = Object.entries(state.declarations)
      //   .filter(([prop]) => {
      //     return prop !== payload.prop;
      //   })
      //   .reduce((prev: any, [prop, value]) => {
      //     prev[prop] = value;
      //     return prev;
      //   }, {});

      // return {
      //   ...state,
      //   declarations
      // };
    }

    case "resetReclarations":
      return {
        ...state,
        declarations: payload
      };
    default:
      throw new Error();
  }
}
