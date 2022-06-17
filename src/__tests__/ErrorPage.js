/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import ErrorPage from "../views/ErrorPage.js"

//****************************************test sur la connexion internet pour le chargement des pages***********************************


describe('Given I am connected on app (as an Employee or an HR admin)', () => { //je suis connectée sur l'application en tant qu'employée ou admiin
  describe('When ErrorPage is called without and error in its signature', () => { //la page d'erreur est appelée sans erreur dans sa signature
    test(('Then, it should render ErrorPage with no error message'), () => {  //devrait retourner la page d'erreur sans message d'erreur
      const html = ErrorPage()
      document.body.innerHTML = html
      expect(screen.getAllByText('Erreur')).toBeTruthy()
      expect(screen.getByTestId('error-message').innerHTML.trim().length).toBe(0)
    })
  })
  describe('When ErrorPage is called with error message in its signature', () => {  //la page d'erreur est appelée avec une erreur dans sa signature
    test(('Then, it should render ErrorPage with its error message'), () => { //devrait retourner la page d'erreur avec un message d'erreur
      const error = 'Erreur de connexion internet'
      const html = ErrorPage(error)
      document.body.innerHTML = html
      expect(screen.getAllByText(error)).toBeTruthy()
    })
  })
})
