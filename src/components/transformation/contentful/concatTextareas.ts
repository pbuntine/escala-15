// TODO: Error handling
// Used for CSS and Scripts to create an importable list of all entries.
import { NameTextareas } from "../../../types/esc-types";


export const concatTextareas = (nameTextareas: NameTextareas): string => {
  // let nameTextareasItems = nameTextareas.items
  const nameTextareasList = nameTextareas.items.map((item) => {
      return {
          name: item.fields.name,
          textarea: item.fields?.textarea || ""
      }
  })

  // if (!nameTextareasList) return {name: "concatedTextareas", value: null};

  const value = nameTextareasList.map((nameTextareasList) => nameTextareasList.textarea || '').join('\n');
  return value
}
