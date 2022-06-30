/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom"
import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import Bills from "../containers/Bills.js" //endroit ou se trouve evt sur btn_new-bill
import NewBill from "../containers/NewBill.js"

//******************************************************** */
//                CONTINUER LE CODE 
//********************************************************* */

describe("Given I am connected as an employee", () => {
  describe("je clique sur le bouton nouvelle note de frais", () => {
    test("un formulaire de saisie apparait", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      
      const btnNewBill = screen.getByTestId("btn-new-bill");  //cible le btn
      const newBill = screen.getByTestId("root"); //cible la NewBill
      const ouvreNewBill = jest.fn((e) => e.display = Block); //simule le click et le display block
      btnNewBill.addEventListener("click", ouvreNewBill);// evt au click sur le btn
      expect(ouvreNewBill).toBe(newBill); //la simulation doit donner la newbill


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
