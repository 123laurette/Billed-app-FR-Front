/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom"
import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"

//******************************************************** */
//                CONTINUER LE CODE 
//********************************************************* */

describe("Given I am connected as an employee", () => {
  describe("je clique sur le bouton nouvelle note de frais", () => {
    test("un formulaire de saisie apparait", () => {

    })
  })


  describe("je suis sur une nouvelle facture et je clique sur type de dépense", () => { 
    test("Then une liste déroulante s'ouvre", () => {


    })
  })


  describe("je suis sur une nouvelle facture et je clique sur le calendrier", () => {
    test ("je choisis une date", () => {

    })
  })
  
  describe("je suis sur une nouvelle facture et je ne choisi pas de date", () => {
    test ("un message apparait", () => {

    })
  })

  describe("je suis sur une nouvelle facture et je ne rempli pas le champ TTC", () => {
    test ("un message apparait", () => {

    })
  })

  describe("je suis sur une nouvelle facture et je rempli le champ TTC avec une virgule", () => {
    test ("un message apparait", () => {

    })
  })



})






describe("Given I am connected as an employee", () => { //je suis connectée en tant qu'employée
  describe("When I am on NewBill Page", () => { //je suis sur une nouvelle facture
    test("Then ...", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
    })
  })
})
