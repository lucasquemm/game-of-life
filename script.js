const linhas = 50
const colunas = 50

const geraCelula = () => {
  return Math.random() > 0.5 ? 0 : 1
}

let gridao = Array.from({ length: linhas }, () =>
  Array.from({ length: colunas }, geraCelula)
)

const vizinhos = (celulaX, celulaY) => {
  return [
    getCelula(celulaX - 1, celulaY - 1),
    getCelula(celulaX - 1, celulaY),
    getCelula(celulaX - 1, celulaY + 1),
    getCelula(celulaX, celulaY - 1),
    getCelula(celulaX, celulaY + 1),
    getCelula(celulaX + 1, celulaY - 1),
    getCelula(celulaX + 1, celulaY),
    getCelula(celulaX + 1, celulaY + 1),
  ].filter((celula) => celula == 1).length
}

const getCelula = (x, y) => {
  if (x < 0 || y < 0 || x >= linhas || y >= colunas) {
    return 0
  }
  return gridao[x][y]
}

const atualiza = () => {
  gridao = gridao.map((linha, celulaX) =>
    linha.map((celula, celulaY) => {
      if (celula == 1 && vizinhos(celulaX, celulaY) < 2) {
        return 0
      }
      if (celula == 1 && vizinhos(celulaX, celulaY) > 3) {
        return 0
      }
      if (celula == 0 && vizinhos(celulaX, celulaY) == 3) {
        return 1
      }
      return celula
    })
  )
}

const loop = () => {
  atualiza()
  renderiza()
  setTimeout(loop, 100)
}

const tela = document.querySelector('.tela')
const botao = document.querySelector('.botao')

const renderiza = () => {
  tela.textContent = gridao
    .map(
      (linha, indice) =>
        indice + linha.map((celula) => (celula == 0 ? '⬜' : '⬛')).join('')
    )
    .join('\n')
}

loop()
