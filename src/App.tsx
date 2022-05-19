import React from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import MarubatsuGame from './components/MarubatsuGame/MarubatsuGame';

type linkType = {
  path: string;
  link: string;
};

const linkList: linkType[] = [
  {
    path: '/marubatsu-game',
    link: 'MarubatsuGame',
  },
];

function App() {
  // interfaceとtypeの違いについて
  // ->interface オブジェクトと関数の型のみ宣言できる
  // ->type オブジェクトやプリミティブ、配列などにも宣言可能

  // interface
  // 同じ型があった場合、自動でマージされる
  interface Order {
    menu: string;
  }
  interface Order {
    count: number;
  }
  const myOrder: Order = {
    menu: '唐揚げ',
    count: 2,
  };
  // type
  // 同じ型があった場合、エラーが出る
  // マージするときは交差型を使用する
  type Color = {
    color: string;
  };
  type Price = {
    price: number;
  };
  type TShirt = Color & Price;
  const tShirt: TShirt = {
    color: 'black',
    price: 2980,
  };

  // interfaceの継承
  interface Book {
    page: number;
    title: string;
  }
  interface Magazine extends Book {
    cycle: 'daily' | 'weekly' | 'monthly' | 'yearly';
  }
  const jump: Magazine = {
    page: 300,
    title: '週刊少年ジャンプ',
    cycle: 'weekly',
  };

  // typeからもinterfaceで継承可能
  // typeからtypeへの継承はできない
  type BookType = {
    page: number;
    title: string;
  };
  interface HandBook extends BookType {
    theme: string;
  }
  const cotrip: HandBook = {
    page: 120,
    title: 'ことりっぷ',
    theme: '旅行',
  };

  // https://gist.github.com/kenmori/8cea4b82dd12ad31f565721c9c456662
  const greeting = (value: string) => 'hello!' + value;

  interface A {
    bar: string;
    baz: number;
  }
  // Aのプロパティをオプショナルに
  const A: Partial<A> = {
    bar: 'bar',
    baz: 1234,
  };

  interface B {
    name?: string;
    age?: number;
  }
  // Bのプロパティを必須に
  const B: Required<B> = {
    name: 'name',
    age: 1234,
  };

  interface C {
    name: string;
    age: number;
    brother: boolean;
  }
  // Cのプロパティからname,brotherを取得したtype
  const C: Pick<C, 'name' | 'brother'> = {
    name: 'name',
    brother: true,
  };

  interface D {
    name: string;
    age: number;
    brother: boolean;
  }
  // Dのプロパティからageを除いたtype
  const D: Omit<D, 'age'> = {
    name: 'name',
    brother: true,
  };

  // T extends X ? Y:Z
  // TがXのときはYが返る、そうでないときはZが返る
  type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
  }[keyof T];
  type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

  type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T];
  type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
  type afswe<T> = {
    [K in keyof T]: T[K];
  };

  interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart(): void;
  }
  type FPN = FunctionPropertyNames<Part>; // "updatePart"
  type NPN = NonFunctionPropertyNames<Part>; // "id" | "name" | "subparts"
  type ONP = Pick<Part, 'updatePart'>;
  type FPS = FunctionProperties<Part>; // { updatePart(newName: string): void }
  type NPS = NonFunctionProperties<Part>; // { id: number, name: string, subparts: Part[] }

  // neverは代入することができず値が存在しない
  // 値が存在しないのはvoidも同じだが、voidの場合undefinedは代入できる
  // https://typescriptbook.jp/reference/statements/never
  // const v: never = 0; 'v' is declared but its value is never read.
  const n: any = 1;
  // const e: never = n; 'v' is declared but its value is never read.
  // function func(): never {
  //   return;
  // }
  // (local function) func(): never' func' is declared but its value is never read.
  function func2(): void {
    return;
  }

  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  type CustomPick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  type Foo = CustomPick<Todo, 'title'>;

  type AA = {
    title: string;
    name: number;
    flag: boolean;
  };

  type K = keyof AA;
  // K = "title" | "name"

  type KK = {
    readonly name: number;
  };

  interface Todo {
    title: string;
    description: string;
    completed: boolean;
    meta: {
      author: string;
    };
  }

  type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
  };
  const todo: MyReadonly<Todo> = {
    title: 'fwfhwi',
    description: 'fwfhwi',
    completed: false,
    meta: {
      author: 'fwfhwi',
    },
  };

  console.log(todo.title);

  type ToAllString<T> = {
    [P in keyof T]: string;
  };

  type AllNumber = {
    hoge: number;
    fuga: number;
    piyo: number;
  };
  const toString: ToAllString<AllNumber> = {
    hoge: '21',
    fuga: '89',
    piyo: 'hoi',
  };
  toString.hoge = '12345';

  type MappedOptionalA<T> = {
    [P in keyof T]-?: T[P];
  };

  type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
  };

  type UserA = MappedOptionalA<MaybeUser>;
  // type User = {
  //   id: string;
  //   name: string;
  //   age: number;
  // }

  const UserB: { [P in keyof MaybeUser]-?: MaybeUser[P] } = {
    id: '1124',
    name: 'jweofiew',
    age: 12345,
  };

  const UserC: { readonly [P in keyof MaybeUser]: MaybeUser[P] } = {
    id: '123123',
    name: '1234',
    age: 13243,
  };

  type TupleToObject<T extends readonly any[]> = {
    [P in T[number]]: P;
  };
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;
  type result = TupleToObject<typeof tuple>;

  type First<T extends any[]> = T['length'] extends 0 ? never : T[0];

  type arr = First<['a', 'b', 'c']>;

  type MyExclude<T, U> = T extends U ? never : T;
  type IsA = MyExclude<'a' | 'b' | 'c', 'a'>;
  type IsAA = Exclude<'a' | 'b' | 'c', 'a'>;

  interface PersonA {
    firstName: string;
    lastName: string;
    age: number;
  }
  type PersonA2 = Partial<PersonA>;
  const Taro: Partial<PersonA> = {
    age: 22,
  };
  type PersonA3 = Partial<PersonA> & { from: string };
  const brian: PersonA3 = {
    from: 'Tokyo',
  };

  const f: (foo: string) => number = func;

  function func(arg: string): number {
    return Number(arg);
  }

  type aa = (foo: string) => number;
  const aaaa: aa = (foo) => {
    return Number(foo);
  };
  const bbbb = aaaa;
  aaaa('fwfwe');

  const f1: (foo: string) => number = (foo) => {
    return Number(foo);
  };
  const f2: (foo: string, bar: number) => void = f1;

  console.log(f2('1', 1));
  console.log(f1('1'));

  const changeTitle2: (foo: string) => boolean = changeTitle;
  function changeTitle(title: string): boolean {
    if (typeof title === 'string') {
      return false;
    } else {
      return true;
    }
  }

  const ww: void = undefined;
  // const qq: undefined = ww;

  interface MyObj {
    foo: string;
    bar: number;
  }
  interface MyObj2 {
    foo: string;
  }
  const a: (obj: MyObj2) => void = () => {};
  const b: (obj: MyObj) => void = a;
  // a({ foo: 'fwf' });
  // b({ foo: 'fwf' });

  interface PersonB {
    firstName?: string;
    lastName?: string;
  }

  interface FJO<S, T> {
    foo: S;
    bar: T;
  }

  const fjo: FJO<number, string> = {
    foo: 3,
    bar: 'fe',
  };

  type jweo = [number, string?];
  // type jweo2 = [number?, string]

  // type Args = [string, number, boolean];
  // const fje = (...args: Args) => args[1];
  // const v = fje('foo', 2, true);
  // console.log('v:' + v);

  type Args = [string, ...number[]];
  const jfowe = (f: string, ...args: Args) => args[0];
  console.log(jfowe('foo', 'fojwifw'));
  console.log(jfowe('fojwefijw', 'fwjoefwe', 1, 2, 3));

  const foef: Required<PersonB> = {
    firstName: 'hwfjeoi',
    lastName: 'fjwoeifw',
  };
  type deleteOptional<T> = {
    [K in keyof T]-?: T[K];
  };
  // const foerj: deleteOptional<PersonB> = {
  //   firstName: 'hfwihef',
  //   lastName: 'hishfiew',
  // };
  type StringNumber = Record<string, number>;
  const value: StringNumber = { a: 1, b: 2, c: 3 };

  type asdf = Record<number, string>;
  const asdgg: asdf = { '1': 'few', '2': 'few', '3': 'few' };

  const fjfi = (str: string, num: number, b: boolean) => args[0] + args[1];
  const args: [string, number, boolean] = ['foo', 3, true];
  console.log(fjfi(...args));

  interface Hogefjwe {
    foo: string;
    bar: number;
  }
  interface Piyofwoi {
    foo: number;
    baz: boolean;
  }

  type fjweo = Hogefjwe | Piyofwoi;

  function getHoge(obj: fjweo): string | number {
    return obj.foo;
  }

  console.log(getHoge({ foo: '1fwwefwe', bar: 2 }));

  const jfwo: () => void = () => {
    declare const fwoeif: never;
  };

  type jiji = [string, ...number[]];
  const fufu = (f: string, ...argsff: jiji) => argsff;
  console.log(fufu('fo', 'fw', 1, 111, 1));

  interface PersonC {
    name: string;
  }
  type PersonList = Record<number, PersonC>;
  const list: PersonList = { 0: { name: 'Taro' }, 1: { name: 'Jiro' } };

  interface PersonD {
    firstName: string;
    lastName: string;
    age: number;
  }

  const tom: Pick<PersonD, 'firstName' | 'lastName'> = {
    firstName: 'fjweofi',
    lastName: 'fjwoefjowi',
  };
  type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  type wfjoweif = MyPick<PersonD, 'firstName' | 'lastName'>;

  const sally: MyPick<PersonD, 'firstName' | 'lastName'> = {
    firstName: 'jorfjweoi',
    lastName: 'fwjeofiwej',
  };

  interface TypeA {
    id: number;
    name: string;
  }
  interface TypeB {
    id: number;
    address: string;
  }
  // Exclude->かぶってないやつ,全部かぶってればnever
  type ExcludedType = Exclude<keyof TypeA, keyof TypeB>;
  type ExcludedType2 = Exclude<string, string>;
  type ExcludedType3 = Exclude<string, number>;
  type ExcludedType4 = Exclude<string | number | boolean, string | boolean>;

  interface TypeA {
    id: number;
    name: string;
  }
  interface TypeB {
    id: number;
    address: string;
  }
  // Extract->かぶってるやつ,全部かぶってなければnever
  type ExtractedType = Extract<keyof TypeA, keyof TypeB>;
  type ExtractedType2 = Extract<string, number>;
  type ExtractedType3 = Extract<string, string>;
  type ExtractedType4 = Extract<string | number | boolean, string | boolean>;

  console.log('null == undefined', null == undefined);
  console.log("null == ''", null == '');
  const foo = (arg: string | null | undefined) => {
    if (arg != null) {
      console.log(arg);
    }
  };

  const fooo = (): { a: number; b?: number } => {
    return { a: 1 };
  };
  console.log(fooo());

  const hasName = 12345678;
  console.log(hasName);
  console.log(!!hasName);

  return (
    <main className={styles.App}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="marubatsu-game" element={<MarubatsuGame />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;

const Top = () => {
  const link = linkList.map(({ path, link }) => (
    <div className={styles.App_header}>
      <img src={logo} className={styles.App_logo} alt="logo" />
      <Link className={styles.App_link} to={path}>
        {link}
      </Link>
    </div>
  ));

  return <div>{link}</div>;
};
