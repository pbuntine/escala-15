const contentful = require("contentful-management");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.development.local" });

const {
  CMS_MANAGEMENT,
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
} = process.env;

module.exports = async function getContentfulEnvironment() {
  const client = contentful.createClient({
    accessToken: CMS_MANAGEMENT,
  });

  const space = await client.getSpace(NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment(
    NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT
  );

  return environment;
};
