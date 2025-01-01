export const parseLocales = (locales): ILocales[] => {
      const indexedLocales = locales.items.map((item, index) => {
          return {
              index: index,
              code: item.code || "",
              name: item.name || "",
              default: item.default
          }
      })

    return indexedLocales;
}
