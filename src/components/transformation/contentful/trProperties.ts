import { IProperty } from "../../../types/cf-types";
import { IescProperty } from "../../../types/esc-types";

export const parseProperties = (properties:IProperty[]): IescProperty[] => {
    const propertiesItems = properties.items
    const propertiesList: IescProperty[] = propertiesItems.map((item) => {
        return {
            name: item.fields.name,
            value: item.fields?.value || ""
        }
    })
    return propertiesList;
}
