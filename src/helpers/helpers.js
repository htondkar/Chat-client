export function appendToFormData(values) {
  let formData = new FormData()

  for (let field in values) {
    if (values[field] !== undefined && values[field] !== null) {
      formData.append(field, values[field])
    }
  }
  
  return formData
}
