/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import Actions from "../views/Actions.js"
import '@testing-library/jest-dom/extend-expect'


describe('Given I am connected as an Employee', () => { //je suis connectée en tant qu'employée
  describe('When I am on Bills page and there are bills', () => { //je suis sur la page des factures et il y a des factures
    test(('Then, it should render icon eye'), () => { //devrait retourner l'icone oeil
      const html = Actions()
      document.body.innerHTML = html
      expect(screen.getByTestId('icon-eye')).toBeTruthy()
    })
  })
  describe('When I am on Bills page and there are bills with url for file', () => { //je suis sur la page des factures et il y a des factures avec l'URL du fichier
    test(('Then, it should save given url in data-bill-url custom attribute'), () => {  //doit enregistrer l'URL donnée dans l'attribut personnalisé data-bill-url
      const url = '/fake_url'
      const html = Actions(url)
      document.body.innerHTML = html
      expect(screen.getByTestId('icon-eye')).toHaveAttribute('data-bill-url', url)
    })
  })
})
