export function appendToFormData(values) {
  let formData = new FormData()

  for (let field in values) {
    if (values[field] !== undefined && values[field] !== null) {
      formData.append(field, values[field])
    }
  }

  return formData
}

export const runIfResIsOk = (onSuccess, onFail) => res => {
  if (res.status < 400) {
    onSuccess(res)
  } else {
    onFail(res)
  }
}
