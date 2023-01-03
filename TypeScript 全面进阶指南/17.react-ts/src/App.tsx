import { 
  useState, 
  type FC, 
  type PropsWithChildren, 
  useCallback, 
  useMemo, 
  useReducer, 
  useRef,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

interface IApp {
  visible: boolean;
  controller: () => void
}

// FC 是 FunctionComponent 的缩写
// 而 FunctionComponent 同样被作为一个类型导出，其使用方式是一致的，接受的唯一泛型参数即为这个组件的属性类型

// 组件声明
const App: FC<IApp> = ({ visible, controller }) => {
  return <div> App </div>
}

export default App


// 组件泛型
interface ICellProps<TData> { 
  field: keyof TData;
}
const Cell = <T extends Record<string, any>>(
  props: PropsWithChildren<ICellProps<T>>
) => {
  return <p></p>;
};
interface IDataStruct {
  name: string;
  age: number;
}
const Item = () => {
  return (
    <>
      <Cell<IDataStruct> field='name'></Cell>
      <Cell<IDataStruct> field='age'></Cell>
    </>
  );
};



// 泛型坑位
// useState
const Container = () => {
  // 推导为 string 类型
  const [state1, setState1] = useState('foo');
  // 此时类型为 string | undefined
  const [state2, setState2] = useState<string>();
  // 默认值
  // const [data, setData] = useState<Partial<IData>>({});
  // 消费 useState 返回值的类型
  type State = ReturnType<typeof useState<number>>;
};

// useCallback 与 useMemo
const Container1 = () => {
  // 泛型推导为 (input: number) => boolean
  const handler1 = useCallback((input: number) => {
    return input > 599;
  }, []);

  // 显式提供为 (input: number, compare: boolean) => boolean
  const handler2 = useCallback<(input: number, compare: boolean) => boolean>(
    (input: number) => {
      return input > 599;
    },
    []
  );
  
  // 推导为 string
  const result1 = useMemo(() => {
    return 'some-expensive-process';
  }, []);

  // 显式提供
  const result2 = useMemo<{ name?: string }>(() => {
    return {};
  }, []);
};


// useReducer
const initialState = { count: 0 };

type Actions =
  | {
      type: 'inc';
      payload: {
        count: number;
        max?: number;
      };
    }
  | {
      type: 'dec';
      payload: {
        count: number;
        min?: number;
      };
    };

function reducer(state: typeof initialState, action: Actions) {
  switch (action.type) {
    case 'inc':
      return {
        count: action.payload.max
          ? Math.min(state.count + action.payload.count, action.payload.max)
          : state.count + action.payload.count,
      };
    case 'dec':
      return {
        count: action.payload.min
          ? Math.max(state.count + action.payload.count, action.payload.min)
          : state.count - action.payload.count,
      };
    default:
      throw new Error('Unexpected Action Received.');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      Count: {state.count}
      <button
        onClick={() =>
          dispatch({ type: 'dec', payload: { count: 599, min: 0 } })
        }
      >
        -(min: 0)
      </button>
      <button
        onClick={() =>
          dispatch({
            type: 'inc',
            payload: {
              count: 599,
              max: 599,
            },
          })
        }
      >
        +(max: 599)
      </button>
    </>
  );
}

// useRef
const Container2 = () => {
  const domRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<number>(599);

  const operateRef = () => {
    domRef.current?.getBoundingClientRect();
    valueRef.current += 1;
  };

  return (
    <div ref={domRef}>
      <p>fff</p>
    </div>
  );
};


// useImperativeHandle
interface IRefPayload {
  controller: () => void;
}
const Parent = () => {
  const childRef = useRef<IRefPayload>(null);

  const invokeController = () => {
    childRef.current?.controller();
  };

  return (
    <>
      <Child ref={childRef} />
      <button onClick={invokeController}>invoke controller!</button>
    </>
  );
};
interface IChildPropStruct {}
interface IExtendedRefPayload extends IRefPayload {
  disposer: () => void;
}
const Child = forwardRef<IRefPayload, IChildPropStruct>((props, ref) => {
  const internalController = () => {
    console.log('Internal Controller!');
  };

  useImperativeHandle<IRefPayload, IExtendedRefPayload>(
    ref,
    () => {
      return {
        controller: internalController,
        disposer: () => {},
      };
    },
    []
  );

  return <p></p>;
});


// 内置类型定义
import type { ChangeEvent, MouseEvent, ChangeEventHandler } from 'react';
const Container3 = () => {
  const [v, setV] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {};

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {};

  // const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {};

  return (
    <>
      <input value={v} onChange={handleChange} />
      <button onClick={handleClick}>Click me!</button>
    </>
  );
};
import type { CSSProperties } from 'react';
export interface IContainerProps {
  style: CSSProperties;
}
const css: CSSProperties = {
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
};
const Container4 = ({ style }: IContainerProps) => {
  return <p style={style}>11</p>;
};


// 其他内置类型
// ComponentProps
// 当你基于原生 HTML 元素去封装组件时，
// 通常会需要将这个原生元素的所有 HTML 属性都保留下来作为组件的属性，
// 此时你肯定不能一个个声明所有属性，那么就可以使用 ComponentProps 来提取出一个元素上所有的属性
import type { ComponentProps } from 'react';
interface IButtonProps extends ComponentProps<'button'> {
  size?: 'small' | 'large';
  link?: boolean;
}
const Button = (props: IButtonProps) => {
  return <button {...props} >{props.children}</button>;
};
// ReactElement 与 ReactNode
// ReactElement 是 createElement、cloneElement 等 factory 方法的返回值类型，
// 它本质上指的是一个有效的 JSX 元素，即 JSX.Element。而 ReactNode 可以认为包含了 ReactElement ，
// 它还包含 null、undefined 以及 ReactFragment 等一些特殊的部分