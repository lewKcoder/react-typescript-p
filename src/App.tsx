import React from 'react';
import logo from './logo.svg';
import './App.css';

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

  type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
  }[keyof T];
  type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
  type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T];
  type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
  interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart(): void;
  }
  type T40 = FunctionPropertyNames<Part>; // "updatePart"
  type T41 = NonFunctionPropertyNames<Part>; // "id" | "name" | "subparts"
  type T42 = FunctionProperties<Part>; // { updatePart(newName: string): void }
  type T43 = NonFunctionProperties<Part>; // { id: number, name: string, subparts: Part[] }

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
