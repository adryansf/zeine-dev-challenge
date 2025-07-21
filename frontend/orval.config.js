module.exports = {
  api: {
    output: {
      mode: "tags-split",
      target: "src/orval/api.ts",
      client: "react-query",
      override: {
        mutator: {
          path: "src/lib/axios.ts",
          name: "customInstance",
        },
      },
    },
    input: {
      target: "http://localhost:3000/docs/yaml",
    },
  },
};
