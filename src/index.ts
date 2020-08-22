function component() {
  const element = document.createElement('div')

  element.innerHTML = 'TEST'

  return element
}

document.body.appendChild(component())