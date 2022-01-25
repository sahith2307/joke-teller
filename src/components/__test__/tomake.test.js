/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React, { useState as useStateSpy } from "react";
import userEvent from "@testing-library/user-event";
import JokeTeller from "../jokeTeller";
import {
  fireEvent,
  getByRole,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./../../App";
describe("abc", () => {
  const Mock = () => {
    return <App />;
  };

  test("async", async () => {
    render(<Mock />);
    await waitFor(
      async () => {
        const e = await screen.findByTestId("nsfw");
        expect(e).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
  test("search", () => {
    render(<App />);
    const search = screen.getByTestId("contains");
    expect(search).toBeInTheDocument();
    fireEvent.change(search, { target: { value: "abc" } });
    expect(search.value).toEqual("abc");
  });
  describe("low", () => {
    test("low", () => {
      render(<App />);
      const low = screen.getByTestId("lowRange");
      expect(low).toBeInTheDocument();
      fireEvent.change(low, { target: { value: "1" } });
      expect(low.value).toEqual("1");
      const api = screen.getByTestId("api");
      expect(api.textContent).toContain("1");
    });
  });
  describe("high", () => {
    test("high", () => {
      render(<App />);
      const high = screen.getByTestId("highRange");
      expect(high).toBeInTheDocument();
      fireEvent.change(high, { target: { value: "7" } });
      expect(high.value).toEqual("7");
      const api = screen.getByTestId("api");
      expect(api.textContent).toContain("7");
    });
  });
  describe("amount", () => {
    test("amount", () => {
      render(<App />);
      const amount = screen.getByTestId("amount");
      expect(amount).toBeInTheDocument();
      fireEvent.change(amount, { target: { value: "9" } });
      expect(amount.value).toEqual("9");
      const api = screen.getByTestId("api");
      expect(api.textContent).toContain("9");
    });
  });
  describe("cat", () => {
    test("async", async () => {
      render(<Mock />);
      await waitFor(
        async () => {
          const e = await screen.findByTestId("Spooky-id");
          expect(e).toBeInTheDocument();
          fireEvent.change(e, { target: { checked: true } });
          expect(e.checked).toEqual(true);
        },
        { timeout: 6000 }
      );
    });
  });
  describe("categories", () => {
    test("any", () => {
      render(<Mock />);
      const any = screen.getByTestId("any");
      expect(any).toBeInTheDocument();
      expect(any.checked).toEqual(true);
      fireEvent.click(any);
      expect(any.checked).toEqual(true);
      const api = screen.getByTestId("api");
      expect(api.textContent).toContain("Any");
    }, 10000);
    test("custom", () => {
      render(<Mock />);
      const custom = screen.getByTestId("custom");
      expect(custom).toBeInTheDocument();
      expect(custom.checked).toEqual(false);
      fireEvent.click(custom);
      expect(custom.checked).toEqual(true);
      const api = screen.getByTestId("api");
      expect(api.textContent).not.toContain("Any");
    });
  });
  describe("languages", () => {
    const languages = ["en", "cs", "de", "pt", "es", "fr"];
    languages.map((eachLanguage) => {
      test("languages", () => {
        render(<Mock />);
        const language = screen.getByTestId("languages");
        expect(language).toBeInTheDocument();
        fireEvent.change(language, { target: { selected: eachLanguage } });
        expect(language.selected).toEqual(eachLanguage);
      });
    });
  });
  describe("type", () => {
    test("type", async () => {
      render(<Mock />);
      await waitFor(
        async () => {
          const type = await screen.findByTestId("single");
          fireEvent.click(type);
          expect(type.value).toEqual("single");
        },
        { timeout: 5000 }
      );
      const api = screen.getByTestId("api");
      expect(api.textContent).not.toContain("single");
    }, 10000);
  });
  describe("change", () => {
    test("type", async () => {
      render(<Mock />);
      let type;
      let e;
      const custom = screen.getByTestId("custom");
      fireEvent.click(custom);
      await waitFor(
        async () => {
          e = await screen.findByTestId("Spooky-id");
          type = await screen.findByTestId("api");
        },
        { timeout: 5000 }
      );

      fireEvent.click(e);
      expect(e.checked).toEqual(true);
      expect(type.textContent).toContain("Spooky");
    }, 10000);
  });
});
