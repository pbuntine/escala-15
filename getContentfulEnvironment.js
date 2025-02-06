const contentful = require("contentful-management");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.development" });

// You must add the following environment variables to your os or .env file: CMS_MGT_KEY, NEXT_PUBLIC_CONTENTFUL_SPACE_ID, NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT")
// console.log("process.env", process.env);

const {
  CMS_MGT_KEY,
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
} = process.env;

module.exports = async function getContentfulEnvironment() {
  const client = contentful.createClient({
    accessToken: CMS_MGT_KEY,
  });

  const space = await client.getSpace(NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment(
    NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT
  );

  return environment;
};
