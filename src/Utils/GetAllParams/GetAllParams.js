export const getAllParams = (searchParams) => {
  let params = [];
  const queryArray = Array.from(searchParams.entries());
  for (let [key, value] of queryArray) {
    const [queryType, field] = key.split("_");
    if (queryType === "where") {
      if (value.includes("_")) {
        const [basedValue, operator] = value.split("_");
        params.push({
          queryType,
          field,
          value:
            (basedValue.startsWith("[") && basedValue.endsWith("]")) ||
            (basedValue.startsWith("{") && basedValue.endsWith("}"))
              ? JSON.parse(basedValue)
              : basedValue,
          operator: operator.split("=")[1].replace(/"/g, ""),
        });
      } else {
        if (field === "searchQuery") {
          params = [
            ...params,
            {
              queryType,
              field: "title",
              value,
              operator: ">=",
            },
            {
              queryType,
              field: "title",
              value: value + "\uf8ff",
              operator: "<=",
            },
          ];
        } else {
          params.push({
            queryType,
            field,
            value:
              (value.startsWith("[") && value.endsWith("]")) ||
              (value.startsWith("{") && value.endsWith("}"))
                ? JSON.parse(value)
                : value,
            operator: "==",
          });
        }
      }
    } else if (queryType === "orderBy") {
      params.push({
        queryType,
        field,
        direction: value,
      });
    }
  }
  return params;
};
