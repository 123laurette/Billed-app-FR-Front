/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom"
import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import BillsUI from "../views/BillsUI.js" //endroit ou se trouve sur btn_new-bill
import NewBill from "../containers/NewBill.js"
import { ROUTES_PATH} from "../constants/routes.js";//j'importe la const routes_path
import {localStorageMock} from "../__mocks__/localStorage.js";//j'importe la const localstoragemock

//******************************************************** */
//                CONTINUER LE CODE 
//********************************************************* */

describe("Given I am connected as an employee", () => {
  describe("je suis sur une nouvelle facture et je ne rempli pas le champ TTC", () => {
    test ("un message apparait", () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      
      const html = NewBillUI          //crea const qui represente le formulaire
      document.body.innerHTML = html
      const ttc = screen.getByTestId("amount");
      expect(ttc.value).toEqual("");
      document.body.innerHTML = html({ error : "veuillez remplir ce champ"})      
    })
  })





  describe("quand je clique sur le bouton nouvelle note de frais", () => {
    test("Alors un formulaire de saisie apparait", () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const html = NewBillUI          //crea const qui represente le formulaire
      document.body.innerHTML = html
      const btn = BillsUI             //crea const qui represente l'endroit du btn
      document.body.innerHTML = btn
      
      const btnNewBill = screen.getByTestId("btn-new-bill");  //cible le btn
      const ouvreNewBill = jest.fn((e) => e.style.display = Block); //simule la fonction et le display block

      fireEvent.click(btnNewBill);  //simule l'evenement

      btnNewBill.addEventListener("click", ouvreNewBill);// evt au click sur le btn et prise en compte de la fonction

      expect(html).toEqual(html); //la simulation doit donner la newbill
    })
  })


  describe("quand je suis sur une nouvelle facture et que je clique sur type de dépense", () => { 
    test("Alors une liste déroulante s'ouvre", () => {

      const html = NewBillUI          //crea const qui represente le formulaire
      document.body.innerHTML = html

      const depense = screen.getByTestId("expense-type");
      const openListe = jest.fn((e) => e.style.display = block);
      fireEvent.click(depense);
      depense.addEventListener("click", openListe);
      expect(depense).toBeTruthy();

    })
  })


  describe("je suis sur une nouvelle facture et je clique sur le calendrier", () => {
    test ("je choisis une date", () => {

      const html = NewBillUI          //crea const qui represente le formulaire
      document.body.innerHTML = html

      const calendrier = screen.getByTestId ("datepicker");
      const openCalendrier = jest.fn((e) => e.style.display = block);
      fireEvent.click(calendrier);
      calendrier.addEventListener("click", openCalendrier);
      expect(calendrier).toBeTruthy();
    })
  })
  
  describe("je suis sur une nouvelle facture et je ne choisi pas de date", () => {
    test ("un message apparait", () => {
      const html = NewBillUI          //crea const qui represente le formulaire
      document.body.innerHTML = html
      const calendrier = screen.getByTestId ("datepicker");
      expect(calendrier.value).toBe("");
      document.body.innerHTML = NewBillUI({ error : "veuillez remplir ce champ"});

    })
  })

  

  describe("je suis sur une nouvelle facture et je rempli le champ TTC avec une virgule", () => {
    test ("un message apparait", () => {

    })
  })



})





