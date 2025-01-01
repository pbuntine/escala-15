export function transformPropertyEntry(entry: IProperty) {
  const propertyEntry = {
    // reactComponentPath:
    //   entry.fields.renderer?.fields?.reactComponentPath || null,
    id: entry.sys.id,
    contentType: entry.sys.contentType.sys.id,
    propertyName: entry.fields?.name,
    propertyValue: entry.fields?.value,
  };
  return propertyEntry;
}
