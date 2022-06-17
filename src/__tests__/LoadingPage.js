/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import LoadingPage from "../views/LoadingPage.js"

//*************************************test sur le chargement de la page****************************


describe('Given I am connected on app (as an Employee or an HR admin)', () => { //je suis connectée à l'application en tant qu'employée ou admin
  describe('When LoadingPage is called', () => {  //lorsque la page de chargement est appelée
    test(('Then, it should render Loading...'), () => { //devrait être en chargement
      const html = LoadingPage()
      document.body.innerHTML = html
      expect(screen.getAllByText('Loading...')).toBeTruthy()
    })
  })
})
