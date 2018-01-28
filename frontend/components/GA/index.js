import ReactGA from 'react-ga'

export const initGA = () => {
  ReactGA.initialize(process.env.GA)
}

export const logPageView = (documentPath) => {
  if (documentPath) {
    ReactGA.set({ page: documentPath })
    ReactGA.pageview(documentPath)
  }
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
