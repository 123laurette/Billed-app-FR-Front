/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom"
import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import BillsUI from "../views/BillsUI.js" //endroit ou se trouve sur btn_new-bill

import {localStorageMock} from "../__mocks__/localStorage.js";//j'importe la const localstoragemock

//******************************************************** */
//                CONTINUER LE CODE 
//********************************************************* */

describe("Given I am connected as an employee", () => {
  describe("je suis sur une nouvelle facture et je ne rempli pas les champs date, TTC et fichier joint", () => {
    test ("la note de frais reste à l'écran et un message apparait", () => {

      //je suis connecté en tant qu'employée
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      
  //*******************EXEMLE SUIVI, test/Login.js ligne 15************

      //je suis sur une nouvelle note de frais
      const html = NewBillUI          //crea const qui represente le formulaire
      document.body.innerHTML = html


      //je ne remplis pas les champs date, ttc et fichier joint
      const date = screen.getByTestId("datepicker"); //Champ de la date
      expect(date.value).toBe("");

      const ttc = screen.getByTestId("amount"); //Champ du TTC
      expect(ttc.value).toBe(""); 

      const Justif = screen.getByTestId("file") //Champ du fichier
      expect(Justif.value).toBe("")


      //la note de frais reste à l'écran (pour mémo le data testId btn send bill a été ajouté par moi dans view)
      const btnGetNewBill = screen.getByTestId("btn-send-bill")//cible le bouton envoyé de la note de frais
      const envoiNewBill = jest.fn((e) => e.preventDefault())//creat de fonction 
      btnGetNewBill.addEventListener("submit", envoiNewBill)//ecoute d'évènement
      fireEvent.submit(btnGetNewBill)//simulation de l'évènement
      expect(screen.getByTestId("btn-send-bill")).toBeTruthy()
      
    })
  })


  describe("quand je clique sur le bouton nouvelle note de frais", () => {
    test("Alors un formulaire de saisie apparait", () => {

      const html = NewBillUI          //crea const qui represente le formulaire
      document.body.innerHTML = html
      const btn = BillsUI             //crea const qui represente l'endroit du btn
      document.body.innerHTML = btn
      
      const btnNewBill = screen.getByTestId("btn-new-bill");  //cible le btn
      const ouvreNewBill = jest.fn((e) => e.style.display = Block); //simule la fonction et le display block

      fireEvent.click(btnNewBill);  //simule l'evenement

      btnNewBill.addEventListener("click", ouvreNewBill);// evt au click sur le btn et prise en compte de la fonction

      expect().toBe(); //la simulation doit donner la newbill
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
  
  
})

  

 




