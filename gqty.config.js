/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const config = {
  react: true,
  scalarTypes: { DateTime: "string" },
  introspection: {
    endpoint: "http://localhost:2000/",
    headers: {},
  },
  destination: "gqty/index.ts",
  subscriptions: false,
  javascriptOutput: false,
  
};

module.exports = config;
