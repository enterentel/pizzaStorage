
 import { mount } from "@vue/test-utils";
 import App from "..src/page";

describe('App', () => {
  test('component was added', () => {
    const wrapper = mount(App);
    expect(wrapper.find("select").isVisible()).toBe(false);
  });
});
