import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";

import Root from "Root";
import App from "components/App";

beforeEach(() => {
  moxios.install();
  moxios.stubRequest("http://jsonplaceholder.typicode.com/comments", {
    status: 200,
    response: [{ name: "fetch #1" }, { name: "fetch #2" }]
  });
});
afterEach(() => {
  moxios.uninstall();
});
test("can fetch a list of comments and display them", done => {
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );
  wrapped.find(".fetch-comment").simulate("click");
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find("li").length).toEqual(2);
    done();
    wrapped.unmount();
  });
});
