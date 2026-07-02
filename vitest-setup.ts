import { afterEach, afterAll, beforeEach } from "vitest";
// import { cleanup } from '@testing-library/react'
// import '@testing-library/jest-dom/vitest';
import "@testing-library/jest-dom";
// import matchers from '@testing-library/jest-dom/matchers';

import { toHaveNoViolations } from "jest-axe";
import { server } from "./src/mocks/node";

expect.extend(toHaveNoViolations);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
