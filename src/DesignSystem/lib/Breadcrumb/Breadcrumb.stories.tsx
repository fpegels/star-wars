import { Breadcrumb } from ".";
import { withKnobs } from "@storybook/addon-knobs";
import { BrowserRouter } from "react-router-dom";

const BreadcrumbStories = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  decorators: [withKnobs],
};

export default BreadcrumbStories;

const links = [
  {
    url: "/planets/",
    id: "0",
    name: "Planets",
  },
  {
    url: "/planets/1/",
    id: "1",
    name: "Homeworld",
  },
];

export function Default() {
  return (
    <BrowserRouter>
      <Breadcrumb links={links} />
    </BrowserRouter>
  );
}
