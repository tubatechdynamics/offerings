import { defineConfig as defineConfig, LocalAuthProvider as LocalAuthProvider } from "tinacms";
import { TinaUserCollection as TinaUserCollection, DefaultAuthJSProvider as DefaultAuthJSProvider, UsernamePasswordAuthJSProvider as UsernamePasswordAuthJSProvider } from "tinacms-authjs/dist/tinacms";

const branch = process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const config = {
  branch,
  isLocal,
  build: {
    outputFolder: "admin",
    publicFolder: "_site",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "_site/assets",
    },
  },
  contentApiUrlOverride: "/api/tina/gql",
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new DefaultAuthJSProvider(),
  schema: {
    collections: [
      TinaUserCollection,
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
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
};
export default defineConfig(config);
