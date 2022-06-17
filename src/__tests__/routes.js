/**
 * @jest-environment jsdom
 */

import { ROUTES, ROUTES_PATH } from "../constants/routes"
import { screen } from "@testing-library/dom"

const data = []
const loading = false
const error = null

// *************************************test sur la bonne direction de chaque page****************************************

describe('Given I am connected and I am on some page of the app', () => { //etant donné que je suis connecté et que je suis sur une page de l'application
  describe('When I navigate to Login page', () => { //lorsque je navigue vers la page de connexion
    test(('Then, it should render Login page'), () => { //devrait rester sur la page de connexion
      const pathname = ROUTES_PATH['Login']
      const html = ROUTES({
        pathname,
        data,
        loading,
        error
      })
        document.body.innerHTML = html
        expect(screen.getAllByText('Administration')).toBeTruthy()
    })
  })
  describe('When I navigate to Bills page', () => { //lorsque j'accede à la page factures
    test(('Then, it should render Bills page'), () => { //devrait rester sur la page facture
      const pathname = ROUTES_PATH['Bills']
      const html = ROUTES({
        pathname,
        data,
        loading,
        error
      })
      document.body.innerHTML = html
      expect(screen.getAllByText('Mes notes de frais')).toBeTruthy()
    })
  })
  describe('When I navigate to NewBill page', () => { //lorsque je navigue vers la page Nouvelle facture
    test(('Then, it should render NewBill page'), () => { //devrait rester sur la page nouvelle facture
      const pathname = ROUTES_PATH['NewBill']
      const html = ROUTES({
        pathname,
        data,
        loading,
        error
      })
      document.body.innerHTML = html
      expect(screen.getAllByText('Envoyer une note de frais')).toBeTruthy()
    })
  })
  describe('When I navigate to Dashboard', () => {  //lorsque je navigue sur le tableau de bord
    test(('Then, it should render Dashboard page'), () => { //devrait rester sur la page du tableau de bord
      const pathname = ROUTES_PATH['Dashboard']
      const html = ROUTES({
        pathname,
        data,
        loading,
        error
      })
      document.body.innerHTML = html
      expect(screen.getAllByText('Validations')).toBeTruthy()
    })
  })
  describe('When I navigate to anywhere else other than Login, Bills, NewBill, Dashboard', () => {  //lorsque je navigue vers un autre endroit que connexion, facture, nouvelle facture et tableau de bord
    test(('Then, it should render Login page'), () => {  //devrait rester sur la page de connexion
      const pathname = '/anywhere-else'
      const html = ROUTES({
        pathname,
        data,
        loading,
        error
      })
      document.body.innerHTML = html
      expect(screen.getAllByText('Administration')).toBeTruthy()
    })
  })
})
