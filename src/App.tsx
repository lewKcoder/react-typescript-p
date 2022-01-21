import React from "react";
import logo from "./logo.svg";
import "./App.css";

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
    menu: "唐揚げ",
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
    color: "black",
    price: 2980,
  };

  // interfaceの継承
  interface Book {
    page: number;
    title: string;
  }
  interface Magazine extends Book {
    cycle: "daily" | "weekly" | "monthly" | "yearly";
  }
  const jump: Magazine = {
    page: 300,
    title: "週刊少年ジャンプ",
    cycle: "weekly",
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
    title: "ことりっぷ",
    theme: "旅行",
  };

  // https://gist.github.com/kenmori/8cea4b82dd12ad31f565721c9c456662
  const greeting = (value: string) => "hello!" + value;

  interface A {
    bar: string;
    baz: number;
  }
  // Aのプロパティをオプショナルに
  const A: Partial<A> = {
    bar: "bar",
    baz: 1234,
  };

  interface B {
    name?: string;
    age?: number;
  }
  // Bのプロパティを必須に
  const B: Required<B> = {
    name: "name",
    age: 1234,
  };

  interface C {
    name: string;
    age: number;
    brother: boolean;
  }
  // Cのプロパティからname,brotherを取得したtype
  const C: Pick<C, "name" | "brother"> = {
    name: "name",
    brother: true,
  };

  interface D {
    name: string;
    age: number;
    brother: boolean;
  }
  // Dのプロパティからageを除いたtype
  const D: Omit<D, "age"> = {
    name: "name",
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
  type ONP = Pick<Part, "updatePart">;
  type FPS = FunctionProperties<Part>; // { updatePart(newName: string): void }
  type NPS = NonFunctionProperties<Part>; // { id: number, name: string, subparts: Part[] }

  // neverは代入することができず値が存在しない
  // 値が存在しないのはvoidも同じだが、voidの場合undefinedは代入できる
  // https://typescriptbook.jp/reference/statements/never
  const v: never = 0;
  const n: any = 1;
  const e: never = n;
  function func(): never {
    return;
  }
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

  type Foo = CustomPick<Todo, "title">;

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

  const kk: KK = "1234";

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
    title: "fwfhwi",
    description: "fwfhwi",
    completed: false,
    meta: {
      author: "fwfhwi",
    },
  };

  todo.title = "wjofie";

  type ToAllString<T> = {
    [P in keyof T]: string;
  };

  type AllNumber = {
    hoge: number;
    fuga: number;
    piyo: number;
  };
  const toString: ToAllString<AllNumber> = {
    hoge: "21",
    fuga: "89",
    piyo: "hoi",
  };
  toString.hoge = 12345;

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
    age: 12345,
  };

  const UserC: { readonly [P in keyof MaybeUser]: MaybeUser[P] } = {
    id: "123123",
    name: "1234",
    age: 13243,
  };
  UserC.id = "131124";

  type TupleToObject<T extends readonly any[]> = {
    [P in T[number]]: P;
  };
  const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
  type result = TupleToObject<typeof tuple>;

  type First<T extends any[]> = T["length"] extends 0 ? never : T[0];

  type arr = First<["a", "b", "c"]>;

  type MyExclude<T, U> = T extends U ? never : T;
  type IsA = MyExclude<"a" | "b" | "c", "a">;
  type IsAA = Exclude<"a" | "b" | "c", "a">;

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
    from: "Tokyo",
  };

  interface PersonB {
    firstName?: string;
    lastName?: string;
  }

  const foef: Required<PersonB> = {
    firstName: "hwfjeoi",
  };
  type deleteOptional<T> = {
    [K in keyof T]-?: T[K];
  };
  const foerj: deleteOptional<PersonB> = {
    firstName: "hfwihef",
  };

  interface PersonC {
    name: string;
  }
  type PersonList = Record<number, PersonC>;
  const list: PersonList = { 0: { name: "Taro" }, 1: { name: "Jiro" } };

  interface PersonD {
    firstName: string;
    lastName: string;
    age: number;
  }

  const tom: Pick<PersonD, "firstName" | "lastName"> = {
    firstName: "fjweofi",
    lastName: "fjwoefjowi",
  };
  type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  type wfjoweif = MyPick<PersonD, "firstName" | "lastName">;

  const sally: MyPick<PersonD, "firstName" | "lastName"> = {
    firstName: "jorfjweoi",
    lastName: "fwjeofiwej",
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
