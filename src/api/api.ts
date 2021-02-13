import { MockOptions } from "fetch-mock";

import * as Planets from "./planets/types";
import * as Residents from "./residents/types";

import * as planets from "./planets";
import * as residents from "./residents";

export { planets };
export { residents };
export { Planets };
export { Residents };

export function fetchMockConfig(config?: Omit<MockOptions, "method">) {
  return {
    delay: 500,
    // overwriteRoutes: true,
    ...(config != null ? config : {}),
  };
}
