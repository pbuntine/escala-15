import { transformEntries } from "./trEntries";
import { ITemplate } from "../../types/cf-types";
import { IescTemplate } from "../../types/esc-types";
import { fetchCFJSON } from "../../extraction/contentful/fetchCFData";

// Incase you want to create an array of all templates (for reduced calls)...
// This is not currently used.
// const objTemplates: ITemplate[] = await fetchCFJSON({
//   contentType: "template",
//   limit: 100,
//   include: 5,
// });
// const templateLocaleLookupTable = parseTemplates(objTemplates);
// const thisTemplate = templateLocaleLookupTable.find(
//   (item) => item.id === thisPageDetails.pageTemplateID
// );
export const parseTemplates = (props: ITemplate[]): IescTemplate[] => {
  const templateList = props.items?.map((item) => {
    return parseTemplate(item);
  });
  return templateList;
};

export const parseTemplate = (template: ITemplate): IescTemplate => {

  let headerEntries = [];
  if (template.fields?.headerEntries?.length) {
    headerEntries = transformEntries(template.fields?.headerEntries);
  }

  let footerEntries = [];
  if (template.fields?.footerEntries?.length) {
    footerEntries = transformEntries(template.fields?.footerEntries);
  }

  let parsedEntries = [];
  if (template.fields?.entries?.length) {
    parsedEntries = transformEntries(template.fields?.entries);
  }

  return {
    reactComponentPath: template.fields?.reactComponentPath || "",
    id: template.sys.id,
    name: template.fields.name,
    HeaderEntries: headerEntries || null,
    FooterEntries: footerEntries || null,
    entries: parsedEntries || null,
    acl: template.fields?.acl || "",
    className: template.fields?.className || "",
  };
};

export const transformTemplate = async (pageTemplateID) => {
  const objTemplate: ITemplate = await fetchCFJSON({
    contentType: "template",
    limit: 1,
    include: 6,
    sys_id: pageTemplateID,
  });

  const templateDetails = parseTemplate(objTemplate.items[0]);

  return templateDetails;
};
