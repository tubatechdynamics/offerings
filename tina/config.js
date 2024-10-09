import { defineConfig as defineConfig } from "tinacms";

const branch = process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const config = {
  token: process.env.TINA_TOKEN,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch,
  isLocal,
  build: {
    outputFolder: "admin",
    publicFolder: "_site",
  },
  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "_site",
    },
  },
  schema: {
    collections: [
      {
        name: "pages",
        label: "Pages",
        path: "src",
        match: {
          include: "{*,resources/*}",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "meta_title",
            label: "Meta Title",
            required: false,
          },
          {
            type: "string",
            name: "meta_description",
            label: "Meta Description",
            required: false,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            list: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "image",
            name: "featured_image",
            label: "Featured Image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "post",
        label: "Posts",
        path: "src/_posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "meta_title",
            label: "Meta Title",
            required: false,
          },
          {
            type: "string",
            name: "meta_description",
            label: "Meta Description",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: '2a56e5b20d5e0fc9eabcb429d242603efb39799a',
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
};
export default defineConfig(config);
